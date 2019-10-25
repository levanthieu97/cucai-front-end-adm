import Vue from 'vue';
import Vuetify from 'vuetify/lib';
import VeeValidate from 'vee-validate';

import App from './App';
import router from './router';
import store from './store';
import Filters from 'core/filters';
import 'core/mixins';
import './components/commons';
import 'material-design-icons-iconfont/dist/fonts/material-design-icons.css';
import {Checker, DateFormat, Alert, Notify } from 'utilities';

Vue.use(Filters);
Vue.use(Vuetify);
Vue.use(VeeValidate, { fieldsBagName: 'formFields'})

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

Vue.config.productionTip = false;

Vue.prototype.$checker = Checker;
Vue.prototype.$notify = Notify;
Vue.prototype.$alert = Alert;


new Vue({
  router,
  store,
  vuetify: new Vuetify(theme),
  render: h => h(App)
}).$mount('#app')
