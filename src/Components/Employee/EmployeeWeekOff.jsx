import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { port } from '../../App'
import CloseIcon from '../Icons/CloseIcon'
import { toast } from 'react-toastify'

const EmployeeWeekOff = ({ page, id }) => {
    let [data, setData] = useState({
        weekoff_days: [],
        employee_id: id ? id : JSON.parse(sessionStorage.getItem('dasid')),
        three_months: false,
        six_months: false,
        onetwo_months: false,
        year: new Date().getFullYear(),
        month: new Date().getMonth() + 1
    })
    let [loading, setLoading] = useState()
    const monthDropDown = [
        { mon: 'January', val: 1 }, { mon: 'February', val: 2 }, { mon: 'March', val: 3 }, { mon: 'April', val: 4 }, { mon: 'May', val: 5 }, { mon: 'June', val: 6 },
        { mon: 'July', val: 7 }, { mon: 'August', val: 8 }, { mon: 'September', val: 9 }, { mon: 'October', val: 10 }, { mon: 'November', val: 11 }, { mon: 'December', val: 12 }
    ];
    let [weekOffDays, setWeekOffDays] = useState()
    let getWeekOffDaysDropDown = () => {

        axios.get(`${port}/root/lms/Weekoffs`).then((response) => {
            setWeekOffDays(response.data)
            console.log(response.data);
            setLoading(false)
        }).catch((error) => {
            console.log(error);
            setLoading(false)
        })
    }
    let postWeekOff = () => {
        setLoading(true)
        axios.post(`${port}/root/lms/Weekoffs`, data).then((response) => {
            toast.success('Uploaded successful')
            setLoading(false)
            console.log(response.data);

        }).catch((error) => {
            console.log(error);
            toast.error('Error occured')
            setLoading(false)
        })
    }
    let handleChange = (e) => {
        let { value, name } = e.target
        if (name === 'weekoff_days' && data.weekoff_days.find((val) => val === value)) {
            value = data.weekoff_days.filter((obj) => obj !== value);
        } else if (name === 'weekoff_days' && data.weekoff_days.findIndex((val) => val === value) === -1) {
            value = [...data.weekoff_days, value];
        }
        setData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    let allAvailableweekOff = () => {
        axios.get(`${port}/root/lms/Weekoffs?weekoff_emp=${id ? id :
            JSON.parse(sessionStorage.getItem('dasid'))}`).then((response) => {
                console.log(response.data, 'weekoff');

            }).catch((error) => {
                console.log(error);

            })
    }
    useEffect(() => {
        getWeekOffDaysDropDown()
        allAvailableweekOff()
    }, [])
    return (
        <div className={` ${page == 'inner' && 'h-[40vh] '} p-3 rounded-xl bgclr w-full  `} >
            <h4 className=' '>Week Off Information </h4>
            {/* Day */}
            <div className=' my-2 flex  items-center ' >
                <label htmlFor="" className='w-52 ' >
                    Day :
                </label>
                <select className=' outline-none p-1 px-2 rounded flex-grow-1 ' name="weekoff_days" onChange={handleChange} id="">
                    <option value="">Select</option>
                    {
                        weekOffDays && weekOffDays.map((obj, index) => (
                            <option value={obj.id}>{obj.day} </option>
                        ))
                    }
                </select>
            </div>
            <div className='my-2 flex flex-wrap ' >
                <label htmlFor="" className='w-52 ' >
                    Year :  </label>
                <input type="text" name='year' onChange={handleChange}
                    value={data.year} className='outline-none p-1 px-2 rounded flex-grow-1 ' />
            </div>
            <div className='my-2 flex flex-wrap ' >
                <label htmlFor="" className='w-52 ' >
                    Month :  </label>
                <select className=' outline-none p-1 px-2 rounded flex-grow-1 '
                    value={data.month} name="month" onChange={handleChange} id="">
                    <option value="">Select</option>
                    {
                        monthDropDown && monthDropDown.map((obj, index) => (
                            <option value={obj.val}>{obj.mon} </option>
                        ))
                    }
                </select>
            </div>
            {/* Selected days */}
            <div className='my-2 flex flex-wrap items-center  ' >
                <label htmlFor="" className='w-52 ' >
                    Selected Days :  </label>
                <div className='flex flex-wrap ' >
                    {
                        data?.weekoff_days?.map((val) => (
                            <div className='mx-2 bg-slate-200 p-1 text-sm px-2 relative rounded my-1 ' >
                                <button onClick={() => {
                                    setData((prev) => (
                                        {
                                            ...prev,
                                            weekoff_days: data.weekoff_days.filter((obj) => obj !== val)
                                        }
                                    ))
                                }}
                                    className='p-1 text-red-600 rounded-full  ' >
                                    <CloseIcon size={13} />
                                </button>
                                {weekOffDays.find((obj) => obj.id == val)?.day}
                            </div>
                        ))
                    }
                </div>
            </div>
            <button disabled={loading} onClick={postWeekOff}
                className={` ms-auto flex my-3 text-center savebtn text-green-50 p-1 px-2 w-20 rounded `} >
                {loading ? 'Loading...' : "Save"}
            </button>
        </div>
    )
}

export default EmployeeWeekOff