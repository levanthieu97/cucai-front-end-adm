import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import global from './global';
import login from 'modules/login/store';
import dashboard from 'modules/dashboard/store';
import CUCAI_STORES from './cucai-store';
import Products from 'modules/products/store';
import Auth from 'modules/oauth2redirect/store';
import register from 'modules/register/store';
Vue.use(Vuex);

export default new Vuex.Store({
    modules: { 
        global,
        login,
        register,
        dashboard,
        Products,
        Auth
     },
    strict: process.env.NODE_ENV !== 'production'
});
