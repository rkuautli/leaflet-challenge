// Store our API endpoint as queryUrl.
//let queryUrl = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2021-01-01&endtime=2021-01-02&maxlongitude=-69.52148437&minlongitude=-123.83789062&maxlatitude=48.74894534&minlatitude=25.16517337";
let queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson"

// Perform a GET request to the query URL/
d3.json(queryUrl).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
});

function onEachcircle(feature, latlng) {
    // Customize marker based on earthquake magnitude
    var magnitude = feature.properties.mag;
    var depth = feature.geometry.coordinates[2]; // Depth is the third coordinate

    // Color based on depth
    var color;
   if (depth > 100) {
        color = '#cc0000'; // Bright Red
    } else if (depth > 70) {
        color = '#de5d83'; // Orange
    } else if (depth > 50) {
        color = '#FD8D3C'; // Light Orange
    } else if (depth > 30) {
        color = '#8a2be2'; // Yellow
    } else if (depth > 10) {
        color = '#008000'; // Yellow
    } 
    else {
        color = '#8db600'; // Light Yellow
    }
    return L.circleMarker(latlng, {
        radius: magnitude * 3, 
        fillColor: color,
        color: 'gray',
        weight: 1,
        opacity: 1,
        fillOpacity: 0.8
    });
}

function createFeatures(earthquakeData) {

  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
  function onEachFeature(feature, layer) {
    layer.bindPopup(`<strong>Location:</strong> ${feature.properties.place}<br>
        <strong>Magnitude:</strong> ${feature.properties.mag}<br>
        <strong>Depth:</strong> ${feature.geometry.coordinates[2]} km<br>`);
  }


  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  let earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer : onEachcircle
  });

  // Send our earthquakes layer to the createMap function/
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Create the base layers.
  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

  // Create a baseMaps object.
  let baseMaps = {
    "Street Map": street,
    "Topographic Map": topo
  };

  // Create an overlay object to hold our overlay.
  let overlayMaps = {
    Earthquakes: earthquakes
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  let myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [street, earthquakes]
  });

  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

// Create the legend control
var legend = L.control({ position: 'bottomright' });

legend.onAdd = function (myMap) {
    var div = L.DomUtil.create('div', 'legend'),
        depthRanges = [0, 20, 50, 100, 200, 300, 500],
        colors = ['#cc0000', '#FEB24C', '#FD8D3C', '#FC4E2A', '#E31A1C', '#BD0026', '#800026'];

    // Loop through depth intervals and generate a label with a colored square for each interval
        div.innerHTML += '<strong>Depth (km)</strong><br>';
        for (var i = 0; i < depthRanges.length; i++) {
            div.innerHTML +=
                '<i style="background:' + colors[i] + '"></i> ' +
                depthRanges[i] + (depthRanges[i + 1] ? '&ndash;' + depthRanges[i + 1] + '<br>' : '+');
        }
        return div;
    };

    // Add the legend to the map
    legend.addTo(myMap);
