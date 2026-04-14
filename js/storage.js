import { shifts, setShifts } from "./data.js";

export function saveData() {
    localStorage.setItem("shifts", JSON.stringify(shifts))
}

export function loadShifts() {
    const data = localStorage.getItem("shifts");
    setShifts(data ? JSON.parse(data) : []);

}
