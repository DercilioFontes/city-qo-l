import { IonButton, IonIcon, IonItem, IonLabel } from "@ionic/react";
import { heart, heartOutline } from "ionicons/icons";
import React, { useState } from "react";
import { City } from "../../libs/types";

interface ContainerProps {
  city: City;
  onCitySelection: (e: any, city: City) => void;
}

export const CityItem: React.FC<ContainerProps> = ({
  city,
  onCitySelection,
}) => {
  const [isFavorite, setFavorite] = useState(city.isFavorite);

  const onFavoriteClick = (e: any, city: City) => {
    e.preventDefault();
    if (city.isFavorite) {
      setFavorite(false);
      city.isFavorite = false;
      localStorage.removeItem(city.geoNameId);
    } else {
      setFavorite(true);
      city.isFavorite = true;
      localStorage.setItem(city.geoNameId, city.fullName);
    }

    console.log("localStorage: ", localStorage);
  };
  return (
    <IonItem onClick={(e) => onCitySelection(e, city)}>
      <IonLabel color={city.urbanArea ? "primary" : ""}>
        {city.fullName}
      </IonLabel>
      <IonButton fill="clear" onClick={(e) => onFavoriteClick(e, city)}>
        <IonIcon icon={isFavorite ? heart : heartOutline}></IonIcon>
      </IonButton>
    </IonItem>
  );
};
