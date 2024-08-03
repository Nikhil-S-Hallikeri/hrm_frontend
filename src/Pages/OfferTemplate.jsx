import React, { useContext, useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import { domain, port } from '../App'
import axios from 'axios'
import Tempone from '../Components/Tempone'
import InternLetter from './InternLetter'
import { toast } from 'react-toastify'
import { HrmStore } from '../Context/HrmContext'
import { Modal } from 'react-bootstrap'
import { usePDF } from 'react-to-pdf'
import DownloadButton from '../Components/Employee/DownloadButton'
import GeneratePDF from '../Components/ApplyList/GeneratePDF'

const OfferTemplate = () => {
    let { getCurrentDate } = useContext(HrmStore)
    let { id } = useParams()
    let [loading, setloading] = useState('')
    let [response, setresponseSubmited] = useState(false)
    let [commentObj, setCommentObj] = useState({
        show: false,
        cmnt: '',
        status: '',
    })

    // let pdfRef = useRef()
    // const { toPDF, targetRef } = usePDF({ Offer_Letter: 'page.pdf' });
    const targetRef = useRef()
    let [show, setshow] = useState(false)
    let user = JSON.parse(sessionStorage.getItem('user'))
    let [formobj, setformobj] = useState({
        id: '',
        OfferId: '', //candidateid
        Name: '', //candidateName
        Email: '',
        Phone: '',
        DOB: '',
        position: '',
        Date_of_Joining: null,
        Designation: null,
        Employeement_Type: '',
        probation_Duration_From: null,
        probation_Duration_To: null,
        WorkLocation: '',
        CTC: null,
        internship_Duration_From: null,
        internship_Duration_To: null,
        probation_status: null,
        notice_period: null,
    })
    let getCandidate = () => {
        axios.get(`${port}/root/Offerletter/${id}/`).then((response) => {
            console.log("hellow23", response.data.offer_instance);
            setshow(true)
            setformobj(response.data.offer_instance)
            setformobj((prev) => ({
                ...prev,
                Designation: response.data.AppliedDesignation
            }))
        }).catch((error) => {
            console.log(error);
        })

    }
    let [comments, setComments] = useState()
    let [offerAcceptance, setOfferAcceptance] = useState()
    let [mailcontent, setMailcontent] = useState({
        show: false,
        content: ` `,
        subject: 'Offer Letter '
    })
    const handleNotAccept = () => {
        const formData = new FormData();
        formData.append('remarks', comments);
        formData.append('Status', offerAcceptance);
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
        if (comments) {
            axios.post(`${port}/root/OfferAcceptStatus/${id}/`, formData)
                .then((res) => {
                    console.log("Offer_Accepted_res", res.data);
                    toast.success('Offer Not Accepted')
                    getReportStatus()
                    setOfferAcceptance('')
                }).catch((err) => {
                    console.log("Offer_Accepted_err", err.data);
                })
        }
        else
            toast.warning('Fill the Comments')
    };
    const handleAccept = () => {
        const formData = new FormData();
        formData.append('remarks', comments);
        formData.append('Status', offerAcceptance);
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
        if (comments) {
            axios.post(`${port}/root/OfferAcceptStatus/${id}/`, formData)
                .then((res) => {
                    console.log("Offer_Accepted_res", res.data);
                    toast.success('Offer Accepted')
                    getReportStatus()
                    getCandidate()
                    setOfferAcceptance('')
                }).catch((err) => {
                    console.log("Offer_Accepted_err", err.data);
                })
        }
        else
            toast.warning('Fill the Comments')

    };
    useEffect(() => {
        if (formobj.id) {
            setMailcontent((prev) => ({
                ...prev,
                content: `Dear ${formobj.Name},\nWe are letting u know that you have selected this the offer we have been come Out with.You can check the Offer in the given link below.
Link : ${domain}/candidateOfferLetter/${formobj.CandidateId}/`
            }))
        }
    }, [formobj.id])
    const sendbackend = async () => {
        setloading('submit')
        // toPDF();
        // alert('Offer Letter sent successfully')
        // await new Promise(resolve => setTimeout(resolve, 2000));
        // const pdfBlob = await fetch('page.pdf').then((res) => res.blob());
        // console.log(pdfBlob)
        // const pdfFile = new File([pdfBlob], 'offerletter.pdf', { type: 'application/pdf' });
        // console.log(pdfFile);
        // console.log({
        //     'PDF_File': pdfFile,
        //     Letter_sended_by: user.EmployeeId,
        //     Accept_Form: `${domain}/offeraccept/${formobj.CandidateId}/`
        // });
        const formData = new FormData()
        // formData.append('PDF_File', pdfFile)
        formData.append('Letter_sended_by', user.EmployeeId)
        formData.append('Accept_Form', `${domain}/offeraccept/${formobj.CandidateId}`)
        formData.append('offer_mail_content', mailcontent.content)
        formData.append('subject', mailcontent.subject)
        axios.patch(`${port}/root/CandidateOfferLetterSending/${formobj.id}/`, formData).then((response) => {
            console.log(response.data);
            setloading('')
            setMailcontent((prev) => ({
                show: false,
                content: ` `,
                subject: 'Offer Letter '
            }))
            getCandidate()
            toast.success('Offer Letter sended to the Candidate.')
        }).catch((error) => {
            console.log(error);
            setloading('')
            toast.error('Error Acquired')
        })

    };
    useEffect(() => {
        if (id) {
            getCandidate()
        }
    }, [id])
    let sendRequest = () => {
        axios.get(`${port}/root/OfferLetterDetails/${formobj.id}/`).then((response) => {
            console.log(response.data);
            getCandidate()
            toast.success('Request sended to the Admin')
        }).catch((error) => {
            console.log(error);
            toast.error('Error acquired')
        })
    }
    let handleApproval = () => {
        axios.patch(`${port}/root/OfferLetterDetails/${formobj.id}/`, {
            verification_status: commentObj.status,
            approval_reason: commentObj.cmnt,
            VerifiedDate: new Date()
        }).then((response) => {
            toast.success(`Offer letter approval got ${commentObj.status} `)
            console.log(response.data);
            setCommentObj({
                show: false,
                cmnt: '',
                status: '',
            })
            getCandidate()
        }).catch((error) => {
            console.log(error);
        })
    }
    let getReportStatus = () => {
        axios.get(`${port}/root/OfferAcceptStatus/${id}/`).then((response) => {
            console.log("hellow", response.data.message);
            setresponseSubmited(response.data.message == 'Completed')
        }).catch((error) => {
            console.log(error);
        })
    }
    useEffect(() => {
        if (id) {
            getReportStatus()

        }
    }, [id])
    return (
        <div>
            {formobj && (formobj.Accept_status == "Reject" && !user) ?
                <main className='h-[100vh] flex '>
                    <section className='bgclr p-3 flex items-center
                    justify-center m-auto h-[20vh] rounded w-[40vw] ' >
                        <p className='text-center mb-0  '>Response has been submitted !!! </p>

                    </section>

                </main> :
                < main >

                    {
                        show && formobj.Employeement_Type == 'intern' ?
                            <div>
                                <InternLetter pdfRef={targetRef} data={formobj} />
                            </div> : show && formobj.Employeement_Type == 'permanent' ?
                                <div>
                                    <Tempone targetRef={targetRef} data={formobj} />
                                </div> : <div className='flex h-[100vh] w-[100vw] '>
                                    <p className='m-auto ' > Loading... </p>
                                </div>
                    }
                    {
                        show &&
                        <div className='d-flex container mx-auto justify-content-end p-3' id='buttons'>
                            {/* <button className='btn btn-success btn-sm me-3' onClick={() => toPDF()}>Download PDF</button> */}
                            {(formobj.verification_status == 'Pending' || formobj.verification_status == 'Denied')
                                && !formobj.letter_verified_by && user && user.Disgnation != 'Admin' &&
                                <button onClick={sendRequest} className='p-2 mx-2 rounded savebtn text-white border-2 border-green-100'>
                                    Send Approval Request </button>
                            }
                            {user && (user.EmployeeId == formobj.letter_verified_by && (formobj.verification_status == 'Pending' || formobj.verification_status == 'Denied')) && <div>
                                <button onClick={() => setCommentObj((prev) => ({ ...prev, status: 'Approved', show: true }))} className='savebtn p-2 border-2 border-green-100 rounded text-white '>
                                    Approve </button>
                                <button onClick={() => setCommentObj((prev) => ({ ...prev, status: 'Denied', show: true }))} className='bg-red-600 border-2 border-red-100 p-2 rounded text-white mx-2 ' >
                                    Decline </button>
                            </div>
                            }
                            {(formobj.verification_status == 'Approved' && !formobj.Letter_sended_status) &&
                                <button onClick={() => setMailcontent((prev) => ({
                                    ...prev,
                                    show: true
                                }))} disabled={loading == 'submit'}
                                    className='btn btn-warning btn-sm'>
                                    {loading == 'submit' ? 'Loading...' : "Submit"}
                                </button>}



                            {
                                formobj.verification_status == "Approved" && formobj.Accept_status == 'Pending' && !user &&
                                <div>
                                    <button onClick={() => setOfferAcceptance('Accept')} className='savebtn p-2 border-2 border-green-100 rounded text-white ' >
                                        Accept
                                    </button>
                                    <button onClick={() => setOfferAcceptance('Reject')} className='bg-red-600 p-2 border-2 border-red-100 mx-3 rounded text-white '>
                                        Decline
                                    </button>
                                </div>
                            }
                            {
                                formobj && formobj.Accept_status == "Accept" &&
                                <div>
                                    {/* <DownloadButton toPDF={toPDF} /> */}
                                    <GeneratePDF divRef={targetRef} />
                                </div>
                            }

                        </div>
                    }

                </main>}
            {
                mailcontent.show && <Modal centered show={mailcontent.show}
                    onHide={() => setMailcontent((prev) => ({
                        ...prev,
                        show: false
                    }))} >
                    <Modal.Header closeButton >
                        Mail format a Candidate to send
                    </Modal.Header>
                    <Modal.Body>
                        <div>
                            Subject :
                            <input type="text" value={mailcontent.subject}
                                className='bgclr block w-full my-2 rounded p-2 outline-none '
                                onChange={(e) => setMailcontent((prev) => ({
                                    ...prev,
                                    subject: e.target.value
                                }))} />
                        </div>
                        <div className='' >
                            Mail Content :
                            <textarea name="" rows={7}
                                className='bgclr my-3 w-full block p-2 rounded outline-none ' value={mailcontent.content}
                                onChange={(e) => setMailcontent((prev) => ({
                                    ...prev,
                                    content: e.target.value
                                }))} id="">

                            </textarea>
                        </div>

                        {(formobj.verification_status == 'Approved' && !formobj.Letter_sended_status) &&
                            <button onClick={sendbackend} disabled={loading == 'submit'}
                                className='btn btn-warning btn-sm'>
                                {loading == 'submit' ? 'Loading...' : "Send"}
                            </button>}
                    </Modal.Body>

                </Modal>
            }
            {
                commentObj.show &&
                <Modal centered show={commentObj.show} onHide={() => setCommentObj((prev) => ({
                    ...prev,
                    show: false
                }))} >
                    <Modal.Header closeButton >
                        Offer letter approval
                    </Modal.Header>
                    <Modal.Body className=''>
                        <div className=''>
                            Comments for the Offer {commentObj.status} :
                            <textarea name="" value={commentObj.cmnt} rows={5}
                                className='p-2 rounded bgclr block outline-none w-full'
                                placeholder='Write a comment... '
                                onChange={(e) => setCommentObj((prev) => ({ ...prev, cmnt: e.target.value }))} id="">
                            </textarea>
                        </div>
                        <button onClick={handleApproval} className='savebtn p-2 my-2 px-3 text-white rounded ms-auto flex border-2 border-green-100 '>
                            Send
                        </button>
                    </Modal.Body>
                </Modal>
            }

            {/* Candidate mesagge for the accept or deny */}
            {
                offerAcceptance && <Modal centered show={offerAcceptance} onHide={() => setOfferAcceptance('')} >
                    <Modal.Header className=' ' closeButton >
                        Job Acceptance Letter
                    </Modal.Header>
                    <Modal.Body>
                        <div >
                            Comments :
                            <textarea placeholder='Comment here' name="" value={comments} onChange={(e) => setComments(e.target.value)}
                                className='bgclr p-2 block w-full my-2 rounded outline-none ' id=""></textarea>
                        </div>
                        {
                            formobj.verification_status == "Approved" && formobj.Accept_status == 'Pending' &&
                            <div className='flex ms-auto w-fit'>
                                <button onClick={() => handleAccept(offerAcceptance)} className='savebtn p-2 border-2 border-green-100 rounded text-white ' >
                                    Submit
                                </button>

                            </div>
                        }
                    </Modal.Body>

                </Modal>
            }

        </div >
    )
}

export default OfferTemplate