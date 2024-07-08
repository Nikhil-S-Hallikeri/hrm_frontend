import React, { createContext, useEffect, useState } from 'react'
import { port } from '../App'
import axios from 'axios'




export const HrmStore = createContext()
const HrmContext = (props) => {
    let [openNavbar, setNavbar] = useState(false)
    let empid = JSON.parse(sessionStorage.getItem('user'))
    let [leaveRequestsReporting, setLeaveRequestReporting] = useState()
    let [pendingLeave, setPendingLeave] = useState()
    let [leaveData, setLeaveData] = useState()
    let [designation, setDesignation] = useState()
    let getLeaveData = () => {
        axios.get(`${port}/root/lms/LeaveTypes/`).then((response) => {
            setLeaveData(response.data)
            console.log(response.data);
        }).catch((error) => {
            console.log(error);
        })
    }
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
    function getCurrentDate() {
        let datenow = new Date()
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
    function timeValidate() {
        const now = new Date();
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    function getProperDate(date) {
        const now = new Date(date);
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const day = String(now.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    function changeDateYear(date) {
        const [year, mnth, day] = date.split('-')
        return `${day}-${mnth}-${year}`
    }
    let testing = "hellow"
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
    let getDesignations = () => {
        axios.get(`${port}/root/ems/Designations/`).then((response) => {
            console.log(response.data);
            setDesignation(response.data)
        }).catch((error) => {
            console.log(error);
        })
    }
    let [activePage, setActivePage] = useState('dashboard')
    let mailContent = {
        reject: `
Thank you for applying for the position at Merida Tech Minds and for your interest in joining our team. After a careful review of your application, we regret to inform you that we have decided to move forward with other candidates whose skills, experience, qualifications, and overall fitment more closely align with the position requirements.

We greatly appreciate the time and effort in the interview process. Please be assured that your information will remain in our system for future opportunities that match your skills and experience. We encourage you to regularly visit our Career Site and sign up for job alerts to stay informed about new openings that align with your career goals.

Thank you once again for considering Merida Tech Minds as a potential employer. We wish you the best of luck in your future job search and hope to have the opportunity to connect with you again in the future.

Best regards,
Talent Acquisition Team
Merida Tech Minds (OPC) Pvt. Ltd.`,
        selected: `
Congratulations!!

After carefully evaluating your skill set, experience, qualifications, and overall fit, we are pleased to inform you that you have been selected for the position of [Position] at Merida Tech Minds.

To move forward, please provide the necessary information and supporting documents to complete your background verification checks before offering. We are confident that you will make significant contributions to our organization.

Best regards,
Talent Acquisition Team
Merida Tech Minds (OPC) Pvt. Ltd.`,
        consider_to_client: `
Thank you for applying for the position at Merida Tech Minds. After carefully reviewing your application, we believe you would be a better fit for our client requirements, where your career goals, skills, and experience align well.

We greatly appreciate the time and effort in the interview process. Please be assured that your information will remain in our system for future opportunities that match our client requirements.

We wish you the best of luck in your job search and hope to have the opportunity to connect with you again in the future.

Best regards,
Talent Acquisition Team(HR)
Merida Tech Minds (OPC) Pvt. Ltd.`,
        on_hold: `Thank you for applying for the position at Merida Tech Minds. We are currently in the process of reviewing your application, and it is taking longer than our usual timeframe.

We will keep you informed once we have reached a conclusion regarding your candidature.

We greatly appreciate your time and effort in the interview process. Please be assured that your information will remain in our system for further processing.

Best regards,
Talent Acquisition Team (HR)
Merida Tech Minds (OPC) Pvt. Ltd.`
    }
    let [activeSetting, setActiveSetting] = useState('')

    let getPendingLeave = () => {
        axios.get(`${port}/root/lms/EmployeeLeavesPending/${empid.EmployeeId}/`).then((response) => {
            console.log(response.data);
            setPendingLeave(response.data)
        }).catch((error) => {
            console.log(error);
        })
    }
    let getLeaveRequestsReporting = () => {
        if (empid) {
            axios.get(`${port}/root/lms/Reporting/Employee/PendingLeaves/${empid.EmployeeId}/`).then((response) => {
                setLeaveRequestReporting(response.data)
                console.log("leave", response.data);
            }).catch((error) => {
                console.log(error);
            })
        }
    }
    let valueShare = {
        getPendingLeave, pendingLeave, setPendingLeave, leaveRequestsReporting, setLeaveRequestReporting, getLeaveRequestsReporting,
        changeDateYear, activeSetting, setActiveSetting, mailContent, openNavbar, setNavbar, convertToNormalTime, activePage, setActivePage,
        leaveData, setLeaveData, getLeaveData,
        timeValidate, getProperDate, getCurrentDate, convertToReadableDateTime, testing, convertTimeTo12HourFormat, formatISODate
    }
    return (
        <HrmStore.Provider value={valueShare} >
            {props.children}
        </HrmStore.Provider>
    )
}

export default HrmContext