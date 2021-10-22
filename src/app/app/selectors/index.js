import { createSelector } from 'reselect';
import { CSVToGeoJSON } from '../utils';

export const getFIRMSLatestModis24 = state => state ? state.FIRMSLatestModis24Data : {};
export const getFIRMSLatestViirs24 = state => state ? state.FIRMSLatestViirs24Data : {};
export const getLatestGoes = state => state ? state.GoesLatestData : {};
export const getUserAuthDataFromState = state => state ? state.UserAuthData : {};
export const getGetMeDataFromState = state => state ? state.GetMeData : {};
export const getUserLayers = state => state ? state.UserLayersData : [];

export const getFIRMSLatestModis24GeoJSON = createSelector(
    [getFIRMSLatestModis24],
    (CSVString) => ( CSVToGeoJSON(CSVString) )
)

export const getFIRMSLatestViirs24GeoJSON = createSelector(
    [getFIRMSLatestViirs24],
    (CSVString) => ( CSVToGeoJSON(CSVString) )
)

export const getLatestGoesGeoJSON = createSelector(
    [getLatestGoes],
    result => result || {features: []}
)

export const getUserAuthData = createSelector(
    [getUserAuthDataFromState],
    result => result || {}
)

export const getMeData = createSelector(
    [getGetMeDataFromState],
    result => result || {}
)

export const getUserLayersData = createSelector(
    [getUserLayers],
    result => result || []
)

