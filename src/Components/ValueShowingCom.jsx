import React from 'react'

const ValueShowingCom = ({ name, value, proof }) => {
    return (
        <div className='flex items-start my-1 ' >
            <h6 className='fw-normal w-[40%] ' > {name ? name : "Account Holder Name :"}  </h6>
            {proof ? <a href={proof} target='_blank' download >
                :  Click here
            </a> : <p className='w-[60%] pb-0' >
                {value == false ? ': No' : value == true ? ': Yes' :
                    value != null ? `: ${value}` : ": --"}
            </p>}
        </div>
    )
}

export default ValueShowingCom