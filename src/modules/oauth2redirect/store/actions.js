import Service from "core/service";
import { LOAD_PROFILE_SUCCESS, LOAD_PROFILE_FAILURE } from "./types";
 

export const loadProfile = async ({ commit }) => {
    const response = await Service.get('/api/profile');
    const { success, data, message } = response;

    if (!success) {
        commit(LOAD_PROFILE_FAILURE, message);
        return null;
    }

    commit(LOAD_PROFILE_SUCCESS, data);
}