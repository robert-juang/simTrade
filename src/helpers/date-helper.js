export const currentDay = () => {
    return new Date().toJSON().slice(0, 10);
}

export const convertDateToUnixTimestamp = (date) => {
    return Math.floor(date.getTime() / 1000); 
}; 

export const convertUnixTimestampToDate = (unixTimestamp) => {
    const milliseconds = unixTimestamp * 1000; 
    return new Date(milliseconds).toLocaleDateString(); 
}; 

export const createDate = (date, days, weeks, months, years) => {
    let newDate = new Date(date); 
    newDate.setDate(newDate.getDate() + days + 7*weeks); 
    newDate.setMonth(newDate.getMonth() + months)
    newDate.setFullYear(newDate.getFullYear() + years); 
    return newDate;
}

export const makeid = (length) => {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
        counter += 1;
    }
    return result;
}

export function areDatesEqual(date1, date2) {
    // Convert date1 from "MM/DD/YYYY" to a Date object
    const [month1, day1, year1] = date1.split('/');
    const dateObj1 = new Date(year1, month1 - 1, day1);

    // Convert date2 from "YYYY-MM-DD" to a Date object
    const [year2, month2, day2] = date2.split('-');
    const dateObj2 = new Date(year2, month2 - 1, day2);

    // Compare the two Date objects
    return dateObj1.getTime() === dateObj2.getTime();
}
