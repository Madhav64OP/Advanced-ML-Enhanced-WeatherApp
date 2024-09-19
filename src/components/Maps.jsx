import React, { useEffect } from "react";
import "../App.css";
import { useSelector } from "react-redux";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

function Maps() {
  const WData = useSelector((state) => state.wData.mainData);

  function ChangeMapView({ postion }) {
    const map = useMap();

    React.useEffect(() => {
      if (position) {
        map.setView(position, 10);
      }
    }, [position, map]);
    return null;
  }

  const position = [WData.location.lat, WData.location.lon];
  return (
    <div className="h-[500px]  sticky flex justify-center">
      <MapContainer center={position} zoom={12}>
        {/*[30.3787, 76.7794] */}
        {/* <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      /> */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <ChangeMapView position={position} />
        <Marker position={position}>
          <Popup>
            <span>
              Marker at {position[0]},{position[1]}
            </span>
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default Maps;
