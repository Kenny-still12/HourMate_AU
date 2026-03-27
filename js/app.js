const form = document.querySelector("#userForm");
const addBtn = document.querySelector(".add-btn");


const shifts = [];


addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(form));

    const newShift = {
        date: formData.date,
        startTime: formData.startTime,
        endTime: formData.endTime,
        totalMin: getTotalHours(formData.startTime, formData.endTime),
        break: formData.break,
        workPlace: formData.workPlace
    }
    shifts.push(newShift)
    console.log(newShift)
    console.log(convertHour(newShift.totalMin))
})


function getTotalHours(start, end) {

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
    const days = ["monday", 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    return days[(new Date(date).getDay())];
}


