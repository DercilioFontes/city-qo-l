import React from "react";
import { GoogleMap, LoadScript } from "@react-google-maps/api";
import { appEnv } from "../env";
import { CenterLocation, City } from "../libs/types";
import "./Container.css";

interface ContainerProps {
  city: City;
}

const containerStyle = {
  width: "90%",
  height: "50%",
  margin: "0 auto",
};

const CityMapContainer: React.FC<ContainerProps> = ({ city }) => {
  const location: CenterLocation = {
    lat: city.location.latlon.latitude,
    lng: city.location.latlon.longitude,
  };

  return (
    <div className="container city-map">
      <h3>{city.fullName}</h3>
      <p>Population: {city.population.toLocaleString()}</p>
      <br />
      <LoadScript googleMapsApiKey={appEnv.googleMapsApiKey}>
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={location}
          zoom={11}
        ></GoogleMap>
      </LoadScript>
    </div>
  );
};

export default CityMapContainer;
