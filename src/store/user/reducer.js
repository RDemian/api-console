import { TYPES } from './actions';

const initialState = {
    fetching: false,
    fetchError: null,
    account: null,
    sublogin: null,
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case TYPES.USER_FETCH:
            return {...state, ...payload}
        case TYPES.USER_SUCCESS:
            return {...state, ...payload}
        case TYPES.USER_ERROR:
            return {...state, ...payload}
        default:
            return state;
    }
}