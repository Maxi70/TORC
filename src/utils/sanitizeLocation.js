// Remove null values from location object return string to be rendered based on locationKeyNames
export const sanitizeLocation = (locationObj) => {
  const locationKeyNames = ["countryName", "stateName", "cityName"];
  const cleanLocation = [];

  for (const keyName of locationKeyNames) {
    if (locationObj[keyName]) {
      cleanLocation.push(locationObj[keyName]);
    }
  }

  return cleanLocation.join(", ");
};
