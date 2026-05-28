if(process.env.NODE_ENV != "production"){
  require('dotenv').config()
}

// Hide that one harmless deprecation warning
process.noDeprecation = true;
// OR only hide this specific one (cleaner)
process.env.NODE_NO_WARNINGS = "1";  // Node 20+ way

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require('connect-mongo');
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");


let dburl = process.env.ATLASDB_URL || "mongodb://127.0.0.1:27017/wonderlust";

async function connectDB() {
  try {
    await mongoose.connect(dburl);
    console.log("Connected to MongoDB Atlas");
    return mongoose.connection.getClient();
  } catch (err) {
    console.warn("⚠️ MongoDB Atlas connection failed. Falling back to Local MongoDB...", err.message);
    dburl = "mongodb://127.0.0.1:27017/wonderlust";
    await mongoose.disconnect();
    await mongoose.connect(dburl);
    console.log("Connected to Local MongoDB");
    return mongoose.connection.getClient();
  }
}

const clientPromise = connectDB();



// VIEW ENGINE + STATIC
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));


//  BODY PARSER + METHOD OVERRIDE
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

// --------------------
// Mongo Store (CORRECT)
// --------------------
const store = MongoStore.create({
  clientPromise,                 // ✅ SHARED CLIENT PROMISE
  secret: process.env.SECRET || "mysupersecretcode",    // ✅ STRING ONLY
  touchAfter: 24 * 3600,
});

store.on("error", function (e) {
  console.log("SESSION STORE ERROR", e);
});

// Trust proxy (required for secure sessions behind HTTPS reverse proxies like Render/Heroku)
app.set("trust proxy", 1);

//SESSION + FLASH CONFIG
const sessionOptions = {
  store,
  secret: process.env.SECRET || "mysupersecretcode",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  }
};

app.use(session(sessionOptions));
app.use(flash());


//PASSPORT MIDDLEWARE
app.use(passport.initialize());
app.use(passport.session());


//PASSPORT LOCAL STRATEGY
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//FLASH + CURRENT USER MIDDLEWARE
app.use((req, res, next) => {
  res.locals.currUser = req.user;   //REQUIRED FOR AUTH
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.searchQuery = req.query.search || "";
  next();
});


const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);


// Health check API (Moved before 404 handler)
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Your API is running',
    timestamp: new Date().toISOString()
  });
});

// Privacy & Terms Static Info Pages (Prevent 404 from footer links)
app.get('/privacy', (req, res) => {
  res.render("privacy.ejs");
});

app.get('/terms', (req, res) => {
  res.render("terms.ejs");
});

//PAGE NOT FOUND HANDLER
app.use((req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});


//ERROR HANDLER
app.use((err, req, res, next) => {
  // Ensure that common layout variables exist in res.locals to prevent secondary EJS rendering crashes
  res.locals.currUser = req.user || null;
  res.locals.success = req.flash ? req.flash("success") : [];
  res.locals.error = req.flash ? req.flash("error") : [];
  res.locals.searchQuery = req.query ? (req.query.search || "") : "";

  console.log("🔥 ERROR DETAILS:", err); // 👈 ADD THIS
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
});



//START SERVER
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
