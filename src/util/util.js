const formatTheWeatherData = (data, convUnit) => {
    let newObj = {};
    data.forEach((d) => {
        let dateTime = d.dt_txt.split(' ');
        if (Object.keys(newObj).includes(dateTime[0])) {
            newObj[dateTime[0]].avgTemp += d.main.temp;
        }
        else {
            newObj[dateTime[0]] = {
                date: getMonthName(d.dt_txt),
                tempUnit : convUnit ? convUnit: "fahrenheit",
                avgTemp: convertTempUnits(d.main.temp, convUnit)
            }
        };
        newObj[dateTime[0]]["time"] = newObj[dateTime[0]]["time"] ? newObj[dateTime[0]]["time"] : [];
        newObj[dateTime[0]]["time"].push({
            "temp": convertTempUnits(d.main.temp, convUnit),
            "pressure": d.main.pressure + " Pa",
            "humidity": d.main.humidity + " %",
            "visibility": d.visibility / 1000 + " km",
            "RainType": d.weather[0].main,
            "RainTypeDesc": d.weather[0].main === "Rain" ? d.weather[0].description : "Few " + d.weather[0].description,
            "RainTypeId": d.weather[0].id,
            "windDesc": getWindDesc(d.wind.speed),
            "windSpeed": d.wind.speed + "m/s W",
            "tempMinMax": `The high will be ${convertTempUnits(d.main.temp_max, convUnit)}, the low will be ${convertTempUnits(d.main.temp_max, convUnit)}`,
            "time": d.dt_txt,
            "timeValue": dateTime[1]
        });
        newObj[dateTime[0]]["avgTemp"] = newObj[dateTime[0]]["avgTemp"] / newObj[dateTime[0]]["time"].length;
    });
    return newObj;
}

const getWindDesc = (data) => {
    if (data > 1 || data < 3) {
        return "Light Air";
    } else if (data > 4 || data < 7) {
        return "Light Breeze";
    } else if (data > 8 || data < 12) {
        return "Gentle Breeze";
    } else if (data > 13 || data < 18) {
        return "Moderate Breeze";
    }
}

const getMonthName = (data) => {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    return monthNames[new Date(data).getMonth()] + " " + new Date(data).getDate();
}

const convertTempUnits = (temp, convUnit) => {
    if (convUnit === "celcius") {
        return Math.round((temp - 32) * (5 / 9)) + "°C";
    } else if (convUnit === "fahrenheit") {
        return Math.round((temp * (9 / 5)) + 32) + "°F";
    } else return temp;
}
export { formatTheWeatherData, getWindDesc, getMonthName, convertTempUnits };