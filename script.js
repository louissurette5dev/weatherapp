const apiKey = "YOUR_API_KEY_HERE"; // OpenWeatherMap API key

const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherResult = document.getElementById("weatherResult");
const errorEl = document.getElementById("error");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (!city) {
    showError("Please enter a city name");
    return;
  }
  getWeather(city);
});

async function getWeather(city) {
  try {
    hideError();
    weatherResult.classList.add("hidden");

    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    showError(error.message);
  }
}

function displayWeather(data) {
  const { name } = data;
  const { temp, humidity } = data.main;
  const { description } = data.weather[0];
  const { speed } = data.wind;

  weatherResult.innerHTML = `
    <h2>${name}</h2>
    <p><strong>${Math.round(temp)}°C</strong></p>
    <p>${description}</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind: ${speed} m/s</p>
  `;

  weatherResult.classList.remove("hidden");
}

function showError(message) {
  errorEl.textContent = message;
  errorEl.classList.remove("hidden");
}

function hideError() {
  errorEl.classList.add("hidden");
}
