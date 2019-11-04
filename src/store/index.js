import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import global from './global';
import login from 'modules/login/store';
import dashboard from 'modules/dashboard/store';
import CUCAI_STORES from './cucai-store';

Vue.use(Vuex);

const DEFAULT_STORES = {
    global,
    login,
    dashboard
}

const modules = _.cloneDeep(DEFAULT_STORES);
_.assign(modules,CUCAI_STORES);

export default new Vuex.Store({
    modules,
    strict: process.env.NODE_ENV !== 'production'
});
