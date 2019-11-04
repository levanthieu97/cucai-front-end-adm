import Vue from 'vue';
import Router from 'vue-router';
import store from 'store';
import routes from './routes';
import NProgress from 'nprogress';
import _ from 'lodash';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  linkActiveClass: 'open active',
  routes
});

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title || 'TP Shop';
  NProgress.start();
  store.dispatch('global/setLoading', false);

  let isLoginPage = to.matched.some(p => p.path.indexOf('/login') === 0);
  let isDashboard = to.matched.some(p => p.path.indexOf('/dashboard') === 0);
  try {
    let token = store.getters['login/token'];
    let isAuthenticated = store.getters['login/isAuthenticated'];
    let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    console.log(requiresAuth);
    console.log(isAuthenticated);
    console.log(token);
    if (!requiresAuth) {
      if (isLoginPage && isAuthenticated) return next('/');
      return next();
    }

    if (!isLoginPage && !requiresAuth) {
      console.log("sadsa");
      return next('/login');
    }

    if (requiresAuth && !isAuthenticated) {
      if (isLoginPage) return next();
      return next('/login');
    } else next();
  } catch (err) {
    if (isLoginPage) return next();
    next('login');
  }
});

/*
  `to` and `from` are both route objects
  A route object represents the state of the current active route.
  It contains parsed information of the current URL and the route records matched by the URL.
  ### https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards

*/
// router.beforeEach(async (to, from, next) => {
//   document.title = to.meta.title || 'Củ Cải Store';
//   NProgress.start();

//   let isLoginPage = to.path.indexOf('/login') === 0;
//   let token = store.getters['login/getAccessToken']; // store -> modules/login/store/getters
//   // console.log(token);

//   let redirectTo = null;
//   if (Checker.hasText(token)) {
//     if (isLoginPage) redirectTo = '/';
//   } else {
//     if (Checker.isTrue(to.meta.requireAuth)) { // routes = true -> do something
//       // console.log(to.meta.requireAuth);
//       redirectTo = '/login';
//       store.dispatch('login/logout');
//     }
//   }
//   Checker.hasText(redirectTo) ? next(redirectTo) : next();
// });

// router.beforeEach( async(to, from, next) => {
//   const requiresAuth = to.matched.some( record => record.meta.requireAuth);
//   const isLoginPage = to.matched.some( p => p.path.indexOf('/login') === 0);
//   let checkBase = _.findIndex(DEFAULT_ROUTES,function(o){
//     return o.name == to.name
//   })
// });

router.afterEach(() => {
  NProgress.done();
});

export default router;