import dayjs from "dayjs";

export const getMonthsBeforeCurrentMonth = () => {
    const month = dayjs().month();
    const monthToName = [];
    dayjs.locale("fr");
    for(let i = (month - 6); i <= month; i++) {
        const name = dayjs().month(i).format("MMMM");
        monthToName[name] = 0;
    }
    return monthToName;
}