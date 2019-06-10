import { combineReducers, compose, applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunk from 'redux-thunk';

import uploads from './uploads';
import notifications from './notifications';
import subscriptions from './subscriptions';
import user from './user';

const appReducer = combineReducers({
    notifications,
    uploads,
    subscriptions,
    user,
});

export const configureStore = () => {
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

    const middleware = [
        promiseMiddleware,
        thunk,
    ];

    const createWithMiddleware = composeEnhancers(
        applyMiddleware(...middleware),
    )(createStore);

    return createWithMiddleware(appReducer);
};
