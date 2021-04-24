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
  CartesianGrid,
} from "recharts";
import "./Container.css";
import { useHistory } from "react-router";

interface ContainerProps {
  city: City;
}

const CitySalariesContainer: React.FC<ContainerProps> = ({ city }) => {
  const [cityQoL, setCityQoL] = useState<CityQoL>();
  const history = useHistory();

  if (!city.urbanArea) {
    history.push("/page/Cities");
  }

  useEffect(() => {
    if (city.urbanArea) {
      getCityQoL(city.urbanArea.href).then(setCityQoL);
    }
  }, [city]);

  const salariesDataSet = cityQoL
    ? cityQoL.salaries.map((s) => ({
        job: s.job.title,
        percentil25: s.salary_percentiles.percentile_25,
        percentil50: s.salary_percentiles.percentile_50,
        percentil75: s.salary_percentiles.percentile_75,
      }))
    : [];

  return cityQoL ? (
    <div className="container city-salaries">
      <h3>{city.fullName}</h3>
      <br />
      <ResponsiveContainer>
        <BarChart
          width={100}
          height={100}
          data={salariesDataSet}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="job" />
          <YAxis />
          <Tooltip
            formatter={(value: number, name: string) => [
              Number(value.toFixed(2)).toLocaleString(),
              name,
            ]}
          />
          <Legend />
          <Bar dataKey="percentil25" stackId="a" fill="#8884d8" />
          <Bar dataKey="percentil50" stackId="a" fill="#82ca9d" />
          <Bar dataKey="percentil75" stackId="a" fill="#36abe0" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  ) : (
    <div>
      <h3>Sorry! There is something wrong. No QoL Available</h3>
    </div>
  );
};

export default CitySalariesContainer;
