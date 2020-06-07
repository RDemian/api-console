import Sendsay from 'sendsay-api';
import { login } from '../../api';
//let sendsay = new Sendsay({ apiKey: '19mP7bRTzIrS1YFFXXJQ24qkKjOsErEqh00kn83XoZMCI0Nv1nLuI5tTXCa3gqZTH3w' });
/*
    sendsay.request({ action: 'sys.settings.get', list: ['about.id']}).then(function(res) {
      console.log(res.list['about.id']);
    })*/

export const TYPES = {
    AUTH_FETCH: 'AUTH_FETCH',
    AUTH_SUCCESS: 'AUTH_SUCCESS',
    AUTH_ERROR: 'AUTH_ERROR',
}

export function authorization(params) {
    return async(dispatch) => {
        dispatch({
            type: TYPES.AUTH_FETCH,
            payload: {
                fetching: true,
                fetchError: null,
            },
        })

        const result = await login(params);
        
        if (result.ok) {
            dispatch({
                type: TYPES.AUTH_SUCCESS,
                payload: {
                    fetching: false,
                    session: result.session,
                },
            })
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
