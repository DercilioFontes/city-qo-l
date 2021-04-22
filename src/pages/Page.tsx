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
import ExploreContainer from "../components/ExploreContainer";
import { FlexDiv } from "../components/sub-components/FlexDiv";
import { searchCities } from "../libs/APIHelper";
import "./Page.css";

const Page: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [cities, setCities] = useState([]);
  const [error, setError] = useState();
  const { name } = useParams<{ name: string }>();

  useEffect(() => {
    searchCities("").then(setCities).catch(setError);
  }, []);

  const onSearchChange = async (input: string) => {
    setSearchText(input);
    if (input) {
      const data = await searchCities(input);
      setCities(data);
    }
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
          {cities &&
            cities.map((c) => (
              <IonItem key={c}>
                <IonLabel>{c}</IonLabel>
              </IonItem>
            ))}
        </IonList>
      </IonContent>
    </IonPage>
  );
};

export default Page;
