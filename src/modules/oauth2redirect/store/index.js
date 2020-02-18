import * as actions from './actions';
import * as getters from './getters';
import { LOAD_PROFILE_SUCCESS, LOAD_PROFILE_FAILURE } from './types';

const state = {
    profile: null,
    errorMessage: null
};

const mutations = {
    [LOAD_PROFILE_SUCCESS](state, profile){
        state.profile = profile;
    },

    [LOAD_PROFILE_FAILURE](state, message){
        state.profile = null;
        state.errorMessage = message;
    }
};

export default {
    namespaced: true,
    state,
    actions,
    getters,
    mutations
}