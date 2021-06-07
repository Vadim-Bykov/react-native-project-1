import {applyMiddleware, combineReducers, createStore, compose} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {authReducer} from './auth/reducer';
import {forumReducer} from './forums/reducer';

const rootReducers = combineReducers({
  auth: authReducer,
  // forum: forumReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducers,
  composeEnhancers(applyMiddleware(thunkMiddleware)),
);

export default store;
