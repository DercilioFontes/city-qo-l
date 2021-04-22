import {
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
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
import CitySalariesContainer from "../components/CitySalariesContainer";
import { CityItem } from "../components/sub-components/CityItem";
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

  const onCitySelection = (e: any, city: City) => {
    e.preventDefault();
    if (e.target.tagName === "ION-BUTTON") {
      return;
    }

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
      <IonContent fullscreen>
        {city ? (
          <>
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
              <Route
                exact
                path="/page/Salaries"
                component={() => <CitySalariesContainer city={city} />}
              />
            </IonRouterOutlet>
          </>
        ) : (
          <IonList>
            {cities.map((city: City, i) => (
              <CityItem
                key={`CityItem-${i}-${city.geoNameId}`}
                city={city}
                onCitySelection={onCitySelection}
              />
            ))}
          </IonList>
        )}
      </IonContent>
    </IonPage>
  );
};

export default Page;
