

  
maptilersdk.config.apiKey = mapApi;

const map = new maptilersdk.Map({
  container: "map", // container's id or the HTML element to render the map
  style: maptilersdk.MapStyle.STREETS,
  center: listing.geometry.coordinates, // starting position [lng, lat]
  zoom: 9, // starting zoom
});


const marker = new maptilersdk.Marker({ color: "red" })
    .setLngLat(listing.geometry.coordinates)
    .setPopup(new maptilersdk.Popup({ offset: 25 })
    .setHTML(`<h4><b>${listing.title}</b></h4><p>Exact Location will be provided after booking</p>`))
    .addTo(map);



