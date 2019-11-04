import axios from 'axios';
import store from 'store';
import router from 'router';

import { AUTH_HEADER_KEY } from 'core/constant';

export default class Service {
  static requestInterceptors;

  static setToken(token) {
    axios.defaults.headers.common[AUTH_HEADER_KEY] = `${token}`;
  }

  static removeToken() {
    axios.defaults.headers.common[AUTH_HEADER_KEY] = undefined;
  }

  static interceptors({ request }) {
    if (request) this.requestInterceptors = request;
  }

  /**
   * Creates an instance of Service.
   *
   * @memberOf Service
   */
  constructor(namespace) {
    // Accept */*
    axios.defaults.headers.common['Accept'] = '*/*';
    const endpoint = process.env.VUE_APP_SERVICE_ENDPOINT || '';
    const baseURL = endpoint + (namespace ? `/${namespace}/` : '/');
    this.axios = axios.create({
      baseURL,
      responseType: 'json'
    });
  }

  withHeader(headers) {
    this.headers = headers;
    return this;
  }

  toQueryString(obj) {
    const parts = [];
    for (let i in obj) {
      if (obj.hasOwnProperty(i)) {
        parts.push(encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]));
      }
    }
    return parts.join('&');
  }

  /**
   * Call a service action via REST API
   *
   * @param {any} action  name of action
   * @param {any} params  parameters to request
   * @returns  {Promise}
   *
   * @memberOf Service
   */
  async rest(
    action,
    params,
    options = {
      method: 'post'
    },
    responseType
  ) {

    if (Service.requestInterceptors) {
      this.axios.interceptors.request.use(Service.requestInterceptors);
    }
    const { headers = {} } = options;
    try {
      const opts = {
        method: options.method,
        data: params,
        headers: {
          ...(this.headers || {}),
          ...headers
        },
        responseType: responseType || 'json'
      };
      const response = await this.axios.request(action, opts);
      return this.readRestResponse(response);
    } catch (err) {
      return {
        success: false,
        data: null,
        message: 'Can not connect to Server API.'
      };
    }
  }

  readRestResponse(resp) {
    switch (resp.status) {
      case 102:
        return {
          success: false,
          data: null,
          message: 'Can not connect to Server API.',
          http_status: 102
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

      case 401:
        store
          .dispatch('login/logout')
          .then(() => router.push({ path: '/login' }));
        return {
          success: false,
          data: null,
          message: 'Must be authenticate befor accessing this API.',
          http_status: 401
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

      case 406:
        return {
          success: false,
          data: null,
          message: 'Server not acceptable your request.',
          http_status: 406
        };

      case 500:
        return {
          success: false,
          data: null,
          message: 'Has an error for this request. Refer admin to resolve.',
          http_status: 500
        };
    }
  }

  get(action, params, options = {}, responseType) {
    const { headers = {} } = options;
    const query = this.toQueryString(params);
    const path = query ? `${action}?${query}` : action;
    return this.rest(
      path,
      {},
      {
        method: 'get',
        headers
      },
      responseType
    );
  }

  post(action, params, options = {}, responseType) {
    const { headers = {} } = options;
    return this.rest(
      action,
      params,
      {
        method: 'post',
        headers
      },
      responseType
    );
  }

  put(action, params, options = {}) {
    const { headers = {} } = options;
    return this.rest(action, params, {
      method: 'put',
      headers
    });
  }

  delete(action, params, options = {}) {
    const { headers = {} } = options;
    return this.rest(action, params, {
      method: 'delete',
      headers
    });
  }
}
