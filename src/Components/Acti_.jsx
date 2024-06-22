import Sidebar from './Sidebar';
import Topnav from './Topnav';
import { port } from '../App';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Recsidebar from './Recsidebar';

const generateDates = (month, year) => {
    const dates = [];
    const date = new Date(year, month, 1);

    while (date.getMonth() === month) {
        const day = String(date.getDate()).padStart(2, '0');
        const monthFormatted = String(date.getMonth() + 1).padStart(2, '0');
        const yearFormatted = date.getFullYear();

        const formattedDate = `${yearFormatted}-${monthFormatted}-${day}`;
        dates.push(formattedDate);

        date.setDate(date.getDate() + 1);
    }
    return dates;
};

const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
};

const Acti_ = () => {
    const Empid = JSON.parse(sessionStorage.getItem('user')).EmployeeId;

    const [activitiesget, setgetActivities] = useState([]);
    const [activitiesgetdaily_achives, setgetActivities_daily_achives] = useState([]);

    const [Interview_Scheduledget, setInterview_Scheduledget] = useState([]);
    const [Interview_Scheduled_achives, setInterview_Scheduled_achives] = useState([]);

    const [Walkinsget, setWalkinsget] = useState([]);
    const [Walkins_achives, setWalkins_achives] = useState([]);

    const [Offeredget, setOfferedget] = useState([]);
    const [Offered_achives, setOffered_achives] = useState([]);

    const currentDate = new Date();
    const formattedCurrentDate = formatDate(currentDate);

    const Activity_get_res = () => {
        axios.get(`${port}root/activity/${Empid}/`).then((res) => {
            setgetActivities(res.data);
            setgetActivities_daily_achives(res.data.map((x) => x.daily_achives));
            console.log("activity_get_res", res.data);
        }).catch((err) => {
            console.log("activity_get_err", err.data);
        });
    };

    useEffect(() => {
        Activity_get_res();
    }, []);

    const calculateTotal = (field) => {
        return activitiesget.reduce((total, activity) => {
            return total + (parseFloat(activity[field]) || 0);
        }, 0);
    };

    const totalTarget = calculateTotal('targets');
    const totalAchieved = calculateTotal('achieved');

    const handleInputChange = (date, achieved, id, value) => {
        // Optimistically update the local state
        setgetActivities((prevActivities) =>
            prevActivities.map((activity) =>
                activity.id === id
                    ? {
                        ...activity,
                        daily_achives: activity.daily_achives.map((achieve) =>
                            achieve.Date === date ? { ...achieve, achieved: value } : achieve
                        ),
                    }
                    : activity
            )
        );

        // Update the backend asynchronously
        axios
            .patch(`${port}root/daily_achives/${id}/`, {
                achieved: value,
            })
            .then((res) => {
                console.log("activity_date_res", res.data);
                Activity_get_res(); // Refresh the data from the server
            })
            .catch((err) => {
                console.log("activity_date_err", err);
                // Optionally, handle the error and revert the optimistic update if needed
            });
    };

    const [month, setMonth] = useState(currentDate.getMonth());
    const [year, setYear] = useState(currentDate.getFullYear());
    const [dates, setDates] = useState(generateDates(currentDate.getMonth(), currentDate.getFullYear()));

    const handle_Month_Change = (e) => {
        const selectedYear = parseInt(e.slice(0, 4));
        const selectedMonth = parseInt(e.slice(5, 7)) - 1;

        setYear(selectedYear);
        setMonth(selectedMonth);

        const newDates = generateDates(selectedMonth, selectedYear);
        setDates(newDates);

        axios.get(`${port}root/ActivityList/Display/${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}/${Empid}/`).then((res) => {
            console.log("activity_date_res", res.data);
            setgetActivities(res.data);
            setgetActivities_daily_achives(res.data.map((x) => x.daily_achives));
        }).catch((err) => {
            console.log("activity_date_err", err);
        });
    };


    // /////////////////////////////////////////////////////////////////////


    // Interview Scheduled Start
    const Interview_Scheduled_res = () => {
        axios.get(`${port}root/Interview_Schedule_activity/${Empid}/`).then((res) => {
            setInterview_Scheduledget(res.data);
            console.log(res.data, "interview_activity");
            setInterview_Scheduled_achives(res.data.map((x) => x.daily_achives));
            // console.log(res.data.map((x) => x.daily_achives));
            console.log("Interview_Schedule_activity_res", res.data);
        }).catch((err) => {
            console.log("Interview_Schedule_activity_err", err.data);
        });
    };

    useEffect(() => {
        Interview_Scheduled_res();
    }, []);
    // Interview Scheduled End

    let handle_Month_Change1 = (e) => {


        const selectedYear = parseInt(e.slice(0, 4));
        const selectedMonth = parseInt(e.slice(5, 7)) - 1;

        setYear(selectedYear);
        setMonth(selectedMonth);

        const newDates = generateDates(selectedMonth, selectedYear);
        setDates(newDates);



        // /////////////////////////////////



        axios.get(`${port}root/InterviewList/Display/${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}/${Empid}/`).then((res) => {
            console.log("activity_date_res", res.data);
            console.log("setInterview_Scheduledget", res.data.interview);



            setInterview_Scheduledget(res.data.interview);
            setInterview_Scheduled_achives(res.data.interview.map((x) => x.daily_achives));

            // setWalkinsget(res.data.walkins);
            // setWalkins_achives(res.data.walkins.map((x) => x.daily_achives));

            // setOfferedget(res.data.offers);
            // setOffered_achives(res.data.offers.map((x) => x.daily_achives));

        }).catch((err) => {

            console.log("activity_date_err", err);

        })

    }

    const handleInputChange1 = (Date, achieved, id, value) => {

        setInterview_Scheduledget((prevActivities) =>
            prevActivities.map((activity) =>
                activity.id === id
                    ? {
                        ...activity,
                        daily_achives: activity.daily_achives.map((achieve) =>
                            achieve.Date === Date ? { ...achieve, achieved: value } : achieve
                        ),
                    }
                    : activity
            )
        );

        console.log("enter", Date, achieved, id, value);

        axios.patch(`${port}root/Daily_Interview_Schedule_Achives/${id}/`, {
            achieved: value
        }).then((res) => {
            console.log("Daily_Interview_Schedule_Achives_res", res.data);
            Activity_get_res()
            Interview_Scheduled_res()
        }).catch((err) => {

            console.log("Daily_Interview_Schedule_Achives_err", err);

        })
    };

    // Walkins Start 
    const Walkins_res = () => {
        axios.get(`${port}root/Walkin_activity/${Empid}/`).then((res) => {
            console.log("Wlak_activity_res", res.data);
            setWalkinsget(res.data);
            setWalkins_achives(res.data.map((x) => x.daily_achives));
            // console.log(res.data.map((x) => x.daily_achives));
        }).catch((err) => {
            console.log("Wlak_activity_err", err.data);
        });
    };

    useEffect(() => {
        Walkins_res();
    }, []);
    // Walkins End

    // Offered Start

    const Offers_res = () => {
        axios.get(`${port}root/Offered_activity/${Empid}/`).then((res) => {
            console.log("Offered_activity_res", res.data);
            setOfferedget(res.data);
            setOffered_achives(res.data.map((x) => x.daily_achives));
            // console.log(res.data.map((x) => x.daily_achives));
        }).catch((err) => {
            console.log("Offered_activity_err", err.data);
        });
    };

    useEffect(() => {
        Offers_res();
    }, []);

    // Offered End

    const handleInputChange2 = (Date, achieved, id, value) => {

        console.log("enter", Date, achieved, id, value);



        axios.patch(`${port}root/Daily_Walkins_Achives/${id}/`, {
            achieved: value
        }).then((res) => {
            console.log("Daily_Walkins_Achives", res.data);
            Activity_get_res()
            Walkins_res()
        }).catch((err) => {

            console.log("Daily_Walkins_Achives", err);

        })
    };

    const handleInputChange3 = (Date, achieved, id, value) => {

        console.log("enter", Date, achieved, id, value);

        axios.patch(`${port}/root/Daily_Offers_Achives/${id}/`, {
            achieved: value
        }).then((res) => {
            console.log("Daily_Offered_Achives", res.data);
            Activity_get_res()
            Offers_res()
        }).catch((err) => {

            console.log("Daily_Offered_Achives", err);

        })
    };



    return (
        <div className='d-flex' style={{ width: '100%', minHeight: '100%', backgroundColor: "rgb(249,251,253)" }}>
            <div className='side'>
                <Recsidebar value={"dashboard"}></Recsidebar>
            </div>
            <div className='m-0 m-sm-4 side-blog' style={{ borderRadius: '10px' }}>
                <div style={{ position: "relative", left: '20px' }}>
                    <Topnav></Topnav>
                </div>
                <div className='mt-3' style={{ position: 'relative', left: '40px', width: '97%' }}>
                    <div className='d-flex justify-content-between'>
                        <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
                            <li className="nav-item text-primary d-flex" role="presentation">
                                <h6 className='mt-2 heading nav-link active' style={{ color: 'rgb(76,53,117)', backgroundColor: 'transparent', border: 'none' }} id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">Activities</h6>
                            </li>
                            <li class="nav-item text-primary d-flex " role="presentation">
                                <h6 class='mt-2 heading nav-link ' style={{ color: 'rgb(76,53,117)', backgroundColor: 'transparent', border: 'none' }} id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile" type="button" role="tab" aria-controls="pills-profile" aria-selected="false">Interview Scheduled</h6>
                            </li>

                            <li class="nav-item text-primary d-flex " role="presentation">
                                <h6 class='mt-2 heading nav-link ' style={{ color: 'rgb(76,53,117)', backgroundColor: 'transparent', border: 'none' }} id="pills-contact-tab" data-bs-toggle="pill" data-bs-target="#pills-contact" type="button" role="tab" aria-controls="pills-contact" aria-selected="false">Walkins</h6>
                            </li>

                            <li class="nav-item text-primary d-flex " role="presentation">
                                <h6 class='mt-2 heading nav-link ' style={{ color: 'rgb(76,53,117)', backgroundColor: 'transparent', border: 'none' }} id="pills-contact-tab1" data-bs-toggle="pill" data-bs-target="#pills-contact1" type="button" role="tab" aria-controls="pills-contact1" aria-selected="false">Offered</h6>
                            </li>

                        </ul>
                    </div>
                    <div className="tab-content" id="pills-tabContent" style={{ position: 'relative', bottom: '20px' }}>
                        <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex="0">
                            <div style={{ position: 'relative' }} className='d-flex justify-content-end'>
                                <div className='mt-3 d-flex justify-content-end ' style={{ position: 'absolute', bottom: '10px' }}>
                                    <input
                                        type="month"
                                        value={`${year}-${String(month + 1).padStart(2, '0')}`}
                                        onChange={(e) => handle_Month_Change(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <div className='mt-4 table-responsive'>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col" colSpan={3} className='text-center' style={{ minWidth: '500px' }}>Date</th>
                                                {dates.map(date => (
                                                    <th key={date} rowSpan={2} className='text-center pb-4'>{date}</th>
                                                ))}
                                            </tr>
                                            <tr>
                                                <th scope="col" className='ms-3' style={{ minWidth: '200px' }}>Activity Name</th>
                                                <th scope="col" className='text-center' style={{ minWidth: '60px' }}>Target</th>
                                                <th scope="col" className='text-center' style={{ minWidth: '60px' }}>Achieved</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {activitiesget.map((activity, mainindex) => (
                                                <tr key={mainindex}>
                                                    <td>
                                                        <input type="text"
                                                            value={activity.Activity_Name}
                                                            className="form-control border-0 shadow-none" />
                                                    </td>
                                                    <td>
                                                        <input type="number"
                                                            value={activity.targets}
                                                            className="form-control border-0 shadow-none text-center" />
                                                    </td>
                                                    <td >
                                                        <input type="number"
                                                            value={activity.Total_Achived}
                                                            className={`form-control border-0 shadow-none text-center text-white  
                                                                ${activity.status === "Green" ? 'bg-success' :
                                                                    activity.status === "Yellow" ? 'bg-warning' :
                                                                        activity.status === "Red" ? 'bg-danger' :
                                                                            activity.status === "Orange" ? 'bg-info' :
                                                                                'bg-info'} `}
                                                        />
                                                    </td>
                                                    {dates.map((date) => {
                                                        let obj = activitiesgetdaily_achives[mainindex].find((obj) => obj.Date === date);
                                                        return (
                                                            <td key={date}>
                                                                <input type="number" disabled={formattedCurrentDate !== date}
                                                                    value={obj ? obj.achieved : ''}
                                                                    onChange={(e) => {
                                                                        if (e.target.value > 0) {
                                                                            if (obj) {
                                                                                handleInputChange(date, obj.achieved, obj.id, Number(e.target.value));
                                                                            } else {
                                                                                // If obj is not found, handle this case if needed
                                                                            }
                                                                        }
                                                                        if (e.target.value <= 0) {
                                                                            if (obj) {
                                                                                handleInputChange(date, obj.achieved, obj.id, 0);
                                                                            } else {
                                                                                // If obj is not found, handle this case if needed
                                                                            }
                                                                        }
                                                                    }}
                                                                    className="form-control border-0 shadow-none text-center " />
                                                            </td>
                                                        );
                                                    })}
                                                </tr>
                                            ))}
                                            <tr>
                                                <td className='ps-3'>Total</td>
                                                <td className='text-center'>{totalTarget}</td>
                                                <td className='text-center'>{totalAchieved}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="d-flex justify-content-end">
                                </div>
                            </div>
                        </div>
                        {/*  Interview Scheduled */}
                        <div className="tab-pane fade show " id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex="0">
                            <div style={{ position: 'relative' }} className='d-flex justify-content-end '>
                                <div className='mt-3 d-flex justify-content-end ' style={{ position: 'absolute', bottom: '10px' }}>
                                    <input type="month" onChange={(e) => handle_Month_Change1(e.target.value)} />
                                </div>
                            </div>
                            <div>
                                <div className='mt-4 table-responsive'>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col" colSpan={4} className='text-center' style={{ minWidth: '500px' }}>Interview Scheduled</th>
                                                {dates.map(date => (
                                                    <th key={date} rowSpan={2} className='text-center pb-4'>{date}</th>
                                                ))}
                                            </tr>
                                            <tr>
                                                <th scope="col" className='ms-3' style={{ minWidth: '100px' }}>Possitions</th>
                                                {/* <th scope="col" className=' text-center' style={{ minWidth: '60px' }}>Open Possitions </th> */}
                                                <th scope="col" className='text-center' style={{ minWidth: '60px' }}>Target</th>
                                                <th scope="col" className='text-center' style={{ minWidth: '60px' }}>Achieved</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Interview_Scheduledget.map((activity, mainindex) => (
                                                <tr key={mainindex}>
                                                    <td>
                                                        <input type="text"
                                                            value={activity.position}

                                                            className="form-control border-0 shadow-none" />
                                                    </td>
                                                    {/* <td>
                                                        <input type="text"
                                                            value={activity.No_Of_Open_Possitions}

                                                            className="form-control border-0 shadow-none text-center" />
                                                    </td> */}
                                                    <td>
                                                        <input type="number"
                                                            value={activity.targets}
                                                            className="form-control border-0 shadow-none text-center" />
                                                    </td>
                                                    <td>

                                                        <input type="number"
                                                            value={activity.Total_Achived}
                                                            className={`form-control border-0 shadow-none text-center text-white  
                                                            ${activity.status === "Green" ? 'bg-success' :
                                                                    activity.status === "Yellow" ? 'bg-warning' :
                                                                        activity.status === "Red" ? 'bg-danger' :
                                                                            activity.status === "Orange" ? 'bg-info' : 'bg-info'} `}
                                                        />
                                                    </td>
                                                    {dates.map((date) => {
                                                        let obj = Interview_Scheduled_achives[mainindex].find((obj) => obj.Date == date)

                                                        console.log("sxdasdad---",obj);

                                                        return (
                                                          <td key={date}>

                                                                <input type="number" disabled={formattedCurrentDate != date}
                                                                    value={obj && obj.achieved}
                                                                    onChange={(e) => {
                                                                        if (obj) {
                                                                            handleInputChange1(obj.Date,
                                                                                obj.achieved, obj.id,
                                                                                Number(e.target.value))
                                                                        }
                                                                    }
                                                                    } className={`form-control border-0 
                                                                        shadow-none text-center `} />
                                                            </td>
                                                        )
                                                    }
                                                    )}
                                                </tr>
                                            ))}

                                            <tr>
                                                <td className='ps-3'>Total</td>
                                                <td className='text-center'>{Interview_Scheduledget.reduce((sum, obj) => sum = sum + obj.targets, 0)}</td>
                                                <td className='text-center'>{Interview_Scheduledget.reduce((sum, obj) => sum = sum + obj.Total_Achived, 0)}</td>
                                                {/* {dates.map((date, idx) => (
                                                    <td key={date}>
                                                        <input type="text" className="form-control border-0 shadow-none" disabled />
                                                    </td>
                                                ))} */}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="d-flex justify-content-end">
                                    {/* <button type="button" onClick={handleAddActivity} className="btn btn-primary">Add Activity</button> */}
                                    {/* <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-sm">Save</button> */}
                                </div>
                            </div>
                        </div>
                        {/*  Walkins */}
                        <div className="tab-pane fade show " id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabIndex="0">
                            <div>
                                <div className='mt-4 table-responsive'>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col" colSpan={3} className='text-center' style={{ minWidth: '500px' }}>Walkins</th>
                                                {dates.map(date => (
                                                    <th key={date} rowSpan={2} className='text-center pb-4'>{date}</th>
                                                ))}
                                            </tr>
                                            <tr>
                                                <th scope="col" className='ms-3' style={{ minWidth: '200px' }}>Possitions</th>
                                                {/* <th scope="col" className='ms-3' style={{ minWidth: '20px' }}>Open Possitions</th> */}
                                                <th scope="col" className='text-center' style={{ minWidth: '100px' }}>Target</th>
                                                <th scope="col" className='text-center' style={{ minWidth: '60px' }}>Achieved</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Walkinsget.map((activity, mainindex) => (
                                                <tr key={mainindex}>
                                                    <td>
                                                        <input type="text"
                                                            value={activity.position}

                                                            className="form-control border-0 shadow-none" />
                                                    </td>
{/* 
                                                    <td>
                                                        <input type="text"
                                                            value={activity.No_Of_Open_Possitions}

                                                            className="form-control border-0 shadow-none text-center" />
                                                    </td> */}

                                                    <td>
                                                        <input type="number"
                                                            value={activity.targets}
                                                            className="form-control border-0 shadow-none text-center" />
                                                    </td>
                                                    <td>
                                                        <input type="number"
                                                            value={activity.Total_Achived}

                                                            className={`form-control border-0 shadow-none text-center text-white  
                                                            ${activity.status === "Green" ? 'bg-success' :
                                                                    activity.status === "Yellow" ? 'bg-warning' :
                                                                        activity.status === "Red" ? 'bg-danger' :
                                                                            activity.status === "Orange" ? 'bg-info' :
                                                                                'bg-info'} `}

                                                        />
                                                    </td>
                                                    {dates.map((date) => {
                                                        let obj = Walkins_achives[mainindex].find((obj) => obj.Date == date)
                                                        // console.log("sxdasdad", obj);
                                                        // console.log(formattedCurrentDate);
                                                        // console.log("----", activitiesgetdaily_achives[mainindex].find((obj) => obj.Date == date));
                                                        return (
                                                            <td key={date}>

                                                                <input type="number" disabled={formattedCurrentDate != date}
                                                                    value={obj && obj.achieved}
                                                                    onChange={(e) => {

                                                                        if (obj) {
                                                                            handleInputChange2(obj.Date, obj.achieved, obj.id, Number(e.target.value))
                                                                        }
                                                                    }
                                                                    } className="form-control border-0 shadow-none text-center " />
                                                            </td>
                                                        )
                                                    }
                                                    )}
                                                </tr>
                                            ))}

                                            <tr>
                                                <td className='ps-3'>Total</td>
                                                <td className='text-center'>{Walkinsget.reduce((sum,obj)=>sum+=obj.targets,0)}</td>
                                                <td className='text-center'>{Walkinsget.reduce((sum,obj)=>sum+=obj.Total_Achived,0)}</td>
                                                {/* {dates.map((date, idx) => (
                                                    <td key={date}>
                                                        <input type="text" className="form-control border-0 shadow-none" disabled />
                                                    </td>
                                                ))} */}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="d-flex justify-content-end">
                                    {/* <button type="button" onClick={handleAddActivity} className="btn btn-primary">Add Activity</button> */}
                                    {/* <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-sm">Save</button> */}
                                </div>
                            </div>
                        </div>
                        {/*  Offered */}
                        <div className="tab-pane fade show " id="pills-contact1" role="tabpanel" aria-labelledby="pills-contact-tab1" tabIndex="0">
                            <div>

                                <div className='mt-4 table-responsive'>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th scope="col" colSpan={3} className='text-center' style={{ minWidth: '500px' }}>Offered
                                                </th>
                                                {dates.map(date => (
                                                    <th key={date} rowSpan={2} className='text-center pb-4'>{date}</th>
                                                ))}
                                            </tr>
                                            <tr>
                                                <th scope="col" className='ms-3' style={{ minWidth: '200px' }}>Possitions</th>
                                                {/* <th scope="col" className='ms-3' style={{ minWidth: '20px' }}>Open Possitions</th> */}
                                                <th scope="col" className='text-center' style={{ minWidth: '100px' }}>Target</th>
                                                <th scope="col" className='text-center' style={{ minWidth: '60px' }}>Achieved</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {Offeredget.map((activity, mainindex) => (
                                                <tr key={mainindex}>
                                                    <td>
                                                        <input type="text"
                                                            value={activity.position}

                                                            className="form-control border-0 shadow-none" />
                                                    </td>
{/* 
                                                    <td>
                                                        <input type="text"
                                                            value={activity.No_Of_Open_Possitions}

                                                            className="form-control border-0 shadow-none text-center" />
                                                    </td> */}

                                                    <td>
                                                        <input type="number"
                                                            value={activity.targets}
                                                            className="form-control border-0 shadow-none text-center" />
                                                    </td>
                                                    <td>
                                                        <input type="number"
                                                            value={activity.Total_Achived}

                                                            className={`form-control border-0 shadow-none text-center text-white  
                                                            ${activity.status === "Green" ? 'bg-success' :
                                                                    activity.status === "Yellow" ? 'bg-warning' :
                                                                        activity.status === "Red" ? 'bg-danger' :
                                                                            activity.status === "Orange" ? 'bg-info' :
                                                                                'bg-info'} `} />
                                                    </td>
                                                    {dates.map((date) => {
                                                        let obj = Offered_achives[mainindex].find((obj) => obj.Date == date)
                                                        // console.log("sxdasdad", obj);
                                                        // console.log(formattedCurrentDate);
                                                        // console.log("----", activitiesgetdaily_achives[mainindex].find((obj) => obj.Date == date));
                                                        return (
                                                            <td key={date}>

                                                                <input type="number" disabled={formattedCurrentDate != date}
                                                                    value={obj && obj.achieved}
                                                                    onChange={(e) => {

                                                                        if (obj) {
                                                                            handleInputChange3(obj.Date, obj.achieved, obj.id, Number(e.target.value))
                                                                        }
                                                                    }
                                                                    } className="form-control border-0 shadow-none text-center " />



                                                            </td>
                                                        )
                                                    }
                                                    )}
                                                </tr>
                                            ))}

                                            <tr>
                                                <td className='ps-3'>Total</td>
                                                <td className='text-center'>{Offeredget.reduce((sum,obj)=>sum+=obj.targets,0)}</td>
                                                <td className='text-center'>{Offeredget.reduce((sum,obj)=>sum+=obj.Total_Achived,0)}</td>
                                                {/* {dates.map((date, idx) => (
                                                    <td key={date}>
                                                        <input type="text" className="form-control border-0 shadow-none" disabled />
                                                    </td>
                                                ))} */}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                <div className="d-flex justify-content-end">
                                    {/* <button type="button" onClick={handleAddActivity} className="btn btn-primary">Add Activity</button> */}
                                    {/* <button type="submit" onClick={handleSubmit} className="btn btn-primary btn-sm">Save</button> */}
                                </div>

                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

export default Acti_;
