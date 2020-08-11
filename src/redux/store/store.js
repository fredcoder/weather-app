import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from "redux-thunk"
import currentWeatherReducer from '../reducers/currentWeatherReducer';

const reducer = combineReducers({
    currentWeatherReducer
});

const store = createStore(reducer, applyMiddleware(thunk));

export default store;