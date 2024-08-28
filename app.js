const apiKey = '4df1efb015dc74606b2d00ac270020a7'; // Replace with your OpenWeatherMap API key

async function getWeather() {
    const location = document.getElementById('location').value;
    const weatherInfo = document.getElementById('weather-info');
    const errorMessage = document.getElementById('error-message');

    if (!location) {
        errorMessage.textContent = 'Please enter a location.';
        return;
    }

    errorMessage.textContent = ''; // Clear previous errors

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`);
        if (!response.ok) {
            throw new Error('Location not found');
        }
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        errorMessage.textContent = error.message;
        weatherInfo.innerHTML = ''; // Clear previous weather info
    }
}

function displayWeather(data) {
    const weatherInfo = document.getElementById('weather-info');

    const { name, main, weather } = data;
    const temperature = main.temp;
    const description = weather[0].description;
    const humidity = main.humidity;
    const windSpeed = data.wind.speed;

    weatherInfo.innerHTML = `
        <h2>Weather in ${name}</h2>
        <p><strong>Temperature:</strong> ${temperature}°C</p>
        <p><strong>Description:</strong> ${description}</p>
        <p><strong>Humidity:</strong> ${humidity}%</p>
        <p><strong>Wind Speed:</strong> ${windSpeed} m/s</p>
    `;
}
