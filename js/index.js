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
const navLink = document.getElementById("nav-list");
const navLinks = navLink.querySelectorAll("a");

navLink.addEventListener("click", (e) => {
  const { target } = e;
  if (target.matches(".i_active")) {
    return;
  }
  navLinks.forEach((item) =>
    item.matches(".i_active") ? item.classList.remove("i_active") : null
  );
  target.classList.add("i_active");
});

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
