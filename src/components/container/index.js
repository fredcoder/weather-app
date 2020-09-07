import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentWeather, getCurrentLocation } from '../../redux/actions/currentWeatherAction';
import humidity from '../../assets/images/humidity.jpg';
import visibility from '../../assets/images/visibility.png';
import wind from '../../assets/images/wind.png';
import pressure from '../../assets/images/pressure.png';
import thunder from '../../assets/images/thunder.png';

import SpinnerIcon from '../SpinnerIcon';
import Property from '../Property';
import Chart from '../Chart';

import getTime from '../../functions/getTime';
import getDay from '../../functions/getDay';

import './styles.css';

class Container extends Component {

    state = {
        language: "en",/*navigator.language.substring(0, 2),*/
        latitude: "",
        longitude: "",
        measurement: "metric",
        dateTime: "",
        isNetworkOn: true
    }

    componentDidMount() {
        this.getDateTime();
        this.getGeolocation();
        this.getUpdated();
    }

    getUpdated = () => {
        //debugger;
        setInterval(function () {
            this.getDateTime();
            this.getGeolocation();
        }.bind(this), 300000);
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
                        this.props.getCurrentWeather(this.state);
                        this.props.getCurrentLocation(this.state);
                    });
            });
        }
    }

    getDateTime = () => {
        Date.prototype.toShortFormat = function () {

            let monthNames =
                ["Jan", "Feb", "Mar", "Apr",
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

    switchUnits = () => {
        return;
        /*
        if (this.state.measurement === "metric") {
            this.setState({ measurement: "imperial" }, () => {
                this.props.getCurrentWeather(this.state);
            });
        } else {
            this.setState({ measurement: "metric" }, () => {
                this.props.getCurrentWeather(this.state);
            });
        }
        */
    }

    getNetwork = () => {
        //debugger;
        setTimeout(function () {
            this.setState({ isNetworkOn: false });
        }.bind(this), 60000);
    }

    render() {
        //debugger;

        let weather = this.props.current.weather[0];
        if (this.props.daily.length === 8) {
            this.props.daily.shift();
        }
        if (this.props.info.lat === 0 && this.props.info.lon === 0) {
            return (
                <div className="loading" onLoad={this.getNetwork()}>
                    {this.state.isNetworkOn
                        ?
                        <React.Fragment>
                            <p className="load">Getting Geolocation.<br />Please allow the GPS in your browser.</p>
                            <SpinnerIcon />
                        </React.Fragment>
                        :
                        <p className="error">
                            <img className="error-icon" src={thunder} alt="thunder" />Unfortunately Geolocation can not be detected at the moment.<br />Please try later.
                        </p>
                    }
                </div>)
        }
        else {
            return (
                < React.Fragment >
                    {/* BACKGROUND */
                        weather.main &&
                        <div id="background" className={`${(weather.description).split(' ').join('-')}`}>
                            <div id="filter" className={`${weather.icon.substring(2, 3)}`}>
                            </div>
                        </div>
                    }
                    < div className="container" >
                        <section id="wrapper">
                            <header>
                                <section className="main">
                                    {weather.icon &&
                                        <div className="icon">
                                            <img src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt={weather.icon} />
                                            <p><small>{weather.description}</small></p>
                                        </div>
                                    }
                                    <div className="date">
                                        <p id="day">{getDay(this.props.current.dt, false)}</p>
                                        <p id="date">{this.state.dateTime}</p>
                                    </div>
                                    <div className="clearfix">
                                    </div>
                                    <p id="temp">{Math.round(this.props.current.temp)}
                                        <span onClick={this.switchUnits} id="degrees">{this.props.info.measurement === "metric" ? "°C" : "°F"}</span>
                                    </p>
                                    <p id="feels">Feels like {Math.round(this.props.current.feels_like)}{this.props.info.measurement === "metric" ? "°C" : "°F"}</p>
                                </section>
                                <section className="info">
                                    <p id="location">{this.props.location.city}, {this.props.location.countryName}</p>
                                    <div className="details">
                                        <section id="top">
                                            <Property propertyId="humidity" iconImage={humidity} Text="Humidity" Value={`${this.props.current.humidity}%`} />
                                            <Property propertyId="wind" iconImage={wind} Text="Wind speed" Value={this.props.info.measurement === `metric` ? `${Math.round(this.props.current.wind_speed * 3.6)}k/h` : `${Math.round(this.props.current.wind_speed)}mi/h`} />
                                        </section>
                                        <section id="bottom">
                                            <Property propertyId="pressure" iconImage={pressure} Text="Pressure" Value={`${this.props.current.pressure}hPa`} />
                                            <Property propertyId="visibility" iconImage={visibility} Text="Visibility" Value={`${(this.props.current.visibility / 1000)}km`} />
                                        </section>
                                    </div>
                                </section>
                                <div className="clearfix">
                                </div>
                            </header>
                            <div className="hourly-forecast">
                                <p className="title">Hourly Forecast</p>
                                <div className="scroll-box">
                                    {/*Hourly Forecast*/}
                                    <div className="hourly-box-forecast">
                                        {this.props.hourly.slice(0, 24).map(hour =>
                                            <div key={hour.dt} className="hour-property">
                                                <p className="time">{getTime(hour.dt)}</p>
                                                <img src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`} alt="weather" />
                                            </div>
                                        )}
                                    </div>
                                    <Chart Title="Temperature (°C)" Unit="temp" Values={this.props.hourly} LineColor="#EC6E4C" />
                                    <Chart Title="Chance of Rain (%)" Unit="rain" Values={this.props.hourly} LineColor="#0074d9" />
                                    <Chart Title="Wind Speed (km/h)" Unit="wind" Values={this.props.hourly} LineColor="#48484A" />
                                </div>
                            </div>
                            <div className="daily-forecast">
                                <p className="title">Daily Forecast</p>
                                {this.props.daily.length === 7 &&
                                    this.props.daily.map(day =>
                                        <div key={day.dt} className="day-property">
                                            <p id="day-name-short" className="time">{getDay(day.dt, true)}</p>
                                            <p id="day-name-large" className="time">{getDay(day.dt)}</p>
                                            <div className="day-image">
                                                <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="weather" />
                                            </div>
                                            <div className="degrees-range">
                                                <p className="degrees-max">{Math.round(day.temp.max)}°</p>
                                                <p className="degrees-min">{Math.round(day.temp.min)}°</p>
                                            </div>
                                        </div>
                                    )}
                            </div>
                            <div className="clearfix">
                            </div>
                        </section>
                        <footer>
                            <p>&copy; {this.state.dateTime.substr(-4)} | Freddy Clavijo</p>
                        </footer>
                    </div >
                </React.Fragment >
            );
        }
    }
}

const mapStateToProps = (store) => {
    return {
        current: store.currentWeatherReducer.currentWeather.current,
        daily: store.currentWeatherReducer.currentWeather.daily,
        hourly: store.currentWeatherReducer.currentWeather.hourly,
        info: store.currentWeatherReducer.currentWeather,
        location: store.currentWeatherReducer.currentLocation
    }
}

const mapDispatchToProps = {
    getCurrentWeather,
    getCurrentLocation
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);