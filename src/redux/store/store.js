import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk"
import currentWeatherReducer from '../reducers/currentWeatherReducer';
import currentLocationReducer from '../reducers/currentLocationReducer';

const reducer = combineReducers({
    currentWeatherReducer,
    currentLocationReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;