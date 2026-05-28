const Listing = require("../models/listing");
const maptilerClient = require("@maptiler/client");
maptilerClient.config.apiKey = process.env.MAP_API_KEY;


module.exports.index = async (req, res) => {
  let { search } = req.query;
  let query = {};
  if (search) {
    query = {
      $or: [
        { title: { $regex: search, $options: "i" } },
        { location: { $regex: search, $options: "i" } },
        { country: { $regex: search, $options: "i" } }
      ]
    };
  }
  const allListings = await Listing.find(query);
  res.render("./listings/index.ejs", { allListings });
};

module.exports.renderNewFrom = (req, res) => {
  res.render("./listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing you requestes for does not exist!");
    return res.redirect("/listings");
  }
  console.log(listing);
  return res.render("./listings/show.ejs", { listing });
};

module.exports.createListing = async (req, res, next) => {
  let coordinates = [77.209, 28.6139]; // Default coordinates (e.g. New Delhi, India)
  try {
    const result = await maptilerClient.geocoding.forward(req.body.listing.location);
    if (result && result.features && result.features.length > 0) {
      coordinates = result.features[0].center;
    } else {
      console.warn("Geocoding returned no features, using default coordinates.");
    }
  } catch (err) {
    console.error("Geocoding failed:", err);
  }

  let url = req.file.path;
  let filename = req.file.filename;
  let newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };
  newListing.geometry = {
    type: "Point",
    coordinates: coordinates
  };
  let saveListing = await newListing.save();
  console.log(saveListing);
  req.flash("success", "New Listing Created!");
  res.redirect("/listings");
};

module.exports.renderEditFrom = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requestes for does not exist!");
    return res.redirect("/listings");
  }

  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  return  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updatedListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deleteListing = await Listing.findByIdAndDelete(id);
  console.log(deleteListing);
  req.flash("success", "Listing Deleted!");
  res.redirect("/listings");
};
