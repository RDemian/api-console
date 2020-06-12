export const TYPES = {
    USER_FETCH: 'USER_FETCH',
    USER_SUCCESS: 'USER_SUCCESS',
    USER_ERROR: 'USER_ERROR',
}

export function getUserData(sendsayInstance) {
    return async(dispatch) => {
        dispatch({
            type: TYPES.USER_FETCH,
            payload: {
                fetching: true,
                fetchError: null,
            },
        })

        try {
            const result = await sendsayInstance.request({ action: 'pong',});
            dispatch({
                type: TYPES.USER_SUCCESS,
                payload: {
                    fetching: false,
                    account: result.account,
                    sublogin: result.sublogin,
                },
            })
        } catch(err) {
            dispatch({
                type: TYPES.USER_ERROR,
                payload: {
                    fetching: false,
                    fetchError: err,
                },
            })
        }
    }
}
