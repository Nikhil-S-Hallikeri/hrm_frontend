import React, { useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import InputFieldform from '../../Components/SettingComponent/InputFieldform'

const RecuirementaddingModal = ({ cid, show, setshow }) => {
    let [jobDetails, setJobDetails] = useState({
        job_location: '',
        qualification: '',
        required_skills: '',
        experience_max: "",
        experience_min: '',
        package_max: '',
        package_min: '',
        hiring_end_date: '',
        hiring_start_date: '',
        open_positions: '',
        job_description: '',
        job_title: '',
        client: cid
    })
    let handleJobDetails = (e) => {
        let { name, value } = e.target
        setJobDetails((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    useEffect(() => {
        if (cid) {
            setJobDetails((prev) => ({
                ...prev,
                client: cid
            }))
        }
    }, [cid])

    return (
        <div>
            <Modal className=' ' centered size='xl'
                show={show} onHide={() => setshow(false)}>
                <Modal.Header closeButton >
                    Recuirement adding
                </Modal.Header>
                <Modal.Body>
                    <main className='formbg row rounded py-3 ' >
                        <InputFieldform label='Job Title' name='job_title' value={jobDetails.job_title}
                            handleChange={handleJobDetails} placeholder="Java Developer" />
                        <InputFieldform label='Job Location' name='job_location' value={jobDetails.job_location}
                            handleChange={handleJobDetails} placeholder="Banglore" />
                        <InputFieldform label='Job Description' name='job_description' value={jobDetails.job_description}
                            handleChange={handleJobDetails} type='textarea' />
                        <InputFieldform label='Qualification' name='qualification' value={jobDetails.qualification}
                            handleChange={handleJobDetails} placeholder='B.E' />
                        <InputFieldform label='Open positions' name='open_positions' value={jobDetails.open_positions}
                            handleChange={handleJobDetails} />


                    </main>

                </Modal.Body>


            </Modal>

        </div>
    )
}

export default RecuirementaddingModal