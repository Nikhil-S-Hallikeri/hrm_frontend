import React from 'react'

import { useState } from 'react'
import axios from 'axios'

import { port } from '../App'


const BgverificationForm = () => {


    let BG_verification_Companydata = JSON.parse(sessionStorage.getItem('BG_verification_Companydata'))


   

  


    //  DOC verifcation
    const [candidateId, setCandidateId] = useState('');
    const [verifiersName, setVerifiersName] = useState('');
    const [verifiersDesignation, setVerifiersDesignation] = useState('');
    const [verifiersEmployer, setVerifiersEmployer] = useState('');
    const [verifiersPhoneNumber, setVerifiersPhoneNumber] = useState('');
    const [candidateKnows, setCandidateKnows] = useState('');
    const [candidateDesignation, setCandidateDesignation] = useState('');
    const [candidateWorksFrom, setCandidateWorksFrom] = useState('');
    const [candidateReportingTo, setCandidateReportingTo] = useState('');
    const [candidatePositives, setCandidatePositives] = useState('');
    const [candidateNegatives, setCandidateNegatives] = useState('');
    const [candidatePerformanceFeedback, setCandidatePerformanceFeedback] = useState('');
    const [candidatePerformanceLevel, setCandidatePerformanceLevel] = useState('');
    const [candidateAbility, setCandidateAbility] = useState('');
    const [candidateAchieveTargets, setCandidateAchieveTargets] = useState('');
    const [candidateBehaviorFeedback, setCandidateBehaviorFeedback] = useState('');
    const [candidateLeavingReason, setCandidateLeavingReason] = useState('');
    const [candidateRehire, setCandidateRehire] = useState('');
    const [commentsOnCandidate, setCommentsOnCandidate] = useState('');
    const [packageOffered, setPackageOffered] = useState('');
    const [everHandledTeam, setEverHandledTeam] = useState('');
    const [teamSize, setTeamSize] = useState('');
    const [finalVerifyStatus, setFinalVerifyStatus] = useState('');
    const [remarks, setRemarks] = useState('');

    let Documentverifyform = (e) => {
        e.preventDefault();

        const formData = new FormData();

        // formData.append('doc_instance', _id);
        // formData.append('candidate', BG_verification_Companydata.canInfo);
        // formData.append('VerifiersName', BG_verification_Companydata.UserName);
        // formData.append('VerifiersDesignation', BG_verification_Companydata.Disgnation);
        // formData.append('VerifiersEmployer', BG_verification_Companydata.sendername);
        // formData.append('VerifiersPhoneNumber', BG_verification_Companydata.PhoneNumber);
        formData.append('CandidateKnows', candidateKnows);
        formData.append('CandidateDesignation', candidateDesignation);
        formData.append('CandidateWorksFrom', candidateWorksFrom);
        formData.append('CandidateReportingTo', candidateReportingTo);
        formData.append('CandidatePositives', candidatePositives);
        formData.append('CandidateNegatives', candidateNegatives);
        formData.append('CandidatePerformanceFeedback', candidatePerformanceFeedback);
        // formData.append('CandidatePerformanceLevel', candidatePerformanceLevel);
        formData.append('Candidates_ability', candidateAbility);
        formData.append('Candidates_Achieve_Targets', candidateAchieveTargets);
        formData.append('Candidate_Behavior_Feedback', candidateBehaviorFeedback);
        formData.append('Candidate_Leaving_Reason', candidateLeavingReason);
        formData.append('Candidate_Rehire', candidateRehire);
        formData.append('Comments_On_Candidate', commentsOnCandidate);
        formData.append('PackageOffered', packageOffered);
        formData.append('Ever_Handled_Team', everHandledTeam);
        formData.append('TeamSize', teamSize);
        formData.append('FinalVerifyStatus', finalVerifyStatus);
        formData.append('Remarks', remarks);

        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        axios.post(`${port}/root/BG_Verification/`, formData)
            .then((response) => {
                console.log("Document_Verify_res", response.data);
                alert("Document Verification Successful");
            })
            .catch((error) => {
                console.error("Document_Verify_error", error);
            });


    }

    




    return (
        <div>

            <div className='p-4 border rounded-lg'>

                <h3 className='text-center'>BG Verification Form</h3>

                <form >
                    <div className="row justify-content-center m-0">
                        <div className="col-lg-12 p-4 border rounded-lg">

                            <div className="row m-0 pb-2">
                                <div className="col-md-6 col-lg-3 mb-3">
                                    <label htmlFor="Name" className="form-label">Candidate Id</label>
                                    <input type="text" className="form-control shadow-none" id="Name" name="Name"  required />
                                </div>
                            </div>

                            <div className="row m-0 pb-2">
                                <div className="col-md-6 col-lg-3 mb-3">
                                    <label htmlFor="lastName" className="form-label">Verifiers Name</label>
                                    <input type="text" className="form-control shadow-none" id="LastName" name="LastName"  required />
                                </div>
                                <div className="col-md-6 col-lg-3 mb-3">
                                    <label htmlFor="email" className="form-label">Verifiers Designation</label>
                                    <input type="text" className="form-control shadow-none" id="Email" name="Email"  required />
                                </div>
                                <div className="col-md-6 col-lg-3 mb-3">
                                    <label htmlFor="primaryContact" className="form-label">Verifiers Employer</label>
                                    <input type="text" className="form-control shadow-none" id="PrimaryContact" name="PrimaryContact"   required />
                                </div>
                                <div className="col-md-6 col-lg-3 mb-3">
                                    <label htmlFor="secondaryContact" className="form-label">Verifiers Phone Number</label>
                                    <input type="text" className="form-control shadow-none" id="SecondaryContact" name="SecondaryContact"  required />
                                </div>

                                {/*  */}

                                <div className="row mt-4 pb-2">
                                    <div className="mb-3  col-md-6 col-lg-12">
                                        <label htmlFor="candidateKnows" className="form-label">Do you know the candidate ?</label>
                                        <select className="form-select " id="candidateKnows" value={candidateKnows} onChange={(e) => setCandidateKnows(e.target.value)} required>
                                            <option value="">Select</option>
                                            <option value="yes">Yes</option>
                                            <option value="no">No</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 col-lg-12 mb-3">
                                        <label htmlFor="candidateDesignation" className="form-label">Candidates designation when worked with you ?</label>
                                        <input type="text" className="form-control shadow-none" id="candidateDesignation" name="candidateDesignation" value={candidateDesignation} onChange={(e) => setCandidateDesignation(e.target.value)} required />
                                    </div>
                                    <div className="col-md-6 col-lg-12 mb-3">
                                        <label htmlFor="candidateWorksFrom" className="form-label">For how long did the candidate work with you?</label>
                                        <input type="text" className="form-control shadow-none" id="candidateWorksFrom" name="candidateWorksFrom" value={candidateWorksFrom} onChange={(e) => setCandidateWorksFrom(e.target.value)} required />
                                    </div>
                                    <div className="col-md-6 col-lg-12 mb-3">
                                        <label htmlFor="candidateReportingTo" className="form-label">Was the candidate directly reporting to you?</label>
                                        <input type="text" className="form-control shadow-none" id="candidateReportingTo" name="candidateReportingTo" value={candidateReportingTo} onChange={(e) => setCandidateReportingTo(e.target.value)} required />
                                    </div>
                                    <div className="col-md-6 col-lg-12 mb-3">
                                        <label htmlFor="candidatePositives" className="form-label">Candidates Positives</label>
                                        <input type="text" className="form-control shadow-none" id="candidatePositives" name="candidatePositives" value={candidatePositives} onChange={(e) => setCandidatePositives(e.target.value)} required />
                                    </div>
                                    <div className="col-md-6 col-lg-12 mb-3">
                                        <label htmlFor="candidateNegatives" className="form-label">Candidates Areas of Improvement (negatives)</label>
                                        <input type="text" className="form-control shadow-none" id="candidateNegatives" name="candidateNegatives" value={candidateNegatives} onChange={(e) => setCandidateNegatives(e.target.value)} required />
                                    </div>
                                    <div className="col-md-6 col-lg-12 mb-3">
                                        <label htmlFor="candidatePerformanceFeedback" className="form-label">Your feedback on the candidates performance (Ask to rate as</label>
                                        <input type="number" className="form-control shadow-none" id="candidatePerformanceFeedback" name="candidatePerformanceFeedback" value={candidatePerformanceFeedback} onChange={(e) => setCandidatePerformanceFeedback(e.target.value)} required />
                                    </div>
                                    <div className="mb-3  col-md-6 col-lg-12">
                                        <label htmlFor="candidatePerformanceLevel" className="form-label text-success">Excellent Good Average</label>
                                        <select className="form-select " id="candidatePerformanceLevel" value={candidatePerformanceLevel} onChange={(e) => setCandidatePerformanceLevel(e.target.value)} required>
                                            <option value="">Select</option>
                                            <option value="Excellent">Excellent</option>
                                            <option value="Good">Good</option>
                                            <option value="Average">Average</option>
                                        </select>
                                    </div>

                                    <div className="mb-3  col-md-6 col-lg-12">
                                        <label htmlFor="candidatePerformanceLevel" className="form-label text-success">Candidate’s ability to work under Target & handle Target Pressure?</label>
                                        <select className="form-select " id="candidatePerformanceLevel" value={candidateAbility} onChange={(e) => setCandidateAbility(e.target.value)} required>
                                            <option value="">Select</option>
                                            <option value="Excellent">Excellent</option>
                                            <option value="Good">Good</option>
                                            <option value="Average">Average</option>
                                        </select>
                                    </div>

                                    <div className="col-md-6 col-lg-12 mb-3">
                                        <label htmlFor="candidateAchieveTargets" className="form-label">Candidate’s ability to achieve Targets? On an average what would be the Target Vs Achieved %?</label>
                                        <input type="text" className="form-control shadow-none" id="candidateAchieveTargets" name="candidateAchieveTargets" value={candidateAchieveTargets} onChange={(e) => setCandidateAchieveTargets(e.target.value)} required />
                                    </div>
                                    <div className="col-md-6 col-lg-12 mb-3">
                                        <label htmlFor="candidateBehaviorFeedback" className="form-label">Your feedback on Candidates behavior, integrity & work ethics</label>
                                        <input type="number" className="form-control shadow-none" id="candidateBehaviorFeedback" name="candidateBehaviorFeedback" value={candidateBehaviorFeedback} onChange={(e) => setCandidateBehaviorFeedback(e.target.value)} required />
                                    </div>
                                    <div className="col-md-6 col-lg-12 mb-3">
                                        <label htmlFor="candidateLeavingReason" className="form-label">Candidates reason for leaving</label>
                                        <input type="text" className="form-control shadow-none" id="candidateLeavingReason" name="candidateLeavingReason" value={candidateLeavingReason} onChange={(e) => setCandidateLeavingReason(e.target.value)} required />
                                    </div>
                                    <div className="mb-3  col-md-6 col-lg-12">
                                        <label htmlFor="candidateRehire" className="form-label text-success">Is the candidate eligible for rehire?</label>
                                        <select className="form-select " id="candidateRehire" value={candidateRehire} onChange={(e) => setCandidateRehire(e.target.value)} required>
                                            <option value="">Select</option>
                                            <option value="yes">Yes</option>
                                            <option value="no">No</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 col-lg-12 mb-3">
                                        <label htmlFor="commentsOnCandidate" className="form-label">Your Comments on the Candidate?</label>
                                        <input type="text" className="form-control shadow-none" id="commentsOnCandidate" name="commentsOnCandidate" value={commentsOnCandidate} onChange={(e) => setCommentsOnCandidate(e.target.value)} required />
                                    </div>
                                    <div className="col-md-6 col-lg-12 mb-3">
                                        <label htmlFor="packageOffered" className="form-label">Package offered?</label>
                                        <input type="text" className="form-control shadow-none" id="packageOffered" name="packageOffered" value={packageOffered} onChange={(e) => setPackageOffered(e.target.value)} required />
                                    </div>
                                    <div className="mb-3  col-md-6 col-lg-12">
                                        <label htmlFor="everHandledTeam" className="form-label text-success">Ever Handled Team</label>
                                        <select className="form-select " id="everHandledTeam" value={everHandledTeam} onChange={(e) => setEverHandledTeam(e.target.value)} required>
                                            <option value="">Select</option>
                                            <option value="yes">Yes</option>
                                            <option value="no">No</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 col-lg-12 mb-3">
                                        <label htmlFor="teamSize" className="form-label">Team Size</label>
                                        <input type="number" className="form-control shadow-none" id="teamSize" name="teamSize" value={teamSize} onChange={(e) => setTeamSize(e.target.value)} required />
                                    </div>
                                    <div className="mb-3  col-md-6 col-lg-12">
                                        <label htmlFor="finalVerifyStatus" className="form-label text-success">Final Verify Status</label>
                                        <select className="form-select " id="finalVerifyStatus" value={finalVerifyStatus} onChange={(e) => setFinalVerifyStatus(e.target.value)} required>
                                            <option value="">Select</option>
                                            <option value="True">Yes</option>
                                            <option value="False">No</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 col-lg-12 mb-3">
                                        <label htmlFor="remarks" className="form-label">Remarks</label>
                                        <input type="text" className="form-control shadow-none" id="remarks" name="remarks" value={remarks} onChange={(e) => setRemarks(e.target.value)} required />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </form>

                <div className='d-flex justify-content-end gap-2 mt-3'>



                    <button type="submit" class="btn btn-success btn-sm" onClick={Documentverifyform} >Submit</button>


                </div>
            </div>




        </div>

    )
}

export default BgverificationForm