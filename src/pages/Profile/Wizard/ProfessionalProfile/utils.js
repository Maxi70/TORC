import { ReactComponent as FullTime } from "images/imagery/guy-headphones-blue.svg";
import { ReactComponent as PartTime } from "images/imagery/community-woman-man-fist-bump.svg";

export function formatLocation(location) {
  return {
    locationId: location.id,
    cityName: location.name,
    stateId: location.state_id,
    stateCode: location.state_code,
    stateName: location.state_name,
    countryId: location.countryId,
    countryCode: location.country_code,
    countryName: location.country_name,
    latitude: location.latitude,
    longitude: location.longitude,
    wikiDataId: location.wikiDataId,
  };
}

export function unformatLocation(location) {
  return {
    id: location.locationId,
    name: location.cityName,
    state_id: location.stateId,
    state_code: location.stateCode,
    state_name: location.stateName,
    country_id: location.countryId,
    country_code: location.countryCode,
    country_name: location.countryName,
    latitude: location.latitude,
    longitude: location.longitude,
    wikiDataId: location.wikiDataId,
  };
}

export const PROJECT_STYLES = [
  {
    id: "FULLTIME",
    title: "Full-time jobs",
    logo: <FullTime />,
  },
  {
    id: "PARTTIME",
    title: "Part-time jobs",
    logo: <PartTime />,
  },
];
