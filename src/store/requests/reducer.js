import { TYPES } from './actions';

const initialState = {
    fetching: false,
    fetchError: null,
    actions: [],
    lastResponse: {},
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;
    switch(type) {
        case TYPES.REQUEST_HISTORY_SET:
            return { ...state, ...payload }
        case TYPES.REQUEST_HISTORY_CLEAR:
            return { ...state, ...payload }
        case TYPES.REQUEST_HISTORY_DELETE:
            return { ...state, ...payload }
        case TYPES.REQUEST_FETCH:
            return {...state, ...payload}
        case TYPES.REQUEST_SUCCESS:
            return {...state, ...payload}
        case TYPES.REQUEST_ERROR:
            return {...state, ...payload}
        default:
            return state;
    }
}