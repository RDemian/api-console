const HISTORY_LENGTH = 15;
export const STORAGE_HISTORY_NAME = 'action_history';

export const TYPES = {
    REQUEST_HISTORY_SET: 'REQUEST_HISTORY_SET',
    REQUEST_FETCH: 'REQUEST_FETCH',
    REQUEST_SUCCESS: 'REQUEST_SUCCESS',
    REQUEST_ERROR: 'REQUEST_ERROR',
}

const getFilterActions = (currentAction, actions) => {
    return actions.filter(item => item.action !== currentAction);
}

export function sendRequest(sendsayInstance, params) {
    return async(dispatch, getState) => {
        dispatch({
            type: TYPES.REQUEST_FETCH,
            payload: {
                fetching: true,
                fetchError: null,
            },
        })

        const { requests } = getState();
        const tempArr = getFilterActions(params.action, requests.actions);
        const newActions = [params, ...tempArr].slice(0, HISTORY_LENGTH);

        try {
            const result = await sendsayInstance.request(params);

            params.ok = true;
            dispatch({
                type: TYPES.REQUEST_SUCCESS,
                payload: {
                    fetching: false,
                    actions: newActions,
                    lastResponse: result,
                },
            })
        } catch(err) {
            params.ok = false;
            dispatch({
                type: TYPES.REQUEST_ERROR,
                payload: {
                    fetching: false,
                    fetchError: err,
                    actions: newActions,
                    lastResponse: err,
                },
            })
        }

        localStorage.setItem(STORAGE_HISTORY_NAME, JSON.stringify(newActions));
    }
}

export function setRequestHistory() {
    return async (dispatch) => {
        const storageItem = localStorage.getItem(STORAGE_HISTORY_NAME);
        const historyActions = storageItem ? await JSON.parse(storageItem) : [];
        
        dispatch ({
            type: TYPES.REQUEST_HISTORY_SET,
            payload: {
                fetching: false,
                fetchError: null,
                actions: historyActions,
                lastResponse: {},
            },
        })
    }
}