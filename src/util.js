const formatTheWeatherData = (data) => {
    let finalData = [];
    let newObj = {};
    let timeValues = [];
    data.forEach((d) => {
        let dateTime = d.dt_txt.split(' ');
        let timeArray = [];
        if(Object.keys(newObj).includes(dateTime[0])){
            newObj[dateTime[0]].avgTemp += d.main.temp;
           // console.log("newObj[dateTime[0]].avgTemp", newObj[dateTime[0]].avgTemp, d.main.temp );
        }
        else { 
            newObj[dateTime[0]] = {
            date : getMonthName(d.dt_txt),
            avgTemp : d.main.temp}
        };
       // newObj[dateTime[0]] = {"date" : dateTime[0]}
        newObj[dateTime[0]]["time"] = newObj[dateTime[0]]["time"] ? newObj[dateTime[0]]["time"] : [];
        newObj[dateTime[0]]["time"].push({
            "temp" : d.main.temp+ "°C",
            "pressure": d.main.pressure + " Pa",
            "humidity": d.main.humidity + " %",
            "visibility": d.visibility/1000 + " km",
            "RainType" : d.weather[0].main,
            "RainTypeDesc" : d.weather[0].main === "Rain" ? d.weather[0].description : "Few " + d.weather[0].description,
            "RainTypeId" : d.weather[0].id,
            "windDesc" : getWindDesc(d.wind.speed),
            "windSpeed" : d.wind.speed + "m/s W",
            "tempMinMax": `The high will be ${d.main.temp_max}, the low will be ${d.main.temp_min}`,
            "time" : d.dt_txt,
            "timeValue" : dateTime[1] 
        });
        newObj[dateTime[0]]["avgTemp"]  = newObj[dateTime[0]]["avgTemp"]/newObj[dateTime[0]]["time"].length;
    });
    return newObj;
    }
    
    const getWindDesc = (data) => {
       if(data > 1 || data< 3){
           return "Light Air";
       } else  if(data > 4 || data< 7){
        return "Light Breeze";
       } else  if(data > 8 || data< 12){
        return "Gentle Breeze";
       } else  if(data > 13 || data< 18){
        return "Moderate Breeze";
       }
    }
    
    const getMonthName = (data) =>{
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
return monthNames[new Date(data).getMonth()] +" " + new Date(data).getDate();
    }
    export {formatTheWeatherData, getWindDesc, getMonthName};