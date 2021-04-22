import axios from "axios";
import { City } from "./types";
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

export const searchCities = async (input: string) => {
  try {
    if (!input) {
      input = "a";
    }
    const response = await axios.get(
      `${baseUrl}/?search=${input}&embed=city:search-results/city:item`,
      { transformResponse: [transformSearchCitiesResponse] }
    );
    console.log("response", response);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getCityInfo = async (geoNameId: string) => {
  try {
    const response = await axios.get(`${baseUrl}/geonameid:${geoNameId}`);
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
