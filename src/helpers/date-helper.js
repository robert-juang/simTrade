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