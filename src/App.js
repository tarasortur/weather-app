import React from 'react';
import RadioButtonComponenet from './RadioButtonComp';
import Carousel from './Carousal';
import WeatherCard from './weatherCard';
import './App.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import data from './data.json';
import _ from 'lodash';
import {formatTheWeatherData} from './util.js';

const formattedData = formatTheWeatherData(data["list"].slice('1'));
const App = () => {
  return (
    <div className="App">
       <RadioButtonComponenet/>
       <div className="carousel" style={{ maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto', marginTop: 64 }}>
            <Carousel show={3}>
                {Object.keys(formattedData).map((d)=> <div>
                    <div style={{padding: 10}}>
                       <WeatherCard data={formattedData[d]} place={ `${data.city["name"]}, ${data.city.country}`  } /> 
                    </div>
                </div>)}
            </Carousel>
        </div>
    </div>
  );
}

export default App;
