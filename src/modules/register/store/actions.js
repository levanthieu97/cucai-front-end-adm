import router from 'router';
import store from 'store';
import Service from 'core/service';
import * as TYPES from './types';
import _ from 'lodash';

export const registerNewUser = async ({commit}, param) => {
    const result = await Service.post("/auth/register",param);
    console.log("*********");
    console.log(result);
    // set State
    commit(TYPES.REGISTER_MESSAGE, result.message);
    commit(TYPES.REGISTER_SUCCESS, result.success);

    if(result.success){
        router.push('/login');
    }else {
        console.log("regis");
        router.push('/register');
    }
}