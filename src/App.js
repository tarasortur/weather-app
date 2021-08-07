import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import Carousel from './reusableComp/Carousal';
import WeatherCard from './reusableComp/weatherCard';
import './App.css';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import {getWeatherData, getInitialData, setSelectedUnit} from './redux/MainAction';
import { formatTheWeatherData } from './util/util';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import BarChart from 'react-bar-chart';


const App = (props) => {
  const { formattedData , selectedTempUnit, setSelectedUnit,  getInitialData} = props;
  const [value, setValue] = React.useState(selectedTempUnit);
  const [mainData, setMainData ] = React.useState(null); 
  const [data , setData ] = React.useState(null);   
  const [locDetails , setLocDetails] = React.useState(null);                                                  
  const margin = {top: 20, right: 20, bottom: 30, left: 40};

  useEffect(() => {
    const fetchData = async () => {
      await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=Munich,de&APPID=75f972b80e26f14fe6c920aa6a85ad57&cnt=40`)
      .then(res => res.json())
      .then(result => {
        setMainData(result);
        if(result.list.length){
          setData(formatTheWeatherData(result.list , value));
          setLocDetails(result);
        }
      });
    }
    fetchData();
  }, []);

  const handleChange = (event) => {
    setValue(event.target.value);
    setData(formatTheWeatherData(mainData.list , event.target.value));
  };

  useEffect(() => {
  },[value , JSON.parse(JSON.stringify(Object.keys(formattedData))).map(item => item.name),mainData && mainData.length])

  return (
    <div className="App">
      <div style={{marginLeft : "40%"}}>
      <FormControl component="fieldset" >
        <RadioGroup row aria-label="weatherUnit" name="weatherUnit1" value={value} onChange={handleChange}>
          <FormControlLabel value="celcius" control={<Radio  color="primary"/>} label="Celcius" />
          <FormControlLabel value="fahrenheit" control={<Radio  color="primary"/>} label="Fahrenheit" />
        </RadioGroup>
      </FormControl>
      </div>
       <div className="carousel" style={{ maxWidth: 1200, marginLeft: 'auto', marginRight: 'auto', marginTop: 64 }}>
            <Carousel show={3}>
                {!!data && Object.keys(data).map((d, i)=>  <div>
                    <div key = {i} style={{padding: 10}}>
                       <WeatherCard key={i} data={data[d]} place={ !!locDetails && `${locDetails.city["name"]}, ${locDetails.city.country}`  } /> 
                    </div>
                </div> )}
            </Carousel>
        </div>
        <section class="chart-container">
         {/* To be implemented  */}
        {/* <BarChart ylabel='Quantity'
                  width={window.innerWidth -300}
                  height={window.innerHeight - 400}
                  margin={margin}
                  color= {"default"}
                  data={bardata}/> */}
        </section>
        <Backdrop open={!mainData}>
          <CircularProgress color="inherit" />
        </Backdrop>
    </div>
  );
}
const mapStateToProps = (state) => {
  return {
   // mainData : state.MainReducer.mainData,
    formattedData : state.MainReducer.formattedData,
   // locDetails : state.MainReducer.locDetails,
    selectedTempUnit : state.MainReducer.selectedTempUnit
  }
}

const mapDispatchToProps = dispatch => ({
  getInitialData: (data) => dispatch(getInitialData(data)),
  getWeatherData: () => dispatch(getWeatherData()),
  setSelectedUnit: (data) => dispatch(setSelectedUnit(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
