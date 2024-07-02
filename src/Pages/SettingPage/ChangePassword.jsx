import React, { useContext, useEffect } from 'react'
import { HrmStore } from '../../Context/HrmContext'

const ChangePassword = () => {
    let { activeSetting, setActiveSetting } = useContext(HrmStore)
    useEffect(() => {
        setActiveSetting('password')
    }, [])
    return (
        <div>
            <main className='bgclr p-4 my-4 shadow rounded-xl'>
                <h4> Change Password </h4>
                <section className='flex gap-3  flex-wrap my-3 py-3 items-center '>
                   <label htmlFor="" className='w-36 ' > Old Password</label>
                    <input type="text" className='shadow-sm shadow-blue-100 w-96 bg-white outline-none p-2  rounded-lg ' />
                </section>
                <section className='flex gap-3  flex-wrap my-3 py-3 items-center '>
                  
                   <label htmlFor="" className='w-36 ' > New Password</label>

                    <input type="text" className='shadow-sm shadow-blue-100 w-96 bg-white outline-none p-2  rounded-lg ' />
                </section>
                <section className='flex gap-3  flex-wrap my-3 py-3 items-center '>
                    
                   <label htmlFor="" className='w-36 ' > Confirm Password</label>

                    <input type="text" className='shadow-sm shadow-blue-100 w-96 bg-white outline-none p-2  rounded-lg ' />
                </section>
                <button className='savebtn p-2 px-3 w-36 rounded border-2 border-green-50 text-white'>
                    Save
                </button>

            </main>
        </div>
    )
}

export default ChangePassword