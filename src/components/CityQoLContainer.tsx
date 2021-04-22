import React, { useEffect, useState } from "react";
import { getCityQoL } from "../libs/APIHelper";
import { City, CityQoL } from "../libs/types";
import "./Container.css";

interface ContainerProps {
  city: City;
}

const CityQoLContainer: React.FC<ContainerProps> = ({ city }) => {
  const [cityQoL, setCityQoL] = useState<CityQoL>();
  useEffect(() => {
    getCityQoL(city.urbanArea.href).then(setCityQoL);
  }, [city]);

  return (
    <div className="container">
      <strong>{city.fullName}</strong>
      <p>{JSON.stringify(cityQoL)}</p>
    </div>
  );
};

export default CityQoLContainer;
