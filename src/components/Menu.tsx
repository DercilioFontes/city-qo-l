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
  cashOutline,
  logoGithub,
  logoLinkedin,
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
    title: "Salaries",
    url: "/page/Salaries",
    iosIcon: cashOutline,
    mdIcon: cashOutline,
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
        <IonList>
          <a href="https://www.linkedin.com/in/derciliofontes/">
            <IonIcon size="large" icon={logoLinkedin}></IonIcon>
          </a>
          <a href="https://github.com/DercilioFontes">
            <IonIcon size="large" icon={logoGithub}></IonIcon>
          </a>
        </IonList>
        <IonList className="references ion-margin-start">
          API resource:{" "}
          <a href="https://developers.teleport.org/">teleport.org</a>
          Stark:
          <a href="https://reactjs.org/">React</a>
          <a href="https://ionicframework.com">Ionic</a>
          <a href="https://www.mapbox.com">Mapbox GL JS</a>
          <a href="https://recharts.org">Recharts</a>
          <a href="https://github.com/axios/axios">Recharts</a>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
