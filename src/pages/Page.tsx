import {
  IonButtons,
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonMenuButton,
  IonPage,
  IonSearchbar,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { FlexDiv } from "../components/sub-components/FlexDiv";
import { getCityInfo, searchCities } from "../libs/APIHelper";
import { City } from "../libs/types";
import "./Page.css";

const Page: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [cities, setCities] = useState<City[]>([]);
  const { name } = useParams<{ name: string }>();

  useEffect(() => {
    searchCities("").then(setCities);
  }, []);

  const onSearchChange = async (input: string) => {
    setSearchText(input);
    const data = await searchCities(input);
    setCities(data as City[]);
  };

  const onCitySelection = async (geoNameId: string) => {
    const data = await getCityInfo(geoNameId);
    console.log("data: ", data);
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
        <IonList>
          {cities.map((city: City, i) => (
            <IonItem
              key={`IonItem-City-${i}`}
              onClick={() => onCitySelection(city.geoNameId)}
            >
              <IonLabel>{city.fullName}</IonLabel>
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Page;
