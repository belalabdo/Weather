"use strict";

let weatherContainer = document.querySelector(".weather");
let input = document.querySelector(".input").firstElementChild;

let date = new Date();
const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

async function getWeather(city) {
  let api;
  try {
    api = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=1e13010630434c57a5542440230902&q=${city}&days=3`
    );
  } catch (err) {}
  let result = await api.json();
  if (result.error == undefined) {
    displayCurrentDay(result);
    displaySecondDay(result);
    displayThirdDay(result);
  } else {
    displayNotFound();
  }
}

function displayCurrentDay(api) {
  /* this is the parent item that will represnt all the weather info */
  let item = document.createElement("div");
  addClasses(item, "item col-4 p-0");

  /* Creating and compiling item header */
  let itemHeader = document.createElement("div");
  addClasses(itemHeader, "item-header d-flex justify-content-between p-2");

  // setting the current day in a span
  let day = document.createElement("span");
  day.innerText = weekDays[date.getDay()];

  // setting the current date in a another span
  let dateSpan = document.createElement("span");
  dateSpan.innerText = `${date.getDate()}, ${months[date.getMonth()]}`;

  // compiling both in one div to separate
  itemHeader.appendChild(day);
  itemHeader.appendChild(dateSpan);

  /* Creating and compiling item content */
  let itemContent = document.createElement("div");
  addClasses(itemContent, "item-content p-4");

  // setting city name
  let city = document.createElement("p");
  city.innerText = api.location.name;

  /* creating and preparing the div that will be the
  container of the degree value and condidtin img */
  let deg = document.createElement("div");
  addClasses(deg, "d-flex mb-4 justify-content-between align-items-center");

  // setting degree value
  let degVal = document.createElement("span");
  addClasses(degVal, "text-white me-2");
  degVal.innerText = api.current.temp_c + "°C";

  // preparing condition img
  let conditionImg = document.createElement("img");
  conditionImg.src = api.current.condition.icon;

  // compiling the degree value and condition img in one div
  deg.appendChild(degVal);
  deg.appendChild(conditionImg);

  // setting the condition value in a span
  let condition = document.createElement("span");
  condition.setAttribute("class", "condi");
  condition.innerText = api.current.condition.text;

  // compiling all the content in the itemContent
  itemContent.appendChild(city);
  itemContent.appendChild(deg);
  itemContent.appendChild(condition);

  // compiling all these elements in the very first element
  item.appendChild(itemHeader);
  item.appendChild(itemContent);

  // appending the item in the row
  weatherContainer.innerHTML = "";
  weatherContainer.appendChild(item);
}

function displaySecondDay(api) {
  /* this is the parent item that will represnt all the weather info of the next day */
  let item = document.createElement("div");
  addClasses(item, "item col-4 p-0");

  // creating the header div
  let itemHeader = document.createElement("div");
  addClasses(itemHeader, "item-header d-flex justify-content-center p-2");
  // creating the span that will contain the day text
  let day = document.createElement("span");
  day.innerText = weekDays[date.getDay() + 1];

  //compiling the day span in the header
  itemHeader.appendChild(day);

  //creating the itemContent div
  let itemContent = document.createElement("div");
  addClasses(
    itemContent,
    "item-content d-flex flex-column justify-content-center align-items-center"
  );

  // creating the condition img tag
  let condImg = document.createElement("img");
  condImg.src = api.forecast.forecastday[1].day.condition.icon;

  // creating the span that will contain the maxtemp_c
  let max_temp = document.createElement("span");
  addClasses(max_temp, "maxDeg fs-4 text-white");
  max_temp.innerText = api.forecast.forecastday[1].day.maxtemp_c;

  // creating the span that will contain the mintemp_c
  let min_temp = document.createElement("span");
  min_temp.setAttribute("class", "minDeg");
  min_temp.innerText = api.forecast.forecastday[1].day.mintemp_c;

  //creating the span that will contain te condition text
  let conditionText = document.createElement("span");
  addClasses(conditionText, "condi mt-4");
  conditionText.innerText = api.forecast.forecastday[1].day.condition.text;

  /* compiling all the info in the itemContent */
  itemContent.appendChild(condImg);
  itemContent.appendChild(max_temp);
  itemContent.appendChild(min_temp);
  itemContent.appendChild(conditionText);

  // and finaly compiling the itemHeader and the itemContent in the parent item
  item.appendChild(itemHeader);
  item.appendChild(itemContent);

  // appending the item in the row
  weatherContainer.appendChild(item);
}

function displayThirdDay(api) {
  /* this is the parent item that will represnt all the weather info of the next day */
  let item = document.createElement("div");
  addClasses(item, "item col-4 p-0");

  // creating the header div
  let itemHeader = document.createElement("div");
  addClasses(itemHeader, "item-header d-flex justify-content-center p-2");
  // creating the span that will contain the day text
  let day = document.createElement("span");
  let thisDay = date.getDay() == weekDays.length + 1 ? date.getDay() - (date.getDay() + 1);
  day.innerText = weekDays[date.getDay() + 2];

  //compiling the day span in the header
  itemHeader.appendChild(day);

  //creating the itemContent div
  let itemContent = document.createElement("div");
  addClasses(
    itemContent,
    "item-content d-flex flex-column justify-content-center align-items-center"
  );

  // creating the condition img tag
  let condImg = document.createElement("img");
  condImg.src = api.forecast.forecastday[2].day.condition.icon;

  // creating the span that will contain the maxtemp_c
  let max_temp = document.createElement("span");
  addClasses(max_temp, "maxDeg fs-4 text-white");
  max_temp.innerText = api.forecast.forecastday[2].day.maxtemp_c;

  // creating the span that will contain the mintemp_c
  let min_temp = document.createElement("span");
  min_temp.setAttribute("class", "minDeg");
  min_temp.innerText = api.forecast.forecastday[2].day.mintemp_c;

  //creating the span that will contain te condition text
  let conditionText = document.createElement("span");
  addClasses(conditionText, "condi mt-4");
  conditionText.innerText = api.forecast.forecastday[2].day.condition.text;

  /* compiling all the info in the itemContent */
  itemContent.appendChild(condImg);
  itemContent.appendChild(max_temp);
  itemContent.appendChild(min_temp);
  itemContent.appendChild(conditionText);

  // and finaly compiling the itemHeader and the itemContent in the parent item
  item.appendChild(itemHeader);
  item.appendChild(itemContent);

  // appending the item in the row
  weatherContainer.appendChild(item);
}

function addClasses(ele, classes) {
  classes = classes.split(" ");
  for (let i = 0; i < classes.length; i++) {
    ele.classList.add(classes[i]);
  }
}

function displayNotFound() {
  let notFoundItem = document.createElement("div");
  addClasses(
    notFoundItem,
    "notfound col-12 p-5 d-flex justify-content-center flex-column align-items-center"
  );
  notFoundItem.innerHTML =
    '<span class="">\
    <i class="fa-solid fa-face-dizzy"></i>\
    </span>\
    <p class="text-white">Oh Oo, cannot found this country</p>\
    ';
  weatherContainer.innerHTML = "";
  weatherContainer.appendChild(notFoundItem);
}

getWeather("Ismailia");

input.addEventListener("input", function () {
  getWeather(input.value);
});
