import * as CONSTANT from './types';
import * as getters from './getters';
import * as actions from './actions';

const DEFAULT_SNACKBAR = {
    show: false,
    color: '',
    text: '',
    date: new Date().getTime()
};  

const state = {
    drawerToggled: true,
    loading_app: false,
    loading_feature: false,
    notifications:[],

    loading: false,
    snackbar : { ...DEFAULT_SNACKBAR }
};

const MSG_TYPE_COLORS = {
    error: 'red',
    success: 'green',
    warning: 'orange'
};

const showMsg  = (state, {type, message }) => {
    state.snackbar = {
        show: true,
        text: message,
        color: MSG_TYPE_COLORS[type],
    }
}

const mutations = {
    [CONSTANT.TOGGLE_APP_DRAWER](state,flag){
        state.drawerToggled = flag;
    },

    [CONSTANT.SET_LOADING](state,flag){
        state.loading = flag;
    },

    [CONSTANT.SHOW_SUCCESS_MSG](state, message){
        showMsg(state, {type: 'success', message});
    },

    [CONSTANT.SHOW_WARNING_MSG](state,message){
        showMsg(state, {type: 'warning', message});
    },

    [CONSTANT.SHOW_ERROR_MSG](state,message){
        showMsg(state, {type: 'error', message});
    },

    [CONSTANT.RESET_SNACKBAR](state){
        state.snackbar = { ...DEFAULT_SNACKBAR };
    }
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
};