import * as TYPES from './types';
import * as actions from './actions';
import * as getters from './getters';

const state = {
    signal = false,
    register_success = false,
    register_message = ''
}

const mutations = {
    [TYPES.REGISTER_MESSAGE](state,register_message){
        state.register_message = register_message;
        state.signal = !state.signal;
    },

    [TYPES.REGISTER_SUCCESS](state, res){
        state.register_success = res;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    mutations,
    actions
}