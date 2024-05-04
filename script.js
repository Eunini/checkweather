// Function to get user's location
function getUserLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        // Reverse geocoding
        fetch(`https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`)
            // https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en
          .then(response => response.json())
          .then(data => {
            console.log(data)
            const country = data.countryName;
            const state = data.principalSubdivision;
        
            // Display location information
            const locationElement = document.querySelector(".city");
            locationElement.textContent = `${country}`;

            // Fetch weather data
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=fbc2f26cbf729b925928e73e648c3d88`)
              .then(response => response.json())
              .then(weatherData => {
                console.log(weatherData)
                const temperature = Math.round(weatherData.main.temp);
                const humidity = weatherData.main.humidity;
                const pressure = weatherData.main.pressure;
                const wind = weatherData.wind.speed;
                const feel = Math.round(weatherData.main.feels_like);
                // Display weather information

                
                const weatherTemp = document.getElementById("temp");
                weatherTemp.textContent = `${temperature}°C`;

                const weatherPressure = document.getElementById("pressure");
                weatherPressure.textContent = `${pressure}Pa`;

                const weatherHumid = document.getElementById("humidity");
                weatherHumid.textContent = `${humidity}%`;

                const weatherWind = document.getElementById("wind");
                weatherWind.textContent = `${wind}km/hr`;

                const weatherFeel = document.getElementById("feels");
                weatherFeel.textContent = `${feel}°C`;

                if(weatherData.weather[0].main == "Clouds") {
                    weatherIcon.src = "images/clouds.png"
                    document.body.style.backgroundImage = "url('images/cloudy.jpeg')";
                
                  }
                  else if(weatherData.weather[0].main == "Clear") {
                    weatherIcon.src = "images/clear.png"
                    document.body.style.backgroundImage = "url('clear.jpeg')";
                  }
                
                  else if(  weatherData.weather[0].main == "Rain") {
                    weatherIcon.src = "images/rain.png"
                    document.body.style.backgroundImage = "url('images/rainy.jpeg')";
                  }
                
                  else if(weatherData.weather[0].main == "Drizzle") {
                    weatherIcon.src = "images/drizzle.png"
                    document.body.style.backgroundImage = "url('images/drizzle.jpeg')";
                  }
                
                  else if(weatherData.weather[0].main == "Mist") {
                    weatherIcon.src = "images/mist.png"
                    document.body.style.backgroundImage = "url('images/mist.jpeg')";
                  }
                
                  else if(weatherData.weather[0].main == "Wind") {
                    weatherIcon.src = "images/rain.png"
                    document.body.style.backgroundImage = "url('images/windy.jpg')";
                  }
                  
                  else if(weatherData.weather[0].main == "Snow") {
                    weatherIcon.src = "images/snow.png"
                    document.body.style.backgroundImage = "url('images/snow.jpeg')";
                  }
        
              })
        
              .catch(error => {
                console.error("Error fetching weather data:", error);
                // Handle error fetching weather data
              })
          })
          .catch(error => {
            console.error("Error fetching location data:", error);
            // Handle error fetching location data
          });
      }, (error) => {
        console.error("Error getting location:", error);
        // Handle error getting location
      });
    } else {
      console.error("Geolocation is not supported by this browser.");
      // Handle lack of geolocation support
    }
  }

  // Call function to get user's location and weather
  getUserLocation(); 
 
 
 
 
 
 
//  for onclick function
 const apiKey = 'fbc2f26cbf729b925928e73e648c3d88'; 
 const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
  
const mylocation = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-img');
const background = document.getElementById("background")


async function getWeather(cityname) {
  const response = await fetch(apiUrl + cityname + `&appid=${apiKey}`);
  var data = await response.json();
  console.log(data);

  document.querySelector(".city").innerHTML = data.name;
  document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + '°C';
  document.querySelector(".humidity").innerHTML = data.main.humidity + '%';
  document.querySelector(".wind").innerHTML = data.wind.speed + 'km/hr';
  document.querySelector(".pressure").innerHTML = data.main.pressure + 'Pa';
  document.querySelector(".feels").innerHTML = Math.round(data.main.feels_like) + '°C';

  if(data.weather[0].main == "Clouds") {
    weatherIcon.src = "images/clouds.png"
    document.body.style.backgroundImage = "url('images/cloudy.jpeg')";

  }
  else if(data.weather[0].main == "Clear") {
    weatherIcon.src = "images/clear.png"
    document.body.style.backgroundImage = "url('clear.jpeg')";
  }

  else if(data.weather[0].main == "Rain") {
    weatherIcon.src = "images/rain.png"
    document.body.style.backgroundImage = "url('images/rainy.jpeg')";
  }

  else if(data.weather[0].main == "Drizzle") {
    weatherIcon.src = "images/drizzle.png"
    document.body.style.backgroundImage = "url('images/drizzle.jpeg')";
  }

  else if(data.weather[0].main == "Mist") {
    weatherIcon.src = "images/mist.png"
    document.body.style.backgroundImage = "url('images/mist.jpeg')";
  }

  else if(data.weather[0].main == "Wind") {
    weatherIcon.src = "images/rain.png"
    document.body.style.backgroundImage = "url('images/windy.jpg')";
  }
  
  else if(data.weather[0].main == "Snow") {
    weatherIcon.src = "images/snow.png"
    document.body.style.backgroundImage = "url('images/snow.jpeg')";
  }
}
searchBtn.addEventListener("click", () => {
    getWeather(mylocation.value);
});




