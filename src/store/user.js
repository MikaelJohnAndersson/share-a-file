import * as types from '../actions';
import produce from 'immer';

export default produce((draft, action) => {
    if (action.type == types.RETRIEVE_CURRENT_USER + '_FULFILLED') {
        draft.currentUser = action.payload;
    }
}, {
    currentUser: null,
});
