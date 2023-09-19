export const getNowDate=()=>{
    const today = new Date();
    // Get the month, day, and year
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const year = today.getFullYear();
    const monthName = new Date(today.getFullYear(), month - 1, 1).toLocaleString('default', { month: 'long' });
    // Format the date string
    const formattedDate = `${monthName.slice(0,Math.min(monthName.length,3) )} ${day} ${year}`;
    
    // Return the formatted date string
    return formattedDate;
}