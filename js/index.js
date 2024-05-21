// Timer

let seconds = 0;
let minutes = 0;
let hours = 0;
const interval = setInterval(updateTime, 1000);
const firstTime = new Date().getSeconds();

function updateTime() {
  let timer = document.getElementById("timer");
  if (!timer) return;

  const newDate = new Date().getSeconds();
  seconds = newDate - firstTime;
  if (seconds < 0) {
    seconds += 60;
  }

  if (seconds >= 59) {
    minutes++;
  }
  if (minutes >= 60) {
    hours = hours + Math.floor(minutes / 60);
    minutes = minutes % 60;
  }
  timer.textContent = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
}

// Active Nav

const navProfile = document.getElementById("i_nav-profile");
const navMap = document.getElementById("i_nav-map");
const navTimer = document.getElementById("i_nav-timer");
let map = document.getElementById("map");

navMap.addEventListener("click", () => {
  changeNav(navMap, [navProfile, navTimer]);
});
navProfile.addEventListener("click", () =>
  changeNav(navProfile, [navTimer, navMap])
);
navTimer.addEventListener("click", () =>
  changeNav(navTimer, [navProfile, navMap])
);

const changeNav = (btnAdd, removeBtns) => {
  btnAdd.classList.add("i_active");
  removeBtns.forEach((item) => item.classList.remove("i_active"));
};

// Open Window User

let user;
let touchstartX = 0;
let touchendX = 0;
function checkDirection() {
  if (touchendX < touchstartX) {
    user.classList.remove("active-user");
  }
  if (touchendX > touchstartX && user) {
    user.classList.add("active-user");
  }
}

document.body.addEventListener("click", (e) => {
  const profile = document.querySelector("#user.active-user");
  if (!profile) {
    return;
  }

  const path = e.path || (e.composedPath && e.composedPath());
  if (path.includes(profile)) {
    return;
  }
  profile.classList.remove("active-user");
});

document.addEventListener("touchstart", (e) => {
  user = document.getElementById("user");
  touchstartX = e.changedTouches[0].screenX;
});

document.addEventListener("touchend", (e) => {
  touchendX = e.changedTouches[0].screenX;
  checkDirection();
});

// Routing

document.addEventListener("click", (e) => {
  const { target } = e;
  if (!target.matches("nav a")) {
    return;
  }
  e.preventDefault();
  route();
});

const routes = {
  "/TT_WB/": "/TT_WB/pages/activity/activity.html",
  "/TT_WB/map": "/TT_WB/pages/map/map.html",
  "/TT_WB/timer": "/TT_WB/pages/timer/timer.html",
};

const route = (event) => {
  event = event || window.event;
  event.preventDefault();
  window.history.pushState({}, "", event.target.href);
  handleLocation();
};

const handleLocation = async () => {
  const path = window.location.pathname.replace(/index\.html/, "");
  const route = routes[path];
  const html = await fetch(route).then((data) => data.text());
  document.getElementById("content").innerHTML = html;
  if (path === "/TT_WB/map") {
    openMap();
  }
};

window.addEventListener("popstate", handleLocation);

window.route = route;

handleLocation();

// window.map = null;
// const LOCATION = {
//   center: [56.75351637162591, 37.16410006869976], // starting position [lng, lat]
//   zoom: 17, // starting zoom
// };
// if (map) {
//   async function main() {
//     // Waiting for all api elements to be loaded
//     await ymaps3.ready;
//     const { YMap, YMapDefaultSchemeLayer } = ymaps3;
//     // Initialize the map
//     map = new YMap(
//       // Pass the link to the HTMLElement of the container
//       document.getElementById("map"),
//       // Pass the map initialization parameters
//       { location: LOCATION, showScaleInCopyrights: true },
//       // Add a map scheme layer
//       [new YMapDefaultSchemeLayer({})]
//     );
//   }
//   main();
// }
