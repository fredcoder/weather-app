import React, { Component } from 'react';
import { connect } from 'react-redux';
import currentWeatherAction from '../../redux/actions/currentWeatherAction';
import currentLocationAction from '../../redux/actions/currentLocationAction';
import weather from '../../assets/images/weather.png';
import './styles.css';

class Container extends Component {

    state = {
        language: navigator.language.substring(0, 2),
        latitude: "",
        longitude: "",
        measurement: "metric",
        dateTime: ""
    }

    componentDidMount() {
        this.getDateTime();
        this.getGeolocation();
    }

    getGeolocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                //debugger;
                this.setState({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                },
                    () => {
                        this.props.currentWeatherAction(this.state);
                        this.props.currentLocationAction(this.state);
                    });
            });
        }
    }

    getDateTime = () => {
        Date.prototype.toShortFormat = function () {

            let monthNames = ["Jan", "Feb", "Mar", "Apr",
                              "May", "Jun", "Jul", "Aug",
                              "Sep", "Oct", "Nov", "Dec"];

            let day = this.getDate();

            let monthIndex = this.getMonth();
            let monthName = monthNames[monthIndex];

            let year = this.getFullYear();

            return `${day} ${monthName} ${year}`;
        }
        let today = new Date();
        this.setState({ dateTime: today.toShortFormat() });
    }


    render() {
        debugger;
        return (
            <div className="container">
                <div className="main">
                    <div className="icon">
                        <img src={weather} alt="weather" />
                    </div>
                    <div className="date">
                        <p id="day">Today</p>
                        <p id="date">{this.state.dateTime}</p>
                    </div>
                </div>
                <div className="clearfix">
                </div>
                <div className="details">
                    <p id="temp">{Math.round(this.props.currentWeather.temp)}<span id="degrees">°C</span></p>
                    <p id="feels">Feels like {Math.round(this.props.currentWeather.feels_like)}°C</p>
                    <p id="location">{this.props.currentLocation.locality}, {this.props.currentLocation.countryName}</p>
                </div>
                <div className="content">
                    <div className="property">
                        <p id="rain">Chance of rain 0%</p>
                    </div>
                    <div className="property">
                        <p id="humidity">Humidity {this.props.currentWeather.humidity}%</p>
                    </div>
                    <div className="property">
                        <p id="wind">Wind {this.props.currentWeather.wind_speed}km/h</p>
                    </div>
                    <div className="property">
                        <p id="pressure">Pressure {this.props.currentWeather.feels_like}mBar</p>
                    </div>
                    <div className="property">
                        <p id="visibility">Visibility {Math.round(this.props.currentWeather.feels_like, 2)}km</p>
                    </div>
                </div>
            </div>

        );
    }
}

const mapStateToProps = (store) => {
    return {
        currentWeather: store.currentWeatherReducer.currentWeather,
        currentLocation: store.currentLocationReducer.currentLocation
    }
}

const mapDispatchToProps = {
    currentWeatherAction,
    currentLocationAction
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);