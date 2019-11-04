import moment from 'moment';

export const me = state => state.user;
export const isAuthenticated = state => !!state.token;
export const token = state => state.token;
export const instances = state => {
    if (!state.user.instances) return [];
    let idx = 1;
    return state.user.instances.map(i => ({ ...i, id: idx++ }));
};
export const expired = state => {
    const { expires_at, expires_in } = state;
    const diff = moment(moment(), 'x').diff(expires_at, 'seconds');
    return diff >= expires_in;
};
export const hasLoadedOnce = state => state.hasLoadedOnce;
export const message = state => state.message;

