import Vue from 'vue';
import Router from 'vue-router';
import store from 'store';
import routes from './routes';
import NProgress from 'nprogress';
import _ from 'lodash';
import Service from 'core/service';
import * as CONSTANTS from 'core/constant';


Vue.use(Router);

const router = new Router({
  mode: 'history',
  linkActiveClass: 'open active',
  routes
});

router.beforeEach(async (to, from, next) => {
  let isPathSocial = to.matched.some(p => p.path.indexOf('/oauth2/redirect') === 0);
  let { query: { token, error } } = to;
  if (isPathSocial) {
    console.log("****************88");
    localStorage.setItem(CONSTANTS.ACCESS_TOKEN_KEY, token);
    Service.setToken(token);
    await store.dispatch('Auth/loadProfile');
    return next('/');
  }
  next();
})

router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title || 'Củ Cải Shop';
  NProgress.start();
  // store.dispatch('global/setLoading', false);

  let isLoginPage = to.matched.some(p => p.path.indexOf('/login') === 0);
  let isRegisTer = to.matched.some(p => p.path.indexOf('/register') === 0);
  let isDashboard = to.matched.some(p => p.path.indexOf('/dashboard') === 0);

  try {
    let isAuthenticated = store.getters['login/isAuthenticated'];
    let isAuthSocial = store.getters['Auth/checkAuthSocial'];
    let requiresAuth = to.matched.some(record => record.meta.requiresAuth);


    if(isDashboard && isAuthSocial){
      return next();
    }

    console.log(isAuthSocial);
    if (!requiresAuth) {
      if ( isLoginPage && isAuthenticated ){ 
        return next('/');
      }
      return next();
    }

    // if(isAuthenticatedSocial != null){
    //   return next('/')
    // }

    if (isRegisTer && !requiresAuth) {
      return next('/login');
    }



  

    // if(isAuthenticated || isAuthenticatedSocial){
    //   console.log("zzzzzzzzzzzzzzzzzz")
    //   return next('/');
    // }
   if ( requiresAuth && !isAuthenticated) {
      if (isLoginPage) return next();
      return next('login');
    }
  } catch (err) {
    if (isLoginPage) return next();
    next('login');
  }
  next();
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