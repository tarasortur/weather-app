import React ,{ useEffect }from 'react';
import {connect} from 'react-redux';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import { setSelectedUnit, getWeatherData } from './MainAction';

const RadioButtonsGroup = (props) => {
  const { setSelectedUnit, getWeatherData, selectedTempUnit } = props;
  const [value, setValue] = React.useState(selectedTempUnit);

  const handleChange = (event) => {
    setValue(event.target.value);
    setSelectedUnit(event.target.value);
    getWeatherData();
  };

  useEffect(() => {
    getWeatherData();
   },[selectedTempUnit]);

  return (
    <FormControl component="fieldset">
      <RadioGroup row aria-label="weatherUnit" name="weatherUnit1" value={value} onChange={handleChange}>
        <FormControlLabel value="celcius" control={<Radio  color="primary"/>} label="Celcius" />
        <FormControlLabel value="fahrenheit" control={<Radio  color="primary"/>} label="Fahrenheit" />
      </RadioGroup>
    </FormControl>
  );
}

const mapStateToProps = (state) => {
  return {
    selectedTempUnit : state.MainReducer.selectedTempUnit
  }
}

const mapDispatchToProps = dispatch => ({
  setSelectedUnit: (data) => dispatch(setSelectedUnit(data)),
  getWeatherData : () => dispatch(getWeatherData())
});
export default connect(mapStateToProps, mapDispatchToProps)(RadioButtonsGroup);