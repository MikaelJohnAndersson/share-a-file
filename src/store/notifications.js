import * as types from '../actions';
import produce from 'immer';

export default produce((draft, action) => {
    if (action.type == types.CREATE_NOTIFICATION) {
        draft.notifications.push(action.notification);
    }
    else if (action.type == types.REMOVE_NOTIFICATION) {
        draft.notifications = draft.notifications.filter(n => {
            return n.key != action.key;
        });
    }
    else if (action.type == types.UPLOAD_FILE + '_FULFILLED') {
        draft.notifications.push({
            key: new Date(),
            message: 'File uploaded succesfully!',
            options: {
                variant: 'success',
            },
        });
    }
    else if (action.type == types.UPLOAD_FILE + '_REJECTED') {
        draft.notifications.push({
            key: new Date(),
            message: `Upload failed! Error: ${ action.payload.error } `,
            options: {
                variant: 'error',
            },
        });
    }
    else if (action.type == types.UPGRADE_SUBSCRIPTION) {
        draft.notifications.push({
            key: new Date(),
            message: `This is a showcase application. Subscriptions can't actually be upgraded.`,
            options: {
                variant: 'warning',
            },
        });
    }
}, {
    notifications: [],
});
