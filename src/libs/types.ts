export interface City {
  fullName: string;
  geoNameId: string;
  location: {
    geohash: string;
    latlon: {
      latitude: number;
      longitude: number;
    };
  };
  population: number;
  urbanArea: {
    href: string;
    name: string;
  };
}

export interface CityUAUrls {
  cityImagesUrl: string;
  citySalariesUrl: string;
  cityQoLScoresUrl: string;
}

export interface CityQoL {
  categories: { color: string; name: string; score_out_of_10: number }[];
  summary: string;
  teleport_city_score: number;
}
