import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentWeather } from '../../redux/actions/currentWeatherAction';
import humidity from '../../assets/images/humidity.jpg';
import visibility from '../../assets/images/visibility.png';
import wind from '../../assets/images/wind.png';
import pressure from '../../assets/images/pressure.png';
import thunder from '../../assets/images/thunder.png';
import SpinnerIcon from '../SpinnerIcon';
import './styles.css';

class Container extends Component {

    state = {
        language: navigator.language.substring(0, 2),
        latitude: "",
        longitude: "",
        measurement: "metric",
        dateTime: "",
        isNetworkOn: true
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
                        this.props.getCurrentWeather(this.state);
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

    getTime = (time) => {
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        var date = new Date(time * 1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        //var seconds = "0" + date.getSeconds();
        // Will display time in 10:30:23 format
        var formattedTime = hours + ':' + minutes.substr(-2);// + ':' + seconds.substr(-2);

        return formattedTime;
    }

    getDay = (dt) => {

        var day = new Date(dt * 1000);

        let monthNames = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

        let formattedDay = monthNames[day.getDay()];

        return formattedDay;
    }

    switchUnits = () => {
        if (this.state.measurement === "metric") {
            this.setState({ measurement: "imperial" }, () => {
                this.props.getCurrentWeather(this.state);
            });
        } else {
            this.setState({ measurement: "metric" }, () => {
                this.props.getCurrentWeather(this.state);
            });
        }
    }

    getNetwork = () => {
        debugger;
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
                        <SpinnerIcon />
                        :
                        <p className="error">
                            <img className="error-icon" src={thunder} alt="thunder" />Unfortunately your geolocation can be detected at the moment, please enable the GPS or try later.
                        </p>
                    }
                </div>)
        }
        else {
            return (
                <React.Fragment>
                    {weather.main &&
                        <div id="background" className={`${weather.main}`}>
                            <div id="filter" className={`${weather.icon.substring(2, 3)}`}>
                            </div>
                        </div>
                    }
                    <div className="container">
                        <div className="main">
                            {weather.icon &&
                                <div className="icon">
                                    <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt={weather.icon} />
                                    <p><small>{weather.description}</small></p>
                                </div>
                            }
                            <div className="date">
                                <p id="day">Today</p>
                                <p id="date">{this.state.dateTime}</p>
                            </div>
                        </div>
                        <div className="clearfix">
                        </div>
                        <div className="info">
                            <p id="temp">{Math.round(this.props.current.temp)}
                                <span onClick={this.switchUnits} id="degrees">{this.props.info.measurement === "metric" ? "°C" : "°F"}</span>
                            </p>
                            <p id="feels">Feels like {Math.round(this.props.current.feels_like)}{this.props.info.measurement === "metric" ? "°C" : "°F"}</p>
                            <p id="location">{this.props.info.timezone.split('/')[1]}, {this.props.info.timezone.split('/')[0]}</p>
                        </div>
                        <div className="details">
                            <div className="property">
                                <p id="humidity">
                                    <img className="icons" src={humidity} alt="humidity" />Humidity <span className="value">{this.props.current.humidity}%</span>
                                </p>
                            </div>
                            <div className="property">
                                <p id="wind">
                                    <img className="icons" src={wind} alt="wind" />Wind speed <span className="value">{this.props.info.measurement === `metric` ? `${Math.round(this.props.current.wind_speed * 3.6)}k/h` : `${Math.round(this.props.current.wind_speed)}mi/h`}</span>
                                </p>
                            </div>
                            <div className="property">
                                <p id="pressure">
                                    <img className="icons" src={pressure} alt="pressure" />Pressure <span className="value">{this.props.current.pressure}hPa</span>
                                </p>
                            </div>
                            <div className="property">
                                <p id="visibility">
                                    <img className="icons" src={visibility} alt="visibility" />Visibility <span className="value">{(this.props.current.visibility / 1000)}km</span>
                                </p>
                            </div>
                        </div>
                        <div className="daily-forecast">
                            <p id="title">Forecast</p>
                            {this.props.daily.length === 7 &&
                                this.props.daily.map(day =>
                                    <div key={day.dt} className="day-property">
                                        <p className="time">{this.getDay(day.dt)}</p>
                                        <img src={`http://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="weather" />
                                        <p className="degrees-max">{Math.round(day.temp.max)}°</p>
                                        <p className="degrees-min">{Math.round(day.temp.min)}°</p>
                                    </div>
                                )}
                        </div>
                        <div className="clearfix">
                        </div>
                        <div className="hourly-forecast">
                            <p id="title">Hourly Forecast</p>
                            <div className="scroll-box">
                                <div className="hourly-box">
                                    {this.props.hourly.map(hour =>
                                        <div key={hour.dt} className="hour-property">
                                            <p className="degrees">{Math.round(hour.temp)}°C</p>
                                            <img src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`} alt="weather" />
                                            <p className="time">{this.getTime(hour.dt)}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            );
        }
    }
}

const mapStateToProps = (store) => {
    return {
        current: store.currentWeatherReducer.currentWeather.current,
        daily: store.currentWeatherReducer.currentWeather.daily,
        hourly: store.currentWeatherReducer.currentWeather.hourly,
        info: store.currentWeatherReducer.currentWeather
    }
}

const mapDispatchToProps = {
    getCurrentWeather
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);