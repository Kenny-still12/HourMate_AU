export const TOTAL_HOUR_OF_DAY_IN_MIN = 1440;
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
        image: "/assets/icons / status - connected - svgrepo - com.svg"
    },
    warning: {
        title: "Warning!",
        message: "You will surpass the working hour restriction if you work full day!",
        image: "/assets/icons/status-lagging-svgrepo-com.svg"
    },

    dangerous: {
        title: "Danger!",
        message: "You have surpassed the working hour restriction! please adjust your shift immidiately ",
        image: "/assets/icons/status-disconnected-svgrepo-com.svg"
    }

}