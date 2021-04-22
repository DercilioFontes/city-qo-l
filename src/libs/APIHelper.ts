import axios from "axios";
import { City, CityQoL, CityUAUrls } from "./types";
const baseUrl = "https://api.teleport.org/api/cities";

const transformSearchCitiesResponse = (data: any) => {
  return JSON.parse(data)._embedded["city:search-results"].map(
    (city: any): City => {
      const cityInfo = city._embedded["city:item"];
      return {
        fullName: cityInfo.full_name,
        geoNameId: cityInfo.geoname_id,
        location: cityInfo.location,
        population: cityInfo.population,
        urbanArea: cityInfo._links["city:urban_area"],
      };
    }
  );
};

const transformCityUAResponse = (data: any) => {
  const objData = JSON.parse(data)._links;
  console.log("objData: ", objData);
  return {
    cityImagesUrl: objData["ua:images"].href,
    citySalariesUrl: objData["ua:salaries"].href,
    cityQoLScoresUrl: objData["ua:scores"].href,
  };
};

export const searchCities = async (input: string) => {
  try {
    if (!input) {
      input = "a";
    }
    const response = await axios.get(
      `${baseUrl}/?search=${input}&embed=city:search-results/city:item`,
      { transformResponse: [transformSearchCitiesResponse] }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCityInfo = async (geoNameId: string) => {
  try {
    const response = await axios.get(`${baseUrl}/geonameid:${geoNameId}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCityQoL = async (cityQoLUrl: string) => {
  try {
    const urlsResp = await axios.get(cityQoLUrl, {
      transformResponse: [transformCityUAResponse],
    });
    const {
      cityImagesUrl,
      citySalariesUrl,
      cityQoLScoresUrl,
    } = urlsResp.data as CityUAUrls;

    const qolResp = await axios.get(cityQoLScoresUrl);
    console.log(qolResp.data);
    return qolResp.data as CityQoL;
  } catch (error) {
    console.error(error);
  }
};
