import router from 'router';
import store from 'store';
import Service from 'core/service';
import * as TYPES from './types';
import * as CONSTANTS from 'core/constant';
import _ from 'lodash';

export const authSuccess = ({ commit }, token) => {
    commit(TYPES.AUTH_SUCCESS, { token });
};

export const setExpires = ({ commit }) => {
    const expires_at = parseInt(localStorage.getItem(CONSTANTS.EXPIRES_AT) || Date.now());
    const expires_in = parseInt(localStorage.getItem(CONSTANTS.EXPIRES_IN) || 3600);
    if (!expires_at || !expires_in) {
        return router.push('/login');
    }
    commit(TYPES.SET_EXPIRES, { expires_in, expires_at });
    const expired = store.getters['login/expired'];
    if (expired) {
        logout({ commit });
    }
}

export const logout = ({ commit }) => {
    return new Promise(resolve => {
        commit(TYPES.AUTH_LOGOUT);
        localStorage.clear();
        Service.removeToken();
        // router.go(-1);
        resolve()
    });
}

export const login = async ({ commit }, payload) => {
    let resp = await Service.post('/auth/sign-in', payload);
    console.log(resp);
    if (resp != null && resp.success) {      
            let expired_minutes = resp.data.expires_in;
            let expired_seconds = expired_minutes * 60;

            localStorage.setItem(CONSTANTS.ACCESS_TOKEN_KEY, resp.data.token);
            // localStorage.setItem(CONSTANTS.EXPIRES_AT, Date.now());
            // localStorage.setItem(CONSTANTS.EXPIRES_IN, expired_seconds);
            localStorage.setItem(CONSTANTS.USER, JSON.stringify(resp.data.user_info));
            Service.setToken(resp.data.token);

            commit(TYPES.SET_USER, resp.data.user_info); // commit gán/ thay đổi giá trị trong mutations;
            commit(TYPES.USER_ROLE, resp.data.role);
            authSuccess({ commit }, resp.data.token);
            // setExpires({ commit });

            router.push('/');
    } else {
        localStorage.clear();
        Service.removeToken();
        commit(TYPES.AUTH_ERROR, false);
        commit(
            TYPES.SET_MESSAGE,
            resp == null ? 'Can not connect to server. Please check your network!' : resp.message
        );
    }
};

