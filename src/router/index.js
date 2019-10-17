import Vue from 'vue';
import Router from 'vue-router';
import store from 'store';
import routes from './routes';
import NProgress from 'nprogress';


Vue.use(Router);

const router  = new Router({
    mode: 'history',
    linkActiveClass: 'open active',
    routes
});

router.beforeEach(async (to, from, next) => {
    document.title = to.meta.title || 'Drivy';
    NProgress.start();
    store.dispatch('global/setLoading', false);
  
    //   let isRegisTer = to.matched.some(p => p.path.indexOf('/register') === 0);
  
    try {
      // let role = store.getters['login/role'];
      // if (!requiresAuth) {
      //   if (isAuthenticated) return next('/');
      //   return next();
      // }
      // if (isRegisTer && !requiresAuth) {
      //   return next('/');
      // }
      // if (requiresAuth && !isAuthenticated) {
      //   if (isLoginPage) return next();
      //   return next('/');
      // } else next('/');
    } catch (err) {}
  });

router.afterEach(() => {
    NProgress.done();   
});

export * from './routes';
export default router;