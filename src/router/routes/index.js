import _ from 'lodash';

const DEFAULT_ROUTES = [
    {
        path: '*',
        meta: {
            title: 'Not Found'
        },
        redirect: {
            path: '/404'
        }
    },
    {
        path: '/oauth2/redirect',
        meta: {
            title: 'Redirect'
        },
        name: 'Redirect',
        // component: () => import('modules/oauth2redirect')
    },
    {
        path: '/401',
        meta: {
            code: 401,
            title: 'Unauthorized'
        },
        name: 'Unauthorized',
        component: () => import('modules/pages/error-page')
    },
    {
        path: '/403',
        meta: {
            title: 'Access Denied'
        },
        name: 'AccessDenied',
        component: () => import('modules/pages/error-page')
    },
    {
        path: '/404',
        meta: {
            title: 'Not Found'
        },
        name: 'NotFound',
        component: () => import('modules/pages/error-page')
    },
    {
        path: '/500',
        meta: {
            title: 'Internal Error Server'
        },
        name: 'ServerError',
        component: () => import('modules/pages/error-page')
    },
    {
        path: '/',
        redirect: {
            path: '/dashboard'
        }
    },
    {
        path: '/dashboard',
        meta: {
            title: 'Trang chủ',
            requiresAuth: true,
        },
        name: 'Dashboard',
        component: () => import('modules/dashboard')
    },
    {
        path: '/login',
        meta: {
            title: 'Đăng nhập'
        },
        name: 'Login',
        component: () => import('modules/login')
    },
    {
        path: '/register',
        meta: {
            title: 'Đăng ký'
        },
        name: 'Register',
        component: () => import('modules/register')
    },

    {
        path: '/pd',
        meta: {
          group: 'products',
          title: 'Sản Phẩm'
        },
        name: 'ProductsMater',
        redirect: {
          path: '/pd/products'
        }
      },
      {
        path: '/pd/products',
        meta: {
          requiresAuth: true,
          group: 'products',
          title: 'Danh sách sản phẩm'
        },
        name: 'Products',
        component: () => import('modules/products')
      },
];

const routes = [...DEFAULT_ROUTES];

export default routes;