function refreshweather(response) {
    let temperatureElement = document.querySelector("#temperature");
    let temperature = response.data.temperature.current;
    let cityElement = document.querySelector("#weather-app-city");
   let descriptionElement = document.querySelector("#description");
   let humidityElement = document.querySelector("#humidity");
   let windSpeedElement = document.querySelector("#wind-speed");
   let timeElement = document.querySelector("#time");
   let date = new Date(response.data.time * 1000);
   let iconElement = document.querySelector("#icon"); 
  
  
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-app-icon"/>`





    cityElement.innerHTML = response.data.city;
    timeElement.innerHTML =  formatDate(date);
    humidityElement.innerHTML = `${response.data.temperature.humidity}%`;
    windSpeedElement.innerHTML = `${response.data.wind.speed}km/h`;
descriptionElement.innerHTML = response.data.condition.description;
    temperatureElement.innerHTML = Math.round(temperature);
    getForecast(response.data.city);
    
}

function formatDate(date) {
   
    let minutes = date.getMinutes();
    let hours = date.getHours();
    let days = ["Sunday", "Monday", "Tuesday","Wednesday", "Thursday", "Friday", "Saturday"];
    let day = days[ date.getDay()];

    if (minutes < 10) {
        minutes = `0${minutes}`;
    }
    return `${day} ${hours} : ${minutes}`; 
}


function searchCity(city) {
    let apiKey = "65fb7046d82c7c4d3377a8b9tfd374o0";
    let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&unit=metric`
axios.get(apiUrl).then(refreshweather);
}




function handleSearch(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#search-form-input");
 
    searchCity(searchInput.value);
}

function getForecast(city) {
    let apiKey = "65fb7046d82c7c4d3377a8b9tfd374o0";
    let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&unit=metric`;
   axios(apiUrl).then(displayForecast); 
}

function formatDay(timestemp) {
 let date = new Date(timestemp * 1000);  
 let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
 
 return days[date.getDay()];
}

function displayForecast(response) {


    let forecastHtml ="";

    response.data.daily.forEach(function (day, index) {
        if(index < 5) {
        forecastHtml =  forecastHtml + 
         `
         <div class="row">
<div class="col-2">
   <div class="weather-forecast-date">${formatDay(day.time)}</div> 
<img src="${day.condition.icon_url}" class="weather-forecast-icon"/>
     <div class="Weather-forecast-temperature">
    <span class="Weather-forecast-temperature-max">${Math.round(day.temperature.maximum)}°</span> 
    <span class="Weather-forecast-temperature-min">${Math.round(day.temperature.minimum)}°</span>
    </div>
</div>
</div>
`;
}
    });

    let forecastElement = document.querySelector("#forecast");
   forecastElement.innerHTML = forecastHtml;
}



let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearch);
searchCity("Paris");





