
import React from 'react';
import '../styles/weatherCard.css';
import CloudIcon from '@material-ui/icons/Cloud';
import FastRewind from '@material-ui/icons/FastRewind';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';

const WeatherCard = (props) => {
    const { data, data: { time }, place } = props;
    const { temp, windSpeed, pressure, humidity, visibility, windDesc, RainTypeDesc } = time.find(d => new Date(d.time).getHours() > new Date().getHours()) || time[0];
    return (
        <div className="weatherCard">
            <div className="dateAndTime">
                <div>{data.date}</div>
                <div>{new Date().getHours() + ":" + new Date().getMinutes()}</div>
            </div>
            <div className="placeCard">
                {place}
            </div>
            <div className="mainTemp">
                <CloudIcon fontSize="large"></CloudIcon>{temp}
            </div>
            <div className="overallWeather">{`Feels like ${temp}. ${RainTypeDesc}. ${windDesc}`}</div>
            {/* //<span>{`The high will be ${data.tempMax}, the low will be ${data.tempMin}`}</span></div> */}
            <ul className="otherInfo">
                <li><FastRewind></FastRewind>{windSpeed}</li>
                <li><KeyboardArrowDownIcon></KeyboardArrowDownIcon> {pressure}</li>
                <li>Humidity : {humidity}</li>
                <li>Visibility : {visibility}</li>
            </ul>
        </div>
    )
}

export default WeatherCard;