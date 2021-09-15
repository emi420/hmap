
export const FIRMSLatestModis24Action = {
  type: "GET_LATEST_MODIS_24_EVENT",
  payload: {}
};

export const FIRMSLatestViirs24Action = {
  type: "GET_LATEST_VIIRS_24_EVENT",
  payload: {}
};

export const GoesLatestAction = {
  type: "GET_LATEST_GOES_EVENT",
  payload: {}
};

export const SubmitUserAuthAction = (email, password) => ({
  type: "SUBMIT_USER_AUTH_EVENT",
  payload: {email, password}
});

export const GetMeAction = {
  type: "SUBMIT_GET_ME_EVENT",
  payload: {}
};

export const LogOutAction = {
  type: "SUBMIT_LOGOUT_EVENT",
  payload: {}
};
