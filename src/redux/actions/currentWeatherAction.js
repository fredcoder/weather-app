import axios from 'axios';

export const type = 'currentWeatherType';

const currentWeatherAction = ({language, latitude, longitude, measurement}) => {
    return (dispatch) => {
        debugger;
        return axios.get(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&units=${measurement}&lang=${language}&exclude=hourly,daily&appid=6b8d8c2d191bb346e8d93bf8b04895ba`)
            .then((response) => {
                dispatch(getCurrentWeather(response.data.current));
            })
    }
};

export function getCurrentWeather(currentWeather) {
    return {
        type: type,
        payload: currentWeather
    };
}

export default currentWeatherAction;