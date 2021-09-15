import { takeEvery, takeLeading, put, call, all } from 'redux-saga/effects';
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

function* submitUserAuth(action) {
    const { email, password } = action.payload;
    let payload = {}
    try {
        (yield call(API.postAccountToken, email, password));
        payload.isLoggedIn = true;
    } catch(error) {
        payload = { error };
    }

    return yield put(
        {
            type: 'SUBMIT_USER_AUTH_EVENT',
            payload
        },
    );
}

function* submitLogout() {
    let payload = {isLoggedIn:false}
    try {
        (yield call(API.logout));
    } catch(error) {
        payload = { error };
    }

    return yield put(
        {
            type: 'SUBMIT_LOGOUT_EVENT',
            payload
        },
    );
}

function* submitGetMe() {
    let payload = {}
    try {
        payload = (yield call(API.getMe)).data;
    } catch(error) {
        payload = { error };
    }

    return yield put(
        {
            type: 'SUBMIT_GET_ME_EVENT',
            payload
        },
    );
}

function* actionWatcher() {
    yield takeEvery('GET_LATEST_MODIS_24_EVENT', getLatestModis24)
    yield takeEvery('GET_LATEST_VIIRS_24_EVENT', getLatestViirs24)
    yield takeEvery('GET_LATEST_GOES_EVENT', getLatestGoes)
    yield takeLeading('SUBMIT_USER_AUTH_EVENT', submitUserAuth)
    yield takeLeading('SUBMIT_GET_ME_EVENT', submitGetMe)
    yield takeLeading('SUBMIT_LOGOUT_EVENT', submitLogout)
}

export default function* rootSaga() {
    yield all([
        actionWatcher(),
    ]);
 }
