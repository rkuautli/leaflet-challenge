## Module 15 Challenge: Earthquake Visualization

The United States Geological Survey (USGS) provides critical data on natural hazards, ecosystems, and climate impacts. This challenge involves developing a tool to visualize USGS earthquake data, helping educate the public and secure funding for environmental issues.

## Instructions for Creating the Earthquake Visualization

1. Get Your Dataset:
- Access the USGS GeoJSON Feed to retrieve earthquake data.
- Use the provided URL for "All Earthquakes from the Past 7 Days" to fetch the dataset in JSON format.
2. Import and Visualize the Data:
- Map Creation: Use Leaflet to create a map that plots all earthquakes based on their longitude and latitude.
- Data Markers: The size of the markers should correspond to the earthquake's magnitude (larger for higher magnitudes).
The color should represent the earthquake's depth (darker colors for greater depths).
- Note: Depth is the third coordinate in each earthquake's data.
- Popups: Implement popups that display additional information, such as magnitude, depth, and location, when markers are clicked.
- Legend: Create a legend to provide context for the depth and color coding used in the visualization.

## Source Files

index.html: The main application page displaying the map and visualization.
static/app.js: The JavaScript file containing the logic to fulfill the visualization requirements.
https://rkuautli.github.io/leaflet-challenge/
