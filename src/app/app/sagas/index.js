import { takeEvery, put, call, all } from 'redux-saga/effects';
import API from '../apis';

function* getLatestModis24() {
    try {
        const latestPoints = (yield call(API.getLatestModis24));
        return yield put(
            {
                type: 'GET_LATEST_MODIS_24_SUCCESS',
                payload: latestPoints,
            },
        );
    } catch(e) {
        console.error('[SAGA ERROR]', e);
    }
}

function* getLatestViirs24() {
    try {
        const latestPoints = (yield call(API.getLatestViirs24));
        return yield put(
            {
                type: 'GET_LATEST_VIIRS_24_SUCCESS',
                payload: latestPoints,
            },
        );
    } catch(e) {
        console.error('[SAGA ERROR]', e);
    }
}

function* getLatestGoes() {
    try {
        const latestPoints = (yield call(API.getLatestGoes));
        return yield put(
            {
                type: 'GET_LATEST_GOES_SUCCESS',
                payload: latestPoints,
            },
        );
    } catch(e) {
        console.error('[SAGA ERROR]', e);
    }
}

function* actionWatcher() {
    yield takeEvery('GET_LATEST_MODIS_24_EVENT', getLatestModis24)
    yield takeEvery('GET_LATEST_VIIRS_24_EVENT', getLatestViirs24)
    yield takeEvery('GET_LATEST_GOES_EVENT', getLatestGoes)}

export default function* rootSaga() {
    yield all([
        actionWatcher(),
    ]);
 }
