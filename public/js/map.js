

  
maptilersdk.config.apiKey = mapApi;

const coordinates = listing && listing.geometry && listing.geometry.coordinates && listing.geometry.coordinates.length === 2
  ? listing.geometry.coordinates
  : [77.209, 28.6139]; // Safe fallback to New Delhi, India coordinates

const map = new maptilersdk.Map({
  container: "map", // container's id or the HTML element to render the map
  style: maptilersdk.MapStyle.STREETS,
  center: coordinates, // starting position [lng, lat]
  zoom: 9, // starting zoom
});


const marker = new maptilersdk.Marker({ color: "red" })
    .setLngLat(coordinates)
    .setPopup(new maptilersdk.Popup({ offset: 25 })
    .setHTML(`<h4><b>${listing ? listing.title : 'Destination'}</b></h4><p>Exact Location will be provided after booking</p>`))
    .addTo(map);



