import {
    SET_USER,
    AUTH_SUCCESS,
    AUTH_ERROR,
    AUTH_LOGOUT,
    SET_EXPIRES,
    SET_MESSAGE,
    USER_ROLE
} from './types';

import * as actions from './actions';
import * as getters from './getters';
import Menu from 'modules/dashboard/store/menus';
import { ACCESS_TOKEN_KEY, USER, ROLE } from 'core/constant';

const state = {
    user: JSON.parse(localStorage.getItem(USER)),
    token: localStorage.getItem(ACCESS_TOKEN_KEY),
    hasLoadedOnce: true,
    expired_at: Date.now(),
    expired_in: 3600,
    message: '',
    menus: Menu,
    role: JSON.parse(localStorage.getItem(ROLE)),
}


const mutations = {

    // we can use the ES2015 computed property name feature
    // to use a constant as the function name. Exam SET_USER as the function name
    [SET_USER](state, user) {
        state.user = user;
    },

    [AUTH_SUCCESS](state, resp) {
        state.token = resp.token;
        state.hasLoadedOnce = true;
    },

    [AUTH_ERROR](state, resp) {
        state.hasLoadedOnce = resp;
    },

    [AUTH_LOGOUT](state) {
        state.token = '';
    },

    [SET_EXPIRES](state, { expires_in, expires_at }) {
        state.expires_in = expires_in;
        state.expires_at = expires_at;
    },

    [SET_MESSAGE](state, message) {
        state.message = message;
    },

    [USER_ROLE](state, role) {
        state.role = role;
    },

};

export default {
    namespaced: true,
    state,
    mutations,
    getters,
    actions
};