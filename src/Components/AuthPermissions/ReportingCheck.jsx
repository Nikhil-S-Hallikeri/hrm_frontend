import React from 'react'

const ReportingCheck = ({ Child }) => {
    let user = JSON.parse(sessionStorage.getItem('user'))
    let designation = user.Disgnation
    let reporting = user.is_reporting_manager

    return (
        <div>
            {
                designation == 'HR' || designation == 'Admin' || reporting ? <Child /> :
                    <div className='h-[40vh] flex '>
                        <p className='m-auto'>
                            No Employee is reporting to you!!
                        </p>
                    </div>
            }
        </div>
    )
}

export default ReportingCheck