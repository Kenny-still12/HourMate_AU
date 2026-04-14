import { currentWeekOffSet, NEXT_WEEK_OFFSET, PREV_WEEK_OFFSET, setCurrentWeekOffset, setShifts } from "./data.js"
import { refreshUI, displayError, clearMessage } from "./render.js"
import { shifts } from "./data.js"
import { loadShifts, saveData } from "./storage.js"
import { getTotalMins } from "./logic.js"
import { validateShift } from "./validation.js";


const form = document.querySelector("#userForm");
const addBtn = document.querySelector(".add-btn");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const deleteBtn = document.querySelector(".delete-btn");

loadShifts();
refreshUI();


function addNewShift() {
    const formData = Object.fromEntries(new FormData(form));

    const newShift = {
        shiftId: crypto.randomUUID(),
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        totalMin: getTotalMins(formData.startTime, formData.endTime),
        break: Number(formData.break),
        workPlace: formData.workPlace
    }

    if (!validateShift(newShift)) return;

    clearMessage();
    shifts.push(newShift);
    saveData();
    refreshUI();
}


addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    //clearMessage();
    addNewShift();

})

prevBtn.addEventListener("click", (e) => {
    e.preventDefault();
    setCurrentWeekOffset(PREV_WEEK_OFFSET);
    console.log(currentWeekOffSet)
    refreshUI();
})

nextBtn.addEventListener("click", (e) => {
    e.preventDefault();
    setCurrentWeekOffset(NEXT_WEEK_OFFSET);
    console.log(currentWeekOffSet)
    refreshUI();
})


document.addEventListener("click", (e) => {
    const target = e.target.closest(".delete");
    if (!target) return;

    const id = target.dataset.id;
    if (!id) return;

    setShifts(shifts.filter(function (shift) {
        return shift.shiftId !== id;
    }));
    saveData();
    refreshUI();

})

