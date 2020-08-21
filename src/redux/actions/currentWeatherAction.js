import axios from 'axios';

export const currentWeatherType = 'currentWeatherType';
export const currentLocationType = 'currentLocationType';

export const getCurrentWeather = ({language, latitude, longitude, measurement}) => {
    return (dispatch) => {
        //debugger;
        return axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=${measurement}&lang=${language}&exclude=minutely&appid=6b8d8c2d191bb346e8d93bf8b04895ba`)
            .then((response) => {
                dispatch(getWeather(response.data, measurement));
            })
    }
};
export function getWeather(data, measurement) {
    let currentWeather = Object.assign(data,{measurement});
    return {
        type: currentWeatherType,
        payload: currentWeather
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
