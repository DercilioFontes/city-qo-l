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

  console.log("cityQoL: ", cityQoL);

  return cityQoL ? (
    <div className="container">
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
      <IonSegment onIonChange={() => setIsBarChart(!isBarChart)}>
        <IonSegmentButton value="barChart">
          <IonLabel>Bar Chart</IonLabel>
        </IonSegmentButton>
        <IonSegmentButton value="radarChart">
          <IonLabel>Radar Chart</IonLabel>
        </IonSegmentButton>
      </IonSegment>

      {isBarChart ? (
        <ResponsiveContainer width="90%" height="100%">
          <BarChart width={150} height={40} data={cityQoL.categories}>
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
        <ResponsiveContainer width="90%" height="100%">
          <RadarChart
            outerRadius={90}
            width={730}
            height={350}
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
    <div>QoL</div>
  );
};

export default CityQoLContainer;
