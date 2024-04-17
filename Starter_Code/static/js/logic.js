// // Creating initail map object 
// // longitude, latitude , and starting zoom level 
// // gets inserted into div with an id of "map"

// let map = L.map('map').setView([51.505, -0.09], 13);


// // Adding a tile layer( the background map image)
// // we used the addTO() method to add objects to our map 

// L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);




// Initializing the map object with predefined options
let myMap = L.map('map', {
  center: [40, -120], // Coordinating for the center of the map (USA)
  zoom: 5            // Initial zoom level
});

// Function to determine the color of markers based on earthquake depth
function getColor(depth) {
  return depth > 90 ? '#FF0000' : // Bright Red
         depth > 70 ? '#FF4500' : // Orange Red
         depth > 50 ? '#FF8C00' : // Dark Orange
         depth > 30 ? '#FFD700' : // Gold
         depth > 10 ? '#9ACD32' : // Yellow Green
                      '#00FA9A';  // Medium Spring Green
}

// Adding OpenStreetMap tiles to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

// URL for the earthquake data from USGS (all earthquakes from the past week)
let url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Creating a legend in the bottom right corner to explain the color coding
var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (map) {
  var div = L.DomUtil.create('div', 'info legend');
  var depths = [-10, 10, 30, 50, 70, 90]; // Depth intervals

  // Looping through depth intervals and generate a label with a colored square for each interval
  depths.forEach((depth, index) => {
      div.innerHTML += `<i style="background:${getColor(depth + 1)}"></i> ${depth}${depths[index + 1] ? `&ndash;${depths[index + 1]}<br>` : '+'}`;
  });

  return div;
};

legend.addTo(myMap);

// Fetching the earthquake data using D3.js

d3.json(url).then(function(response) {
  let features = response.features;
  let marker_limit = 1000; // Limit to avoid performance issues with too many markers

  for (let i = 0; i < marker_limit; i++) {
      let location = features[i].geometry;
      let magnitude = features[i].properties.mag;
      let depth = location.coordinates[2];

      if (location) {
          // Create a circle marker for each earthquake
          let circleMarker = L.circleMarker([location.coordinates[1], location.coordinates[0]], {
              radius: magnitude * 3, // Radius proportional to magnitude
              color: "black",
              fillColor: getColor(depth),
              weight: 1,
              fillOpacity: 1
          }).addTo(myMap);

          // Binding a popup to display details about the earthquake on click
          circleMarker.bindPopup(`Location: [${location.coordinates[1]}, ${location.coordinates[0]}]<br>Magnitude: ${magnitude}<br>Depth: ${depth}`);
      }
  }
});