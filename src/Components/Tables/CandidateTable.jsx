import React, { useEffect, useState } from 'react'
import LoadingData from '../MiniComponent/LoadingData'
import FinalResultCompleted from '../Modals/FinalResultCompleted'
import SchedulINterviewModalForm from '../ApplyList/SchedulINterviewModalForm'

const CandidateTable = ({ data, loading, css, rid, getData }) => {
    let [filterLoading, setFilterLoading] = useState(false)
    let [filteredData, setFilterData] = useState()
    let [interviewModal, setInterviewModal] = useState()
    let [finalResultObj, setFinalResultObj] = useState(false)
    let [selectedCandidate, setSelectedCandidate] = useState()

    useEffect(() => {
        setFilterData(data)
    }, [data])
    return (
        <div>
            <main className={` table-responsive tablebg ${css ? css : 'h-[50vh]'} `} >
                <table className={`w-full `} >
                    <tr>
                        <th>SI No  </th>
                        <th>Candidate Name </th>
                        <th>Candidate ID </th>
                        <th>Email </th>
                        <th>Contact Number </th>
                        <th>Applied Position </th>
                        <th>Experience(EXP/Fresher) </th>
                        <th> Report </th>
                        <th>Assign Interview </th>
                    </tr>
                    {
                        filteredData && !filterLoading && !loading && filteredData.map((obj, index) => (
                            <tr>
                                <td>{index + 1} </td>
                                <td> {obj.FirstName} </td>
                                <td> {obj.CandidateId} </td>
                                <td>{obj.Email} </td>
                                <td>{obj.PrimaryContact} </td>
                                <td> {obj.AppliedDesignation} </td>
                                <td>{obj.current_position} </td>
                                <td>
                                    <button onClick={() =>
                                        setFinalResultObj(obj)}
                                        className='p-2 rounded bg-blue-600 text-sm text-white '>
                                        view
                                    </button>
                                </td>
                                <td>
                                    <button onClick={() => {
                                        setInterviewModal(obj)
                                        setSelectedCandidate(obj.CandidateId)
                                    }} className='p-1 text-xs rounded bg-blue-600 text-white'>
                                        Assign Interview </button>
                                </td>
                            </tr>
                        ))
                    }
                </table>
                {(loading || filterLoading) && <LoadingData css='h-[30vh]' />}
            </main>
            {/* Full data */}
            <FinalResultCompleted show={finalResultObj} setshow={setFinalResultObj} />
            {/* Interview scheduling */}
            <SchedulINterviewModalForm fetchdata={getData} rid={rid}
                candidateId={selectedCandidate} show={interviewModal}
                setshow={setInterviewModal} />

            {/* View Final Result */}
            {/* <FinalResultCompleted show={finalResultObj} setshow={setFinalResultObj} /> */}
        </div>
    )
}

export default CandidateTable