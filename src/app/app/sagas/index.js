import { takeEvery, put, call, all } from 'redux-saga/effects';
import API from '../apis';
import LocalStorageService from "../../lib/localStorageService";
const localStorageService = LocalStorageService.getService();

function* submitUserAuth(action) {
    const { email, password } = action.payload;
    let payload = {}
    try {
        payload = yield call(API.postAccountToken, email, password);
        localStorageService.setToken(payload.data);
        payload.isLoggedIn = true;
    } catch (error) {
        payload = { error };
    }

    return yield put(
        {
            type: 'SUBMIT_USER_AUTH_SUCCESS',
            payload
        },
    );
}

function* submitLogout() {
    let payload = { isLoggedIn: false }
    try {
        (yield call(API.logout));
    } catch (error) {
        payload = { error };
    }

    return yield put(
        {
            type: 'SUBMIT_LOGOUT_SUCCESS',
            payload
        },
    );
}

function* submitGetMe() {
    let payload = {}
    try {
        payload = (yield call(API.getMe)).data;
    } catch (error) {
        payload = { error };
    }

    return yield put(
        {
            type: 'SUBMIT_GET_ME_SUCCESS',
            payload
        },
    );
}

function* submitGetUserLayers() {
    let payload = {}
    try {
        payload = (yield call(API.getUserLayers)).data;
    } catch (error) {
        payload = { error };
    }

    return yield put(
        {
            type: 'SUBMIT_GET_USER_LAYERS_SUCCESS',
            payload
        },
    );
}

function* actionWatcher() {
    yield takeEvery('SUBMIT_USER_AUTH_EVENT', submitUserAuth)
    yield takeEvery('SUBMIT_GET_ME_EVENT', submitGetMe)
    yield takeEvery('SUBMIT_LOGOUT_EVENT', submitLogout)
    yield takeEvery('GET_USER_LAYERS_EVENT', submitGetUserLayers)
}

export default function* rootSaga() {
    yield all([
        actionWatcher(),
    ]);
}
