import React, { useEffect, useState } from "react";
import { getCityQoL } from "../libs/APIHelper";
import { City, CityQoL } from "../libs/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import "./Container.css";
import { colors } from "../libs/colors";
import {
  IonLabel,
  IonProgressBar,
  IonSegment,
  IonSegmentButton,
} from "@ionic/react";

interface ContainerProps {
  city: City;
}

const CityQoLContainer: React.FC<ContainerProps> = ({ city }) => {
  const [cityQoL, setCityQoL] = useState<CityQoL>();
  const [isBarChart, setIsBarChart] = useState<boolean>(true);

  useEffect(() => {
    getCityQoL(city.urbanArea.href).then(setCityQoL);
  }, [city]);

  const setProgressBarColor = (score: number) => {
    if (score > 75) {
      return "success";
    } else if (score < 50) {
      return "danger";
    } else {
      return "medium";
    }
  };

  return cityQoL ? (
    <div className="container">
      <img
        srcSet={`${cityQoL.photos[0].image.mobile} 480w,
             ${cityQoL.photos[0].image.web} 800w`}
        sizes="(max-width: 600px) 480px, 800px"
        src={`${cityQoL.photos[0].image.web}`}
        alt={`${city.fullName}-${cityQoL.photos[0].attribution.photographer}`}
      ></img>
      <h3>{city.fullName}</h3>
      <div className="ion-padding-start ion-padding-end">
        <IonLabel>
          Teleport City Score: {cityQoL.teleport_city_score.toFixed(2)}%
        </IonLabel>
        <IonProgressBar
          color={setProgressBarColor(cityQoL.teleport_city_score)}
          value={cityQoL.teleport_city_score / 100}
        ></IonProgressBar>
      </div>
      <div
        className="ion-margin-bottom ion-padding ion-text-justify"
        dangerouslySetInnerHTML={{
          __html: cityQoL.summary,
        }}
      ></div>
      <IonSegment
        defaultValue="barChart"
        onIonChange={() => setIsBarChart(!isBarChart)}
      >
        <IonSegmentButton value="barChart">
          <IonLabel>Bar Chart</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="radarChart">
          <IonLabel>Radar Chart</IonLabel>
        </IonSegmentButton>
      </IonSegment>
      {isBarChart ? (
        <ResponsiveContainer width="90%" height="40%">
          <BarChart width={80} height={40} data={cityQoL.categories}>
            <XAxis dataKey="name" />
            <YAxis domain={[0, 10]} />
            <Tooltip
              formatter={(value: number, name: string) => [
                value.toFixed(2),
                name,
              ]}
            />
            <Legend content={<p>Score out to 10</p>} />
            <Bar
              dataKey="score_out_of_10"
              fill={colors.primary}
              background={{ fill: "#eee" }}
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <ResponsiveContainer width="90%" height="40%">
          <RadarChart
            outerRadius={50}
            width={80}
            height={40}
            data={cityQoL.categories}
          >
            <PolarGrid />
            <PolarAngleAxis dataKey="name" />
            <PolarRadiusAxis angle={30} domain={[0, 10]} />
            <Radar
              name="Score out of 10"
              dataKey="score_out_of_10"
              stroke="#8884d8"
              fill={colors.primary}
              fillOpacity={0.6}
            />
            <Legend content={<p>Score out to 10</p>} />
          </RadarChart>
        </ResponsiveContainer>
      )}
    </div>
  ) : (
    <div>
      <h3>Sorry! There is something wrong. No QoL Available</h3>
    </div>
  );
};

export default CityQoLContainer;
