import { type as currentLocationType } from '../actions/currentLocationAction'

const defaultState = {
    currentLocation: {
        latitude:0,
        longitude:0,
        localityLanguageRequested: "",
        continent: "",
        continentCode: "",
        countryName: "",
        countryCode: "",
        principalSubdivision: "",
        locality: "",
        postcode: "",
        localityInfo: {}
    }
};

const reducer = (state = defaultState, action) => {
    //debugger;
    switch (action.type) {
        case currentLocationType: {
            return {
                ...state,
                currentLocation: action.payload
            }
        }
        default:
            return state
    }
}

export default reducer;