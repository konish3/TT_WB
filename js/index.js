document.addEventListener("DOMContentLoaded", () => {
  let timer = document.getElementById("timer");
  let resetBtn = document.getElementById("resetBtn");
  let deleteBtn = document.getElementById("deleteBtn");

  const interval = setInterval(updateTime, 1000);

  let seconds = 0;
  let minutes = 0;
  let hours = 0;

  function updateTime() {
    seconds++;
    if (seconds === 60) {
      minutes++;
      seconds = 0;
    }
    if (minutes === 60) {
      hours++;
      minutes = 0;
    }
    timer.textContent = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }
  resetBtn.addEventListener("click", () => {
    seconds = 0;
    minutes = 0;
    hours = 0;
    timer.textContent = "00:00:00";
    resetBtn.disabled = true;
  });
  deleteBtn.addEventListener("click", () => {
    clearInterval(interval);
    seconds = 0;
    minutes = 0;
    hours = 0;
    timer.textContent = "00:00:00";
    deleteBtn.disabled = true;
  });

  const navProfile = document.getElementById("i_nav-profile");
  const navMap = document.getElementById("i_nav-map");
  const navTimer = document.getElementById("i_nav-timer");

  navMap.addEventListener("click", () => {
    navMap.classList.add("i_active");
    navProfile.classList.remove("i_active");
    navTimer.classList.remove("i_active");
  });
  navProfile.addEventListener("click", () => {
    navProfile.classList.add("i_active");
    navMap.classList.remove("i_active");
    navTimer.classList.remove("i_active");
  });
  navTimer.addEventListener("click", () => {
    navTimer.classList.add("i_active");
    navProfile.classList.remove("i_active");
    navMap.classList.remove("i_active");
  });

  const user = document.getElementById("user");

  let touchstartX = 0;
  let touchendX = 0;

  function checkDirection() {
    if (touchendX < touchstartX) {
      user.classList.remove("active-user");
    }
    if (touchendX > touchstartX) {
      user.classList.add("active-user");
    }
  }

  document.body.addEventListener("click", (e) => {
    const profile = document.querySelector("#user.active-user");

    if (!profile) {
      return null;
    }

    const path = e.path || (e.composedPath && e.composedPath());
    if (path.includes(profile)) {
      return;
    }
    profile.classList.remove("active-user");
  });

  document.addEventListener("touchstart", (e) => {
    touchstartX = e.changedTouches[0].screenX;
  });

  document.addEventListener("touchend", (e) => {
    touchendX = e.changedTouches[0].screenX;
    checkDirection();
  });
});
