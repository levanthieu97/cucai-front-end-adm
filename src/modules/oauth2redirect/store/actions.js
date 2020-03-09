import Service from "core/service";
import { LOAD_PROFILE_SUCCESS, LOAD_PROFILE_FAILURE,PROFILE } from "./types";
 

export const loadProfile = async ({ commit }) => {
    const response = await Service.get('/api/profile');
    const { success, data, message } = response;
    console.log(data);
    if (!success) {
        commit(LOAD_PROFILE_FAILURE, message);
        return null;
    }
    localStorage.setItem(PROFILE, JSON.stringify(response.data));
    commit(LOAD_PROFILE_SUCCESS, data);
}