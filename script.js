const PASSWORD = "8653";

const loginScreen = document.getElementById("login-screen");
const dashboard = document.getElementById("dashboard");
const passwordInput = document.getElementById("password-input");
const loginBtn = document.getElementById("login-btn");

loginBtn.addEventListener("click", () => {
  if (passwordInput.value === PASSWORD) {
    loginScreen.classList.add("hidden");
    dashboard.classList.remove("hidden");
  } else {
    alert("Incorrect password");
  }
});

// Clock
const timeEl = document.getElementById("time");
const dateEl = document.getElementById("date");

function updateClock() {
  const now = new Date();
  timeEl.textContent = now.toLocaleTimeString();
  dateEl.textContent = now.toDateString();
}
setInterval(updateClock, 1000);
updateClock();

// Calendar Events
const datePicker = document.getElementById("date-picker");
const eventInput = document.getElementById("event-input");
const addEventBtn = document.getElementById("add-event-btn");
const eventDisplay = document.getElementById("event-display");

function loadEventForDate(dateStr) {
  const saved = localStorage.getItem("event-" + dateStr);
  eventDisplay.textContent = saved ? `Event: ${saved}` : "No events for this day.";
}

datePicker.addEventListener("change", () => {
  loadEventForDate(datePicker.value);
});

addEventBtn.addEventListener("click", () => {
  const dateStr = datePicker.value;
  const eventName = eventInput.value.trim();
  if (!dateStr || !eventName) return alert("Enter a date and event name.");
  localStorage.setItem("event-" + dateStr, eventName);
  loadEventForDate(dateStr);
  eventInput.value = "";
});

// Developer Quote
const quoteEl = document.getElementById("quote");
const authorEl = document.getElementById("author");

fetch("https://programming-quotes-api.herokuapp.com/quotes/random")
  .then(res => res.json())
  .then(data => {
    quoteEl.textContent = `"${data.en}"`;
    authorEl.textContent = `— ${data.author}`;
  })
  .catch(() => {
    quoteEl.textContent = "Failed to load quote.";
    authorEl.textContent = "";
  });
