import * as actionTypes from "./actionTypes";

function formatLocation(location) {
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

function infoReducer(state, action) {
  switch (action.type) {
    case actionTypes.LOCATION_UPDATED:
      return {
        ...state,
        locale: action.value,
      };
    case actionTypes.ROLE_UPDATED:
      return {
        ...state,
        jobRole: action.value,
      };
    case actionTypes.TAGLINE_UPDATED:
      return {
        ...state,
        tagline: action.value,
      };
    case actionTypes.BIO_UPDATED:
      return {
        ...state,
        bio: action.value,
      };
    case actionTypes.SOCIAL_PROFILE_UPDATED:
      const exists = state.socialLinks.some((s) => s.type === action.key);
      return {
        ...state,
        socialLinks: exists
          ? state.socialLinks.map((s) => {
              if (s.type === action.key) {
                return {
                  type: action.key,
                  value: action.value,
                };
              }

              return s;
            })
          : [...state.socialLinks, { type: action.key, value: action.value }],
      };
    case actionTypes.EXISTING_DATA_FETCHED:
      return {
        locale: action.user.locale || state.locale,
        jobRole: action.user.jobRole || state.jobRole,
        tagline: action.user.tagline || state.tagline,
        bio: action.user.bio || state.bio,
        socialLinks: action.user.socialLinks || state.socialLinks,
        location: action.user.location
          ? formatLocation(action.user.location)
          : state.location,
      };
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export default infoReducer;
