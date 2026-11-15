import { isSelectedWeek, hasShift, isNegativeHour } from "./validation.js";

export const TOTAL_HOUR_OF_DAY_IN_MIN = 1440; // 24 hours in minutes 
export const TOTAL_HOUR_OF_DAY_IN_MIN_FOR_FORTNIGHT = 2880;
export const CURRENT_WEEK_OFFSET = 0;
export const PREV_WEEK_OFFSET = -1;
export const NEXT_WEEK_OFFSET = 1;
export let shifts = [];
export let currentWeekOffSet = 0;



export function setShifts(newShifts) {
    shifts = newShifts;
}

export function setCurrentWeekOffset(value) {
    currentWeekOffSet += value;
}

export const statusConfig = {
    safe: {
        title: "Within Limit",
        message: "You are Complying with visa requirement",
        image: "./assets/icons/status-connected-svgrepo-com.svg"
    },
    warning: {
        title: "Warning!",
        message: "You will surpass the working hour restriction if you work full day!",
        image: "./assets/icons/status-lagging-svgrepo-com.svg"
    },

    dangerous: {
        title: "Danger!",
        message: "You have surpassed the working hour restriction! please adjust your shift immidiately ",
        image: "./assets/icons/status-disconnected-svgrepo-com.svg"
    }

}

export const validationConfig = [
    {
        check: (shift) => isSelectedWeek(shift, currentWeekOffSet),
        message: "You can only log shift for the current displayed week! Please check the date!"
    },
    {
        check: (shift) => !hasShift(shift, shifts),
        message: "You have already logged shift for this date! Please check the date!"
    },
    {
        check: (shift) => !isNegativeHour(shift),
        message: "Shift cannot be negative hours! Please check your start and end time!"
    }
]