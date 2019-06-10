import * as types from '.';

export function createNotification(notification) {
    return (dispatch) => {
        dispatch({
            type: types.CREATE_NOTIFICATION,
            notification: {
                key: new Date(),
                message: notification.message,
            },
        });
    };
}

export function removeNotification(key) {
    return (dispatch) => {
        dispatch({
            type: types.REMOVE_NOTIFICATION,
            key: key,
        });
    };
}
