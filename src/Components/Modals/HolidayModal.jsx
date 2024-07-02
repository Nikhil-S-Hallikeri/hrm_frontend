import React from 'react'
import { Modal } from 'react-bootstrap'

const HolidayModal = ({ show, setshow, getHoliday }) => {

    return (
        <div>
            <Modal show={show} size='lg' centered onHide={() => setshow(false)} >
                <Modal.Header className='' >
                    Create Holiday
                </Modal.Header>
                <Modal.Body>
                    <section className='flex flex-wrap '>
                        <div className='col-lg-6'>
                            <label htmlFor="">Name of the Holiday </label>
                            <input type="text" placeholder='Christmas' className='p-2 border-2 outline-none rounded block w-[90%] my-2 ' />
                        </div>
                        <div className='col-lg-6'>
                            <label htmlFor="">Restricted only for </label>
                            <select type="text" className='p-2 border-2 outline-none rounded block w-[90%] my-2 ' >
                                <option value="">Select Relegion</option>

                            </select>
                        </div>
                        <div className='col-lg-6'>
                            <label htmlFor="">Date  </label>
                            <input type="date" className='p-2 border-2 outline-none rounded block w-[90%] my-2 ' />
                        </div>

                    </section>
                    <button className='p-2 px-3 savebtn rounded text-white w-40 text-center justify-center ms-auto flex'>
                        Save
                    </button>


                </Modal.Body>
            </Modal>

        </div>
    )
}

export default HolidayModal