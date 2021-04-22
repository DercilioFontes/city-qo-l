import React, { useState } from "react";
import { City } from "../libs/types";
import "./Container.css";
import MapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const MAPBOX_TOKEN =
  "pk.eyJ1IjoiZGVyY2lsaW9mb250ZXMiLCJhIjoiY2tuc2tsazc3MjV5bzJ3bzUxa2libXQzMCJ9.W5OAiOFIRyz9AaZgoBt8qQ";

interface ContainerProps {
  city: City;
}

const CityMapContainer: React.FC<ContainerProps> = ({ city }) => {
  const [viewport, setViewport] = useState({
    latitude: city.location.latlon.latitude,
    longitude: city.location.latlon.longitude,
    zoom: 11,
  });
  return (
    <div className="container">
      <strong>{city.fullName}</strong>
      <p>Population: {city.population.toLocaleString()}</p>
      <MapGL
        {...viewport}
        onViewportChange={(
          viewport: React.SetStateAction<{
            latitude: number;
            longitude: number;
            zoom: number;
          }>
        ) => {
          setViewport(viewport);
        }}
        width="100%"
        height="100%"
        mapboxApiAccessToken={MAPBOX_TOKEN}
      ></MapGL>
    </div>
  );
};

export default CityMapContainer;
