import { TYPES } from './actions';

const initialState = {
    fetching: false,
    fetchError: null,
    isLogged: false,
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
        default:
            return state;
    }
}