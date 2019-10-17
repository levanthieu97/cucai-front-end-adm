import Vue from 'vue';
import Vuex from 'vuex';
import _ from 'lodash';
import global from './global';

Vue.use(Vuex);
const STORE_MODULE = '/store/index.js';
const requireModule = require.context('modules',true,/\.js$/);
const modules = {
    global
};

requireModule.keys().forEach( filename => {
    if(!_.endsWith(filename, STORE_MODULE)) return;

    let folderPath = _.replace(filename, STORE_MODULE, '');
    if(folderPath == '') return;

    let moduleName = _.camelCase(
        _.replace(_.last(_.split(folderPath, '/')), '/','')
    );
    modules[moduleName] = requireModule(filename).default || requireModule(filename);
});

export default new Vuex.Store({
    modules,
    strict: process.env.NODE_ENV !== 'production'
});
