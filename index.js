const now = document.getElementById("dateTime");
const monthYear = document.getElementById("month");
const dates = document.getElementById("calendar-date");

const monthUp = document.getElementById("month-up");
const monthDown = document.getElementById("month-down");
const openMonthYear = document.getElementById("open-month-year");

const selectedTime = document.getElementById("selected-time");

const today = new Date();

let selectedDay = today.getDay();
let selectedMonth = today.getMonth();
let selectedYear = today.getFullYear();

let selectedTimeDate = today.getDate();
let selectedTimeMonth = today.getMonth();
let selectedTimeYear = today.getFullYear();

const renderCalendar = () => {
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

  now.innerText = `${dayName[today.getDay()]}, ${
    monthName[today.getMonth()]
  }, ${today.getDate()}`;

  monthYear.innerText = `${
    monthName[selectedMonth]
  } ${selectedYear.toString()}`;

  //ngay dau thang
  const firstDay = new Date(selectedYear, selectedMonth);
  //ngay cuoi thang
  const lastDay = new Date(selectedYear, selectedMonth + 1, 0);
  //ngay cuoi thang truoc
  const lastDateOfLastMonth = new Date(selectedYear, selectedMonth, 0);

  dates.innerHTML = "";

  //hien thi cac ngay truoc thang hien tai
  for (let i = firstDay.getDay(); i > 0; i--) {
    const day = document.createElement("div");
    day.classList.add("day");
    day.innerText = lastDateOfLastMonth.getDate() - i + 1;
    day.classList.add("inactive");
    dates.appendChild(day);
  }

  //tạo các ngày trong tháng
  for (let i = 1; i <= lastDay.getDate(); i++) {
    const day = document.createElement("div");
    day.classList.add("day");
    day.innerText = i;
    dates.appendChild(day);

    //danh dau today
    if (
      i === today.getDate() &&
      selectedMonth === today.getMonth() &&
      selectedYear === today.getFullYear()
    ) {
      day.classList.add("today");
    }

    //footer
    selectedTime.innerText = "Today";
  }

  //neu ngay cuoi cung cua thang khong phai la chu nhat
  //hien thi cac ngay sau thang hien tai
  if (lastDay.getDay() !== 6) {
    for (let i = 1; i <= 7 - lastDay.getDay(); i++) {
      const day = document.createElement("div");
      day.classList.add("day");
      day.innerText = i;
      day.classList.add("inactive");
      dates.appendChild(day);
    }
  }

  //neu ngay cuoi cung cua thang la chu nhat
  //hien thi 1 tuan tiep theo
  if (lastDay.getDay() === 6) {
    for (let i = 1; i <= 7; i++) {
      const day = document.createElement("div");
      day.classList.add("day");
      day.innerText = i;
      day.classList.add("inactive");
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

// chuyen thang
monthUp.addEventListener("click", () => {
  if (selectedMonth === 11) {
    selectedMonth = 0;
    selectedYear++;
  } else {
    selectedMonth++;
  }
  renderCalendar();
});

monthDown.addEventListener("click", () => {
  if (selectedMonth === 0) {
    selectedMonth = 11;
    selectedYear--;
  } else {
    selectedMonth--;
  }
  renderCalendar();
});

renderCalendar();
