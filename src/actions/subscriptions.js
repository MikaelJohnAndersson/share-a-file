import * as types from '.';
import { SUBSCRIPTION_PLANS } from '../../dummy_db/subscriptions';

export function retrieveSubscriptionPlans() {
    return (dispatch) => {
        dispatch({
            type: types.RETRIEVE_SUBSCRIPTION_PLANS,
            payload: {
                // Mock API call
                promise: new Promise(resolve => resolve(SUBSCRIPTION_PLANS))
            },
        });
    };
}

export function upgradeSubscription() {
    return (dispatch) => {
        dispatch({
            type: types.UPGRADE_SUBSCRIPTION,
        });
    };
}
