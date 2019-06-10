import * as types from '.';
import { CURRENT_USER } from '../../dummy_db/user';

export function retrieveCurrentUser() {
    return (dispatch) => {
        dispatch({
            type: types.RETRIEVE_CURRENT_USER,
            payload: {
                // Mock API call
                promise: new Promise(resolve => resolve(CURRENT_USER)),
            },
        });
    };
}
