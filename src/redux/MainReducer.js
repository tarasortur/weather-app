import {formatTheWeatherData} from '../util/util';

const initialState = {
   formattedData : {},
   mainData : [],
   locDetails : {},
   selectedTempUnit : 'fahrenheit'
}
export default function MainReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_WEATHER_DATA" : 
        state.mainData = action.payload.list;
        state.formattedData = formatTheWeatherData(action.payload.list , state.selectedTempUnit);
        state.locDetails = action.payload;
        console.log("state", state);
        return state;

        case "SET_SELECTED_UNIT" :
         state.selectedTempUnit = action.payload; 
         state.formattedData = (formatTheWeatherData(state.mainData, action.payload ));  
         console.log("is it change " , state.formattedData , state.selectedTempUnit)
         return state;
      
        case "GET_DATA" :
          state.formattedData = formatTheWeatherData(state.mainData, state.selectedTempUnit ); 
          return state;

      default:
        return state;
    }
  }