import React, { useState } from "react";
import { City } from "../libs/types";
import "./Container.css";
import MapGL from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { appEnv } from "../env";

interface ContainerProps {
  city: City;
}

const CityMapContainer: React.FC<ContainerProps> = ({ city }) => {
  const [viewport, setViewport] = useState({
    latitude: city.location.latlon.latitude,
    longitude: city.location.latlon.longitude,
    zoom: 11,
  });

  console.log(appEnv.mapBoxApiKey);
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
        mapboxApiAccessToken={appEnv.mapBoxApiKey}
      ></MapGL>
    </div>
  );
};

export default CityMapContainer;
