import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

const form = document.querySelector("#userForm");
const addBtn = document.querySelector(".add-btn");
const dateContainer = document.querySelector(".date-container")
const inputContainer = document.querySelector(".input-container")


let shifts = [];
let currentWeekOffSet = 0;

loadShifts();
refreshUI();

function refreshUI() {
    renderWeekDates(currentWeekOffSet)
    renderAllShift(getWeekShift(currentWeekOffSet))
}


function renderWeekDates(offSet) {
    const weekDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

    const weekStart = getWeekStart(offSet);

    weekDays.forEach((day, index) => {
        const dateContainer = document.querySelector(`#${day} .date-container`)

        if (dateContainer) {
            dateContainer.innerHTML = "";

            const currentDate = weekStart.add(index, "day");
            const currentDay = document.createElement("p");
            currentDay.classList.add("week-day");
            currentDay.textContent = formatDate(currentDate);
            dateContainer.append(currentDay);
        }
    })

}


function renderAllShift(shifts) {
    const weekDays = ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];

    weekDays.forEach(day => {
        const container = document.querySelector(`#${day} .shift-container`)
        if (container) container.innerHTML = "";
    })

    shifts.forEach(shift => {
        const dayName = getDayName(shift.date).toLowerCase();
        const container = document.querySelector(`#${dayName} .shift-container`);
        if (container) {

            const shiftCard = document.createElement("div");
            shiftCard.classList.add("shift-card");

            shiftCard.innerHTML = `
                <div class="hour-display">
                    <img src="assets/icons/clock-svgrepo-com.svg" alt="">
                    <p>${shift.startTime} - ${shift.endTime}</p>
                </div>

                <div class="break-display">
                    <img src="assets/icons/coffee-svgrepo-com.svg" alt="">
                    <p>break: ${shift.break} mins</p>
                </div>

                <div class="location-display">
                    <img src="assets/icons/location-svgrepo-com.svg" alt="">
                    <p>${shift.workPlace}</p>
                </div>

                <div class="totalhour-display">
                    <p>${convertHour(shift.totalMin)}</p>
                </div>
            `;

            container.append(shiftCard);
        }
    });
}

function displayError() {

    if (inputContainer) {

        const messageDiv = document.createElement("div");
        messageDiv.classList.add("error-display");

        messageDiv.innerHTML = `
                <h2>Error!</h2>
                <p>Please input shift within this week!</p>
        `;

        inputContainer.append(messageDiv);
    }

}

function clearMessage() {

}

function addNewShift() {
    const formData = Object.fromEntries(new FormData(form));

    const newShift = {
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        totalMin: getTotalMins(formData.startTime, formData.endTime),
        break: formData.break,
        workPlace: formData.workPlace
    }

    if (!isSelectedWeek(newShift)) {
        displayError();
        return;
    }

    shifts.push(newShift);
    saveData();
    refreshUI();
}


addBtn.addEventListener("click", (e) => {
    e.preventDefault();

    //clearMessage();
    addNewShift();

})


function getSelectedWeek(offSet) {
    return dayjs().add(offSet, "week");
}

function isSelectedWeek(shift, offSet) {
    const shiftDate = dayjs(shift.date);
    const targetWeek = dayjs().add(offSet, "week");

    return shiftDate.isSame(targetWeek, "week")
}

function getWeekStart(offset) {
    return getSelectedWeek(offset).startOf("week")
}

function getWeekEnd(offSet) {
    return getSelectedWeek(offSet).endOf("week")
}

function formatDate(date) {
    return dayjs(date).format("D MMM YYYY")
}

function isCurrentWeek(shift) {
    const shiftDate = dayjs(shift.date);

    const startOfWeek = dayjs().startOf("week");
    const endOfWeek = dayjs().endOf("week");

    return shiftDate.isAfter(startOfWeek.subtract(1, "millisecond"))
        && shiftDate.isBefore(endOfWeek.add(1, "millisecond"));
}

function isSameWeek(offSet) {
    return dayjs().isSame(getSelectedWeek(offSet), 'week')
}

function getWeekShift(offSet) {
    const targetWeek = dayjs().add(offSet, "week");

    return shifts.filter((shift) => {
        return dayjs(shift.date).isSame(targetWeek, "week")
    })
}

function getTotalMins(start, end) {

    const [startHour, startMin] = start.split(":").map(Number);
    const [endHour, endMin] = end.split(":").map(Number)

    return (endHour * 60 + endMin) - (startHour * 60 + startMin)
}

function convertHour(totalmins) {
    const hours = Math.floor(totalmins / 60);
    const mins = totalmins % 60;

    return `${hours}h ${mins}m`;
}

function getDayName(date) {
    const days = ["sunday", 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[(new Date(date).getDay())];
}


// functions for data persistence using local storage

function saveData() {
    localStorage.setItem("shifts", JSON.stringify(shifts))
}

function loadShifts() {
    const data = localStorage.getItem("shifts");
    shifts = data ? JSON.parse(data) : [];

}
