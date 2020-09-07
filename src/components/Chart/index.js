import React from 'react';
import getTime from '../../functions/getTime';
import './styles.css';

const Chart = ({ Title, Unit, Values, LineColor }) => {
    //debugger;
    return (
        <React.Fragment>
            <p className="subtitle" id={`${Unit}-chart`}>{Title}</p>
            <div className="hourly-box">
                <div>
                    {Values.slice(0, 24).map(hour =>
                        <div key={hour.dt} className="hour-property">
                            <p className="time">{getTime(hour.dt)}</p>
                            <div className="chart-space"></div>
                            <p className="degrees">
                                {Unit === "temp" && `${Math.round(hour.temp)}°`}
                                {Unit === "rain" && `${Math.round((hour.pop * 100), 2)}%`}
                                {Unit === "wind" && `${Math.round((hour.wind_speed * 3.6), 2)}`}
                            </p>
                        </div>
                    )}
                </div>
                <div className="clearfix">
                </div>
                <svg className="chart">
                    <defs>
                        <marker id="white-circle"
                            viewBox="0 0 10 10" refX="5" refY="5" orient="auto" >
                            <circle fill="white" cx="5" cy="5" r="5" />
                        </marker>
                    </defs>
                    <polyline
                        fill="none"
                        stroke={LineColor}
                        strokeWidth="4"
                        markerStart="url(#white-circle)"
                        markerMid="url(#white-circle)"
                        markerEnd="url(#white-circle)"
                        points={Values.slice(0, 24).map((hour, index) => {
                            switch (Unit) {
                                case "temp":
                                    return (`${(25 + (index * 49))},${(100 - (hour.temp * 2))}`)
                                    break;
                                case "rain":
                                    return (`${(25 + (index * 49))},${(100 - (hour.pop * 100))}`)
                                    break;
                                case "wind":
                                    return (`${(25 + (index * 49))},${(100 - (hour.wind_speed * 3.6))}`)
                                    break;
                                default:
                                    break;
                            }
                        })} />
                </svg>
            </div>
            <div className="clearfix">
            </div>
        </React.Fragment>
    )
}

export default Chart;
