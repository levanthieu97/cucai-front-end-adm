import _ from 'lodash';
import { ACCESS_TOKEN_KEY } from './constant';


// Set method
export const REQUEST_METHOD = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'
};

export class APIMethods {
    constructor(axios) {
        if (!_.isObject(axios) && _.isEmpty(axios)) {
            throw 'Please provide correct AXIOS instance.';
        }
        this.axiosInstance = axios;
    }

    setAccessToken(token) {
        // Read and Authorization User token 
        if (_.isString(token) && _.trim(token) != '') {
            this.axiosInstance.defaults.headers.common[ACCESS_TOKEN_KEY] = `${token}`;
        } else {
            _.omit(this.axiosInstance.defaults.headers.common, ACCESS_TOKEN_KEY);
        }
    }

    setInterceptors(request = {}, response = {}) {
        requestInterceptor(this.axiosInstance, {
            ...request,
            ...{ type: 'request' }
        });
        requestInterceptor(this.axiosInstance, {
            ...response,
            ...{ type: 'response' }
        });
    }

    async get(url, requestParam = {}, headers = {}) {
        if (!_.isString(url)) throw 'String value of URL must correct';
        return await sendRequest(
            this.axiosInstance,
            url,
            REQUEST_METHOD.GET,
            headers,
            requestParam,
            {}
        );
    }

    async post(url, requestBody = {}, headers = {}) {
        if (!_.isString(url)) throw 'String value of URL must correct';
        return await sendRequest(
            this.axiosInstance,
            url,
            REQUEST_METHOD.POST,
            headers,
            {},
            requestBody
        );
    }

    async put(url, requestBody = {}, headers = {}) {
        if (!_.isString(url)) throw 'String value of URL must correct';
        return await sendRequest(
            this.axiosInstance,
            url,
            REQUEST_METHOD.PUT,
            headers,
            {},
            requestBody,
        );
    }

    async delete(url, requestParam = {}, headers = {}) {
        if (!_.isString(url)) throw 'String value of URL must correct';
        return await sendRequest(
            this.axiosInstance,
            url,
            REQUEST_METHOD.DELETE,
            headers,
            requestParam,
            {}
        )
    }

    async upload(url, requestBody = {}, headers = {}) {
        if (!_.isString(url)) throw 'String value of URL must correct';
        headers['Content-Type'] = 'multipart/form-data';
        return await sendRequest(
            this.axiosInstance,
            url,
            REQUEST_METHOD.POST,
            headers,
            {},
            requestBody
        );
    }

    async request(
        url,
        method,
        headers = {},
        requestParam = {},
        requestBody = {}
    ) {
        if (!_.includes(_.keys(REQUEST_METHOD), method) || !_.isString(url)) {
            throw 'HTTP Client only support [GET, POST, PUT, DELETE]';
        }
        return await sendRequest(
            this.axiosInstance,
            url,
            method,
            headers,
            requestParam,
            requestBody
        );
    }
}

const REQ_BODY = [REQUEST_METHOD.POST, REQUEST_METHOD.PUT];

const sendRequest = async (
    axios,
    url,
    method,
    headers = {},
    requestParam,
    requestBody
) => {
    let params = {};
    if (!_.isEmpty(requestParam)) {
        params = new URLSearchParams(requestParam)
        /*
        Example:
            let url = new URL('https://example.com?foo=1&bar=2');
            let params = new URLSearchParams(url.search.slice(1));
            -> params: foo=1&bar=2;

            * URLSearchParams.append(name, value) 
            -> ex: params.append('cat',4) -> params: 'foo=1&bar=2&cat=4'

            * URLSearchParams.delete(name)
            -> ex: params.delete(foo) -> params: 'bar=2'

            * params.forEach(function(value,key)){}

            * URLSearchParams.get(name)
            -> ex: params.get(foo) -> 1

            * URLSearchParams.getAll(name)
            -> ex: params: 'foo=1&bar=2&cat=4&foo=4'
            -> params.getAll(foo) -> ['1','4']

            * let hasName = URLSearchParams.has(name) -> hasName (Boolean)

            * URLSearchParams.set(name,value)
            -> ex: params.set('cat',3) -> params: foo=1&bar=2&cat=3;

            * URLSearchParams.sort() -> return undefined

            * URLSearchParams.toString() 
        */
    }

    let data = {};
    if (_.includes(REQ_BODY, method)) {
        data = requestBody;
    }

    let transformRequest = [
        data => {
            if (_.isString(data) || isFormData(data)) {
                return data;
            } else if (_.isObject(data)) {
                return JSON.stringify(data);
            }
            throw 'Request body must belong with [String, Object]';
        }
    ]

    let transformResponse = [
        response => {
            return response;
        }
    ];

    let opts = {
        method,
        params,
        headers: {
            ...axios.defaults.headers.common,
            ...axios.defaults.headers[method],
            ...headers
        },
        data: data || {},
        transformRequest,
        transformResponse
    };

    return readRestResponse(await axios.request(url, opts));
};

const toObject = urlParams => {
    // instanceof test prototype
    if (urlParams instanceof URLSearchParams) {
        let result = {};
        for (let pair of urlParams.entries()) {
            result[pair[0]] = pair[1];
        }
    }
    return {};
}

requestInterceptor = (axios, interceptor) => {
    let successHandler = interceptor[interceptor.type];
    if (!_.isFunction(successHandler)) successHandler = success => success;

    var failHandler = interceptor.error;
    if (!_.isFunction(failHandler)) failHandler = error => error;

    axios.interceptors[interceptor.type].use(successHandler, failHandler);
};

const isFormData = val => {
    return typeof FormData !== 'undefined' && val instanceof FormData;
};

const readRestResponse = resp => {
    if (_.isNil(resp) || !_.isNumber(resp.status))
        /* 
            _.isNil : check if value is null or undefined (boolean)
            _.isNumber : check if value is as a Number primitive or object (boolean)
        */
        return {
            success: false,
            data: null,
            message: 'Unknown client error'
        };

    switch (resp.status) {
        case 0:
            return {
                success: false,
                data: null,
                message: 'Can not connect to Server API',
                http_status: 0
            };

        case 200:
            return resp.data;

        case 304:
            return {
                success: false,
                data: null,
                message: 'Server API do not accept CORS from this address.',
                http_status: 304
            };

        case 403:
            return {
                success: false,
                data: null,
                message: 'You do not have permission on API.',
                http_status: 403
            };

        case 404:
            return {
                success: false,
                data: null,
                message: 'The request URL do not exist on server API.',
                http_status: 404
            };

        case 500:
            return {
                success: false,
                data: null,
                message: 'Has an error for this request. Refer admin to resolve.',
                http_status: 500
            };

        default:
            return processUnknownCode(resp.status);
    }
};

const processUnknownCode = code => {
    if (100 <= code && code < 200) {
        return {
            success: false,
            message: 'Continuing process',
            http_code: code
        };
    } else if (200 <= code && code < 300) {
        return {
            success: false,
            message: 'Request success',
            http_code: code
        };
    } else if (300 <= code && code < 400) {
        return {
            success: false,
            message: 'Request redirection',
            http_code: code
        };
    } else if (400 <= code && code < 500) {
        return {
            success: false,
            message: 'Unknown client error',
            http_code: code
        };
    } else if (500 <= code && code < 600) {
        return {
            success: false,
            message: 'Unknown server error',
            http_code: code
        };
    }
};

export const readRequestParams = params => {
    if (_.isNil(params)) return {};

    if(_.startsWith(params, 'http://') || _.startsWith(params, 'https://')){
        let url = URL(params);
        return toObject(new URLSearchParams(url.search));
    }

    if(_.isString(params)){
        return toObject(new URLSearchParams(params))
    }

    return {};
}