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
      default:
      return state;
  }
};
