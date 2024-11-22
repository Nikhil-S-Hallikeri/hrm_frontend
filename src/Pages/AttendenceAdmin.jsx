import React, { useContext, useEffect, useState } from 'react'
import Topnav from '../Components/Topnav'
import { HrmStore } from '../Context/HrmContext'
import SearchIcon from '../SVG/SearchIcon'
import ExportIcon from '../SVG/ExportIcon'
import ImportIcon from '../SVG/ImportIcon'
import AttendenceShowingadminTable from '../Components/Tables/AttendenceShowingadminTable'
import axios from 'axios'
import { port } from '../App'
import { toast } from 'react-toastify'
import SwipingDetails from '../Components/Modals/SwipingDetails'
import DownloadContent from '../Components/AuthPermissions/DownloadContent'

const AttendenceAdmin = ({ subpage }) => {
  let { activePage, setActivePage ,setTopNav} = useContext(HrmStore)
  let [Department_List, set_Department_List] = useState()
  let [trigger, settrigger] = useState(false)
  let dateNow = new Date()
  let year = []
  let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul',
    'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ]
  for (let i = 1900; i < 2200; i++) {
    year.push(i)
  }
  let [filterDetails, setfilterDetails] = useState({
    year: dateNow.getFullYear(),
    month: dateNow.getMonth() + 1,
    name: ''
  })
  let handleChangeFilterDetails = (e) => {
    let { name, value } = e.target
    setfilterDetails((prev) => ({
      ...prev,
      [name]: value
    }))
  }
  let getDepartment = () => {
    axios.get(`${port}root/ems/Departments/`)
      .then((r) => {
        set_Department_List(r.data)
        console.log("Departments_List_Res", r.data)
      })
      .catch((err) => {
        console.log("Departments_List_Res", err)
      })
  }
  let [attendanceList, setattendanceList] = useState()
  let [filteredAttendanceList, setFilteredAttendanceList] = useState()
  let getAttendanceList = () => {
    axios.get(`${port}/root/lms/attendance/year/${filterDetails.year}/month/${filterDetails.month}/`).then((response) => {
      console.log(response.data);
      setattendanceList(response.data)
    }).catch((error) => {
      console.log(error);
    })
  }
  useEffect(() => {
    getAttendanceList()
  }, [filterDetails.month, filterDetails.year])
  useEffect(() => {
    if (attendanceList)
      setFilteredAttendanceList(attendanceList)
  }, [attendanceList])
  let [loading, setLoading] = useState(false)
  let uploadAttendence = (e) => {
    setLoading(true)
    let formdata = new FormData()
    formdata.append('file_path', e.target.files[0])
    console.log(e.target.files[0]);
    axios.post(`${port}/root/lms/Bulk_Attendance_Data/`, formdata).then((response) => {
      toast.success('Excel file value uploaded successfully')
      getAttendanceList()
      console.log(response.data);
      setLoading(false)
    }).catch((error) => {
      console.log(error);
      toast.error('error acquired')
      setLoading(false)
    })
  }
  let filterlist = () => {
    let filterarry = attendanceList.filter((obj) => obj.Emp_Id &&
      obj.Emp_Id.Name.toLowerCase().indexOf(filterDetails.name.toLowerCase()) != -1)
    setFilteredAttendanceList(filterarry)
  }
  useEffect(() => {
    getDepartment()
    setActivePage('leave')
    setTopNav('list')
  }, [])
  return (
    <div className=''>
      {!subpage && <Topnav name='Attendence List' />}
      {trigger && <DownloadContent trigger={trigger} settrigger={settrigger}
        data={filteredAttendanceList} name={`Attendence${filterDetails.name && `_${filterDetails.name}`}_${filterDetails.year}_${months[filterDetails.month - 1]}`} />}
      <section className='flex gap-3 flex-wrap'>
        <div className='shadow  flex gap-1 items-center text-slate-500 text-sm bgclr w-48 p-1 rounded '>
          <div>
            <SearchIcon size={20} />
          </div>
          <input type="text" value={filterDetails.name}
            onKeyDown={(e) => {
              if (e.key = 'Enter')
                filterlist()
            }}
            name='name' onChange={handleChangeFilterDetails}
            className='outline-none p-1 bg-transparent ' placeholder='Search by Name..' />
        </div>
        {/* <div className='shadow bgclr w-48 p-1 py-0 rounded '>
          <label htmlFor="" className='text-xs fw-medium'> Department </label>
          <select className='block text-sm outline-none w-full bg-transparent ' name="" id="">
            <option value="">Select</option>
            {
              Department_List && Department_List.map((obj)=>(
                <option value="">{obj.Dep_Name} </option>
              ))
            }
          </select>
        </div> */}
        {/* Year */}
        <div className='shadow bgclr w-48 p-1 py-0 rounded '>
          <label htmlFor="" className='text-xs fw-medium'> Year </label>
          <select value={filterDetails.year} onChange={handleChangeFilterDetails}
            className='block text-sm outline-none w-full bg-transparent fw-semibold' name="year" id="">
            <option value="">Select</option>
            {year.map((yr) => (
              <option value={yr}>{yr} </option>
            ))}
          </select>
        </div>
        {/* Month */}
        <div className='shadow bgclr w-48 p-1 py-0 rounded '>
          <label htmlFor="" className='text-xs fw-medium'> Month </label>
          <select value={filterDetails.month} onChange={handleChangeFilterDetails}
            className='block text-sm outline-none w-full bg-transparent fw-semibold' name="month" id="">
            <option value="">Select</option>
            {months.map((month, index) => (
              <option value={index + 1}>{month} </option>
            ))}
          </select>
        </div>
        <button onClick={filterlist} className='savebtn shadow text-white w-48 rounded'>
          Search
        </button>


        <button disabled={loading} className=' bg-slate-50 ms-auto hover:bg-slate-100 rounded  shadow'>
          <a href={`../assets/Images/attendance_data.xlsx`}
            download className='items-center text-decoration-none text-slate-800 gap-2 text-sm p-1 px-2
          flex cursor-pointer w-full h-full'>
            {loading ? "Loading..." : "DownLoad Format"}
            <ExportIcon size={20} />
          </a>
        </button>
        <button disabled={loading} className=' bg-slate-50 ms-auto hover:bg-slate-100 rounded  shadow'>
          <label htmlFor="importattendence" className='items-center gap-2  p-1 px-2
          flex cursor-pointer w-full h-full'>
            {loading ? "Loading..." : "Import"}
            <ImportIcon size={20} />
          </label>
        </button>

        <input disabled={loading} onChange={uploadAttendence}
          id='importattendence' type="file" className='hidden' />
        <button onClick={() => {
          if (filteredAttendanceList.length > 0)
            settrigger(true)
          else
            toast.warning(`Empty File can't be downloaded.`)
        }} className='bg-slate-50 hover:bg-slate-100  items-center gap-2 flex rounded  p-2 px-2 shadow'>
          Export
          <ExportIcon size={20} />
        </button>
      </section>
      {filteredAttendanceList && <AttendenceShowingadminTable data={filteredAttendanceList} />}



    </div>
  )
}

export default AttendenceAdmin