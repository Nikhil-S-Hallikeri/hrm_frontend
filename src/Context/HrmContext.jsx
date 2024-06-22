import React, { createContext } from 'react'




export const HrmStore = createContext()
const HrmContext = (props) => {
    function convertToReadableDateTime(isoDateTime) {
        const date = new Date(isoDateTime);
        // Extract the date components
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based
        const year = date.getFullYear() % 100; 
        
        // Extract the time components
        let hours = date.getHours();
        const minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12 || 12; // Convert to 12-hour format
        // Format the date and time
        const formattedDate = `${day}/${month}/${year}`;
        const formattedTime = `${hours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
        return `${formattedDate} ${formattedTime}`;
    }
    function getCurrentDate(){
        let datenow=new Date()
        return `${datenow.getDate()}/${datenow.getMonth()}/${datenow.getFullYear()}`
    }
    function formatISODate(isoString) {
        const [time, offset] = isoString.split('+');
        const [hours, minutes, seconds] = time.substring(1).split(':');
    
        // Convert hours to number
        let hoursNumber = parseInt(hours, 10);
    
        // Determine AM/PM suffix
        const period = hoursNumber >= 12 ? 'PM' : 'AM';
    
        // Convert hours from 24-hour to 12-hour format
        hoursNumber = hoursNumber % 12 || 12;  // Adjust 0 to 12 for midnight case
    
        // Format hours and minutes
        const formattedHours = hoursNumber;
        const formattedMinutes = minutes;
    
        // Construct the 12-hour time format
        const formattedTime = `${formattedHours}:${formattedMinutes}:${seconds} ${period}`;
    
        return formattedTime;    
    }
    
    // Example usage
    const isoString = "2024-06-17T14:06:20+05:30";
    const formattedDateTime = formatISODate(isoString);
    console.log(formattedDateTime);  // Outputs: "06/17/2024 2:06:20 PM"
    
    function convertTimeTo12HourFormat(time) {
        // Split the time into hours, minutes, and seconds
        const [hours, minutes, seconds] = time.split(':');
        
        // Convert hours from string to number
        let hoursNumber = parseInt(hours, 10);
        
        // Determine AM/PM suffix
        const period = hoursNumber >= 12 ? 'PM' : 'AM';
        
        // Convert hours from 24-hour to 12-hour format
        hoursNumber = hoursNumber % 12 || 12;  // Adjust 0 to 12 for midnight case
        
        // Format hours and minutes
        const formattedHours = hoursNumber;
        const formattedMinutes = minutes;
    
        // Construct the 12-hour time format
        const formattedTime = `${formattedHours}:${formattedMinutes} ${period}`;
    
        return formattedTime;
    }
    function timeValidate(){
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    let testing="hellow"
    function convertToNormalTime(timeString) {
        // Split the time string into hours, minutes, and seconds
        const [hours, minutes, seconds] = timeString.split(':').map(Number);
        
        // Determine AM or PM
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        // Convert hours from 24-hour to 12-hour format
        const normalHours = hours % 12 || 12; // Adjust hours, converting 0 to 12 for 12 AM
        
        // Format the time string
        const formattedTime = `${normalHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
        
        return formattedTime;
    }
    let valueShare={convertToNormalTime,timeValidate,getCurrentDate,convertToReadableDateTime,testing,convertTimeTo12HourFormat,formatISODate }
    return (
        <HrmStore.Provider value={valueShare} >
            {props.children}
        </HrmStore.Provider>
    )
}

export default HrmContext