import { shifts, setShifts } from "./data.js";

export function saveData() {
    localStorage.setItem("shifts", JSON.stringify(shifts))
}

export function loadShifts() {
    const data = localStorage.getItem("shifts");
    setShifts(data ? JSON.parse(data) : []);

}

// This function is only temporary as it deletes everything on local storage
export function deleteData() {
    localStorage.removeItem("shifts");
}
