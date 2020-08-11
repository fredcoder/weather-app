import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCurrentWeather, getDailyForecast, getHourlyForecast, getCurrentLocation } from '../../redux/actions/currentWeatherAction';
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
                        this.props.getCurrentWeather(this.state);
                        this.props.getDailyForecast(this.state);
                        this.props.getHourlyForecast(this.state);
                        this.props.getCurrentLocation(this.state);
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
                this.props.getDailyForecast(this.state);
                this.props.getHourlyForecast(this.state);
            });
        } else {
            this.setState({ measurement: "metric" }, () => {
                this.props.getCurrentWeather(this.state);
                this.props.getDailyForecast(this.state);
                this.props.getHourlyForecast(this.state);
            });
        }
    }


    render() {
        //debugger;
        let weather = this.props.currentWeather.weather[0];
        if (this.props.dailyForecast.length === 8) {
            this.props.dailyForecast.shift();
        }

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
                        <div className="icon">
                            {weather.icon &&
                                <img src={`http://openweathermap.org/img/wn/${weather.icon}@2x.png`} alt="weather" />
                            }
                        </div>
                        <div className="date">
                            <p id="day">Today</p>
                            <p id="date">{this.state.dateTime}</p>
                        </div>
                    </div>
                    <div className="clearfix">
                    </div>
                    <div className="info">
                        <p id="temp">{Math.round(this.props.currentWeather.temp)}
                            <span onClick={this.switchUnits} id="degrees">{this.state.measurement === "metric" ? "°C" : "°F"}</span>
                        </p>
                        <p id="feels">Feels like {Math.round(this.props.currentWeather.feels_like)}{this.state.measurement === "metric" ? "°C" : "°F"}</p>
                        <p id="location">{this.props.currentLocation.locality} | {this.props.currentLocation.countryName}</p>
                    </div>
                    <div className="details">
                        <div className="property">
                            <p id="humidity">Humidity <span className="value">{this.props.currentWeather.humidity}%</span></p>
                        </div>
                        <div className="property">
                            <p id="wind">Wind <span className="value">{this.props.currentWeather.wind_speed}km/h</span></p>
                        </div>
                        <div className="property">
                            <p id="pressure">Pressure <span className="value">{this.props.currentWeather.feels_like}mBar</span></p>
                        </div>
                        <div className="property">
                            <p id="visibility">Visibility <span className="value">{Math.round(this.props.currentWeather.feels_like, 2)}km</span></p>
                        </div>
                    </div>
                    <div className="daily-forecast">
                        <p id="title">Forecast</p>
                        {this.props.dailyForecast.length === 7 &&
                            this.props.dailyForecast.map(day =>
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
                    {/* <div className="hourly-forecast">
                        <p id="title">Hourly Forecast</p>
                        {this.props.hourlyForecast.map(hour =>
                            <div key={hour.dt} className="hour-property">
                                <p className="degrees">{Math.round(hour.temp)}°C</p>
                                <img src={`http://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`} alt="weather" />
                                <p className="time">{this.getTime(hour.dt)}</p>
                            </div>
                        )}
                        </div>*/}
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = (store) => {
    return {
        currentWeather: store.currentWeatherReducer.currentWeather,
        dailyForecast: store.currentWeatherReducer.dailyForecast,
        hourlyForecast: store.currentWeatherReducer.hourlyForecast,
        currentLocation: store.currentWeatherReducer.currentLocation
    }
}

const mapDispatchToProps = {
    getCurrentWeather,
    getDailyForecast,
    getHourlyForecast,
    getCurrentLocation
}

export default connect(mapStateToProps, mapDispatchToProps)(Container);