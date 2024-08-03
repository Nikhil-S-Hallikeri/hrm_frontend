import React from 'react'

const FinalResultShowTab = ({ label, value, link, cmnt }) => {
    return (
        <div className={`my-2 text-sm flex flex-col justify-between ${cmnt ? 'col-12' : 'col-sm-4'}`}>
            <label htmlFor="" className='text-sm poppins fw-medium text-slate-600 '>{label}</label>
            {value != undefined && <input type="text" disabled value={value} className='bgclr outline-none w-full block rounded p-2  ' />}
            {link != undefined &&
                <a className='bgclr outline-none w-full block rounded p-2 text-center text-decoration-none' download
                    href={link}> <p className='mb-0 text-center w-full'>Download</p>
                </a>
            }
            {
                cmnt && <textarea name="" id="" rows={5} value={cmnt} className='bgclr outline-none w-full block rounded p-2  text-decoration-none' > </textarea>
            }
        </div>
    )
}

export default FinalResultShowTab