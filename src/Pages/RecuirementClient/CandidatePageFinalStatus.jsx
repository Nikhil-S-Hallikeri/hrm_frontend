import React, { useEffect, useState } from 'react'
import BackButton from '../../Components/MiniComponent/BackButton'
import axios from 'axios'
import { port } from '../../App'
import InputFieldform from '../../Components/SettingComponent/InputFieldform'
import CandidateTable from '../../Components/Tables/CandidateTable'
import { useParams } from 'react-router-dom'

const CandidatePageFinalStatus = () => {
    let { rid } = useParams()
    let [allCandidate, setAllCandidate] = useState()
    let [finalStatus, setFinalStatus] = useState('consider_to_client')
    let [loading, setLoading] = useState(false)
    let getAllCandidate = async () => {
        setLoading(true)
        // alert('ullen ayya')
        axios.get(`${port}/root/FinalCandidatesList/${finalStatus}/?req_id=${rid}`).then((response) => {
            console.log(response.data, 'finaldata');
            setAllCandidate(response.data)
            setLoading(false)
        }).catch((error) => {
            setLoading(false)
            console.log(error);
        })
    }
    useEffect(() => {
        getAllCandidate()
    }, [finalStatus])
    return (
        <div>
            <BackButton />
            <div className='bg-white rounded p-2 my-2 w-fit  ' >
                Final Status :
                <select className='outline-none  ' value={finalStatus} onChange={(e) => setFinalStatus(e.target.value)}
                    name="" id="">
                    <option value="Reject">Rejected</option>
                    <option value="consider_to_client">Consider to client </option>
                    <option value="Internal_Hiring">Internal Hiring</option>
                </select>
            </div>
            {/* Table */}
            {<CandidateTable getData={getAllCandidate} data={allCandidate} loading={loading} rid={rid} />}

        </div>
    )
}

export default CandidatePageFinalStatus