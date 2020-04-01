import React from "react";
import { Map, Polygon, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngTuple } from "leaflet";
import data from "./data.json";

function App() {
  const polygons: LatLngTuple[][] = data.features[0].geometry.coordinates as [
    number,
    number
  ][][];

  // const center = { lat: 51.505, lng: -0.09 };
  const center: LatLngTuple = [-83.35447311401367, 42.23982914405];
  return (
    <div className="App">
      <Map
        center={center}
        zoom={10}
        style={{ height: "400px", width: "400px" }}
      >
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {polygons.map(polygon => (
          <Polygon color="purple" positions={polygon} />
        ))}
      </Map>
    </div>
  );
}

export default App;
