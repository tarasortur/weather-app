import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

export default function RadioButtonsGroup() {
  const [value, setValue] = React.useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };
  

  return (
    <FormControl component="fieldset">
      <RadioGroup aria-label="weatherUnit" name="weatherUnit1" value={value} onChange={handleChange}>
        <FormControlLabel value="celcius" control={<Radio  color="primary"/>} label="Celcius" />
        <FormControlLabel value="fahrenheit" control={<Radio  color="primary"/>} label="fahrenheit" />
      </RadioGroup>
    </FormControl>
  );
}