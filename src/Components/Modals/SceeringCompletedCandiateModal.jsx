import React, { useContext, useEffect, useState } from 'react'
import { Modal } from 'react-bootstrap'
import { HrmStore } from '../../Context/HrmContext'

const SceeringCompletedCandiateModal = (props) => {
    let { show, setshow, data, setPersondata, persondata } = props
    console.log(persondata);
    let { convertToReadableDateTime } = useContext(HrmStore)
    let [interviewSchedulForm, setInterviewScheduleForm] = useState()
    console.log(data);
    let [candidateDetails, setCandidateDetails] = useState()
    let [candidateReviews, setCandidateReviews] = useState()
    useEffect(() => {
        // alert(show)
        console.log(data);
        if (data) {
            setCandidateDetails(data.candidate_data)
            setCandidateReviews(data.screening_data)
            console.log(data.candidate_data);
            console.log(data.screening_data);
        }
    }, [data, show])
    return (
        <div className=' ' >

            {show && candidateDetails != null && candidateReviews != null &&
                <Modal centered size='xl' show={show}
                    onHide={() => { setshow(false); setCandidateDetails(); setCandidateReviews() }} >
                    <Modal.Header closeButton>
                        <h4 className=''> Screening Completed Candidate : {candidateDetails.FirstName} {candidateDetails.LastName} </h4>
                    </Modal.Header>
                    <Modal.Body>
                        <main>
                            <h4>Candidate Details  </h4>
                            <section className='flex flex-wrap '>
                                <div className='col-lg-4 p-2 py-3 col-md-6 '>
                                    <p className='mb-0 fw-semibold'>
                                        Name : <span className='fw-normal break-words'>{candidateDetails.FirstName} </span> </p>
                                </div>
                                <div className='col-lg-4 p-2 col-md-6  py-3'>
                                    <p className='mb-0  fw-semibold'>
                                        Email : <span className='fw-normal break-words'>{candidateDetails.Email} </span> </p>
                                </div>
                                <div className='col-lg-4 p-2 col-md-6  py-3'>
                                    <p className='mb-0  fw-semibold'>
                                        Primary Contact : <span className='fw-normal break-words'>{candidateDetails.PrimaryContact} </span> </p>
                                </div>
                                {candidateDetails.SecondaryContact && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                    <p className='mb-0  fw-semibold'>
                                        Secondary Contact : <span className='fw-normal break-words'>{candidateDetails.SecondaryContact} </span> </p>
                                </div>}
                                {
                                    candidateDetails.AppliedDesignation && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                            Designation Applied for: <span className='fw-normal break-words'>{candidateDetails.AppliedDesignation} </span> </p>
                                    </div>
                                }
                                {
                                    candidateDetails.ContactedBy && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                            Contacted by : <span className='fw-normal break-words'>{candidateDetails.ContactedBy} </span> </p>
                                    </div>
                                }
                                {
                                    candidateDetails.ExpectedSalary && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                            Expected Salary : <span className='fw-normal break-words'>{candidateDetails.ExpectedSalary} </span> </p>
                                    </div>
                                }
                                {
                                    candidateDetails.Gender && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                            Gender : <span className='fw-normal break-words'>{candidateDetails.Gender} </span> </p>
                                    </div>
                                }

                                {
                                    candidateDetails.JobPortalSource && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                            Job Portal Source : <span className='fw-normal break-words'>{candidateDetails.JobPortalSource} </span> </p>
                                    </div>
                                }
                                {
                                    candidateDetails.Location && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                            Current Location : <span className='fw-normal break-words'>{candidateDetails.Location} </span> </p>
                                    </div>
                                }

                            </section>
                            <h4 className='my-2'>Qualification </h4>
                            <section className='flex flex-wrap '>
                                {
                                    candidateDetails.HighestQualification && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                            Highest Qualification : <span className='fw-normal break-words'>{candidateDetails.HighestQualification} </span> </p>
                                    </div>
                                }
                                {
                                    candidateDetails.Specialization && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                            Specification : <span className='fw-normal break-words'>{candidateDetails.Specialization} </span> </p>
                                    </div>
                                }
                                {
                                    candidateDetails.Percentage && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                            Percentage : <span className='fw-normal break-words'>{candidateDetails.Percentage} </span> </p>
                                    </div>
                                }
                                {
                                    candidateDetails.University && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                            University : <span className='fw-normal break-words'>{candidateDetails.University} </span> </p>
                                    </div>
                                }
                                {
                                    candidateDetails.YearOfPassout && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                            Year Of Passout : <span className='fw-normal break-words'>{candidateDetails.YearOfPassout} </span> </p>
                                    </div>
                                }
                            </section>
                            <h4>Skills   </h4>
                            <section className='flex flex-wrap '>
                                {
                                    candidateDetails.GeneralSkills && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                            General Skills : <span className='fw-normal break-words'>{candidateDetails.GeneralSkills} </span> </p>
                                    </div>
                                }
                                {
                                    candidateDetails.SoftSkills && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                            Soft Skills : <span className='fw-normal break-words'>{candidateDetails.SoftSkills} </span> </p>
                                    </div>
                                }
                                {
                                    candidateDetails.TechnicalSkills && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                            Technical Skills : <span className='fw-normal break-words'>{candidateDetails.TechnicalSkills} </span> </p>
                                    </div>
                                }
                                {
                                    candidateDetails.SoftSkills_with_Exp && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                            Soft Skills : <span className='fw-normal break-words'>{candidateDetails.SoftSkills_with_Exp} </span> </p>
                                    </div>
                                }
                                {
                                    candidateDetails.TechnicalSkills_with_Exp && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                            Technical Skills : <span className='fw-normal break-words'>{candidateDetails.TechnicalSkills_with_Exp} </span> </p>
                                    </div>
                                }
                                {
                                    candidateDetails.GeneralSkills_with_Exp && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                            General Skills : <span className='fw-normal break-words'>{candidateDetails.GeneralSkills_with_Exp} </span> </p>
                                    </div>
                                }
                            </section>
                            {candidateDetails.Experience && <h4>Employeement </h4>}
                            {
                                candidateDetails.Experience && <section className='flex flex-wrap'>
                                    {
                                        candidateDetails.CurrentCTC && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                            <p className='mb-0  fw-semibold'>
                                                Current CTC : <span className='fw-normal break-words'>{candidateDetails.CurrentCTC} </span> </p>
                                        </div>
                                    }
                                    {
                                        candidateDetails.CurrentDesignation && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                            <p className='mb-0  fw-semibold'>
                                                Current Designation : <span className='fw-normal break-words'>{candidateDetails.CurrentDesignation} </span> </p>
                                        </div>
                                    }
                                    {
                                        candidateDetails.NoticePeriod && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                            <p className='mb-0  fw-semibold'>
                                                Notice period : <span className='fw-normal break-words'>{candidateDetails.NoticePeriod} days </span>  </p>
                                        </div>
                                    }

                                </section>
                            }
                            <h4>Review</h4>
                            <section className='flex flex-wrap'>
                                {candidateReviews.recruiter_name && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                    <p className='mb-0  fw-semibold'>
                                        Recruiter Name : <span className='fw-normal break-words'>{candidateReviews.recruiter_name} </span>  </p>
                                </div>
                                }
                                {candidateReviews.assigner_name && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                    <p className='mb-0  fw-semibold'>
                                        Assigned By : <span className='fw-normal break-words'>{candidateReviews.assigner_name} </span>  </p>
                                </div>
                                }
                                {
                                    candidateReviews.Date_of_assigned && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                            Assigned At : <span className='fw-normal break-words'>{convertToReadableDateTime(candidateReviews.Date_of_assigned)} </span>  </p>
                                    </div>
                                }
                                {
                                    candidateReviews.review.ReviewedBy && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                            Reviewed By: <span className='fw-normal break-words'>{(candidateReviews.review.ReviewedBy)} </span>  </p>
                                    </div>
                                }
                                {
                                    candidateReviews.review.ReviewedOn && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                            Reviewed On : <span className='fw-normal break-words'>{convertToReadableDateTime(candidateReviews.review.ReviewedOn)} </span>  </p>
                                    </div>
                                }
                                {
                                    candidateReviews.review.ExpectedCTC && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                           Expected CTC : <span className='fw-normal break-words'>{(candidateReviews.review.ExpectedCTC)} </span>  </p>
                                    </div>
                                }
                                {
                                    candidateReviews.review.NoticePeriod && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                           Notice Period : <span className='fw-normal break-words'>{(candidateReviews.review.NoticePeriod)} days </span>  </p>
                                    </div>
                                }
                                {
                                    candidateReviews.review.Six_Days_Working && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                        Six Days Working : <span className='fw-normal break-words'>{(candidateReviews.review.Six_Days_Working)} </span>  </p>
                                    </div>
                                }
                                {
                                    candidateReviews.review.FlexibilityOnWorkTimings && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                        Flexibile On Work Timings : <span className='fw-normal break-words'>{(candidateReviews.review.FlexibilityOnWorkTimings)}  </span>  </p>
                                    </div>
                                }
                                {
                                    candidateReviews.review.RelocateToOtherCenters && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                        Relocate To Other Centers : <span className='fw-normal break-words'>{(candidateReviews.review.RelocateToOtherCenters)} </span>  </p>
                                    </div>
                                }
                                {
                                    candidateReviews.review.RelocateToOtherCity && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                        Relocate To Other City : <span className='fw-normal break-words'>{(candidateReviews.review.RelocateToOtherCity)} </span>  </p>
                                    </div>
                                }
                                {
                                    candidateReviews.review.OwnLoptop && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                        Able to carry own laptop : <span className='fw-normal break-words'>{(candidateReviews.review.OwnLoptop)} </span>  </p>
                                    </div>
                                }
                                {
                                    candidateReviews.review.SpouseName && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                            Spouse Name : <span className='fw-normal break-words'>{(candidateReviews.review.SpouseName)} </span>  </p>
                                    </div>
                                }
                                {
                                    candidateReviews.review.About_Family && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                            About Family : <span className='fw-normal break-words'>{candidateReviews.review.About_Family} </span>  </p>
                                    </div>
                                }
                                 {
                                    candidateReviews.review.FathersName && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                            Father Name : <span className='fw-normal break-words'>{candidateReviews.review.FathersName} </span>  </p>
                                    </div>
                                }
                                {
                                    candidateReviews.review.FathersDesignation && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                            Father Designation : <span className='fw-normal break-words'>{candidateReviews.review.FathersDesignation} </span>  </p>
                                    </div>
                                }
                                {
                                    candidateReviews.review.no_of_kids && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                            No of Children : <span className='fw-normal break-words'>{candidateReviews.review.no_of_kids} </span>  </p>
                                    </div>
                                }
                                {
                                    candidateReviews.review.devorced_statement && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                        Devorced statement : <span className='fw-normal break-words'>{candidateReviews.review.devorced_statement} </span>  </p>
                                    </div>
                                }
                                {
                                    candidateReviews.review.TotalYearOfExp && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                            Total years of Experience : <span className='fw-normal break-words'>{(candidateReviews.review.TotalYearOfExp)}
                                            </span>  </p>
                                    </div>
                                }
                                {
                                    candidateReviews.review.CurrentLocation && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                            Current Location : <span className='fw-normal break-words'>{candidateReviews.review.CurrentLocation} </span>  </p>
                                    </div>
                                }
                                {
                                    candidateReviews.review.LanguagesKnown && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                            Languages know : <span className='fw-normal break-words'>{candidateReviews.review.LanguagesKnown} </span>  </p>
                                    </div>
                                }
                                {
                                    candidateReviews.review.LastCTC && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                            Previous CTC : <span className='fw-normal break-words'>{candidateReviews.review.LastCTC} </span>  </p>
                                    </div>
                                }
                                {
                                    candidateReviews.review.MeritalStatus && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                            Material Status : <span className='fw-normal break-words'>{candidateReviews.review.MeritalStatus} </span>  </p>
                                    </div>
                                }
                                {
                                    candidateReviews.review.About_Childrens && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                            About Children : <span className='fw-normal break-words'>{candidateReviews.review.About_Childrens} </span>  </p>
                                    </div>
                                }
                                {
                                    candidateReviews.review.ModeOfCommutation && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                            Mode of Transporation : <span className='fw-normal break-words'>{candidateReviews.review.ModeOfCommutation} </span>  </p>
                                    </div>
                                }
                                {
                                    candidateReviews.review.Native && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                            Native : <span className='fw-normal break-words'>{candidateReviews.review.Native} </span>  </p>
                                    </div>
                                }
                                {
                                    candidateReviews.review.PositionAppliedFor && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                            Position applied for : <span className='fw-normal break-words'>{candidateReviews.review.PositionAppliedFor} </span>  </p>
                                    </div>
                                }
                                {
                                    candidateReviews.review.Residingat && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                            Resident At : <span className='fw-normal break-words'>{candidateReviews.review.Residingat} </span>  </p>
                                    </div>
                                }
                                {
                                    candidateReviews.review.Screening_Status && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                            Screening Status : <span className='fw-normal break-words'>{candidateReviews.review.Screening_Status} </span>  </p>
                                    </div>
                                }
                                {
                                    candidateReviews.review.Comments && <div className='col-lg-4 p-2 col-md-6  py-3'>
                                        <p className='mb-0  fw-semibold'>
                                            Comments : <span className='fw-normal break-words'>{candidateReviews.review.Comments} </span>  </p>
                                    </div>
                                }

                            </section>

                        </main>

                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>}
        </div>
    )
}

export default SceeringCompletedCandiateModal