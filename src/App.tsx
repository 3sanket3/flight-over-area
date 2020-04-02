import React, { useState, useEffect } from "react";
import { Map, Polygon, FeatureGroup, TileLayer } from "react-leaflet";
import { EditControl } from "react-leaflet-draw";
import "leaflet/dist/leaflet.css";
import { LatLngTuple, polyline } from "leaflet";
import data from "./data.json";
import lineIntersect from "@turf/line-intersect";
import { lineString, polygon } from "@turf/helpers";

function App() {
  const line = [
    [-83.1955465039878, 43.22570800781251],
    [-83.23060148584167, 41.32507324218751],
    [-83.26354389726245, 43.14880371093751],
    [-83.27448920241004, 41.05041503906251]
  ];

  const polygons: LatLngTuple[][] = data.features[0].geometry.coordinates as [
    number,
    number
  ][][];

  const [lines, setLines] = useState<[number, number][]>([]);
  const [isIntersect, setIsIntersect] = useState(false);
  const center: LatLngTuple = polygons[0][0];

  function onLineCreate(e: any) {
    const latlngs = e.layer.editing.latlngs;
    const convertedLatLngs = latlngs.map((ltn: any) =>
      ltn.map((l: any) => [l.lat, l.lng])
    );

    setLines(convertedLatLngs[0]);
  }

  useEffect(() => {
    if (lines.length && polygons.length) {
      console.log({ lines, polygons });

      const intersectRes = lineIntersect(lineString(lines), polygon(polygons));
      if (intersectRes.features.length) {
        setIsIntersect(true);
      } else {
        setIsIntersect(false);
      }
    } else {
      setIsIntersect(false);
    }
  }, [lines, polygons]);
  return (
    <div className="App">
      <Map center={center} zoom={8} style={{ height: "90vh", width: "100vw" }}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FeatureGroup>
          <EditControl
            position="topright"
            // onEdited={(e: any) => console.log(e)}
            onCreated={(e: any) => onLineCreate(e)}
            onDeleted={(e: any) => setLines([])}
            onCancel={(e: any) => setLines([])}
            draw={{
              rectangle: false
            }}
          />
        </FeatureGroup>
        {polygons.map(polygon => (
          <Polygon color="purple" positions={polygon} />
        ))}
      </Map>

      {isIntersect ? (
        <span style={{ color: "red" }}>Danger</span>
      ) : (
        <span style={{ color: "green" }}>safe</span>
      )}
    </div>
  );
}

export default App;
