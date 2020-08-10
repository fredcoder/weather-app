import axios from 'axios';

export const type = 'currentLocationType';

const currentLocationAction = ({language, latitude, longitude}) => {
    return (dispatch) => {
        debugger;
        return axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=${language}`)
            .then((response) => {
                dispatch(getCurrentLocation(response.data));
            })
    }
};

export function getCurrentLocation(currentLocation) {
    return {
        type: type,
        payload: currentLocation
    };
}

export default currentLocationAction;