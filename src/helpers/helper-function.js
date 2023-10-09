export const truncate = (num) => {
    if (typeof num === "string") {
        return (parseFloat(num).toFixed(2)).toString()
    }
    else{
        return (num.toFixed(2)).toString()
    }
}