import * as getters from './getters';
import * as actions from './actions';
import Menu from './menus';
import {} from './types';

const state = {
    menu: Menu
};

const mutations = {};

export default {
    namespaced : true,
    state,
    mutations,
    getters,
    actions
};