export const converetDateToUnixTimestamp = (date) => {
    return Math.floor(date.getTime() / 1000); 
}; 

export const convertUnixTimestampToDate = (unixTimestamp) => {
    const milliseconds = unixTimestamp * 1000; 
    return new Date(milliseconds).toLocaleDateString(); 
}; 

export const createDate = (date, days, weeks, months, years) => {
    let newDate = newDate(date); 
    newDate.setDate(newDate.getDate() + days + 7*weeks); 
    newDate.setMonth(newDate.getMonth() + months)
    newDate.setFullYear(newDate.getFullYear() + years); 
}