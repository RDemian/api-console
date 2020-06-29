import { TYPES } from './actions';
import { getCookie } from '../../helpers/cookies-helpers';

const SESSION_COOKIE_NAME = 'session_id';
const session = getCookie(SESSION_COOKIE_NAME);

const initialState = {
    fetching: false,
    fetchError: null,
    session: session || null,
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case TYPES.AUTH_FETCH:
            return {...state, ...payload}
        case TYPES.AUTH_SUCCESS:
            return {...state, ...payload}
        case TYPES.AUTH_ERROR:
            return {...state, ...payload}
        case TYPES.LOGOUT_FETCH:
            return { ...state, ...payload }
        case TYPES.LOGOUT_SUCCESS:
            return { ...state, ...payload }
        case TYPES.LOGOUT_ERROR:
            return { ...state, ...payload }
        default:
            return state;
    }
}