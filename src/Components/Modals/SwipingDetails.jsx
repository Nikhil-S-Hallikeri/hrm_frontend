import React, { useContext } from 'react'
import { CloseButton, Modal } from 'react-bootstrap'
import HrmContext, { HrmStore } from '../../Context/HrmContext';

const SwipingDetails = ({ show, setshow }) => {
    console.log(show);
    let { changeDateYear } = useContext(HrmStore)
    let data = [
        {
            swipetime: '3:20'
        }, {
            swipetime: '4:20'
        }, {
            swipetime: '5:20'
        }, {
            swipetime: '6:20'
        }, {
            swipetime: '11:20'
        }, {
            swipetime: '12:20'
        }, {
            swipetime: '2:20'
        },
    ]
    return (
        <div>
            {show && <Modal show={show} centered onHide={() => { setshow('') }}>
                <Modal.Header> <div className='flex items-center justify-between w-full'>
                    <h6>Swipe Details for {changeDateYear(show.date)} </h6>
                    <button onClick={() => { setshow('') }} className='text-xs border-2 flex items-center rounded-full p-1 justify-start'> <CloseButton className='m-0 p-0' /> </button></div></Modal.Header>
                <Modal.Body>
                    <section className='text-sm flex flex-wrap gap-3'>
                        <p className='text-slate-400'>Employee name :
                            <span className='text-slate-700'> {show.Emp_Id && show.Emp_Id.Name} </span> </p>
                        <p className='text-slate-400'>Employee ID :
                            <span className='text-slate-700'> {show.Emp_Id && show.Emp_Id.EmployeeId} </span>
                        </p>
                    </section>
                    <section className='tablebg h-[50vh] overflow-y-scroll table-responsive'>
                        <table className='w-full text-sm'>
                            <tr className='sticky top-0 bgclr1 '>
                                <th>Swipe Time </th>
                                <th>Location </th>
                            </tr>
                            {show && show.attendance_records &&
                                show.attendance_records.map((obj, index) => (
                                    <tr className='' key={index} >
                                        <td>{obj.ScanTimings} </td>
                                        <td className=''>Enterance-1 </td>
                                    </tr>
                                ))}


                        </table>

                    </section>
                    <button onClick={() => setshow('')} className='mx-auto my-2 flex border-2 rounded px-2 text-sm p-1 hover:text-blue-600 hover:border-blue-300'>
                        Close
                    </button>
                </Modal.Body>
            </Modal>}
        </div>
    )
}

export default SwipingDetails