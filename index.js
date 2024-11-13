const now = document.getElementById("dateTime");
const monthYear = document.getElementById("month");

const up = document.getElementById("month-up");
const down = document.getElementById("month-down");
const openMonthYear = document.getElementById("open-month-year");

const selectedTime = document.getElementById("selected-time");
const calendarContainer = document.getElementById("calendar-container");

const today = new Date();

let selectedDay = today.getDay();
let selectedMonth = today.getMonth();
let selectedYear = today.getFullYear();

let selectedTimeDate = today.getDate();
let selectedTimeMonth = today.getMonth();
let selectedTimeYear = today.getFullYear();

let view = "dateOfMonth";

const monthName = [
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

const dayName = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const renderCalendarHeader = () => {
  now.innerText = `${dayName[today.getDay()]}, ${
    monthName[today.getMonth()]
  } ${today.getDate()}`;
};

const renderDateOfMonth = () => {
  monthYear.innerText = `${monthName[selectedMonth]} ${selectedYear}`;
  calendarContainer.innerHTML = "";

  const calendarDay = document.createElement("div");
  calendarDay.classList.add("calendar-day");
  calendarDay.innerHTML = `
      <div class="day">Su</div>
      <div class="day">Mo</div>
      <div class="day">Tu</div>
      <div class="day">We</div>
      <div class="day">Th</div>
      <div class="day">Fr</div>
      <div class="day">Sa</div>
  `;
  calendarContainer.appendChild(calendarDay);

  const dates = document.createElement("div");
  dates.classList.add("calendar-date");
  calendarContainer.appendChild(dates);

  const firstDay = new Date(selectedYear, selectedMonth, 1);
  const lastDay = new Date(selectedYear, selectedMonth + 1, 0);
  const lastDateOfLastMonth = new Date(selectedYear, selectedMonth, 0);

  for (let i = firstDay.getDay(); i > 0; i--) {
    const day = document.createElement("div");
    day.classList.add("day", "inactive");
    day.innerText = lastDateOfLastMonth.getDate() - i + 1;
    dates.appendChild(day);
  }

  for (let i = 1; i <= lastDay.getDate(); i++) {
    const day = document.createElement("div");
    day.classList.add("day");
    day.innerText = i;
    dates.appendChild(day);

    if (
      i === today.getDate() &&
      selectedMonth === today.getMonth() &&
      selectedYear === today.getFullYear()
    ) {
      day.classList.add("today");
    }
  }

  if (lastDay.getDay() !== 6) {
    for (let i = 1; i <= 6 - lastDay.getDay(); i++) {
      const day = document.createElement("div");
      day.classList.add("day", "inactive");
      day.innerText = i;
      dates.appendChild(day);
    }
  }

  //chon ngay
  const allDays = document.querySelectorAll(".day");
  allDays.forEach((day) => {
    day.addEventListener("click", () => {
      allDays.forEach((d) => d.classList.remove("selected"));
      day.classList.add("selected");
      selectedTimeDate = day.innerText;
      selectedTimeMonth = selectedMonth;
      selectedTimeYear = selectedYear;
      selectedDay = new Date(
        selectedTimeYear,
        selectedTimeMonth,
        selectedTimeDate
      ).getDay();
      console.log();
      //cap nhat tg o footer
      selectedTime.innerText = `${dayName[selectedDay]} ${selectedTimeDate}`;
    });
  });

};

const changeMonth = (i) => {
  if (view === "dateOfMonth") {
    selectedMonth += i;
    if (selectedMonth > 11) {
      selectedMonth = 0;
      selectedYear++;
    } else if (selectedMonth < 0) {
      selectedMonth = 11;
      selectedYear--;
    }
    renderDateOfMonth();
  } else if (view === "monthOfYear") {
    selectedYear += i;
    monthYear.innerText = `${selectedYear}`;
  } else {
    if (view === "selectedYear") {
      selectedYear += (i > 0) ? 10 : -10;
      renderYear();
    }
  }
};

const renderMonthOfYear = () => {
  const monthOfYearContainer = document.createElement("div");
  monthOfYearContainer.classList.add("monthOfYear");
  calendarContainer.innerHTML = "";
  calendarContainer.appendChild(monthOfYearContainer);

  monthYear.innerText = `${selectedYear}`;

  for (let i = 0; i < 16; i++) {
    const monthElement = document.createElement("div");
    monthElement.innerText = monthName[i % 12].slice(0, 3);
    monthElement.classList.add("monthElement");

    if (i >= 12) {
      monthElement.classList.add("inactive");
    }

    monthOfYearContainer.appendChild(monthElement);

    const tmp = selectedYear;
    monthElement.addEventListener("click", () => {
      selectedMonth = i % 12;
      selectedYear === i >= 12 ? tmp + 1 : tmp;
      view = "dateOfMonth";
      renderDateOfMonth();
    });
  }
};

const renderYear = () => {
  const yearContainer = document.createElement("div");
  yearContainer.classList.add("yearContainer");
  calendarContainer.innerHTML = "";

  monthYear.innerText = `${selectedYear - 4} - ${selectedYear + 5}`;
  calendarContainer.appendChild(yearContainer);

  for (let i = 0; i < 16; i++) {
    const yearElement = document.createElement("div");
    yearElement.innerText = `${selectedYear - 4 + i}`;
    yearElement.classList.add("yearElement");
    if (i >= 12) {
      yearElement.classList.add("inactive");
    }
    yearContainer.appendChild(yearElement);

    yearElement.addEventListener('click', () => {
      selectedYear = parseInt(yearElement.innerText, 10);
      view = "monthOfYear";
      renderMonthOfYear();
    })
  }
  
};

monthYear.addEventListener("click", () => {
  view = view === "dateOfMonth" ? "monthOfYear" : "selectedYear";
  view === "dateOfMonth"
    ? renderDateOfMonth()
    : view === "monthOfYear"
    ? renderMonthOfYear()
    : renderYear();
});

up.addEventListener("click", () => changeMonth(1));
down.addEventListener("click", () => changeMonth(-1));

const initializeCalendar = () => {
  renderCalendarHeader();
  renderDateOfMonth();
};

initializeCalendar();
