import {
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonMenu,
  IonMenuToggle,
  IonNote,
} from "@ionic/react";

import { useLocation } from "react-router-dom";
import {
  accessibilityOutline,
  businessOutline,
  heartOutline,
  heartSharp,
} from "ionicons/icons";
import "./Menu.css";

interface AppPage {
  url: string;
  iosIcon: string;
  mdIcon: string;
  title: string;
}

const appPages: AppPage[] = [
  {
    title: "Cities",
    url: "/page/Cities",
    iosIcon: businessOutline,
    mdIcon: businessOutline,
  },
  {
    title: "Quality of Life",
    url: "/page/QoL",
    iosIcon: accessibilityOutline,
    mdIcon: accessibilityOutline,
  },
  {
    title: "Favorites",
    url: "/page/Favorites",
    iosIcon: heartOutline,
    mdIcon: heartSharp,
  },
];

const Menu: React.FC = () => {
  const location = useLocation();

  return (
    <IonMenu contentId="main" type="overlay">
      <IonContent>
        <IonList id="inbox-list">
          <IonListHeader>CityQoL</IonListHeader>
          <IonNote>Check your city Quality of Life</IonNote>
          {appPages.map((appPage, index) => {
            return (
              <IonMenuToggle key={index} autoHide={false}>
                <IonItem
                  className={
                    location.pathname === appPage.url ? "selected" : ""
                  }
                  routerLink={appPage.url}
                  routerDirection="none"
                  lines="none"
                  detail={false}
                >
                  <IonIcon
                    slot="start"
                    ios={appPage.iosIcon}
                    md={appPage.mdIcon}
                  />
                  <IonLabel>{appPage.title}</IonLabel>
                </IonItem>
              </IonMenuToggle>
            );
          })}
        </IonList>
        <IonNote class="ion-margin-top">
          API resource:{" "}
          <a href="https://developers.teleport.org/">teleport.org</a>
        </IonNote>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
