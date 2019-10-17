import _ from 'lodash';

const DEFAULT_ROUTES = [
    {
        path: '*',
        meta: {
            title: 'Not Found'
        },
        redirect:{
            path:'/404'
        }
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
            code: 403,
            title: 'Access Denied'
        },
        name: 'AccessDenied',
        component: () => import('modules/pages/error-page')
    },
    {
        path: '/404',
        meta: {
            code: 404,
            title: 'Not Found'
        },
        name: 'NotFound',
        component: () => import('modules/pages/error-page')
    },
    {
        path: '/500',
        meta:{
            code: 500,
            title: 'Internal Error Server'
        },
        name: 'ServerError',
        component: () => import('modules/pages/error-page')
    },
    {
        path:'/',
        redirect: {
            path:'/dashboard'
        }
    },
    {
        path:'/dashboard',
        meta:{
            title: 'Củ Cải Store',
            requireAuth: true
        },
        name: 'DashBoard',
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
    }
];

export default [...DEFAULT_ROUTES]