/*******
 * Global Notification 
*******/
import {
    TOGGLE_APP_DRAWER,
    SET_LOADING,
    SHOW_SUCCESS_MSG,
    SHOW_ERROR_MSG,
    SHOW_WARNING_MSG,
    RESET_SNACKBAR
} from './types';
import _ from 'lodash';
import store from 'store';

export const toggleDrawer = ({ commit }, flag) => {
    if(_.isBoolean(flag)){
        commit(TOGGLE_APP_DRAWER,flag);
    }else{
        let status = store.getters['global/drawerToggled'];
        commit(TOGGLE_APP_DRAWER,!status);
    }
}

export const setLoading = ({ commit } , flag = true) => {
    commit(SET_LOADING, flag);
}
export const resetMsg = ({ commit }) => commit(RESET_SNACKBAR);

export const showSuccessMsg = ({commit}, msg) => {
    commit(SHOW_SUCCESS_MSG,msg);
};

export const showWarningMsg = ({commit}, msg) => {
    commit(SHOW_WARNING_MSG,msg);
}

export const showErrorMsg = ({commit}, msg) => {
    commit(SHOW_ERROR_MSG,msg);
}