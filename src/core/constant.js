export const ACCESS_TOKEN_KEY = 'APP_TKN_KEY';
export const USER = 'APP_CURRENT_USER';

export const AUTH_HEADER_KEY = 'Authorization';
export const EXPIRES_AT = 'APP_EXP_AT';
export const EXPIRES_IN = 'APP_EXP_IN';
export const ROLE = 'ROLE';
export const TABLE_PAGE_SIZE_1 = [10,20,50];
export const TABLE_PAGE_SIZE_2 = [5,6,7,8,9,10];

export const API_BASE_URL = 'http://localhost:8088'; // port back-end: 8088
export const OAUTH2_REDIRECT_URI = 'http://localhost:8080/oauth2/redirect'; // port front-end: 8080
export const GOOGLE_AUTH_URL = API_BASE_URL + '/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = API_BASE_URL + '/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;


export const STD_DATE_FORMAT = 'DD/MM/YYYY hh:mm:ss A';
export const MONTH_LIST = [
    { text: 'Tháng 1', value: 1 },
    { text: 'Tháng 2', value: 2 },
    { text: 'Tháng 3', value: 3 },
    { text: 'Tháng 4', value: 4 },
    { text: 'Tháng 5', value: 5 },
    { text: 'Tháng 6', value: 6 },
    { text: 'Tháng 7', value: 7 },
    { text: 'Tháng 8', value: 8 },
    { text: 'Tháng 9', value: 9 },
    { text: 'Tháng 10', value: 10 },
    { text: 'Tháng 11', value: 11 },
    { text: 'Tháng 12', value: 12 }
  ];