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


const dburl = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(dburl);
}



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
  mongoUrl: dburl,               // ✅ MUST EXIST
  secret: process.env.SECRET,    // ✅ STRING ONLY
  touchAfter: 24 * 3600,
});

store.on("error", function (e) {
  console.log("SESSION STORE ERROR", e);
});

//SESSION + FLASH CONFIG
const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
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
  next();
});


const listingRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

app.use("/listings", listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);


//PAGE NOT FOUND HANDLER
app.use((req, res, next) => {
  next(new ExpressError(404, "Page not found"));
});


//ERROR HANDLER
app.use((err, req, res, next) => {
  console.log("🔥 ERROR DETAILS:", err); // 👈 ADD THIS
  let { statusCode = 500, message = "Something went wrong" } = err;
  res.status(statusCode).render("error.ejs", { message });
});



//START SERVER
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
