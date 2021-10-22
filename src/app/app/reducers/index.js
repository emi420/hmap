export default (state, action) => {
  
  switch (action.type) {
    case "GET_LATEST_MODIS_24_SUCCESS":
      return {
        ...state,
        FIRMSLatestModis24Data: action.payload.data
      };
    case "GET_LATEST_VIIRS_24_SUCCESS":
      return {
        ...state,
        FIRMSLatestViirs24Data: action.payload.data
      };
    case "GET_LATEST_GOES_SUCCESS":
      return {
        ...state,
        GoesLatestData: action.payload.data
      };
    case "SUBMIT_USER_AUTH_SUCCESS":
      return {
        ...state,
        UserAuthData: action.payload
      };
    case "SUBMIT_GET_ME_SUCCESS":
        return {
          ...state,
          GetMeData: action.payload
        };
    case "SUBMIT_LOGOUT_SUCCESS":
        if(action.payload.isLoggedIn === false) {
          return {
            ...state,
            GetMeData: null,
            UserAuthData: null,
          };
        }
    case "SUBMIT_GET_USER_LAYERS_SUCCESS":
      return {
        ...state,
        UserLayersData: action.payload
      };
    default:
    return state;
  }
};
