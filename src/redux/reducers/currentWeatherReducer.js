import { currentWeatherType } from '../actions/currentWeatherAction'

const defaultState = {
    currentWeather: {
        lat: 0,
        lon: 0,
        timezone: "",
        timezone_offset: 0,
        current: {
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
            weather: [{}],
            wind_deg: 0,
            wind_speed: 0
        },
        daily: [{
            dt: 0,
            sunrise: 0,
            sunset: 0,
            temp: {
                day: 0,
                min: 0,
                max: 0,
                night: 0,
                eve: 0,
                morn: 0
            },
            feels_like: {
                day: 0,
                night: 0,
                eve: 0,
                morn: 0
            },
            pressure: 0,
            humidity: 0,
            dew_point: 0,
            wind_speed: 0,
            wind_deg: 0,
            weather: [
                {
                    id: 0,
                    main: "",
                    description: "",
                    icon: ""
                }
            ],
            clouds: 0,
            pop: 0,
            rain: 0,
            uvi: 0
        }],
        hourly: [{
            dt: 1597129200,
            temp: 26.6,
            feels_like: 29.59,
            pressure: 1015,
            humidity: 74,
            dew_point: 21.58,
            clouds: 1,
            visibility: 10000,
            wind_speed: 2.13,
            wind_deg: 207,
            weather: [{}],
            pop: 0.49,
            rain: {}
        }]
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