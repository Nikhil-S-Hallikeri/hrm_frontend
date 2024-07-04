import React, { useContext, useEffect, useState } from 'react'
import { HrmStore } from '../../Context/HrmContext'
import axios from 'axios';
import { port } from '../../App';
import { toast } from 'react-toastify';

const ChangePassword = () => {
    let { activeSetting, setActiveSetting } = useContext(HrmStore)
    let empid = JSON.parse(sessionStorage.getItem('user')).EmployeeId
    let [loading, setloading] = useState(false)
    let [obj, setObj] = useState({
        OldPassword: '',
        NewPassword: '',
        confirmPassword: '',
        EmployeeId: empid
    })
    let handleChange = (e) => {
        let { value, name } = e.target
        setObj((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const changepassword = (e) => {
        e.preventDefault();
        if (obj.NewPassword == '' || obj.OldPassword == '' || obj.confirmPassword == '') {
            toast.warning('Enter the fields')
            return
        }
        if (obj.confirmPassword == obj.NewPassword) {
            setloading(true)
            axios.post(`${port}/root/changepassword`, obj).then((res) => {
                console.log("changepassword_res", res.data);
                toast.success(res.data)
                setloading(false)
                setObj({
                    OldPassword: '',
                    NewPassword: '',
                    confirmPassword: '',
                    EmployeeId: empid
                })
            }).catch((err) => {
                setloading(false)
                console.log("changepassword_res", err);
                if (err.response.data) {
                    toast.error(err.response.data)
                }
            })
        }
        else {
            toast.warning('Enter the correct confirm password')
        }
    };
    useEffect(() => {
        setActiveSetting('password')
    }, [])
    return (
        <div>
            <main className='bgclr p-4 my-4 shadow rounded-xl'>
                <h4> Change Password </h4>
                <section className='flex gap-3  flex-wrap my-3 py-3 items-center '>
                    <label htmlFor="" className='w-36 ' > Old Password</label>
                    <input type="text" value={obj.OldPassword} onChange={handleChange}
                        name='OldPassword' className='shadow-sm shadow-blue-100 w-96 bg-white outline-none p-2  rounded-lg ' />
                </section>
                <section className='flex gap-3  flex-wrap my-3 py-3 items-center '>

                    <label htmlFor="" className='w-36 ' > New Password</label>

                    <input type="text" value={obj.NewPassword} onChange={handleChange}
                        name='NewPassword' className='shadow-sm shadow-blue-100 w-96 bg-white outline-none p-2  rounded-lg ' />
                </section>
                <section className='flex gap-3  flex-wrap my-3 py-3 items-center '>
                    <label htmlFor="" className='w-36 ' > Confirm Password</label>
                    <input type="password" value={obj.confirmPassword} onChange={handleChange}
                        name='confirmPassword' className='shadow-sm shadow-blue-100 w-96 bg-white outline-none p-2  rounded-lg ' />
                </section>
                <button onClick={changepassword} disabled={loading} className='savebtn p-2 px-3 w-36 rounded border-2 border-green-50 text-white'>
                    {loading ? 'Loading..' : "Save"}
                </button>

            </main>
        </div>
    )
}

export default ChangePassword