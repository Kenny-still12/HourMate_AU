import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { shifts, currentWeekOffSet, TOTAL_HOUR_OF_DAY_IN_MIN, TOTAL_HOUR_OF_DAY_IN_MIN_FOR_FORTNIGHT } from "./data.js"


export function getWeekShift(currentWeekOffSet) {
    const targetWeek = dayjs().add(currentWeekOffSet, "week");

    return shifts.filter((shift) => {
        return dayjs(shift.date).isSame(targetWeek, "week")
    })
}

export function converAndFormatTotHour(totalmins) {
    const hours = Math.floor(totalmins / 60);
    const mins = totalmins % 60;

    return `${hours}h ${mins}m`;
}

export function convertInHours(totalmins) {
    const hours = (totalmins / 60);

    return hours
}

export function getDayName(date) {
    const days = ["sunday", 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[(new Date(date).getDay())];
}


export function getTotalMins(start, end) {

    const [startHour, startMin] = start.split(":").map(Number);
    const [endHour, endMin] = end.split(":").map(Number)

    return (endHour * 60 + endMin) - (startHour * 60 + startMin)
}

export function totalWeekHour() {
    const currentWeek = getWeekShift(currentWeekOffSet);

    const totalHour = currentWeek.reduce((total, shift) => {
        return total += shift.totalMin - shift.break;
    }, 0)

    return totalHour;
}

export function totalfortnightHour(){
    const currentWeek = getWeekShift(currentWeekOffSet);
    const lastweek = getWeekShift(currentWeekOffSet - 1);

    const totalHour = currentWeek.reduce((total, shift) => {
        return total += shift.totalMin - shift.break;
    }, 0)

    const lastweekHour = lastweek.reduce((total, shift) => {
        return total += shift.totalMin - shift.break;
    }, 0)

    return totalHour + lastweekHour;
}

export function calculateRemainingHours(totalHourinMin) {
 // for now, we are using the fortnightly limit, maybe we will modify this functionto  conditionally use the weekly or fortnigth limit. 
    //return TOTAL_HOUR_OF_DAY_IN_MIN - totalHourinMin;
    return TOTAL_HOUR_OF_DAY_IN_MIN_FOR_FORTNIGHT - totalHourinMin;
}

export function isWithinLimit(totalHour) {
    //return totalHour < TOTAL_HOUR_OF_DAY_IN_MIN ? true : false;
    return totalHour < TOTAL_HOUR_OF_DAY_IN_MIN_FOR_FORTNIGHT ? true : false;
}

export function getStatus(totalRemainingHours) {
    if (totalRemainingHours <= 0) return "dangerous";
    if (totalRemainingHours < 8) return "warning";
    return "safe"
}

