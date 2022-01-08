import { createSelector } from 'reselect';
import LayerType from '../../models/layerType';

const DEFAULT_VISIBLE_LAYERS = LayerType.all();

const getUserAuthDataFromState = state => state ? state.UserAuthData : {};
const getGetMeDataFromState = state => state ? state.GetMeData : {};
const getUserLayers = state => state ? state.UserLayersData : [];
const getVisibleLayerTypes = state => state ? state.VisibleLayerTypes : DEFAULT_VISIBLE_LAYERS;

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

export const getVisibleLayerTypesData = createSelector(
    [getVisibleLayerTypes],
    result => result || new Set()
)

