import React from 'react'

const ShortcutCard = (props) => {
   let {img,count,label}=props
    return (
            <div className='border-2 bg-slate-50 min-h-[7rem] cursor-pointer justify-around px-4
                         border-white rounded items-center d-flex shadow '>
                <img src={img} alt="Circle 1" className='w-16' />
                <div className='ms-3 '>
                    <p className='text-3xl mb-1 fw-bold '>{count} </p>
                    <p className='text-sm'> {label} </p>
                </div>
            </div>
    )
}

export default ShortcutCard