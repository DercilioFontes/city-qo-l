import { NamedTupleMember } from "typescript";

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
