"use strict";

const nav = document.querySelector(".nav");
const buttons = document.querySelectorAll(".link");

const state = {
  data: [],
};


const getJSON = async function () {
    try {
      const response = await fetch("./data.json");
      const data = await response.json();
      state.data = data;
    } catch (error) {
      console.error(error);
    }
  };
  
  const renderData = async function (time) {
    await getJSON();
  
    state.data.forEach((el) => {
      const title = el.title.replace(/ /g, "-");
  
      const currEl = document.querySelector(`.${title}-current`);
      const prevEl = document.querySelector(`.${title}-previous`);
      const { current, previous } = el.timeframes[time];
  
      if (time === "daily")
        document.querySelector(`.${title}-period`).textContent = "Yesterday";
      if (time === "weekly")
        document.querySelector(`.${title}-period`).textContent = "Last Week";
      if (time === "monthly")
        document.querySelector(`.${title}-period`).textContent = "Last Month";
  
      currEl.textContent = current;
      prevEl.textContent = previous;
  
      buttons.forEach((btn) => btn.classList.remove("actlink"));
      document.getElementById(`${time}`).classList.add("actlink");
    });
  };
  
  window.addEventListener("load", function () {
    renderData("weekly");
  });
  
  nav.addEventListener("click", function (e) {
    if (e.target.classList.contains("link")) {
      const time = e.target.id;
      renderData(time);
    }
  });