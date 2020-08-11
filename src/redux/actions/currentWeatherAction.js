import axios from 'axios';

export const currentWeatherType = 'currentWeatherType';
export const dailyForecastType = 'dailyForecastType';
export const hourlyForecastType = 'hourlyForecastType';
export const currentLocationType = 'currentLocationType';

export const getCurrentWeather = ({language, latitude, longitude, measurement}) => {
    return (dispatch) => {
        //debugger;
        return axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=${measurement}&lang=${language}&exclude=hourly,minutely,daily&appid=6b8d8c2d191bb346e8d93bf8b04895ba`)
            .then((response) => {
                dispatch(getWeather(response.data.current));
            })
    }
};
export function getWeather(currentWeather) {
    return {
        type: currentWeatherType,
        payload: currentWeather
    };
};

export const getDailyForecast = ({language, latitude, longitude, measurement}) => {
    return (dispatch) => {
        //debugger;
        return axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=${measurement}&lang=${language}&exclude=minutely,hourly&appid=6b8d8c2d191bb346e8d93bf8b04895ba`)
            .then((response) => {
                dispatch(getForecast(response.data.daily));
            })
    }
};
export function getForecast(dailyForecast) {
    return {
        type: dailyForecastType,
        payload: dailyForecast
    };
};

export const getHourlyForecast = ({language, latitude, longitude, measurement}) => {
    return (dispatch) => {
        //debugger;
        return axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=${measurement}&lang=${language}&exclude=minutely,daily&appid=6b8d8c2d191bb346e8d93bf8b04895ba`)
            .then((response) => {
                dispatch(getForecastH(response.data.hourly));
            })
    }
};
export function getForecastH(hourlyForecast) {
    return {
        type: hourlyForecastType,
        payload: hourlyForecast
    };
};

export const getCurrentLocation = ({language, latitude, longitude}) => {
    return (dispatch) => {
        //debugger;
        return axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=${language}`)
            .then((response) => {
                dispatch(getLocation(response.data));
            })
    }
};
export function getLocation(currentLocation) {
    return {
        type: currentLocationType,
        payload: currentLocation
    };
}
