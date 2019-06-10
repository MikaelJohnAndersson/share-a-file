import * as types from '../actions';
import produce from 'immer';

export default produce((draft, action) => {
    if (action.type == types.RETRIEVE_SUBSCRIPTION_PLANS + '_FULFILLED') {
        draft.subscriptionPlans = action.payload;
    }
}, {
    subscriptionPlans: [],
});
