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
    case "SUBMIT_USER_AUTH_EVENT":
      return {
        ...state,
        UserAuthData: action.payload
      };
    case "SUBMIT_GET_ME_EVENT":
        return {
          ...state,
          GetMeData: action.payload
        };
    case "SUBMIT_LOGOUT_EVENT":
        if(action.payload.isLoggedIn === false) {
          return {
            ...state,
            GetMeData: null,
            UserAuthData: null,
          };
        }
    default:
    return state;
  }
};
