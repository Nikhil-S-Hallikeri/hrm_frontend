import React from 'react'
import { Spinner } from 'react-bootstrap'

const LoadingData = ({ css }) => {
    return (
        <div className={` ${css ? css : "min-h-[60vh]"} flex `} >
            <Spinner className='m-auto ' />
        </div>
    )
}

export default LoadingData