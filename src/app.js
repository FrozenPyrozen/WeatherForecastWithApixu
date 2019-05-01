"use strict";

const form = document.querySelector(".form");
const input = form.querySelector(".input");
const city = document.querySelector('.forecast-city');

const grid = document.querySelector(".grid");



form.addEventListener("submit", handleSubmit);

const getUserIp = () =>
  fetch("https://api.ipify.org?format=json")
    .then(response => {
      if (response.ok) return response.json();

      throw Error("Error while fetching IP" + response.statusText);
    })
    .then(data => data.ip)
    .catch(err => console.error(err));

const fetchWeather = query =>
  fetch(
    `https://api.apixu.com/v1/forecast.json?key=eb3a86346e5a430ca36125058190105&q=${query}&days=10`
  ).then(response => {
    if (response.ok) return response.json();

    throw Error("Error while fetching weather" + response.statusText);
  });

const renderItems = items =>
  items.reduce(
    (acc, item) =>
      acc +
      `<div class="grid-element"><div class="weather-card"><img src=${item.day.condition.icon} class="weather-img"></img><h2>${item.day.avgtemp_c}℃</h2><p class="text">${item.day.condition.text}</p><p class="date">${item.date}</p></div></div>
`,
    ""
  );

const updateGrid = elem => {
  city.textContent = elem.location.tz_id;
  const markup = renderItems(elem.forecast.forecastday);
  grid.innerHTML = markup;
}

function handleSubmit(event) {
  event.preventDefault();

  fetchWeather(input.value)
  .then(data => updateGrid(data));
}

getUserIp()
    .then(fetchWeather)
    .then(data => updateGrid(data));

