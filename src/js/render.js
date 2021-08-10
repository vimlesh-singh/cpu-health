const si = require('systeminformation');

const outsideTemperatureEle = document.getElementById('outside-temperature');
const cpuTemperatureEle = document.getElementById('cpu-temperature');
const weatherTempRefreshTime = 3600000; // time in milliseconds (60 * 60 * 1000 = 1 hour)
const cpuTempRefreshTime = 120000; // time in milliseconds (2 * 60 * 1000 = 2 min)

//Todo get current location lat and long from the browser. 
//default lat long  for london
let lat = 51.5074,
  long = 0.127,
  unit = 'metric';
const key = `5134e3bec13f364abfa6e69f57aae49e`;
const getWeatherUrl =
  `https://api.openweathermap.org/data/2.5/onecall` +
  `?lat=${lat}&lon=${long}&exclude={part}&units=${unit}` +
  `&appid=${key}`;

const getOutsideTemperatureAndOutput = () => {
  fetch(getWeatherUrl)
    .then(resp => resp.json())
    .then(data => (outsideTemperatureEle.innerHTML = `${data.current.temp} °C`))
    .catch(err => console.log(err));
};

const getCPUTemperatureAndOutput = () => {
  si.cpuTemperature().then(data => {
    //Todo Need to get cpu core tempeture . getting null
    console.log(data);
    cpuTemperatureEle.innerHTML = ` °C`;
  });
};
getOutsideTemperatureAndOutput();
getCPUTemperatureAndOutput();
setInterval(getOutsideTemperatureAndOutput, weatherTempRefreshTime);
setInterval(getCPUTemperatureAndOutput, cpuTempRefreshTime);
