export const getInitialData = data => ({
   type : "GET_WEATHER_DATA",
   payload : data
 })

 export const setSelectedUnit = data => ({
   type : "SET_SELECTED_UNIT",
   payload : data
 })

 export const getWeatherData = data => ({
   type : "GET_DATA",
   payload : data
 })