import {
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeCircleOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import ExploreContainer from "../components/ExploreContainer";
import { FlexDiv } from "../components/sub-components/FlexDiv";
import { searchCities } from "../libs/APIHelper";
import { City } from "../libs/types";
import "./Page.css";

const Page: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [city, setCity] = useState<City>();
  const { name } = useParams<{ name: string }>();

  useEffect(() => {
    searchCities("").then(setCities);
  }, []);

  const onSearchChange = async (input: string) => {
    setSearchText(input);
    setCity(undefined);
    const data = await searchCities(input);
    setCities(data as City[]);
  };

  const onCitySelection = (city: City) => {
    setCity(city);
  };

  const onCloseClick = () => {
    setCity(undefined);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton />
          </IonButtons>
          <FlexDiv>
            <IonTitle>{name}</IonTitle>
            <IonSearchbar
              value={searchText}
              onIonChange={(e) => onSearchChange(e.detail.value!)}
              debounce={500}
              animated
              enterkeyhint="enter"
            ></IonSearchbar>
          </FlexDiv>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">{name}</IonTitle>
          </IonToolbar>
        </IonHeader>
        {city ? (
          <>
            <IonFab horizontal="end">
              <IonFabButton size="small">
                <IonIcon icon={closeCircleOutline} onClick={onCloseClick} />
              </IonFabButton>
            </IonFab>
            <ExploreContainer city={city}></ExploreContainer>
          </>
        ) : (
          <IonList>
            {cities.map((city: City, i) => (
              <IonItem
                key={`IonItem-City-${i}`}
                onClick={() => onCitySelection(city)}
              >
                <IonLabel>{city.fullName}</IonLabel>
              </IonItem>
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Page;
