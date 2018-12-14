import React from "react";

import "leaflet/dist/leaflet.css";
import { Map as LeafletMap, TileLayer, Marker, Popup } from "react-leaflet";

const Map = () => (
  <LeafletMap center={[43.57, 7.0689363]} zoom={13}>
    <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="http://{s}.tile.osm.org/{z}/{x}/{y}.png"
    />
    <Marker position={[43.614386, 7.0689363]}>
      <Popup>
        A pretty CSS3 popup. <br /> Easily customizable.
      </Popup>
    </Marker>
  </LeafletMap>
);

export default Map;
