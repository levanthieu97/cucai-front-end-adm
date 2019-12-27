import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import axios from 'axios';

import App from './App';
import router from './router';
import store from './store';
import Filters from 'core/filters';
import { ACCESS_TOKEN_KEY, AUTH_HEADER_KEY } from 'core/constant';

import 'core/mixins';
import './components/commons';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import {Checker, Alert, Notify } from 'utilities';

Vue.use(Filters);
Vue.use(Vuetify);
const theme = {
  theme: {
    dark: false,
    themes: {
      light: {
        primary: '#00695c',
        secondary: '#424242',
        accent: '#a1a1a1',

        error: '#c9302c',
        info: '#888888',
        success: '#00695c',
        warning: '#ec971f'
      },
      dark: {
        primary: '#2196F3'
      },
    },
  },
  options: {
    customProperties: true,
  },
  icons: {
    iconfont: 'md', // default is 'mdi'
  },
}

axios.defaults.headers.post['Content-Type'] = 'application/json';
const token = localStorage.getItem(ACCESS_TOKEN_KEY);
if(token){
  axios.defaults.headers.common[AUTH_HEADER_KEY] = `${token}`;
}
// store.dispatch('login/setExpires');

Vue.config.productionTip = false;

Vue.prototype.$checker = Checker;
Vue.prototype.$message = Notify;
Vue.prototype.$alert = Alert;




new Vue({
  router,
  store,
  vuetify: new Vuetify(theme),
  render: h => h(App)
}).$mount('#app')
