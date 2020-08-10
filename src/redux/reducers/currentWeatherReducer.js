import { type as currentWeatherType } from '../actions/currentWeatherAction'

const defaultState = {
    currentWeather: {
        clouds: 0,
        dew_point: 0,
        dt: 0,
        feels_like: 0,
        humidity: 0,
        pressure: 0,
        sunrise: 0,
        sunset: 0,
        temp: 0,
        uvi: 0,
        visibility: 0,
        weather: [],
        wind_deg: 0,
        wind_speed: 0
    }
};

const reducer = (state = defaultState, action) => {
    //debugger;
    switch (action.type) {
        case currentWeatherType: {
            return {
                ...state,
                currentWeather: action.payload
            }
        }
        default:
            return state
    }
}

export default reducer;