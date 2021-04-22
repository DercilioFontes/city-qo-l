import axios from "axios";

interface City {
    matching_full_name: string;
}

const baseUrl = "https://api.teleport.org/api/cities";

export const searchCities = async (input: string) => {
  try {
    if (!input) {
      input = "a";
    }
    const response = await axios.get(`${baseUrl}/?search=${input}`);
    console.log(response);
    return response.data._embedded["city:search-results"].map(
      (city: City) => city.matching_full_name
    );
  } catch (error) {
    console.error(error);
  }
};
