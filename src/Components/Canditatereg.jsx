import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { port } from '../App'
import '../assets/css/fonts.css'
import SweetAlert from 'react-bootstrap-sweetalert';
import '../assets/css/Sweet_.css'
import { toast } from 'react-toastify';



const Canditatereg = () => {
    let [loading, setloading] = useState()
    const [states, setStates] = useState([]);
    const [districts, setDistricts] = useState([]);
    const [selectedState, setSelectedState] = useState('');
    // ALL Form Input Details

    const [firstname, setFirstname] = useState("");
    const [LastName, setLastName] = useState('');
    const [Email, setEmail] = useState('');
    const [PrimaryContact, setPrimaryContact] = useState('');
    const [SecondaryContact, setSecondaryContact] = useState('');
    const [State, setState] = useState('');
    const [District, setDistrict] = useState('');
    const [highestQualification, setHighestQualification] = useState('');
    const [university, setUniversity] = useState('');
    const [specialization, setSpecialization] = useState('');
    const [percentage, setPercentage] = useState('');
    const [selectedYear, setSelectedYear] = useState('');
    const [currentDesignation, setCurrentDesignation] = useState('');
    const [noOfExperience, setNoOfExperience] = useState('');
    const [noticePeriod, setNoticePeriod] = useState('');
    const [generalSkillsWithExp, setGeneralSkillsWithExp] = useState('');
    const [softSkillsWithExp, setSoftSkillsWithExp] = useState('');
    const [technicalSkillsWithExp, setTechnicalSkillsWithExp] = useState('');
    const [currentCTC, setCurrentCTC] = useState('');
    const [technicalSkills, settTechnicalSkills] = useState("");
    const [generalSkills, setGeneralSkills] = useState("");
    const [softSkills, setsoftSkills] = useState("");
    const [expectedSalary, setexpectedSalary] = useState("");
    const [Contacted_by, setContactedBy] = useState("");
    const [JobPortal, setJobportal] = useState("");
    const [gender, setGender] = useState("");
    const [selectedOption, setSelectedOption] = useState("");
    const [Applyed_Designation, setApplyed_Designation] = useState("");

    const [showAlert, setShowAlert] = useState(false);
    const [alertType, setAlertType] = useState('success');





    let handleSubmit = (e) => {
        e.preventDefault();

        const formdata = new FormData()
        formdata.append('FirstName', firstname);
        formdata.append('LastName', LastName);
        formdata.append('Email', Email);
        formdata.append('PrimaryContact', PrimaryContact);
        formdata.append('SecondaryContact', SecondaryContact);
        formdata.append('State', State);
        formdata.append('District', District);
        formdata.append('HighestQualification', highestQualification);
        formdata.append('University', university);
        formdata.append('Specialization', specialization);
        formdata.append('Percentage', percentage);
        formdata.append('CurrentDesignation', currentDesignation);
        formdata.append('TotalExperience', noOfExperience);
        formdata.append('NoticePeriod', noticePeriod);
        formdata.append('GeneralSkills_with_Exp', generalSkillsWithExp);
        formdata.append('SoftSkills_with_Exp', softSkillsWithExp);
        formdata.append('TechnicalSkills_with_Exp', technicalSkillsWithExp);
        formdata.append('TechnicalSkills', technicalSkills);
        formdata.append('GeneralSkills', generalSkills);
        formdata.append('SoftSkills', softSkills);
        formdata.append('CurrentCTC', currentCTC);
        formdata.append('ExpectedSalary', expectedSalary);
        formdata.append('ContactedBy', Contacted_by);
        formdata.append('JobPortalSource', JobPortal);
        formdata.append('YearOfPassout', selectedYear);
        formdata.append('Gender', gender);
        formdata.append('Position', selectedOption);
        formdata.append('Applyed_Designation', Applyed_Designation);

        for (let pair of formdata.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
        setloading(true)
        if (firstname != '' && gender != '' && Email != '' && PrimaryContact != '' &&
            State != '' && District != '' && highestQualification != '' && selectedOption != ''
            && JobPortal != '' && Applyed_Designation != ''
        ) {

            axios.post(`${port}/root/applicationform/${Applyed_Designation}/`, formdata)
                .then((r) => {
                    console.log("applicationform_res", r.data)
                    // alert('Candidate Registration Form Successfull..')
                    setAlertType('success');
                    setShowAlert(true);
                    setloading(false)

                    // setFirstname("")
                    // setFirstname("")
                    setLastName('')
                    setEmail('')
                    setPrimaryContact('')
                    setSecondaryContact('')
                    setState('')
                    setDistrict('')
                    setHighestQualification('')
                    setUniversity('')
                    setSpecialization('')
                    setPercentage('')
                    setSelectedYear('')
                    setCurrentDesignation('')
                    setNoOfExperience('')
                    setNoticePeriod('')
                    setGeneralSkillsWithExp('')
                    setSoftSkillsWithExp('')
                    setTechnicalSkillsWithExp('')
                    setCurrentCTC('')
                    settTechnicalSkills("")
                    setGeneralSkills("")
                    setsoftSkills("")
                    setexpectedSalary("")
                    setContactedBy("")
                    setJobportal("")
                    setGender("")
                    setSelectedOption('')
                    setApplyed_Designation('')
                })
                .catch((err) => {
                    setAlertType('error');
                    setShowAlert(true);
                    setloading(true)
                    console.log("applicationform_err", err)
                })
        }
        else {
            toast.warning('Fill all the required fields')
        }
    }

    const handleConfirm = () => {
        setShowAlert(false);
    };



    // Function to generate years from startYear to endYear
    const generateYears = (startYear, endYear) => {
        const years = [];
        for (let year = startYear; year <= endYear; year++) {
            years.push(year);
        }
        return years;
    };


    const handleYearChange = (e) => {
        setSelectedYear(e.target.value);
    };


    const [is, setIs] = useState(false);
    const [isFresher, setIsFresher] = useState(false);
    const [isExperience, setIsExperience] = useState(false);

    const handleFresherChange = (type) => {
        // alert(type);
        setSelectedOption(type)

        if (type === 'Fresher') {
            setIsFresher(true);
            setIsExperience(false);
        } else if (type === 'Experience') {
            setIsFresher(false);
            setIsExperience(true);
        }
    };




    return (
        <div>
            <div className='animate_animated animate_slideInUp bg-light'>
                <div className='container-fluid row m-0 pb-4 pt-3'>

                    <div className='mb-2 p-3 d-flex'>
                        <h3 className='text-primary Candidate_reg mx-auto'>CANDIDATE REGISTRATION FORM</h3>
                    </div>
                    <div className="col-12 bg-white py-3 shadow">
                        <form onSubmit={handleSubmit}>
                            {/* ---------------------------------PERSONAL DETAILS--------------------------------------------------------- */}
                            <div className="row m-0  pb-2">
                                <h5 className='text-primary pb-3 mt-2'>Personal Details</h5>
                                <div className='row m-0 mt-2'>

                                    <div className="col-md-6 col-lg-3  mb-3">
                                        <label htmlFor="firstName" className="form-label">First Name <span class='text-danger'>*</span> </label>
                                        <input type="text" className="form-control shadow-none bg-light" id="FirstName" name="FirstName" value={firstname} onChange={(e) => setFirstname(e.target.value)} required />
                                    </div>
                                    <div className="col-md-6 col-lg-3 mb-3">
                                        <label htmlFor="lastName" className="form-label">Last Name</label>
                                        <input type="text" className="form-control shadow-none bg-light" id=" LastName" name=" LastName" value={LastName} onChange={(e) => setLastName(e.target.value)} required />
                                    </div>
                                    <div className="col-md-6 col-lg-3 mb-3">
                                        <label htmlFor="gender" className="form-label bg-light">Gender <span class='text-danger'>*</span> </label>
                                        <select
                                            className="form-control shadow-none bg-light"
                                            id="gender"
                                            name="gender"
                                            value={gender} // Set the value of the select input to gender
                                            onChange={(e) => setGender(e.target.value)} // Update gender state when the select input changes
                                            required>
                                            <option value="">Select Gender <span class='text-danger'>*</span> </option> {/* Empty value for the default option */}
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="others">Others</option>
                                        </select>
                                    </div>
                                    <div className="col-md-6 col-lg-3 mb-3">
                                        <label htmlFor="email" className="form-label">Email Id<span class='text-danger'>*</span> </label>
                                        <input type="email" className="form-control shadow-none bg-light" id=" Email" name=" Email" value={Email} onChange={(e) => setEmail(e.target.value)} required />
                                    </div>
                                    <div className="col-md-6 col-lg-3 mb-3">
                                        <label htmlFor="primaryContact" className="form-label">Primary Mobile Number <span class='text-danger'>*</span> </label>
                                        <input type="number" className="form-control shadow-none bg-light" id="PrimaryContact" name="PrimaryContact" value={PrimaryContact}
                                            onChange={(e) => { if (e.target.value >= 0 && e.target.value.length<=10 ) { setPrimaryContact(e.target.value) } }} required />
                                    </div>
                                    <div className="col-md-6 col-lg-3 mb-3">
                                        <label htmlFor="secondaryContact" className="form-label">Secondary Contact  </label>
                                        <input type="number" className="form-control shadow-none bg-light" id="SecondaryContact" name="SecondaryContact"
                                            value={SecondaryContact} onChange={(e) => { if (e.target.value >= 0&& e.target.value.length<=10) { setSecondaryContact(e.target.value) } }} />
                                    </div>
                                    <div className="col-md-6 col-lg-3 mb-3">
                                        <label htmlFor="secondaryContact" className="form-label">State <span class='text-danger'>*</span> </label>
                                        <input type="text" className="form-control shadow-none bg-light" id="State" name="State" value={State} onChange={(e) => setState(e.target.value)} required />
                                    </div>
                                    <div className="col-md-6 col-lg-3 mb-3">
                                        <label htmlFor="secondaryContact" className="form-label">District <span class='text-danger'>*</span> </label>
                                        <input type="text" className="form-control shadow-none bg-light" id=" District" name=" District" value={District} onChange={(e) => setDistrict(e.target.value)} required />
                                    </div>
                                </div>

                            </div>

                            {/* ----------------------------------EDUCATIONAL DETAILS----------------------------------------------------------- */}
                            <div className="row m-0  py-3">
                                <div className="col-md-12 col-lg-12 mb-3 mt-2">


                                    <div className='d-flex'>

                                        <div className="nav-item d-flex">
                                            <input
                                                type="checkbox"
                                                checked={isFresher}
                                                onChange={() => handleFresherChange('Fresher')}

                                            />
                                            {/* <label htmlFor="home-tab" className="nav-link">Fresher</label> */}
                                            <h5 className='text-primary pb-3 ms-3 mt-4'>Fresher <span class='text-danger'>*</span> </h5>

                                        </div>
                                        <div className="nav-item ms-5 d-flex">
                                            <input
                                                type="checkbox"
                                                checked={isExperience}
                                                onChange={() => handleFresherChange('Experience')}
                                            />
                                            <h5 className='text-primary pb-3 ms-3 mt-4'>Experience <span class='text-danger'>*</span> </h5>

                                            {/* <label htmlFor="profile-tab" className="nav-link">Experience</label> */}
                                        </div>
                                    </div>


                                    {isFresher && (
                                        <div className="mt-4  row m-0">
                                            <div className="col-md-6 col-lg-4 mb-3">
                                                <label htmlFor="highestQualification" className="form-label">Highest Qualification <span class='text-danger'>*</span> </label>
                                                <input type="text" className="form-control shadow-none bg-light" id="HighestQualification" name="HighestQualification" value={highestQualification} onChange={(e) => setHighestQualification(e.target.value)} />
                                            </div>
                                            <div className="col-md-6 col-lg-4 mb-3">
                                                <label htmlFor="university" className="form-label">University  </label>
                                                <input type="text" className="form-control shadow-none bg-light" id="University" name="University" value={university} onChange={(e) => setUniversity(e.target.value)} />
                                            </div>
                                            <div className="col-md-6 col-lg-4 mb-3">
                                                <label htmlFor="specialization" className="form-label">Specialization </label>
                                                <input type="text" className="form-control shadow-none bg-light" id="Specialization" name="Specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} />
                                            </div>
                                            <div className="col-md-6 col-lg-4 mt-3 mb-3">
                                                <label htmlFor="percentage" className="form-label">Percentage <span class='text-danger'>*</span> </label>
                                                <input type="text" className="form-control shadow-none bg-light" id=" Percentage" name=" Percentage" value={percentage} onChange={(e) => setPercentage(e.target.value)} />
                                            </div>

                                            <div className="col-md-6 col-lg-4 mt-3">
                                                <label htmlFor="yearOfPassOut" className="form-label">Year of Pass Out <span class='text-danger'>*</span> </label>
                                                <select
                                                    className="form-control shadow-none bg-light"
                                                    id="yearOfPassOut"
                                                    name="yearOfPassOut"
                                                    value={selectedYear} // Set the value of the select input to selectedYear
                                                    onChange={(e) => setSelectedYear(e.target.value)} // Update selectedYear state when the select input changes
                                                >
                                                    <option value="">Select Year</option> {/* Empty value for the default option */}
                                                    {generateYears(1900, 2100).map((year) => (
                                                        <option key={year} value={year}>
                                                            {year}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <h5 className='text-primary  mt-4'>Key Skills  </h5>

                                            <div className="col-md-6 col-lg-3 mt-3">
                                                <label htmlFor="generalSkills" className="form-label">General Skills </label>
                                                <input type="text" className="form-control shadow-none bg-light" id="generalSkills" name="generalSkills" value={generalSkills} onChange={(e) => setGeneralSkills(e.target.value)} required />
                                            </div>
                                            <div className="col-md-6 col-lg-3 mt-3">
                                                <label htmlFor="softSkills" className="form-label">Soft Skills </label>
                                                <input type="text" className="form-control shadow-none bg-light" id="softSkills" name="softSkills" value={softSkills} onChange={(e) => setsoftSkills(e.target.value)} required />
                                            </div>
                                            <div className="col-md-6 col-lg-3 mt-3">
                                                <label htmlFor="technicalSkills" className="form-label">Technical Skills </label>
                                                <input type="text" className="form-control shadow-none bg-light" id="technicalSkills" name="technicalSkills" value={technicalSkills} onChange={(e) => settTechnicalSkills(e.target.value)} required />
                                            </div>
                                        </div>
                                    )}

                                    {isExperience && (
                                        <div className="mt-4 row m-0">
                                            {/* Experience Fields */}
                                            <div className="col-md-6 col-lg-3 mb-3">
                                                <label htmlFor="highestQualification" className="form-label">Highest Qualification<span class='text-danger'>*</span></label>
                                                <input type="text" className="form-control shadow-none bg-light" id="HighestQualification" name="HighestQualification" value={highestQualification} onChange={(e) => setHighestQualification(e.target.value)} />
                                            </div>
                                            <div className="col-md-6 col-lg-3 mb-3">
                                                <label htmlFor="university" className="form-label">University <span class='text-danger'>*</span></label>
                                                <input type="text" className="form-control shadow-none bg-light" id="University" name="University" value={university} onChange={(e) => setUniversity(e.target.value)} />
                                            </div>
                                            <div className="col-md-6 col-lg-3 mb-3">
                                                <label htmlFor="specialization" className="form-label">Specialization <span class='text-danger'>*</span></label>
                                                <input type="text" className="form-control shadow-none bg-light" id="Specialization" name="Specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} />
                                            </div>
                                            <div className="col-md-6 col-lg-3 mb-3">
                                                <label htmlFor="percentage" className="form-label">Percentage <span class='text-danger'>*</span> </label>
                                                <input type="text" className="form-control shadow-none bg-light" id=" Percentage" name=" Percentage" value={percentage} onChange={(e) => setPercentage(e.target.value)} />
                                            </div>

                                            <div className="col-md-6 col-lg-3 mb-3 mt-3">
                                                <label htmlFor="yearOfPassOut" className="form-label">Year of Pass Out <span class='text-danger'>*</span> </label>
                                                <select
                                                    className="form-control shadow-none bg-light"
                                                    id="yearOfPassOut"
                                                    name="yearOfPassOut"
                                                    value={selectedYear} // Set the value of the select input to selectedYear
                                                    onChange={(e) => setSelectedYear(e.target.value)} // Update selectedYear state when the select input changes
                                                >
                                                    <option value="">Select Year</option> {/* Empty value for the default option */}
                                                    {generateYears(1900, 2100).map((year) => (
                                                        <option key={year} value={year}>
                                                            {year}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div className="col-md-6 col-lg-3 mt-3">
                                                <label htmlFor="generalSkills" className="form-label">Current_Designation <span class='text-danger'>*</span></label>
                                                <input type="text" className="form-control shadow-none bg-light" id="Current_Designation" name="Current_Designation" value={currentDesignation} onChange={(e) => setCurrentDesignation(e.target.value)} />
                                            </div>
                                            <div className="col-md-6 col-lg-3 mt-3">
                                                <label htmlFor="softSkills" className="form-label">Total  Experience <span class='text-danger'>*</span></label>
                                                <input type="number" className="form-control shadow-none bg-light" id="noOfExperience" name="noOfExperience" value={noOfExperience} onChange={(e) => setNoOfExperience(e.target.value)} />
                                            </div>
                                            <div className="col-md-6 col-lg-3 mt-3">
                                                <label htmlFor="technicalSkills" className="form-label">Notice_period <span class='text-danger'>*</span></label>
                                                <input type="number" className="form-control shadow-none bg-light" id="noticePeriod" name="noticePeriod" value={noticePeriod} onChange={(e) => setNoticePeriod(e.target.value)} />
                                            </div>

                                            <div className="col-md-6 col-lg-3 mt-5">
                                                <label htmlFor="technicalSkills" className="form-label">General Skills with experience <span class='text-danger'>*</span></label>
                                                <input type="text" className="form-control shadow-none bg-light" id="generalSkillsWithExp" name="generalSkillsWithExp" value={generalSkillsWithExp} onChange={(e) => setGeneralSkillsWithExp(e.target.value)} />
                                            </div>
                                            <div className="col-md-6 col-lg-3 mt-5">
                                                <label htmlFor="technicalSkills" className="form-label">Soft Skills with experience<span class='text-danger'>*</span></label>
                                                <input type="text" className="form-control shadow-none bg-light" id="softSkillsWithExp" name="softSkillsWithExp" value={softSkillsWithExp} onChange={(e) => setSoftSkillsWithExp(e.target.value)} />
                                            </div>

                                            <div className="col-md-6 col-lg-3 mt-5">
                                                <label htmlFor="technicalSkills" className="form-label">Technical Skills with experience<span class='text-danger'>*</span></label>
                                                <input type="text" className="form-control shadow-none bg-light" id="technicalSkillsWithExp" name="technicalSkillsWithExp" value={technicalSkillsWithExp} onChange={(e) => setTechnicalSkillsWithExp(e.target.value)} />
                                            </div>
                                            <div className="col-md-6 col-lg-3 mt-5">
                                                <label htmlFor="technicalSkills" className="form-label">Current CTC <span class='text-danger'>*</span></label>
                                                <input type="number" className="form-control shadow-none bg-light" id="currentCTC" name="currentCTC" value={currentCTC} onChange={(e) => setCurrentCTC(e.target.value)} />
                                            </div>


                                        </div>
                                    )}


                                </div>
                            </div>

                            {/* -----------------------------------OTHER DETAILS------------------------------------------------------------- */}
                            <div className="row m-0  py-3">
                                {/* <h6 className='text-primary pb-3'>Other Details</h6> */}
                                <h5 className='text-primary  mt-4'>Other Details  </h5>

                                <div className="row m-0  py-3">
                                    <div className="col-md-6 col-lg-3 mb-3">
                                        <label htmlFor="expectedSalary" className="form-label">Designation Applying for<span class='text-danger'>*</span></label>
                                        <input type="text" className="form-control shadow-none bg-light" id="expectedSalary" name="expectedSalary" value={Applyed_Designation} onChange={(e) => setApplyed_Designation(e.target.value)} required />
                                    </div>

                                    <div className="col-md-6 col-lg-3 mb-3">
                                        <label htmlFor="expectedSalary" className="form-label">Expected Salary </label>
                                        <input type="number" className="form-control shadow-none bg-light" id="expectedSalary" name="expectedSalary" value={expectedSalary} onChange={(e) => setexpectedSalary(e.target.value)} required />
                                    </div>

                                    <div className="col-md-6 col-lg-3 mb-3">
                                        <label htmlFor="expectedSalary" className="form-label">Contacted By  </label>
                                        <input type="text" className="form-control shadow-none bg-light" id="expectedSalary" name="expectedSalary" value={Contacted_by} onChange={(e) => setContactedBy(e.target.value)} required />
                                    </div>

                                    {/* <div className="col-md-6 col-lg-3 mb-3">
                                        <label htmlFor="expectedSalary" className="form-label">Job Portal Source <span class='text-danger'>*</span></label>
                                        <input type="text" className="form-control shadow-none bg-light" id="expectedSalary" name="expectedSalary" value={JobPortal} onChange={(e) => setJobportal(e.target.value)} required />
                                    </div> */}

                                    <div className="col-md-6 col-lg-3 mb-3 ">
                                        <label htmlFor="yearOfPassOut" className="form-label">Job Portal Source  </label>
                                        <select
                                            className="form-control shadow-none bg-light"
                                            id="yearOfPassOut"
                                            name="yearOfPassOut"
                                            value={JobPortal}
                                            onChange={(e) => setJobportal(e.target.value)}
                                        >
                                            <option value="">Select Job Portal Source</option>
                                            <option value="linkedin">Linked In</option>
                                            <option value="naukri">Naukri</option>
                                            <option value="foundit">Foundit</option>
                                            <option value="others">Others</option>


                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 text-end mt-3">
                                <button type="submit" disabled={loading} className="btn btn-primary text-white fw-medium px-2 px-lg-5">
                                    {loading ? "Loading..." : "Submit "}</button>
                            </div>
                        </form>



                        {showAlert && (
                            <SweetAlert
                                success
                                title={`Thank you for registering with us !`}
                                onConfirm={handleConfirm}
                                showConfirm={false} // Hide the default confirm button
                                customClass="professional-alert" // Apply custom class to the alert
                            >
                                <div className="professional-content">
                                    <h4>{firstname} {LastName}</h4>
                                    <small>Your journey with Merida Tech Minds begins now. We are excited to support you in reaching your career goals.</small>
                                </div>
                            </SweetAlert>
                        )}

                        {showAlert && alertType === 'error' && (
                            <SweetAlert
                                error
                                title="An error occurred!"
                                onConfirm={handleConfirm}
                                showConfirm={false} // Hide the default confirm button
                                customClass="professional-alert-error" // Apply custom class to the alert
                            >
                                <div className="professional-content">
                                    <h4>Oops!</h4>
                                    <small>Something went wrong. Please try again later.</small>
                                </div>
                            </SweetAlert>
                        )}

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Canditatereg;
