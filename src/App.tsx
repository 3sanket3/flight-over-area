import React from "react";
import { Map, Polygon, FeatureGroup, TileLayer } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import { LatLngTuple } from "leaflet";
import data from "./data.json";

function App() {

  const line1 = [[-83.28605905489202,42.77526855468751],[-83.2616105331007,42.6544189453125]]
  const line2 = [[-83.3251208571526,42.73681640625001],[-83.36205174464672,41.385498046875]]
  const polygons: LatLngTuple[][] = data.features[0].geometry.coordinates as [
    number,
    number
  ][][];

  // const center = { lat: 51.505, lng: -0.09 };
  const center: LatLngTuple = [-83.35447311401367, 42.23982914405];

  return (
    <div className="App">
      <Map center={center} zoom={8} style={{ height: "100vh", width: "100vw" }}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FeatureGroup>
          <EditControl
            position="topright"
            // onEdited={(e: any) => console.log(e)}
            onCreated={(e: any) => console.log(e)}
            // onDeleted={(e: any) => console.log(e)}
            draw={{
              rectangle: false
            }}
          />
        </FeatureGroup>
        {polygons.map(polygon => (
          <Polygon color="purple" positions={polygon} />
        ))}
      </Map>
    </div>
  );
}

export default App;
