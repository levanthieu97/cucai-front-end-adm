import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import Vuetify from 'vuetify/lib';

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

Vue.config.productionTip = false;


new Vue({
  router,
  store,
  vuetify: new Vuetify(theme),
  render: h => h(App)
}).$mount('#app')
