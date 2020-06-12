import { loginRequest } from '../../api';
import { setCookie } from '../../helpers/cookies-helpers';

export const TYPES = {
    AUTH_FETCH: 'AUTH_FETCH',
    AUTH_SUCCESS: 'AUTH_SUCCESS',
    AUTH_ERROR: 'AUTH_ERROR',
    LOGOUT_FETCH: 'LOGOUT_FETCH',
    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    LOGOUT_ERROR: 'LOGOUT_ERROR',
}

const SESSION_COOKIE_NAME = 'session_id';
const HOUR_COUNT = 1;
const MAX_AGE = 3600 * HOUR_COUNT;

export function login(params) {
    return async(dispatch) => {
        dispatch({
            type: TYPES.AUTH_FETCH,
            payload: {
                fetching: true,
                fetchError: null,
            },
        })

        const result = await loginRequest(params);
        
        if (result.ok) {
            dispatch({
                type: TYPES.AUTH_SUCCESS,
                payload: {
                    fetching: false,
                    session: result.session,
                },
            })
            setCookie(SESSION_COOKIE_NAME, result.session, { 'max-age': MAX_AGE });
        } else {
            dispatch({
                type: TYPES.AUTH_ERROR,
                payload: {
                    fetching: false,
                    fetchError: result.err,
                },
            })
        }
    }
}

export function logout(sendsayInstance) {
    return async (dispatch) => {
        dispatch({
            type: TYPES.LOGOUT_FETCH,
            payload: {
                fetching: true,
                fetchError: null,
            },
        })

        try {
            const result = await sendsayInstance.request({ action: 'logout', });
            console.log("logout -> result=", result)
            dispatch({
                type: TYPES.LOGOUT_SUCCESS,
                payload: {
                    fetching: false,
                    session: null,
                },
            })
            setCookie(SESSION_COOKIE_NAME, result.session, { 'max-age': 0 });
        } catch (err) {
            dispatch({
                type: TYPES.LOGOUT_ERROR,
                payload: {
                    fetching: false,
                    fetchError: err,
                },
            })
        }
    }
}
