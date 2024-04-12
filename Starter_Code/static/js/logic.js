// Creating initail map object 
// longitude, latitude , and starting zoom level 
// gets inserted into div with an id of "map"

let map = L.map('map').setView([51.505, -0.09], 13);


// Adding a tile layer( the background map image)
// we used the addTO() method to add objects to our map 

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

//
 
L.marker([51.5, -0.09],{
    draggable: true, 
    autoPan: false,
    title: "My First Marker-Naqib"
}).addTo(map)
    
// Reading the Json data with the D3.json from GeoJSON dataset

d3.json('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson').then(data => {
  // Work with the JSON data here
  console.log(data);
}).catch(error => console.error('Error loading data:', error));

// if we read the json data format with the "JavaScript Fetch API"
// 

// fetch('https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson')
//   .then(response => response.json())
//   .then(data => {
//     // Work with the JSON data here
//     console.log(data);
//   })
//   .catch(error => console.error('Error fetching data:', error));

