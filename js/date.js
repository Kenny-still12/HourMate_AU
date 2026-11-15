import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

dayjs.locale({...dayjs.Ls.en, name:"en-monday", weekStart:1})

export function getSelectedWeek(offSet) {
    return dayjs().add(offSet, "week");
}

export function getWeekStart(offset) {
    return getSelectedWeek(offset).startOf("week")
}

export function formatDate(date) {
    return dayjs(date).format("D MMM YYYY")
}

export function getDayName(date) {
    const days = ["sunday", 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
    return days[(new Date(date).getDay())];
}