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
  IonRouterOutlet,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { closeCircleOutline } from "ionicons/icons";
import React, { useEffect, useState } from "react";
import { Route, useParams } from "react-router";
import CityMapContainer from "../components/CityMapContainer";
import CityQoLContainer from "../components/CityQoLContainer";
import { FlexDiv } from "../components/sub-components/FlexDiv";
import { searchCities } from "../libs/APIHelper";
import { City } from "../libs/types";
import "./Page.css";

const Page: React.FC = () => {
  const { name } = useParams<{ name: string }>();
  const [searchText, setSearchText] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const [city, setCity] = useState<City>();

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
    if (name === "QoL" && !city.urbanArea) {
      return;
    } else {
      setCity(city);
    }
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
            <IonTitle slot="start">{name}</IonTitle>
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
      {city ? (
        <IonContent fullscreen>
          <IonFab horizontal="end">
            <IonFabButton size="small">
              <IonIcon icon={closeCircleOutline} onClick={onCloseClick} />
            </IonFabButton>
          </IonFab>
          <IonRouterOutlet>
            <Route
              exact
              path="/page/Cities"
              component={() => <CityMapContainer city={city} />}
            />
            <Route
              exact
              path="/page/QoL"
              component={() => <CityQoLContainer city={city} />}
            />
          </IonRouterOutlet>
        </IonContent>
      ) : (
        <IonContent fullscreen>
          <IonList>
            {cities.map((city: City, i) => (
              <IonItem
                key={`IonItem-City-${i}`}
                onClick={() => onCitySelection(city)}
              >
                <IonLabel
                  color={name === "QoL" && city.urbanArea ? "primary" : ""}
                >
                  {city.fullName}
                </IonLabel>
              </IonItem>
            ))}
          </IonList>
        </IonContent>
      )}
    </IonPage>
  );
};

export default Page;
