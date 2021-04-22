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
  isFavorite: boolean;
}

export interface CityUAUrls {
  cityImagesUrl: string;
  citySalariesUrl: string;
  cityQoLScoresUrl: string;
}

interface Photo {
  attribution: {
    license: string;
    photographer: string;
    site: string;
    source: StorageManager;
  };
  image: {
    mobile: string;
    web: string;
  };
}

interface Salary {
  job: {
    id: string;
    title: string;
  };
  salary_percentiles: {
    percentile_25: number;
    percentile_50: number;
    percentile_75: number;
  };
}

export interface CityQoL {
  categories: { color: string; name: string; score_out_of_10: number }[];
  summary: string;
  teleport_city_score: number;
  photos: Photo[];
  salaries: Salary[];
}
