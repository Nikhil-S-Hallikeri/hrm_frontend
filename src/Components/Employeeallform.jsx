import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from './Sidebar';
import Topnav from './Topnav';
import { useParams } from 'react-router-dom';
import { port } from '../App'



const Employeeallform = () => {

    const { id } = useParams();

    let Empid = JSON.parse(sessionStorage.getItem('Employee_Info'))



    const [EMPLOYEE_INFORMATION, setEMPLOYEE_INFORMATION] = useState(true)
    const [EDUCATION_DETAILS, setEDUCATION_DETAILS] = useState(false)
    const [FAMILY_DETAILS, setFAMILY_DETAILS] = useState(false)
    const [EMERGENCY_DETAILS, setEMERGENCY_DETAILS] = useState(false)
    const [CONTACT_EMERGENCY, setCONTACT_EMERGENCY] = useState(false)
    const [REFERENCE, setREFERENCE] = useState(false)
    const [EXPERIENCE_LAST_POSITION, setEXPERIENCE_LAST_POSITION] = useState(false)
    const [LAST_POSITION_HELD, setLAST_POSITION_HELD] = useState(false)
    const [PERSONAL_INFORMATION, setPERSONAL_INFORMATION] = useState(false)
    const [EMPLOYEEIDENTITY, setEMPLOYEEIDENTITY] = useState(false)
    const [BANK_ACCOUNT_DETAILS, setBANK_ACCOUNT_DETAILS] = useState(false)
    const [PFDETAILS, setPFDETAILS] = useState(false)
    const [ADDITIONAL_INFORMATION, setADDITIONAL_INFORMATION] = useState(false)
    const [ATTACHMENTS, setATTACHMENTS] = useState(false)
    const [DOCUMENTS_SUBMITED, setDOCUMENTS_SUBMITED] = useState(false)
    const [DECLARATION, setDECLARATION] = useState(false)



    const [EMP_INFORMATION, setEMP_INFORMATION] = useState(false)
    const [EDU_DETAILS, setEDU_DETAILS] = useState(false)
    const [FAM_DETAILS, setFAM_DETAILS] = useState(false)
    const [EMER_DETAILS, setEMER_DETAILS] = useState(false)
    const [CONTACT_EMER, setCONTACT_EMER] = useState(false)
    const [REFER, setREFER] = useState(false)
    const [EXPERIENCE_LAST, setEXPERIENCE_LAST] = useState(false)
    const [LAST_POSI, setLAST_POSI] = useState(false)
    const [PERSONAL_INFO, setPERSONAL_INFO] = useState(false)
    const [EMPLOYEEIDEN, setEMPLOYEEIDEN] = useState(false)
    const [BANK_ACC, setBANK_ACC] = useState(false)
    const [PFDET, setPFDET] = useState(false)
    const [ADDITIONAL_INFO, setADDITIONAL_INFO] = useState(false)
    const [ATTACHE, setATTACHE] = useState(false)
    const [DOCUMENTS_SUB, setDOCUMENTS_SUB] = useState(false)
    const [DEC, setDEC] = useState(false)


    //  EDUCATION DETAILS ADD MORE START

    const [qualifications, setQualifications] = useState([

        { Qualification: '', University: '', year_of_passout: '', Persentage: '', Major_Subject: '', }
    ]);

    const handleAddRow = (e) => {
        e.preventDefault();

        setQualifications([...qualifications, { Qualification: '', University: '', year_of_passout: '', Persentage: '', Major_Subject: '' }]);
    };

    const handleInputChange = (index, event) => {
        const { name, value } = event.target;
        const updatedQualifications = [...qualifications];
        updatedQualifications[index][name] = value;
        setQualifications(updatedQualifications);
    };

    let handle_Education_Details = () => {
      
        console.log( "EDUCATION DETAILS",qualifications);


        axios.post(`${port}/root/ems/employee-education/${Empid.id}/`, qualifications).then((res) => {
            console.log("EMPLOYEE_Edu_RES", res.data);
            // setEmployeeInformation(res.data)


        }).catch((err) => {
            console.log("EMPLOYEE_INFORMATION_ERR", err.data);
        })


    }

    //  EDUCATION DETAILS ADD MORE END



    // FAMILY DETAILS ADD MORE START

    const [family_details, setfamily_details] = useState([
        { name: '', dob: '', relation: '', age: '', profession: '', gender: '', blood_group: '' }
    ]);

    const handleAddRow5 = (e) => {
        e.preventDefault();

        setfamily_details([...family_details, { name: '', dob: '', relation: '', age: '', profession: '', gender: '', blood_group: '' }]);
    };

    const handleInputChange5 = (index, event) => {
        const { name, value } = event.target;
        const updatedQualifications = [...family_details];
        updatedQualifications[index][name] = value;
        setfamily_details(updatedQualifications);
    };

    let handle_Family_Details = () => {
        
    
        console.log("FAMILY_DETAILS",family_details);


        axios.post(`${port}/root/ems/family-details/${Empid.id}/`, family_details).then((res) => {
            console.log("EMPLOYEE_FAMILY_DETAILS_RES", res.data);



        }).catch((err) => {
            console.log("EMPLOYEE_FAMILY_DETAILS_ERR", err.data);
        })

    }

    // FAMILY DETAILS ADD MORE END


    // DOCUMENTS SUBMITED START


    const [documents, setDocuments] = useState([
        { documentName: '', submitted: '', willSubmitOn: '' }
    ]);

    const handleAddRow3 = (e) => {
        e.preventDefault()
        setDocuments([...documents, { documentName: '', submitted: '', willSubmitOn: '' }]);
    };

    const handleInputChange3 = (index, event) => {
        const { name, value } = event.target;
        const updatedDocuments = [...documents];
        updatedDocuments[index][name] = value;
        setDocuments(updatedDocuments);
    };


    let handle_Documents_Submited_Details = () => {
        
        // alert("DOCUMENTS SUBMITED DETAILS")
        console.log("DOCUMENTS SUBMITED DETAILS",documents);

        axios.post(`${port}/root/ems/family-details/${Empid.id}/`, documents).then((res) => {
            console.log("EMPLOYEE_FAMILY_DETAILS_RES", res.data);

        }).catch((err) => {
            console.log("EMPLOYEE_FAMILY_DETAILS_ERR", err.data);
        })
    }

    // DOCUMENTS SUBMITED END



    //  REFERENCE  START

    const [references, setReferences] = useState([
        { person_name: '', relation: '', address: '', phone: '', city: '', country: '', email: '', state: '' }
    ]);

    const handleAddReferenceRow = (e) => {
        e.preventDefault()
        setReferences([...references, { person_name: '', relation: '', address: '', phone: '', city: '', country: '', email: '', state: '' }]);
    };

    const handleInputChange1 = (index, event) => {
        const { name, value } = event.target;
        const updatedReferences = [...references];
        updatedReferences[index][name] = value;
        setReferences(updatedReferences);
    };


    let handle_References_Details = () => {
        
        // alert("REFERENCE DETAILS")
        console.log("REFERENCE DETAILS",references);

        axios.post(`${port}/root/ems/candidate-reference/${Empid.id}/`, references).then((res) => {
            console.log("REFERENCE_DETAILS_RES", res.data);



        }).catch((err) => {
            console.log("REFERENCE_DETAILS_ERR", err.data);
        })


    }

    //  REFERENCE  END


    // EXPERIENCE (CHRONOLOGICAL ) START

    const [employments, setEmployments] = useState([
        { organisation: '', at_the_time_of_joining: '', from_date: '', gross_salary_drawn: '', immediate_superior_designation: '', job_responsibility: '', last_possition_held: '', reason_for_leaving: '', to_date: '' }
    ]);

    const handleAddRow2 = (e) => {
        e.preventDefault()
        setEmployments([...employments, { organisation: '', at_the_time_of_joining: '', from_date: '', gross_salary_drawn: '', immediate_superior_designation: '', job_responsibility: '', last_possition_held: '', reason_for_leaving: '', to_date: '' }]);
    };

    const handleInputChange2 = (index, event) => {
        const { name, value } = event.target;
        const updatedEmployments = [...employments];
        updatedEmployments[index][name] = value;
        setEmployments(updatedEmployments);
    };

    let handle_Experience_Details = () => {
        
        // alert(" EXPERIENCE CHRONOLOGICAL ")
        console.log(" EXPERIENCE_CHRONOLOGICAL",employments);


        axios.post(`${port}/root/ems/experience/${Empid.id}/`, employments).then((res) => {
            console.log("EXPERIENCE_CHRONOLOGICAL_RES", res.data);



        }).catch((err) => {
            console.log("EXPERIENCE_CHRONOLOGICAL_ERR", err.data);
        })

    }

    // EXPERIENCE (CHRONOLOGICAL ) END

    const [EmployeeInformation, setEmployeeInformation] = useState({})




    // EMPLOYEE INFORMATION START


    const [EmpName, setEmpName] = useState('');
    const [EmpDOB, setEmpDOB] = useState('');
    const [Gender, setGender] = useState('');
    const [EmpWeight, setEmpWeight] = useState('');
    const [EmpHeight, setEmpHeight] = useState('');
    const [Temprory_Address, setTemprory_Address] = useState('');
    const [Temprory_City, setTemproryCity] = useState('');
    const [Temprory_State, setTemproryState] = useState('');
    const [Temprory_Pin, setTemproryPin] = useState('');
    const [Temprory_Tel_No, setTemproryTel_No] = useState('');
    const [Temprory_Mobile_NO, setTemproryMobile_NO] = useState('');
    const [Temprory_Email_id, setTemproryEmail_id] = useState('');
    const [Permanent_Address, setPermanent_Address] = useState('');
    const [Permanent_City, setPermanentCity] = useState('');
    const [Permanent_State, setPermanentState] = useState('');
    const [Permanent_Pin, setPermanentPin] = useState('');
    const [Permanent_Tel_No, setPermanentTel_No] = useState('');
    const [Permanent_Mobile_NO, setPermanentMobile_NO] = useState('');

    const handle_employee_info = () => {


        alert("EMPLOYEE INFORMATION")

        const formData1 = new FormData()

        formData1.append('full_name', EmpName);
        formData1.append('date_of_birth', EmpDOB);
        formData1.append('gender', Gender);
        formData1.append('weight', EmpWeight);
        formData1.append('height', EmpHeight);
        formData1.append('present_address', Temprory_Address);
        formData1.append('Temprory_City', Temprory_City);
        formData1.append('Temprory_State', Temprory_State);
        formData1.append('Temprory_Pin', Temprory_Pin);
        formData1.append('Temprory_Tel_No', Temprory_Tel_No);
        formData1.append('mobile', Temprory_Mobile_NO);
        formData1.append('email', Temprory_Email_id);
        formData1.append('permanent_address', Permanent_Address);
        formData1.append('Permanent_City', Permanent_City);
        formData1.append('Permanent_State', Permanent_State);
        formData1.append('Permanent_Pin', Permanent_Pin);
        formData1.append('Permanent_Tel_No', Permanent_Tel_No);
        formData1.append('Permanent_Mobile_NO', Permanent_Mobile_NO);

        for (let pair of formData1.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }


        axios.post(`${port}/root/ems/employee-information/${id}`, formData1).then((res) => {
            console.log("EMPLOYEE_INFORMATION_RES", res.data);

            setEmployeeInformation(res.data)

            sessionStorage.setItem('Employee_Info', JSON.stringify(res.data))


        }).catch((err) => {
            console.log("EMPLOYEE_INFORMATION_ERR", err.data);
        })


    }

    // EMPLOYEE INFORMATION END

    // EDUCATION DETAILS START


    // EDUCATION DETAILS END


    // EMERGENCY DETAILS START 

    const [Blood_Group, setBlood_Group] = useState('');
    const [Allergic_To, setAllergic_To] = useState('');
    const [Blood_Pressure, setBlood_Pressure] = useState('');
    const [Diabetics, setDiabetics] = useState('');
    const [Illness_Disclosed, setIllness_Disclosed] = useState('');



    const handle_Emergency_Details = () => {
        
        // alert("EMERGENCY DETAILS")

        const formData2 = new FormData()


        formData2.append('EMP_Information', Empid.id);
        formData2.append('blood_group', Blood_Group);
        formData2.append('allergic_to', Allergic_To);
        formData2.append('blood_pessure', Blood_Pressure);
        formData2.append('Diabetics', Diabetics);
        formData2.append('other_illness', Illness_Disclosed);

        for (let pair of formData2.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        axios.post(`${port}/root/ems/emergency-details/   `, formData2).then((res) => {
            console.log("EMERGENCY_DETAILS_RES", res.data);



        }).catch((err) => {
            console.log("EMERGENCY_DETAILS_ERR", err.data);
        })



    }

    // EMERGENCY DETAILS END


    // CONTACT PERSON IN CASE OF EMERGENCY  START

    const [EMERGENCY_Name, setEMERGENCY_Name] = useState('');
    const [EMERGENCY_Mobile, setEMERGENCY_Mobile] = useState('');
    const [EMERGENCY_Mail, setEMERGENCY_Mail] = useState('');
    const [EMERGENCY_Relation, setEMERGENCY_Relation] = useState('');
    const [EMERGENCY_City, setEMERGENCY_City] = useState('');
    const [EMERGENCY_State, setEMERGENCY_State] = useState('');
    const [EMERGENCY_Country, setEMERGENCY_Country] = useState('');
    const [EMERGENCY_Pincode, setEMERGENCY_Pincode] = useState('');
    const [EMERGENCY_Address, setEMERGENCY_Address] = useState('');


    const handle_Contact_Emergency = () => {
       
        // alert("CONTACT PERSON EMERGENCY ")


        const formData3 = new FormData()

        formData3.append('EMP_Information', Empid.id);
        formData3.append('person_name', EMERGENCY_Name);
        formData3.append('phone', EMERGENCY_Mobile);
        formData3.append('email', EMERGENCY_Mail);
        formData3.append('relation', EMERGENCY_Relation);
        formData3.append('city', EMERGENCY_City);
        formData3.append('state', EMERGENCY_State);
        formData3.append('country', EMERGENCY_Country);
        formData3.append('pincode', EMERGENCY_Pincode);
        formData3.append('address', EMERGENCY_Address);

        for (let pair of formData3.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        axios.post(`${port}/root/ems/emergency-contact/`, formData3).then((res) => {
            console.log("CONTACT_PERSON_EMERGENCY_RES", res.data);



        }).catch((err) => {
            console.log("CONTACT_PERSON_EMERGENCY_ERR", err.data);
        })


    }

    // CONTACT PERSON IN CASE OF EMERGENCY  END

    // REFERENCE  START

    // REFERENCE  END


    // LAST POSITION HELD START
    const [LAST_Organisation, setLAST_Organisation] = useState('');
    const [LAST_Designation, setLAST_Designation] = useState('');
    const [LAST_DOJ, setLAST_DOJ] = useState('');
    const [LAST_Address, setLAST_Address] = useState('');
    const [LAST_Reporting_To, setLAST_Reporting_To] = useState('');
    const [LAST_Designation1, setLAST_Designation1] = useState('');
    const [LAST_Email, setLAST_Email] = useState('');
    const [LAST_Phone, setLAST_Phone] = useState('');
    const [LAST_Total_Gross_Salary_Month, setLAST_Total_Gross_Salary_Month] = useState('');
    const [LAST_Basic, setLAST_Basic] = useState('');
    const [LAST_DA, setLAST_DA] = useState('');
    const [LAST_HRA, setLAST_HRA] = useState('');
    const [LAST_LTA, setLAST_LTA] = useState('');
    const [LAST_MEDICAL, setLAST_MEDICAL] = useState('');
    const [Canveyance, setCanveyance] = useState('');
    const [Others, setOthers] = useState('');
    const [LAST_Total, setLAST_Total] = useState('');
    const [Non_Cash_Provident_Found, setNon_Cash_Provident_Found] = useState('');
    const [Non_Cash_Gratuity, setNon_Cash_Gratuity] = useState('');
    const [Non_Cash_Others, setNon_Cash_Others] = useState('');
    const [Non_Cash_Total, setNon_Cash_Total] = useState('');

    const handle_Last_Postion_Held = () => {
        
        // alert("LAST POSITION HELD")

        const formData4 = new FormData()

        formData4.append('EMP_Information', Empid.id);
        formData4.append('organisation', LAST_Organisation);
        formData4.append('designation', LAST_Designation);
        formData4.append('doj', LAST_DOJ);
        formData4.append('address', LAST_Address);
        formData4.append('repoting_to_name  ', LAST_Reporting_To);
        formData4.append('repoting_to_designation', LAST_Designation1);
        formData4.append('repoting_to_email', LAST_Email);
        formData4.append('repoting_to_phone', LAST_Phone);
        formData4.append('gross_salary_per_month', LAST_Total_Gross_Salary_Month);
        formData4.append('basic', LAST_Basic);
        formData4.append('DA', LAST_DA);
        formData4.append('HRA', LAST_HRA);
        formData4.append('LTA', LAST_LTA);
        formData4.append('medical', LAST_MEDICAL);
        formData4.append('conveyance', Canveyance);
        formData4.append('others', Others);
        formData4.append('total', LAST_Total);
        formData4.append('provident_fund', Non_Cash_Provident_Found);
        formData4.append('gratuity ', Non_Cash_Gratuity);
        formData4.append('others', Non_Cash_Others);
        formData4.append('total', Non_Cash_Total);


        for (let pair of formData4.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        axios.post(`${port}/root/ems/last-position-held/`, formData4).then((res) => {
            console.log("LAST_POSITION_HELD_RES", res.data);
            setEmployeeInformation(res.data)


        }).catch((err) => {
            console.log("LAST_POSITION_HELD_ERR", err.data);
        })



    }
    // LAST POSITION HELD END


    // ADDITIONAL INFORMATION START
    const [Marital_Ineptness, setMarital_Ineptness] = useState('');
    const [Court_Proceeding, setCourt_Proceeding] = useState('');
    const [Languages_Known, setLanguages_Known] = useState('');
    const [Hobbies, setHobbies] = useState('');
    const [Your_Interests, setYour_Interests] = useState('');
    const [Your_Goal, setYour_Goal] = useState('');
    const [Three_Principles1, setThree_Principles1] = useState('');
    const [Three_Principles2, setThree_Principles2] = useState('');
    const [Three_Principles3, setThree_Principles3] = useState('');
    const [Strenghts1, setStrenghts1] = useState('');
    const [Strenghts2, setStrenghts2] = useState('');
    const [Strenghts3, setStrenghts3] = useState('');
    const [Weaknesses1, setWeaknesses1] = useState('');
    const [Weaknesses2, setWeaknesses2] = useState('');
    const [Weaknesses3, setWeaknesses3] = useState('');

    // const Three_Principless = { Three_Principles1, Three_Principles2, Three_Principles3 }
    // const Strenghts = { Strenghts1, Strenghts2, Strenghts3 }
    // const Weaknessess = { Weaknesses1, Weaknesses2, Weaknesses3 }

    const [ste, setste] = useState({ Strenghts1, Strenghts2, Strenghts3 })
    const [Weak, setWeak] = useState({ Weaknesses1, Weaknesses2, Weaknesses3 })
    const [Thr, setThr] = useState({ Three_Principles3, Three_Principles3, Three_Principles3 })


    const [In_India, setIn_India] = useState('');
    const [In_Abroad, setIn_Abroad] = useState('');
    const [State_Restrictions, setState_Restrictions] = useState('');
    const [Passport_No, setPassport_No] = useState('');
    const [Valid_Up, setValid_Up] = useState('');
    const [realted_employees, setrealted_employees] = useState('');
    const [institution, setinstitution] = useState('');
    const [Publication, setPublication] = useState('');
    const [specialized_Training, setspecialized_Training] = useState('');

    const handle_Additional_Info = () => {
        
        // alert("ADDITIONAL INFORMATION ")

        const formData5 = new FormData()

        formData5.append('EMP_Information', Empid.id);
        formData5.append('marital_ineptness', Marital_Ineptness);
        formData5.append('court_proceeding', Court_Proceeding);
        formData5.append('language_known', Languages_Known);
        formData5.append('hobbies', Hobbies);
        formData5.append('intrests', Your_Interests);
        formData5.append('goals_or_aims', Your_Goal);
        // formData5.append('id', Three_Principles3);
        formData5.append('three_principles', Thr);
        formData5.append('strengths', ste);
        formData5.append('weaknesses', Weak);
        formData5.append('in_india', In_India);
        formData5.append('in_abroad', In_Abroad);
        formData5.append('state_restrictions', State_Restrictions);
        formData5.append('passport_num', Passport_No);
        formData5.append('validate', Valid_Up);
        formData5.append('employee', realted_employees);
        formData5.append('association', institution);
        formData5.append('publication', Publication);
        formData5.append('specialized_training', specialized_Training);

        for (let pair of formData5.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }


        axios.post(`${port}/root/ems/additional-information/`, formData5).then((res) => {
            console.log("ADDITIONAL_INFORMATION_RES", res.data);



        }).catch((err) => {
            console.log("ADDITIONAL_INFORMATION_ERR", err.data);
        })

    }

    // ADDITIONAL INFORMATION END



    // EMPLOYEE PERSONAL INFORMATION START

    const [Blood_Group_, setBlood_Group_] = useState('');
    const [Father_Name, setFather_Name] = useState('');
    const [Marital_Status, setMarital_Status] = useState('');
    const [Marriage_Date, setMarriage_Date] = useState('');
    const [Spouse_Name, setSpouse_Name] = useState('');
    const [Nationality, setNationality] = useState('');
    const [Residential_Status, setResidential_Status] = useState('');
    const [Place_Of_Birth, setPlace_Of_Birth] = useState('');
    const [Country_Of_Origin, setCountry_Of_Origin] = useState('');
    const [Religion, setReligion] = useState('');
    const [International_Employee, setInternational_Employee] = useState('');
    const [Physically_Challenged, setPhysically_Challenged] = useState('');

    const handle_Emp_Personal_Info = () => {
      
        // alert("EMPLOYEE PERSONAL INFORMATION ")

        const formData7 = new FormData()

        formData7.append('EMP_Information', Empid.id);
        formData7.append('blood_group', Blood_Group_);
        formData7.append('fathers_name', Father_Name);
        formData7.append('marital_status', Marital_Status);
        formData7.append('marriage_date', Marriage_Date);
        formData7.append('spouse_name', Spouse_Name);
        formData7.append('nationality', Nationality);
        formData7.append('residential_status', Residential_Status);
        formData7.append('place_of_birth', Place_Of_Birth);
        formData7.append('country_of_origin', Country_Of_Origin);
        formData7.append('religion', Religion);
        formData7.append('international_employee', International_Employee);
        formData7.append('physically_challenged', Physically_Challenged);


        // for (let pair of formData7.entries()) {
        //     console.log(pair[0] + ': ' + pair[1]);
        // }


        axios.post(`${port}/root/ems/employee-personal-information/`, formData7).then((res) => {
            console.log("employee-Personal-information_res", res.data);



        }).catch((err) => {
            console.log("employee-Personal-information_err", err.data);
        })

    }

    // EMPLOYEE PERSONAL INFORMATION END



    // EMPLOYEE IDENTITY FORM START

    const [Aadhar_Number, setAadhar_Number] = useState('');
    const [Name_As_Per_Aadhar, setName_As_Per_Aadhar] = useState('');
    const [Aadhar_Proof, setAadhar_Proof] = useState(null);
    const [Pan_Number, setPan_Number] = useState('');
    const [Pan_Proof, setPan_Proof] = useState(null);

    const handle_EMP_Identity = () => {
       
        // alert("EMPLOYEE IDENTITY FORM ")

        const formData8 = new FormData()

        formData8.append('EMP_Information', Empid.id);
        formData8.append('aadhar_no', Aadhar_Number);
        formData8.append('name_as_per_aadhar', Name_As_Per_Aadhar);
        formData8.append('aadher_proof', Aadhar_Proof);
        formData8.append('pan_no', Pan_Number);
        formData8.append('pan_proof', Pan_Proof);



        for (let pair of formData8.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }


        axios.post(`${port}/root/ems/employee-identity/`, formData8).then((res) => {
            console.log("employee-identity_res", res.data);



        }).catch((err) => {
            console.log("employee-identity_err", err.data);
        })

    }

    // EMPLOYEE IDENTITY FORM END


    //  BANK ACCOUNT DETAILS START

    const [Bank_Name, setBank_Name] = useState('');
    const [Account_Number, setAccount_Number] = useState('');
    const [IFSC, setIFSC] = useState('');
    const [Branch, setBranch] = useState('');
    const [Account_Proof, setAccount_Proof] = useState(null);


    const handle_Account_Details = () => {
  
        // alert("BANK ACCOUNT DETAILS ")

        const formData9 = new FormData()

        formData9.append('EMP_Information', Empid.id);
        formData9.append('bank_name', Bank_Name);
        formData9.append('account_no', Account_Number);
        formData9.append('ifsc', IFSC);
        formData9.append('branch', Branch);
        formData9.append('account_proof', Account_Proof);



        for (let pair of formData9.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }


        axios.post(`${port}/root/ems/bank-account-details/`, formData9).then((res) => {
            console.log("bank-account-details_res", res.data);



        }).catch((err) => {
            console.log("bank-account-details_err", err.data);
        })

    }

    //  BANK ACCOUNT DETAILS END


    // PF DETAILS START 

    const [Under_PF, setUnder_PF] = useState('')
    const [Uan, setUan] = useState('')
    const [PF, setPF] = useState('')
    const [PF_Join_Date, setPF_Join_Date] = useState('')
    const [Family_PF_No, setFamily_PF_No] = useState('')
    const [Existing_Number_Of_EPS, setExisting_Number_Of_EPS] = useState('')
    const [EPF_Excess_Contribution, setEPF_Excess_Contribution] = useState('')
    const [EPS_Excess_Contribution, setEPS_Excess_Contribution] = useState('')

    const handle_PF_Details = () => {
    
        // alert("PF DETAILS ")

        const formData11 = new FormData()

        formData11.append('EMP_Information', Empid.id);
        formData11.append('Under_PF', Under_PF);
        formData11.append('uan', Uan);
        formData11.append('pf', PF);
        formData11.append('pf_join_date', PF_Join_Date);
        formData11.append('family_pf_no', Family_PF_No);
        formData11.append('is_existing_number_of_eps', Existing_Number_Of_EPS);
        formData11.append('allow_epf_excess_contribution', EPF_Excess_Contribution);
        formData11.append('allow_eps_excess_contribution', EPS_Excess_Contribution);


        for (let pair of formData11.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }


        axios.post(`${port}/root/ems/pf-details/`, formData11).then((res) => {
            console.log("pf-details_res", res.data);



        }).catch((err) => {
            console.log("pf-details_err", err.data);
        })

    }


    // PF DETAILS END


    // DECLARATION START 

    const [Name, setName] = useState('');
    const [Date, setDate] = useState('');
    const [Place, setPlace] = useState('');
    const [Signature, setSignature] = useState('');

    const handle_Declaration = () => {
      
        // alert("DECLARATION ")

        const formData6 = new FormData()

        formData6.append('EMP_Information', Empid.id);
        formData6.append('name', Name);
        formData6.append('date', Date);
        formData6.append('place', Place);
        formData6.append('Signature', Signature);

        for (let pair of formData6.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        axios.post(`${port}/root/ems/declaration/`, formData6).then((res) => {
            console.log("DECLARATION_RES", res.data);


        }).catch((err) => {
            console.log("DECLARATION_ERR", err.data);
        })
    }



    // DECLARATION END


    // DOCUMENT UPLOAD START

    const [Degree_mark_sheets, setDegree_mark_sheets] = useState(null)
    const [Offer_letter, setOffer_letter] = useState(null)
    const [Experience_cerificate, setExperience_cerificate] = useState(null)
    const [Photocopy_of_address_proof, setPhotocopy_of_address_proof] = useState(null)
    const [Photocopy_of_ID_proof, setPhotocopy_of_ID_proof] = useState(null)
    const [Passport_size_photograph, setPassport_size_photograph] = useState(null)

    const handle_Attachments_Info = () => {
       

        // alert("DOCUMENT UPLOAD");

        // console.log('Sending documents to API:', documentsupload);

        const formDat = new FormData();

        formDat.append('EMP_Information', Empid.id);
        formDat.append('Degree_mark_sheets', Degree_mark_sheets);
        formDat.append('Offer_letter', Offer_letter);
        formDat.append('Experience_cerificate', Experience_cerificate);
        formDat.append('Photocopy_of_address_proof', Photocopy_of_address_proof);
        formDat.append('address_proof', Photocopy_of_ID_proof);
        formDat.append('upload_photo', Passport_size_photograph);


        for (let pair of formDat.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        axios.post(`${port}/root/ems/Attachments/${Empid.id}/`, formDat)
            .then((res) => {
                console.log("DOCUMENT_UPLOAD_RES", res.data);

            })
            .catch((err) => {
                console.log("DOCUMENT_UPLOAD_ERR", err.data);
            });


    }


    // DOCUMENT UPLOAD END


    // Complete Emp Form START 

    let Complete_Emp_Form = (e) => {

        e.preventDefault()

        alert("Completed Emp Form")

        handle_Education_Details()
        handle_Family_Details()
        handle_Emergency_Details()
        handle_Contact_Emergency()
        handle_References_Details()
        handle_Experience_Details()
        handle_Last_Postion_Held()
        handle_Emp_Personal_Info()
        handle_EMP_Identity()
        handle_Account_Details()
        handle_PF_Details()
        handle_Additional_Info()
        handle_Attachments_Info()
        handle_Documents_Submited_Details()
        handle_Declaration()

    }

    // Complete Emp Form  END



    return (

        <div className='' style={{ width: '100%',minHeight : '100%', backgroundColor: "rgb(249,251,253)" }}>

            {/* EMPLOYEE INFORMATION START */}
            <div className={`p-3 ${EMPLOYEE_INFORMATION ? '' : 'd-block'}`}>
                <form>
                    {/* Form start */}
                    <div className="row justify-content-center m-0 ">
                        <h5 className='mt-2 heading' style={{ color: 'rgb(76,53,117)' }}>EMPLOYEE INFORMATION</h5>
                        <div className="col-lg-12 p-4 mt-2 border rounded-lg ">
                            <div className="row m-0 pb-2">
                                <div className="col-md-6 col-lg-3 mb-3">
                                    <label htmlFor="Name" className="form-label">Full Name </label>
                                    <input type="text" className="form-control shadow-none" id="Name" name="Name" value={EmpName} onChange={(e) => setEmpName(e.target.value)} />
                                </div>
                                <div className="col-md-6 col-lg-3 mb-3">
                                    <label htmlFor="Name" className="form-label">Date Of Birth </label>
                                    <input type="date" className="form-control shadow-none" id="Name" name="Name" value={EmpDOB} onChange={(e) => setEmpDOB(e.target.value)} />
                                </div>
                                <div className="col-md-6 col-lg-3 mb-3">
                                    <label htmlFor="Name" className="form-label">Gender </label>
                                    <input type="text" className="form-control shadow-none" id="Name" name="Name" value={Gender} onChange={(e) => setGender(e.target.value)} />
                                </div>
                                <div className="col-md-6 col-lg-3 mb-3">
                                    <label htmlFor="lastName" className="form-label">Weight</label>
                                    <input type="number" className="form-control shadow-none" value={EmpWeight} onChange={(e) => setEmpWeight(e.target.value)} id="LastName" name="LastName" />
                                </div>
                                <div className="col-md-6 col-lg-3 mb-3">
                                    <label htmlFor="email" className="form-label">Height</label>
                                    <input type="number" className="form-control shadow-none" value={EmpHeight} onChange={(e) => setEmpHeight(e.target.value)} id="Email" name="Email" />
                                </div>
                                <div className="col-md-6 col-lg-12 mb-3">
                                    <label htmlFor="primaryContact" className="form-label" style={{ color: 'rgb(76,53,117)' }}>Temprory Address</label>
                                    <input type="text" className="form-control shadow-none" value={Temprory_Address} onChange={(e) => setTemprory_Address(e.target.value)} id="PrimaryContact" name="PrimaryContact" style={{ height: '60px' }} />
                                </div>
                                <div className="col-md-6 col-lg-4 mb-3">
                                    <label htmlFor="secondaryContact" className="form-label">City</label>
                                    <input type="text" className="form-control shadow-none" value={Temprory_City} onChange={(e) => setTemproryCity(e.target.value)} id="SecondaryContact" name="SecondaryContact" />
                                </div>
                                <div className="col-md-6 col-lg-4 mb-3">
                                    <label htmlFor="secondaryContact" className="form-label">State</label>
                                    <input type="text" className="form-control shadow-none" value={Temprory_State} onChange={(e) => setTemproryState(e.target.value)} id="State" name="State" />
                                </div>
                                <div className="col-md-6 col-lg-4 mb-3">
                                    <label htmlFor="secondaryContact" className="form-label">Pin</label>
                                    <input type="number" className="form-control shadow-none" value={Temprory_Pin} onChange={(e) => setTemproryPin(e.target.value)} id="State" name="State" />
                                </div>

                                <div className="col-md-6 col-lg-4 mb-3">
                                    <label htmlFor="secondaryContact" className="form-label">Tel.No</label>
                                    <input type="tel" className="form-control shadow-none" value={Temprory_Tel_No} onChange={(e) => setTemproryTel_No(e.target.value)} id="State" name="State" />
                                </div>
                                <div className="col-md-6 col-lg-4 mb-3">
                                    <label htmlFor="secondaryContact" className="form-label">Mobile No</label>
                                    <input type="tel" className="form-control shadow-none" value={Temprory_Mobile_NO} onChange={(e) => setTemproryMobile_NO(e.target.value)} id="State" name="State" />
                                </div>
                                <div className="col-md-6 col-lg-4 mb-3">
                                    <label htmlFor="secondaryContact" className="form-label">Email Id</label>
                                    <input type="email" className="form-control shadow-none" value={Temprory_Email_id} onChange={(e) => setTemproryEmail_id(e.target.value)} id="State" name="State" />
                                </div>
                                <div className="col-md-6 col-lg-12 mb-3">
                                    <label htmlFor="secondaryContact" className="form-label" style={{ color: 'rgb(76,53,117)' }}>Permanent Address</label>
                                    <input type="text" className="form-control shadow-none" value={Permanent_Address} onChange={(e) => setPermanent_Address(e.target.value)} id="State" name="State" style={{ height: '60px' }} />
                                </div>

                                <div className="col-md-6 col-lg-4 mb-3">
                                    <label htmlFor="secondaryContact" className="form-label">City</label>
                                    <input type="text" className="form-control shadow-none" value={Permanent_City} onChange={(e) => setPermanentCity(e.target.value)} id="State" name="State" />
                                </div>

                                <div className="col-md-6 col-lg-4 mb-3">
                                    <label htmlFor="secondaryContact" className="form-label">State</label>
                                    <input type="text" className="form-control shadow-none" value={Permanent_State} onChange={(e) => setPermanentState(e.target.value)} id="State" name="State" />
                                </div>

                                <div className="col-md-6 col-lg-4 mb-3">
                                    <label htmlFor="secondaryContact" className="form-label">Pin</label>
                                    <input type="number" className="form-control shadow-none" value={Permanent_Pin} onChange={(e) => setPermanentPin(e.target.value)} id="State" name="State" />
                                </div>

                                <div className="col-md-6 col-lg-4 mb-3">
                                    <label htmlFor="secondaryContact" className="form-label">Tel.No</label>
                                    <input type="tel" className="form-control shadow-none" value={Permanent_Tel_No} onChange={(e) => setPermanentTel_No(e.target.value)} id="State" name="State" />
                                </div>


                                <div className="col-md-6 col-lg-4 mb-3">
                                    <label htmlFor="secondaryContact" className="form-label">Mobile No</label>
                                    <input type="tel" className="form-control shadow-none" value={Permanent_Mobile_NO} onChange={(e) => setPermanentMobile_NO(e.target.value)} id="State" name="State" />
                                </div>




                            </div>
                        </div>
                    </div>
                    {/* form end */}
                    {/* Button start */}
                    <div class=" d-flex justify-content-end mt-2">

                        <div className='d-flex gap-2'>


                            <button type="submit" class="btn btn-success btn-sm" onClick={(e) => {
                                e.preventDefault()
                                handle_employee_info();
                                setEMP_INFORMATION(true)

                            }}  >Submit</button>


                            <button type="submit" class={`btn btn-success btn-sm ${EMP_INFORMATION ? 'd-block' : 'd-none'} `} onClick={(e) => {
                                e.preventDefault()
                                setEDUCATION_DETAILS(true)
                                setEMPLOYEE_INFORMATION(false)
                            }} >Next</button>


                        </div>
                    </div>
                    {/* Button end */}
                </form>
            </div>
            {/* EMPLOYEE INFORMATION END */}



            {/* EDUCATION START */}
            <div className={`p-3 ${EDUCATION_DETAILS ? '' : 'd-none'}`}>
                <form>
                    {/* Form start */}
                    <div className="row justify-content-center m-0 ">
                        <h5 className='mt-2 heading' style={{ color: 'rgb(76,53,117)' }}>EDUCATION DETAILS</h5>
                        <div className="col-lg-12 p-4 border rounded-lg ">
                            <div className="row m-0 pb-2">



                                <table class="table  table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Qulification</th>
                                            <th>University / Institute</th>
                                            <th>Year Of Passout</th>
                                            <th>Marks %</th>
                                            <th>Major Subject</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {qualifications.map((qualification, index) => (
                                            <tr key={index}>
                                                <td><input type="text" name="Qualification" value={qualification.Qualification} onChange={(e) => handleInputChange(index, e)} className="form-control border-0 shadow-none" /></td>
                                                <td><input type="text" name="University" value={qualification.University} onChange={(e) => handleInputChange(index, e)} className="form-control border-0 shadow-none" /></td>
                                                <td><input type="date" name="year_of_passout" value={qualification.year_of_passout} onChange={(e) => handleInputChange(index, e)} className="form-control border-0 shadow-none" /></td>
                                                <td><input type="text" name="Persentage" value={qualification.Persentage} onChange={(e) => handleInputChange(index, e)} className="form-control border-0 shadow-none" /></td>
                                                <td><input type="text" name="Major_Subject" value={qualification.Major_Subject} onChange={(e) => handleInputChange(index, e)} className="form-control border-0 shadow-none" /></td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                                <div className='d-flex justify-content-end'>

                                    <button onClick={handleAddRow} className='btn btn-sm btn-success'>add</button>

                                </div>


                            </div>
                        </div>
                    </div>
                    {/* form end */}
                    {/* Button start */}
                    <div class=" d-flex justify-content-end mt-2">

                        <div className='d-flex gap-2'>


                            {/* <button type="submit" class="btn btn-success btn-sm" onClick={handle_Education_Details}  >Submit</button> */}

                            <button type="submit" class="btn btn-success btn-sm" onClick={(e) => {
                                e.preventDefault()
                                setFAMILY_DETAILS(true)
                            }} >Next</button>


                        </div>
                    </div>
                    {/* Button end */}

                </form>
            </div>
            {/* EDUCATION END */}


            {/* FAMILY DETAILS START */}
            <div className={`p-3 ${FAMILY_DETAILS ? '' : 'd-none'}`} >
                <form>
                    {/* Form start */}
                    <div className="row justify-content-center m-0 ">
                        <h5 className='mt-2 heading' style={{ color: 'rgb(76,53,117)' }}>FAMILY DETAILS</h5>
                        <div className="col-lg-12 p-4 border rounded-lg ">
                            <div className="row m-0 pb-2">



                                <table class="table  table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Name</th>
                                            <th>DOB</th>
                                            <th>Age </th>
                                            <th>Gender </th>
                                            <th>Blood Group </th>
                                            <th>Relation</th>
                                            <th>Occupation</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {family_details.map((family_details, index) => (
                                            <tr key={index}>
                                                <td><input type="text" name="name" value={family_details.name} onChange={(e) => handleInputChange5(index, e)} className="form-control border-0 shadow-none" /></td>
                                                <td><input type="date" name="dob" value={family_details.dob} onChange={(e) => handleInputChange5(index, e)} className="form-control border-0 shadow-none" /></td>
                                                <td><input type="number" name="age" value={family_details.age} onChange={(e) => handleInputChange5(index, e)} className="form-control border-0 shadow-none" /></td>
                                                <td><input type="text" name="gender" value={family_details.gender} onChange={(e) => handleInputChange5(index, e)} className="form-control border-0 shadow-none" /></td>
                                                <td><input type="text" name="blood_group" value={family_details.blood_group} onChange={(e) => handleInputChange5(index, e)} className="form-control border-0 shadow-none" /></td>
                                                <td><input type="text" name="relation" value={family_details.relation} onChange={(e) => handleInputChange5(index, e)} className="form-control border-0 shadow-none" /></td>
                                                <td><input type="text" name="profession" value={family_details.profession} onChange={(e) => handleInputChange5(index, e)} className="form-control border-0 shadow-none" /></td>
                                            </tr>
                                        ))}


                                    </tbody>
                                </table>
                                <div className='d-flex justify-content-end'>
                                    <button onClick={handleAddRow5} className='btn btn-sm btn-success'>add</button>
                                </div>


                            </div>
                        </div>
                    </div>
                    {/* form end */}
                    {/* Button start */}
                    <div class=" d-flex justify-content-end mt-2">

                        <div className='d-flex gap-2'>


                            {/* <button type="submit" class="btn btn-success btn-sm" onClick={handle_Family_Details}  >Submit</button> */}

                            <button type="submit" class="btn btn-success btn-sm" onClick={(e) => {
                                e.preventDefault()
                                setEMERGENCY_DETAILS(true)
                            }} >Next</button>


                        </div>
                    </div>
                    {/* Button end */}

                </form>
            </div>
            {/* FAMILY DETAILS END */}

            {/* EMERGENCY DETAILS START */}
            <div className={`p-3 ${EMERGENCY_DETAILS ? '' : 'd-none'}`}>
                <form>
                    {/* Form start */}
                    <div className="row justify-content-center m-0 ">
                        <h5 className='mt-2 heading' style={{ color: 'rgb(76,53,117)' }}>EMERGENCY DETAILS</h5>
                        <div className="col-lg-12 p-4 border rounded-lg ">
                            <div className="row m-0 pb-2">
                                <div className="col-md-6 col-lg-3 mb-3">
                                    <label htmlFor="Name" className="form-label">Blood Group </label>
                                    <input type="text" className="form-control shadow-none" value={Blood_Group} onChange={(e) => setBlood_Group(e.target.value)} id="Name" name="Name" />
                                </div>
                                <div className="col-md-6 col-lg-3 mb-3">
                                    <label htmlFor="Name" className="form-label">Allergic To </label>
                                    <input type="text" className="form-control shadow-none" value={Allergic_To} onChange={(e) => setAllergic_To(e.target.value)} id="Name" name="Name" />
                                </div>
                                <div className="col-md-6 col-lg-3 mb-3">
                                    <label htmlFor="lastName" className="form-label">Blood Pressure</label>
                                    <input type="text" className="form-control shadow-none" value={Blood_Pressure} onChange={(e) => setBlood_Pressure(e.target.value)} id="LastName" name="LastName" />
                                </div>
                                <div className="col-md-6 col-lg-3 mb-3">
                                    <label htmlFor="email" className="form-label">Diabetics</label>
                                    <input type="text" className="form-control shadow-none" value={Diabetics} onChange={(e) => setDiabetics(e.target.value)} id="Email" name="Email" />
                                </div>
                                <div className="col-md-6 col-lg-12 mb-3">
                                    <label htmlFor="primaryContact" className="form-label" style={{ color: 'rgb(76,53,117)' }}>Any Other Illness That Needs To Be Disclosed</label>
                                    <input type="text" className="form-control shadow-none" value={Illness_Disclosed} onChange={(e) => setIllness_Disclosed(e.target.value)} id="PrimaryContact" name="PrimaryContact" style={{ height: '60px' }} />
                                </div>

                            </div>
                        </div>
                    </div>
                    {/* form end */}
                    {/* Button start */}
                    <div class=" d-flex justify-content-end mt-2">

                        <div className='d-flex gap-2'>


                            {/* <button type="submit" class="btn btn-success btn-sm" onClick={handle_Emergency_Details}  >Submit</button> */}

                            <button type="submit" class="btn btn-success btn-sm" onClick={(e) => {
                                e.preventDefault()
                                setCONTACT_EMERGENCY(true)
                            }} >Next</button>


                        </div>
                    </div>
                    {/* Button end */}

                </form>
            </div>
            {/* EMERGENCY DETAILS END */}

            {/* CONTACT PERSON IN CASE OF EMERGENCY  START */}
            <div className={`p-3 ${CONTACT_EMERGENCY ? '' : 'd-none'}`}>
                <form>
                    {/* Form start */}
                    <div className="row justify-content-center m-0 ">
                        <h5 className='mt-2 heading' style={{ color: 'rgb(76,53,117)' }}>CONTACT PERSON IN CASE OF EMERGENCY</h5>
                        <div className="col-lg-12 p-4 border rounded-lg ">
                            <div className="row m-0 pb-2">
                                <div className="col-md-6 col-lg-12 mb-3">
                                    <label htmlFor="Name" className="form-label">Name </label>
                                    <input type="text" className="form-control shadow-none" value={EMERGENCY_Name} onChange={(e) => setEMERGENCY_Name(e.target.value)} id="Name" name="Name" />
                                </div>
                                <div className="col-md-6 col-lg-6 mb-3">
                                    <label htmlFor="email" className="form-label">Mobile</label>
                                    <input type="tel" className="form-control shadow-none" value={EMERGENCY_Mobile} onChange={(e) => setEMERGENCY_Mobile(e.target.value)} id="Email" name="Email" />
                                </div>
                                <div className="col-md-6 col-lg-6 mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" className="form-control shadow-none" value={EMERGENCY_Mail} onChange={(e) => setEMERGENCY_Mail(e.target.value)} id="Email" name="Email" />
                                </div>
                                <div className="col-md-6 col-lg-6 mb-3">
                                    <label htmlFor="email" className="form-label">Relation</label>
                                    <input type="text" className="form-control shadow-none" value={EMERGENCY_Relation} onChange={(e) => setEMERGENCY_Relation(e.target.value)} id="Email" name="Email" />
                                </div>
                                <div className="col-md-6 col-lg-6 mb-3">
                                    <label htmlFor="email" className="form-label">City</label>
                                    <input type="text" className="form-control shadow-none" value={EMERGENCY_City} onChange={(e) => setEMERGENCY_City(e.target.value)} id="Email" name="Email" />
                                </div>
                                <div className="col-md-6 col-lg-6 mb-3">
                                    <label htmlFor="email" className="form-label">State</label>
                                    <input type="text" className="form-control shadow-none" value={EMERGENCY_State} onChange={(e) => setEMERGENCY_State(e.target.value)} id="Email" name="Email" />
                                </div>
                                <div className="col-md-6 col-lg-6 mb-3">
                                    <label htmlFor="email" className="form-label">Country</label>
                                    <input type="text" className="form-control shadow-none" value={EMERGENCY_Country} onChange={(e) => setEMERGENCY_Country(e.target.value)} id="Email" name="Email" />
                                </div>
                                <div className="col-md-6 col-lg-6 mb-3">
                                    <label htmlFor="email" className="form-label">pincode</label>
                                    <input type="tel" className="form-control shadow-none" value={EMERGENCY_Pincode} onChange={(e) => setEMERGENCY_Pincode(e.target.value)} id="Email" name="Email" />
                                </div>
                                <div className="col-md-6 col-lg-12 mb-3">
                                    <label htmlFor="Name" className="form-label">Address </label>
                                    <input type="text" className="form-control shadow-none" value={EMERGENCY_Address} onChange={(e) => setEMERGENCY_Address(e.target.value)} id="Name" name="Name" style={{ height: '60px' }} />
                                </div>



                            </div>
                        </div>
                    </div>
                    {/* form end */}

                    {/* Button start */}
                    <div class=" d-flex justify-content-end mt-2">

                        <div className='d-flex gap-2'>


                            {/* <button type="submit" class="btn btn-success btn-sm" onClick={handle_Contact_Emergency}  >Submit</button> */}

                            <button type="submit" class="btn btn-success btn-sm" onClick={(e) => {
                                e.preventDefault()
                                setREFERENCE(true)
                            }} >Next</button>


                        </div>
                    </div>
                    {/* Button end */}

                </form>
            </div>
            {/* CONTACT PERSON IN CASE OF EMERGENCY END */}


            {/* REFERENCE  START */}
            <div className={`p-3 ${REFERENCE ? '' : 'd-none'}`}>
                <form>
                    {/* Form start */}
                    <div className="row justify-content-center m-0 ">
                        <h5 className='mt-2 heading' style={{ color: 'rgb(76,53,117)' }}>REFERENCE : NAME & ADDRESS OF AT LEAST TWO REFERENCES NOT RELATED TO YOU</h5>
                        {references.map((reference, index) => (
                            <div className="col-lg-12 p-4 border rounded-lg mb-3">
                                <div key={index} className="row m-0 pb-2">
                                    <div className="col-md-6 col-lg-6 mb-3">
                                        <label htmlFor={`name-${index}`} className="form-label"> Name </label>
                                        <input type="text" className="form-control shadow-none" id={`name-${index}`} name="person_name" value={reference.name} onChange={(e) => handleInputChange1(index, e)} />
                                    </div>
                                    <div className="col-md-6 col-lg-4 mb-3">
                                        <label htmlFor={`mobile-${index}`} className="form-label">Mobile</label>
                                        <input type="text" className="form-control shadow-none" id={`mobile-${index}`} name="phone" value={reference.mobile} onChange={(e) => handleInputChange1(index, e)} />
                                    </div>
                                    <div className="col-md-6 col-lg-4 mb-3">
                                        <label htmlFor={`email-${index}`} className="form-label">Email Id</label>
                                        <input type="email" className="form-control shadow-none" id={`email-${index}`} name="email" value={reference.email} onChange={(e) => handleInputChange1(index, e)} />
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                        <label htmlFor={`relation-${index}`} className="form-label">Relation </label>
                                        <input type="text" className="form-control shadow-none" id={`relation-${index}`} name="relation" value={reference.relation} onChange={(e) => handleInputChange1(index, e)} />
                                    </div>
                                    {/*  */}
                                    <div className="col-md-6 col-lg-6 mb-3">
                                        <label htmlFor={`relation-${index}`} className="form-label">city </label>
                                        <input type="text" className="form-control shadow-none" id={`relation-${index}`} name="city" value={reference.city} onChange={(e) => handleInputChange1(index, e)} />
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                        <label htmlFor={`relation-${index}`} className="form-label">state </label>
                                        <input type="text" className="form-control shadow-none" id={`relation-${index}`} name="state" value={reference.state} onChange={(e) => handleInputChange1(index, e)} />
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                        <label htmlFor={`relation-${index}`} className="form-label">country </label>
                                        <input type="text" className="form-control shadow-none" id={`relation-${index}`} name="country" value={reference.country} onChange={(e) => handleInputChange1(index, e)} />
                                    </div>
                                    <div className="col-md-6 col-lg-6 mb-3">
                                        <label htmlFor={`relation-${index}`} className="form-label">Pincode </label>
                                        <input type="text" className="form-control shadow-none" id={`relation-${index}`} name="Pincode" value={reference.Pincode} onChange={(e) => handleInputChange1(index, e)} />
                                    </div>
                                    <div className="col-md-6 col-lg-12 mb-3">
                                        <label htmlFor={`address-${index}`} className="form-label">Address </label>
                                        <input type="text" className="form-control shadow-none" id={`address-${index}`} name="address" value={reference.address} onChange={(e) => handleInputChange1(index, e)} style={{ height: '60px' }} />
                                    </div>



                                </div>

                            </div>
                        ))}
                        <div className='d-flex justify-content-end'>
                            <button onClick={handleAddReferenceRow} className='btn btn-sm btn-success'>Add</button>
                        </div>
                    </div>


                    {/* form end */}
                    {/* Button start */}
                    <div class=" d-flex justify-content-end mt-2">

                        <div className='d-flex gap-2'>


                            {/* <button type="submit" class="btn btn-success btn-sm" onClick={handle_References_Details}  >Submit</button> */}

                            <button type="submit" class="btn btn-success btn-sm" onClick={(e) => {
                                e.preventDefault()
                                setEXPERIENCE_LAST_POSITION(true)
                            }} >Next</button>


                        </div>
                    </div>
                    {/* Button end */}
                </form>
            </div>
            {/* REFERENCE END */}


            {/* EXPERIENCE (CHRONOLOGICAL ORDER EXCLUDING LAST POSITION) START */}
            <div className={`p-3 ${EXPERIENCE_LAST_POSITION ? '' : 'd-none'}`}>
                <form>
                    {/* Form start */}
                    <div className="row justify-content-center m-0 ">
                        <h5 className='mt-2 heading' style={{ color: 'rgb(76,53,117)' }}>EXPERIENCE (CHRONOLOGICAL ORDER EXCLUDING LAST POSITION)</h5>
                        <div className="col-lg-12 p-4 border rounded-lg ">
                            <div className="row m-0 pb-2">



                                <table class="table  table-bordered">
                                    <thead>
                                        <tr>
                                            <th rowSpan="2" className='text-center'>Organisation</th>
                                            <th colSpan="4" className='text-center'>Period</th>
                                            <th colSpan="4" className='text-center'>Designation</th>
                                            <th rowSpan="2" className='text-center'>Job Responsibility</th>
                                            <th rowSpan="2" className='text-center'>Designation Of Immediate Superior</th>
                                            <th rowSpan="2" className='text-center'>Gross Salary Drawn</th>
                                            <th rowSpan="2" className='text-center'>Reson For Leaving</th>
                                        </tr>
                                        <tr>

                                            <th colSpan="2">From</th>
                                            <th colSpan="2" className='text-center'>To</th>
                                            <th colSpan="2" className='text-center'>Last Postion Held</th>
                                            <th colSpan="2" className='text-center'>At TheTime Of Joining</th>

                                        </tr>

                                    </thead>
                                    <tbody>
                                        {employments.map((employment, index) => (
                                            <tr key={index}>
                                                <td><input type="text" name="organisation" value={employment.organisation} onChange={(e) => handleInputChange2(index, e)} className="form-control shadow-none border-0" /></td>
                                                <td colSpan="2"><input type="date" name="from_date" value={employment.fromMonth} onChange={(e) => handleInputChange2(index, e)} className="form-control shadow-none border-0" /></td>
                                                <td colSpan="2"><input type="date" name="to_date" value={employment.toMonth} onChange={(e) => handleInputChange2(index, e)} className="form-control shadow-none border-0" /></td>
                                                <td colSpan="2"><input type="text" name="last_possition_held" value={employment.lastPosition} onChange={(e) => handleInputChange2(index, e)} className="form-control shadow-none border-0" /></td>
                                                <td colSpan="2"><input type="text" name="at_the_time_of_joining" value={employment.joiningPosition} onChange={(e) => handleInputChange2(index, e)} className="form-control shadow-none border-0" /></td>
                                                <td><input type="text" name="job_responsibility" value={employment.JobResponsibility} onChange={(e) => handleInputChange2(index, e)} className="form-control shadow-none border-0" /></td>
                                                <td><input type="text" name="immediate_superior_designation" value={employment.superiorDesignation} onChange={(e) => handleInputChange2(index, e)} className="form-control shadow-none border-0" /></td>
                                                <td><input type="text" name="gross_salary_drawn" value={employment.salary} onChange={(e) => handleInputChange2(index, e)} className="form-control shadow-none border-0" /></td>
                                                <td><input type="text" name="reason_for_leaving" value={employment.reasonForLeaving} onChange={(e) => handleInputChange2(index, e)} className="form-control shadow-none border-0" /></td>
                                            </tr>
                                        ))}

                                    </tbody>
                                </table>
                                <div className='d-flex justify-content-end'>
                                    <button onClick={handleAddRow2} className='btn btn-sm btn-success'>add</button>
                                </div>


                            </div>
                        </div>
                    </div>
                    {/* form end */}
                    {/* Button start */}
                    <div class=" d-flex justify-content-end mt-2">

                        <div className='d-flex gap-2'>


                            {/* <button type="submit" class="btn btn-success btn-sm" onClick={handle_Experience_Details}  >Submit</button> */}

                            <button type="submit" class="btn btn-success btn-sm" onClick={(e) => {
                                e.preventDefault()
                                setLAST_POSITION_HELD(true)
                            }} >Next</button>


                        </div>
                    </div>
                    {/* Button end */}

                </form>
            </div>
            {/* EXPERIENCE (CHRONOLOGICAL ORDER EXCLUDING LAST POSITION) END */}


            {/* LAST POSITION HELD START */}
            <div className={`p-3 ${LAST_POSITION_HELD ? '' : 'd-none'}`}>
                <form>
                    {/* Form start */}
                    <div className="row justify-content-center m-0 ">
                        <h5 className='mt-2 heading' style={{ color: 'rgb(76,53,117)' }}>LAST POSITION HELD</h5>
                        <div className="col-lg-12 p-4 border rounded-lg ">
                            <div className="row m-0 pb-2">
                                <div className="col-md-6 col-lg-4 mb-3">
                                    <label htmlFor="Name" className="form-label">Organisation </label>
                                    <input type="text" className="form-control shadow-none" value={LAST_Organisation} onChange={(e) => setLAST_Organisation(e.target.value)} id="Name" name="Name" />
                                </div>
                                <div className="col-md-6 col-lg-4 mb-3">
                                    <label htmlFor="Name" className="form-label">Designation </label>
                                    <input type="text" className="form-control shadow-none " value={LAST_Designation} onChange={(e) => setLAST_Designation(e.target.value)} id="Name" name="Name" />
                                </div>
                                <div className="col-md-6 col-lg-4 mb-3">
                                    <label htmlFor="lastName" className="form-label">DOJ</label>
                                    <input type="text" className="form-control shadow-none" value={LAST_DOJ} onChange={(e) => setLAST_DOJ(e.target.value)} id="LastName" name="LastName" />
                                </div>
                                <div className="col-md-6 col-lg-12 mb-3">
                                    <label htmlFor="primaryContact" className="form-label" style={{ color: 'rgb(76,53,117)' }}>Address</label>
                                    <input type="text" className="form-control shadow-none" value={LAST_Address} onChange={(e) => setLAST_Address(e.target.value)} id="PrimaryContact" name="PrimaryContact" style={{ height: '60px' }} />
                                </div>
                                <div className="col-md-6 col-lg-3 mb-3">
                                    <label htmlFor="email" className="form-label">Reporting  Name</label>
                                    <input type="text" className="form-control shadow-none" value={LAST_Reporting_To} onChange={(e) => setLAST_Reporting_To(e.target.value)} id="Email" name="Email" />
                                </div>
                                <div className="col-md-6 col-lg-3 mb-3">
                                    <label htmlFor="email" className="form-label">Repoting Designation</label>
                                    <input type="text" className="form-control shadow-none" value={LAST_Designation1} onChange={(e) => setLAST_Designation1(e.target.value)} id="Email" name="Email" />
                                </div>
                                <div className="col-md-6 col-lg-3 mb-3">
                                    <label htmlFor="email" className="form-label">Repoting Email</label>
                                    <input type="email" className="form-control shadow-none" value={LAST_Email} onChange={(e) => setLAST_Email(e.target.value)} id="Email" name="Email" />
                                </div>
                                <div className="col-md-6 col-lg-3 mb-3">
                                    <label htmlFor="email" className="form-label">Repoting Phone</label>
                                    <input type="tel" className="form-control shadow-none" value={LAST_Phone} onChange={(e) => setLAST_Phone(e.target.value)} id="Email" name="Email" />
                                </div>



                                <div className="col-md-6 col-lg-12 mb-3">
                                    <label htmlFor="email" className="form-label">Total Gross Salary Month </label>
                                    <input type="number" className="form-control shadow-none" value={LAST_Total_Gross_Salary_Month} onChange={(e) => setLAST_Total_Gross_Salary_Month(e.target.value)} id="Email" name="Email" />
                                </div>

                                <h5 className='mt-2 heading' style={{ color: 'rgb(76,53,117)' }}>Cash Benifits</h5>

                                <div className="col-md-6 col-lg-2 mb-3">
                                    <label htmlFor="email" className="form-label">Basic</label>
                                    <input type="number" className="form-control shadow-none" value={LAST_Basic} onChange={(e) => setLAST_Basic(e.target.value)} id="Email" name="Email" />
                                </div>
                                <div className="col-md-6 col-lg-2 mb-3">
                                    <label htmlFor="email" className="form-label">DA</label>
                                    <input type="number" className="form-control shadow-none" value={LAST_DA} onChange={(e) => setLAST_DA(e.target.value)} id="Email" name="Email" />
                                </div>
                                <div className="col-md-6 col-lg-2 mb-3">
                                    <label htmlFor="email" className="form-label">HRA</label>
                                    <input type="number" className="form-control shadow-none" value={LAST_HRA} onChange={(e) => setLAST_HRA(e.target.value)} id="Email" name="Email" />
                                </div>
                                <div className="col-md-6 col-lg-2 mb-3">
                                    <label htmlFor="email" className="form-label">LTA</label>
                                    <input type="number" className="form-control shadow-none" value={LAST_LTA} onChange={(e) => setLAST_LTA(e.target.value)} id="Email" name="Email" />
                                </div>
                                <div className="col-md-6 col-lg-2 mb-3">
                                    <label htmlFor="email" className="form-label">MEDICAL</label>
                                    <input type="number" className="form-control shadow-none" value={LAST_MEDICAL} onChange={(e) => setLAST_MEDICAL(e.target.value)} id="Email" name="Email" />
                                </div>
                                <div className="col-md-6 col-lg-2 mb-3">
                                    <label htmlFor="email" className="form-label">Canveyance</label>
                                    <input type="number" className="form-control shadow-none" value={Canveyance} onChange={(e) => setCanveyance(e.target.value)} id="Email" name="Email" />
                                </div>
                                <div className="col-md-6 col-lg-2 mb-3">
                                    <label htmlFor="email" className="form-label">Others</label>
                                    <input type="number" className="form-control shadow-none" value={Others} onChange={(e) => setOthers(e.target.value)} id="Email" name="Email" />
                                </div>
                                <div className="col-md-6 col-lg-2 mb-3">
                                    <label htmlFor="email" className="form-label">Total</label>
                                    <input type="number" className="form-control shadow-none" value={LAST_Total} onChange={(e) => setLAST_Total(e.target.value)} id="Email" name="Email" />
                                </div>

                                <h5 className='mt-2 heading' style={{ color: 'rgb(76,53,117)' }}>Non-Cash Benifits</h5>
                                <div className="col-md-6 col-lg-3 mb-3">
                                    <label htmlFor="email" className="form-label">Provident Found</label>
                                    <input type="number" className="form-control shadow-none" value={Non_Cash_Provident_Found} onChange={(e) => setNon_Cash_Provident_Found(e.target.value)} id="Email" name="Email" />
                                </div>
                                <div className="col-md-6 col-lg-3 mb-3">
                                    <label htmlFor="email" className="form-label">Gratuity</label>
                                    <input type="number" className="form-control shadow-none" value={Non_Cash_Gratuity} onChange={(e) => setNon_Cash_Gratuity(e.target.value)} id="Email" name="Email" />
                                </div>
                                <div className="col-md-6 col-lg-3 mb-3">
                                    <label htmlFor="email" className="form-label">Others</label>
                                    <input type="number" className="form-control shadow-none" value={Non_Cash_Others} onChange={(e) => setNon_Cash_Others(e.target.value)} id="Email" name="Email" />
                                </div>
                                <div className="col-md-6 col-lg-3 mb-3">
                                    <label htmlFor="email" className="form-label">Total</label>
                                    <input type="number" className="form-control shadow-none" value={Non_Cash_Total} onChange={(e) => setNon_Cash_Total(e.target.value)} id="Email" name="Email" />
                                </div>


                            </div>
                        </div>
                    </div>
                    {/* form end */}
                    {/* Button start */}
                    <div class=" d-flex justify-content-end mt-2">

                        <div className='d-flex gap-2'>


                            {/* <button type="submit" class="btn btn-success btn-sm" onClick={handle_Last_Postion_Held}  >Submit</button> */}

                            <button type="submit" class="btn btn-success btn-sm" onClick={(e) => {
                                e.preventDefault()
                                setPERSONAL_INFORMATION(true)
                            }} >Next</button>


                        </div>
                    </div>
                    {/* Button end */}

                </form>
            </div>
            {/* LAST POSITION HELD END */}


            {/* EMPLOYEE PERSONAL INFORMATION START */}
            <div className={`p-3 ${PERSONAL_INFORMATION ? '' : 'd-none'}`}>
                <form>
                    {/* Form start */}
                    <div className="row justify-content-center m-0 ">
                        <h5 className='mt-2 heading' style={{ color: 'rgb(76,53,117)' }}>EMPLOYEE PERSONAL INFORMATION</h5>
                        <div className="col-lg-12 p-4 border rounded-lg ">
                            <div className="row m-0 pb-2">
                                {/* <label htmlFor="Name" className="form-label"> Have You : </label> */}

                                <div className="col-md-6 col-lg-4 mb-3 mt-2">
                                    <label htmlFor="Name" className="form-label"> Blood Group </label>
                                    <input type="text" className="form-control shadow-none" value={Blood_Group_} onChange={(e) => setBlood_Group_(e.target.value)} id="Name" name="Name" />
                                </div>
                                <div className="col-md-6 col-lg-4 mb-3">
                                    <label htmlFor="Name" className="form-label"> Father Name </label>
                                    <input type="text" className="form-control shadow-none" value={Father_Name} onChange={(e) => setFather_Name(e.target.value)} id="Name" name="Name" />
                                </div>
                                <div className="col-md-6 col-lg-4 mb-3">
                                    <label htmlFor="lastName" className="form-label">Marital Status </label>
                                    <input type="text" className="form-control shadow-none" value={Marital_Status} onChange={(e) => setMarital_Status(e.target.value)} id="LastName" name="LastName" />
                                </div>
                                <div className="col-md-6 col-lg-4 mb-3">
                                    <label htmlFor="email" className="form-label">Marriage Date</label>
                                    <input type="date" className="form-control shadow-none" value={Marriage_Date} onChange={(e) => setMarriage_Date(e.target.value)} id="Email" name="Email" />
                                </div>

                                <div className="col-md-6 col-lg-4 mb-3">
                                    <label htmlFor="secondaryContact" className="form-label">Spouse Name</label>
                                    <input type="text" className="form-control shadow-none" value={Spouse_Name} onChange={(e) => setSpouse_Name(e.target.value)} id="SecondaryContact" name="SecondaryContact" />
                                </div>
                                <div className="col-md-6 col-lg-4 mb-3">
                                    <label htmlFor="secondaryContact" className="form-label">Nationality </label>
                                    <input type="text" className="form-control shadow-none" value={Nationality} onChange={(e) => setNationality(e.target.value)} id="State" name="State" />
                                </div>

                                <div className="col-md-6 col-lg-4 mb-3 ">
                                    <label htmlFor="secondaryContact" className="form-label mt-2">Residential Status</label>
                                    <input type="tel" className="form-control shadow-none" value={Residential_Status} onChange={(e) => setResidential_Status(e.target.value)} id="State" name="State" />
                                </div>

                                <div className="col-md-6 col-lg-4 mb-3">
                                    <label htmlFor="secondaryContact" className="form-label mt-2">Place Of Birth</label>
                                    <input type="tel" className="form-control shadow-none" value={Place_Of_Birth} onChange={(e) => setPlace_Of_Birth(e.target.value)} id="State" name="State" />
                                </div>
                                <div className="col-md-6 col-lg-4 mb-3">
                                    <label htmlFor="secondaryContact" className="form-label mt-2">Country Of Origin</label>
                                    <input type="tel" className="form-control shadow-none" value={Country_Of_Origin} onChange={(e) => setCountry_Of_Origin(e.target.value)} id="State" name="State" />
                                </div>


                                <div className="col-md-6 col-lg-4 mb-3 ">
                                    <label htmlFor="secondaryContact" className="form-label mt-2">Religion</label>
                                    <input type="tel" className="form-control shadow-none" value={Religion} onChange={(e) => setReligion(e.target.value)} id="State" name="State" />
                                </div>

                                <div class="col-md-6 col-lg-4 mb-3">
                                    <label for="interviewer">International Employee</label>
                                    <select id="interviewer" name="interviewer" value={International_Employee} onChange={(e) => setInternational_Employee(e.target.value)} required class="form-control">
                                        <option value="" selected>Select</option>
                                        <option value="True" selected>Yes</option>
                                        <option value="False" selected>No</option>

                                    </select>
                                </div>
                                <div class="col-md-6 col-lg-4 mb-3">
                                    <label for="interviewer">Physically Challenged</label>
                                    <select id="interviewer" name="interviewer" value={Physically_Challenged} onChange={(e) => setPhysically_Challenged(e.target.value)} required class="form-control">
                                        <option value="" selected>Select</option>
                                        <option value="True" selected>Yes</option>
                                        <option value="False" selected>No</option>

                                    </select>
                                </div>









                            </div>
                        </div>
                    </div>
                    {/* form end */}

                    {/* Button start */}
                    <div class=" d-flex justify-content-end mt-2">

                        <div className='d-flex gap-2'>


                            {/* <button type="submit" class="btn btn-success btn-sm" onClick={handle_Emp_Personal_Info}  >Submit</button> */}

                            <button type="submit" class="btn btn-success btn-sm" onClick={(e) => {
                                e.preventDefault()
                                setEMPLOYEEIDENTITY(true)
                            }}>Next</button>


                        </div>
                    </div>
                    {/* Button end */}

                </form>
            </div>
            {/* EMPLOYEE PERSONAL INFORMATION  END */}


            {/* EMPLOYEE IDENTITY START */}
            <div className={`p-3 ${EMPLOYEEIDENTITY ? '' : 'd-none'}`}>
                <form>
                    {/* Form start */}
                    <div className="row justify-content-center m-0 ">
                        <h5 className='mt-2 heading' style={{ color: 'rgb(76,53,117)' }}>EMPLOYEE IDENTITY FORM</h5>
                        <div className="col-lg-12 p-4 border rounded-lg ">
                            <div className="row m-0 pb-2">
                                {/* <label htmlFor="Name" className="form-label"> Have You : </label> */}

                                <div className="col-md-6 col-lg-4 mb-3 ">
                                    <label htmlFor="Name" className="form-label">Aadhar Number </label>
                                    <input type="number" className="form-control shadow-none" value={Aadhar_Number} onChange={(e) => setAadhar_Number(e.target.value)} id="Name" name="Name" />
                                </div>
                                <div className="col-md-6 col-lg-4 mb-3">
                                    <label htmlFor="Name" className="form-label"> Name As Per Aadhar </label>
                                    <input type="text" className="form-control shadow-none" value={Name_As_Per_Aadhar} onChange={(e) => setName_As_Per_Aadhar(e.target.value)} id="Name" name="Name" />
                                </div>
                                <div className="col-md-6 col-lg-4 mb-3">
                                    <label htmlFor="lastName" className="form-label">Aadhar Proof </label>
                                    <input type="file" className="form-control shadow-none" onChange={(e) => setAadhar_Proof(e.target.files[0])} id="LastName" name="LastName" />
                                </div>
                                <div className="col-md-6 col-lg-4 mb-3">
                                    <label htmlFor="email" className="form-label">Pan Number</label>
                                    <input type="number" className="form-control shadow-none" value={Pan_Number} onChange={(e) => setPan_Number(e.target.value)} id="Email" name="Email" />
                                </div>

                                <div className="col-md-6 col-lg-4 mb-3">
                                    <label htmlFor="secondaryContact" className="form-label">Pan Proof</label>

                                    <input type="file" className="form-control shadow-none" onChange={(e) => setPan_Proof(e.target.files[0])} id="SecondaryContact" name="SecondaryContact" />
                                </div>


                            </div>
                        </div>
                    </div>
                    {/* form end */}

                    {/* Button start */}
                    <div class=" d-flex justify-content-end mt-2">

                        <div className='d-flex gap-2'>


                            {/* <button type="submit" class="btn btn-success btn-sm" onClick={handle_EMP_Identity}  >Submit</button> */}

                            <button type="submit" class="btn btn-success btn-sm" onClick={(e) => {
                                e.preventDefault()
                                setBANK_ACCOUNT_DETAILS(true)
                            }}>Next</button>


                        </div>
                    </div>
                    {/* Button end */}

                </form>
            </div>
            {/* EMPLOYEE IDENTITY END */}

            {/* BANK ACCOUNT DETAILS START */}

            <div className={`p-3 ${BANK_ACCOUNT_DETAILS ? '' : 'd-none'}`}>
                <form>
                    {/* Form start */}
                    <div className="row justify-content-center m-0 ">
                        <h5 className='mt-2 heading' style={{ color: 'rgb(76,53,117)' }}>BANK ACCOUNT DETAILS</h5>
                        <div className="col-lg-12 p-4 border rounded-lg ">
                            <div className="row m-0 pb-2">
                                {/* <label htmlFor="Name" className="form-label"> Have You : </label> */}

                                <div className="col-md-6 col-lg-4 mb-3 ">
                                    <label htmlFor="Name" className="form-label">Bank Name </label>
                                    <input type="text" className="form-control shadow-none" value={Bank_Name} onChange={(e) => setBank_Name(e.target.value)} id="Name" name="Name" />
                                </div>
                                <div className="col-md-6 col-lg-4 mb-3">
                                    <label htmlFor="Name" className="form-label">Account Number </label>
                                    <input type="text" className="form-control shadow-none" value={Account_Number} onChange={(e) => setAccount_Number(e.target.value)} id="Name" name="Name" />
                                </div>
                                <div className="col-md-6 col-lg-4 mb-3">
                                    <label htmlFor="lastName" className="form-label">IFSC </label>
                                    <input type="text" className="form-control shadow-none" value={IFSC} onChange={(e) => setIFSC(e.target.value)} id="LastName" name="LastName" />
                                </div>
                                <div className="col-md-6 col-lg-4 mb-3">
                                    <label htmlFor="email" className="form-label">Branch</label>
                                    <input type="text" className="form-control shadow-none" value={Branch} onChange={(e) => setBranch(e.target.value)} id="Email" name="Email" />
                                </div>

                                <div className="col-md-6 col-lg-4 mb-3">
                                    <label htmlFor="secondaryContact" className="form-label">Account Proof</label>
                                    <input type="file" className="form-control shadow-none" onChange={(e) => setAccount_Proof(e.target.files[0])} id="SecondaryContact" name="SecondaryContact" />
                                </div>


                            </div>
                        </div>
                    </div>
                    {/* form end */}

                    {/* Button start */}
                    <div class=" d-flex justify-content-end mt-2">

                        <div className='d-flex gap-2'>


                            {/* <button type="submit" class="btn btn-success btn-sm" onClick={handle_Account_Details}  >Submit</button> */}

                            <button type="submit" class="btn btn-success btn-sm" onClick={(e) => {
                                e.preventDefault()
                                setPFDETAILS(true)
                            }}>Next</button>


                        </div>
                    </div>
                    {/* Button end */}

                </form>
            </div>

            {/* BANK ACCOUNT DETAILS END */}

            {/* PF DETAILS START */}

            <div className={`p-3 ${PFDETAILS ? '' : 'd-none'}`}>
                <form>
                    {/* Form start */}
                    <div className="row justify-content-center m-0 ">
                        <h5 className='mt-2 heading' style={{ color: 'rgb(76,53,117)' }}>PF DETAILS</h5>
                        <div className="col-lg-12 p-4 border rounded-lg ">
                            <div className="row m-0 pb-2">
                                {/* <label htmlFor="Name" className="form-label"> Have You : </label> */}

                                <div class="col-md-6 col-lg-4 mb-3">
                                    <label for="interviewer">Employee Is Covered Under PF</label>
                                    <select id="interviewer" name="interviewer" value={Under_PF} onChange={(e) => setUnder_PF(e.target.value)} required class="form-control">
                                        <option value="" selected>Select</option>
                                        <option value="True" selected>Yes</option>
                                        <option value="False" selected>No</option>

                                    </select>
                                </div>

                                {Under_PF === "True" && (
                                    <>


                                        <div className="col-md-6 col-lg-4 mb-3">
                                            <label htmlFor="Name" className="form-label">Uan </label>
                                            <input type="text" className="form-control shadow-none" value={Uan} onChange={(e) => setUan(e.target.value)} id="Name" name="Name" />
                                        </div>
                                        <div className="col-md-6 col-lg-4 mb-3">
                                            <label htmlFor="lastName" className="form-label">PF </label>
                                            <input type="text" className="form-control shadow-none" value={PF} onChange={(e) => setPF(e.target.value)} id="LastName" name="LastName" />
                                        </div>
                                        <div className="col-md-6 col-lg-4 mb-3">
                                            <label htmlFor="email" className="form-label">PF Join Date</label>
                                            <input type="date" className="form-control shadow-none" value={PF_Join_Date} onChange={(e) => setPF_Join_Date(e.target.value)} id="Email" name="Email" />
                                        </div>




                                        <div className="col-md-6 col-lg-4 mb-3">
                                            <label htmlFor="secondaryContact" className="form-label">Family PF No</label>
                                            <input type="text" className="form-control shadow-none" value={Family_PF_No} onChange={(e) => setFamily_PF_No(e.target.value)} id="SecondaryContact" name="SecondaryContact" />
                                        </div>


                                        <div class="col-md-6 col-lg-4 mb-3">
                                            <label for="interviewer">Is Existing Number Of EPS</label>
                                            <select id="interviewer" name="interviewer" value={Existing_Number_Of_EPS} onChange={(e) => setExisting_Number_Of_EPS(e.target.value)} required class="form-control">
                                                <option value="" selected>Select</option>
                                                <option value="True" selected>Yes</option>
                                                <option value="False" selected>No</option>

                                            </select>
                                        </div>

                                        <div class="col-md-6 col-lg-4 mb-3">
                                            <label for="interviewer">Allow EPF Excess Contribution</label>
                                            <select id="interviewer" name="interviewer" value={EPF_Excess_Contribution} onChange={(e) => setEPF_Excess_Contribution(e.target.value)} required class="form-control">
                                                <option value="" selected>Select</option>
                                                <option value="True" selected>Yes</option>
                                                <option value="False" selected>No</option>

                                            </select>
                                        </div>

                                        <div class="col-md-6 col-lg-4 mb-3">
                                            <label for="interviewer">Allow EPS Excess Contribution</label>
                                            <select id="interviewer" name="interviewer" value={EPS_Excess_Contribution} onChange={(e) => setEPS_Excess_Contribution(e.target.value)} required class="form-control">
                                                <option value="" selected>Select</option>
                                                <option value="True" selected>Yes</option>
                                                <option value="False" selected>No</option>

                                            </select>
                                        </div>




                                    </>
                                )}





                            </div>
                        </div>
                    </div>
                    {/* form end */}

                    {/* Button start */}
                    <div class=" d-flex justify-content-end mt-2">

                        <div className='d-flex gap-2'>


                            {/* <button type="submit" class="btn btn-success btn-sm" onClick={handle_PF_Details}  >Submit</button> */}

                            <button type="submit" class="btn btn-success btn-sm" onClick={(e) => {
                                e.preventDefault()
                                setADDITIONAL_INFORMATION(true)
                            }}>Next</button>


                        </div>
                    </div>
                    {/* Button end */}

                </form>
            </div>

            {/* PF DETAILS  END */}



            {/* ADDITIONAL INFORMATION START */}
            <div className={`p-3 ${ADDITIONAL_INFORMATION ? '' : 'd-none'}`}>
                <form>
                    {/* Form start */}
                    <div className="row justify-content-center m-0 ">
                        <h5 className='mt-2 heading' style={{ color: 'rgb(76,53,117)' }}>ADDITIONAL INFORMATION</h5>
                        <div className="col-lg-12 p-4 border rounded-lg ">
                            <div className="row m-0 pb-2">
                                <label htmlFor="Name" className="form-label">Have You : </label>

                                <div class="col-md-6 col-lg-6 mb-3">
                                    <label for="interviewer">(1) Marital Ineptness</label>
                                    <select id="interviewer" name="interviewer" value={Marital_Ineptness} onChange={(e) => setMarital_Ineptness(e.target.value)} required class="form-control">
                                        <option value="" selected>Select</option>
                                        <option value="yes" selected>Yes</option>
                                        <option value="no" selected>No</option>

                                    </select>
                                </div>

                                <div class="col-md-6 col-lg-6 mb-3">
                                    <label for="interviewer">(2) Been Involved in Court Proceeding</label>
                                    <select id="interviewer" name="interviewer" value={Court_Proceeding} onChange={(e) => setCourt_Proceeding(e.target.value)} required class="form-control">
                                        <option value="" selected>Select</option>
                                        <option value="yes" selected>Yes</option>
                                        <option value="no" selected>No</option>

                                    </select>
                                </div>
                                <div className="col-md-6 col-lg-12 mb-3">
                                    <label htmlFor="lastName" className="form-label">Languages Known </label>
                                    <input type="text" className="form-control shadow-none" value={Languages_Known} onChange={(e) => setLanguages_Known(e.target.value)} id="LastName" name="LastName" />
                                </div>
                                <div className="col-md-6 col-lg-12 mb-3">
                                    <label htmlFor="email" className="form-label">Your Hobbies</label>
                                    <input type="text" className="form-control shadow-none" value={Hobbies} onChange={(e) => setHobbies(e.target.value)} id="Email" name="Email" />
                                </div>

                                <div className="col-md-6 col-lg-12 mb-3">
                                    <label htmlFor="secondaryContact" className="form-label">Your Interests</label>
                                    <input type="text" className="form-control shadow-none" value={Your_Interests} onChange={(e) => setYour_Interests(e.target.value)} id="SecondaryContact" name="SecondaryContact" />
                                </div>
                                <div className="col-md-6 col-lg-12 mb-3">
                                    <label htmlFor="secondaryContact" className="form-label">Your Goal / Aim In Life </label>
                                    <input type="text" className="form-control shadow-none" value={Your_Goal} onChange={(e) => setYour_Goal(e.target.value)} id="State" name="State" />
                                </div>
                                <label htmlFor="secondaryContact" className="form-label mt-3">Three Principles / Ideals Which Have Guided You In Life</label>

                                <div className="col-md-6 col-lg-4 mb-3 ">
                                    <label htmlFor="secondaryContact" className="form-label mt-2">1.</label>
                                    <input type="text" className="form-control shadow-none" value={Three_Principles1} onChange={(e) => setThree_Principles1(e.target.value)} id="State" name="State" />
                                </div>

                                <div className="col-md-6 col-lg-4 mb-3">
                                    <label htmlFor="secondaryContact" className="form-label mt-2">2.</label>
                                    <input type="text" className="form-control shadow-none" value={Three_Principles2} onChange={(e) => setThree_Principles2(e.target.value)} id="State" name="State" />
                                </div>
                                <div className="col-md-6 col-lg-4 mb-3">
                                    <label htmlFor="secondaryContact" className="form-label mt-2">3.</label>
                                    <input type="text" className="form-control shadow-none" value={Three_Principles3} onChange={(e) => setThree_Principles3(e.target.value)} id="State" name="State" />
                                </div>


                                <label htmlFor="secondaryContact" className="form-label mt-3">List Down Three Of</label>

                                <div class="row m-0  mt-3">

                                    <div className="col-md-6 col-lg-6 border">
                                        <h6 className='text-center mt-3'>Your Strenghts</h6>
                                        <div className="col-md-12 col-lg-12 mb-3">
                                            <label htmlFor="secondaryContact" className="form-label mt-2">1.</label>
                                            <input type="text" className="form-control shadow-none" value={Strenghts1} onChange={(e) => setStrenghts1(e.target.value)} id="State" name="State" />
                                        </div>
                                        <div className="col-md-12 col-lg-12 mb-3">
                                            <label htmlFor="secondaryContact" className="form-label mt-2">2.</label>
                                            <input type="text" className="form-control shadow-none" value={Strenghts2} onChange={(e) => setStrenghts2(e.target.value)} id="State" name="State" />
                                        </div>
                                        <div className="col-md-12 col-lg-12 mb-3">
                                            <label htmlFor="secondaryContact" className="form-label mt-2">3.</label>
                                            <input type="text" className="form-control shadow-none" value={Strenghts3} onChange={(e) => setStrenghts3(e.target.value)} id="State" name="State" />
                                        </div>


                                    </div>
                                    <div className="col-md-6 col-lg-6 border">
                                        <h6 className='text-center mt-3'>Your Weaknesses</h6>
                                        <div className="col-md-12 col-lg-12 mb-3">
                                            <label htmlFor="secondaryContact" className="form-label mt-2">1.</label>
                                            <input type="text" className="form-control shadow-none" value={Weaknesses1} onChange={(e) => setWeaknesses1(e.target.value)} id="State" name="State" />
                                        </div>
                                        <div className="col-md-12 col-lg-12 mb-3">
                                            <label htmlFor="secondaryContact" className="form-label mt-2">2.</label>
                                            <input type="text" className="form-control shadow-none" value={Weaknesses2} onChange={(e) => setWeaknesses2(e.target.value)} id="State" name="State" />
                                        </div>
                                        <div className="col-md-12 col-lg-12 mb-3">
                                            <label htmlFor="secondaryContact" className="form-label mt-2">3.</label>
                                            <input type="text" className="form-control shadow-none" value={Weaknesses3} onChange={(e) => setWeaknesses3(e.target.value)} id="State" name="State" />
                                        </div>

                                    </div>


                                </div>



                                <div class="col-md-6 col-lg-6 mb-3 mt-4">
                                    <label for="interviewer">In India</label>
                                    <select id="interviewer" name="interviewer" value={In_India} onChange={(e) => setIn_India(e.target.value)} required class="form-control">
                                        <option value="" selected>Select</option>
                                        <option value="yes" selected>Yes</option>
                                        <option value="no" selected>No</option>

                                    </select>
                                </div>



                                <div class="col-md-6 col-lg-6 mb-3 mt-4">
                                    <label for="interviewer">In Abroad</label>
                                    <select id="interviewer" name="interviewer" value={In_Abroad} onChange={(e) => setIn_Abroad(e.target.value)} required class="form-control">
                                        <option value="" selected>Select</option>
                                        <option value="yes" selected>Yes</option>
                                        <option value="no" selected>No</option>

                                    </select>
                                </div>
                                <div className="col-md-6 col-lg-4 mb-3">
                                    <label htmlFor="secondaryContact" className="form-label mt-2">State Restrictions / Problems If Any </label>
                                    <input type="text" className="form-control shadow-none" value={State_Restrictions} onChange={(e) => setState_Restrictions(e.target.value)} id="State" name="State" />
                                </div>

                                <div className="col-md-6 col-lg-6 mb-3">
                                    <label htmlFor="secondaryContact" className="form-label mt-2">Passport No </label>
                                    <input type="number" className="form-control shadow-none" value={Passport_No} onChange={(e) => setPassport_No(e.target.value)} id="State" name="State" />
                                </div>
                                <div className="col-md-6 col-lg-6 mb-3">
                                    <label htmlFor="secondaryContact" className="form-label mt-2">Valid Up To </label>
                                    <input type="date" className="form-control shadow-none" value={Valid_Up} onChange={(e) => setValid_Up(e.target.value)} id="State" name="State" />
                                </div>

                                <div className="col-md-6 col-lg-12 mb-3">
                                    <label htmlFor="secondaryContact" className="form-label mt-2">Are you realted to any of our employees ? If yes his / her Name </label>
                                    <input type="text" className="form-control shadow-none" value={realted_employees} onChange={(e) => setrealted_employees(e.target.value)} id="State" name="State" />
                                </div>

                                <div className="col-md-6 col-lg-12 mb-3">
                                    <label htmlFor="secondaryContact" className="form-label mt-2">Membership of any professional institution / Association </label>
                                    <input type="text" className="form-control shadow-none" value={institution} onChange={(e) => setinstitution(e.target.value)} id="State" name="State" />
                                </div>
                                <div className="col-md-6 col-lg-12 mb-3">
                                    <label htmlFor="secondaryContact" className="form-label mt-2">Publication if any ( list with specimen copy) </label>
                                    <input type="text" className="form-control shadow-none" value={Publication} onChange={(e) => setPublication(e.target.value)} id="State" name="State" />
                                </div>
                                <div className="col-md-6 col-lg-12 mb-3">
                                    <label htmlFor="secondaryContact" className="form-label mt-2">Any specialized Training / Training program attended </label>
                                    <input type="text" className="form-control shadow-none" value={specialized_Training} onChange={(e) => setspecialized_Training(e.target.value)} id="State" name="State" />
                                </div>



                            </div>
                        </div>
                    </div>
                    {/* form end */}

                    {/* Button start */}
                    <div class=" d-flex justify-content-end mt-2">

                        <div className='d-flex gap-2'>


                            {/* <button type="submit" class="btn btn-success btn-sm" onClick={handle_Additional_Info}  >Submit</button> */}

                            <button type="submit" class="btn btn-success btn-sm" onClick={(e) => {
                                e.preventDefault()
                                setATTACHMENTS(true)
                            }}>Next</button>


                        </div>
                    </div>
                    {/* Button end */}

                </form>
            </div>
            {/* ADDITIONAL INFORMATION END */}

            {/* ATTACHMENTS START */}
            <div className={`p-3 ${ATTACHMENTS ? '' : 'd-none'}`} >
                <form>
                    {/* Form start */}
                    <div className="row justify-content-center m-0 ">
                        <h3 className='mt-2 heading' style={{ color: 'rgb(76,53,117)' }}>ATTACHMENTS</h3>
                        <div className="col-lg-12 p-4 border rounded-lg ">
                            <div className="row m-0 pb-2">
                                <label htmlFor="Name" className="form-label fw-bold" style={{ color: 'rgb(76,53,115)' }}>Please attach : </label>

                                <div style={{ lineHeight: '40px' }}>
                                    <div>1. Photocopies of all relevant certificates / Degree mark sheets etc.</div>
                                    <div>2. Appointment / Offer letter form all your employes</div>
                                    <div>3. Relieving letter / Experience cerificate from all pervious employers</div>
                                    <div>4. Photocopy of address proof</div>
                                    <div>5. Photocopy of ID proof</div>
                                    <div>6. Passport size photograph</div>
                                </div>
                            </div>
                            {/* DOC UPLOAD START */}
                            <div className=" mt-4">
                                <div className="card rounded-0">
                                    <div className="card-body">
                                        <h3 className='mt-2 heading' style={{ color: 'rgb(76,53,117)' }}>Select Your Files</h3>

                                        <div className="row m-0 pb-2">

                                            <div className="col-md-6 col-lg-6 mb-3">
                                                <label htmlFor="lastName" className="form-label">Degree mark sheets etc </label>
                                                <input type="file" className="form-control shadow-none" onChange={(e) => setDegree_mark_sheets(e.target.files[0])} id="LastName" name="LastName" />
                                            </div>
                                            <div className="col-md-6 col-lg-6 mb-3">
                                                <label htmlFor="lastName" className="form-label">Offer letter </label>
                                                <input type="file" className="form-control shadow-none" onChange={(e) => setOffer_letter(e.target.files[0])} id="LastName" name="LastName" />
                                            </div>
                                            <div className="col-md-6 col-lg-6 mb-3">
                                                <label htmlFor="lastName" className="form-label">Experience cerificate  </label>
                                                <input type="file" className="form-control shadow-none" onChange={(e) => setExperience_cerificate(e.target.files[0])} id="LastName" name="LastName" />
                                            </div>
                                            <div className="col-md-6 col-lg-6 mb-3">
                                                <label htmlFor="lastName" className="form-label">Photocopy of address proof </label>
                                                <input type="file" className="form-control shadow-none" onChange={(e) => setPhotocopy_of_address_proof(e.target.files[0])} id="LastName" name="LastName" />
                                            </div>
                                            <div className="col-md-6 col-lg-6 mb-3">
                                                <label htmlFor="lastName" className="form-label">Photocopy of ID proof </label>
                                                <input type="file" className="form-control shadow-none" onChange={(e) => setPhotocopy_of_ID_proof(e.target.files[0])} id="LastName" name="LastName" />
                                            </div>
                                            <div className="col-md-6 col-lg-6 mb-3">
                                                <label htmlFor="lastName" className="form-label">Passport size photograph </label>
                                                <input type="file" className="form-control shadow-none" onChange={(e) => setPassport_size_photograph(e.target.files[0])} id="LastName" name="LastName" />
                                            </div>
                                        </div>


                                        {/* <div className="input-group mb-3">
                                            <input type="file" className="form-control shadow-none mt-3" onChange={handleFileChange}  />
                                            <button className="btn btn-primary mt-3" style={{ height: '40px' }} type="button" onClick={handleAddFile}>Add File</button>
                                        </div>
                                        <div className='mt-3'>
                                            <h3 className='mt-4 heading' style={{ color: 'rgb(76,53,117)' }}>Documents :</h3>

                                            <ul className="list-group mt-3">
                                                {documentsupload.map((doc, index) => (
                                                    <li key={index} className="list-group-item">
                                                        {doc.name} - {doc.size} bytes - {doc.type}
                                                        <button className="btn btn-danger btn-sm ms-2" onClick={(e) => handleRemoveFile(index)}>Remove</button>


                                                    </li>
                                                ))}
                                            </ul>
                                        </div> */}
                                        {/* <button className="btn btn-success mt-3" onClick={handleSendToAPI}>Send to API</button> */}
                                    </div>
                                </div>
                            </div>
                            {/* DOC UPLOAD END */}

                        </div>
                    </div>

                    {/* form end */}
                    {/* Button start */}
                    <div class=" d-flex justify-content-end mt-2">

                        <div className='d-flex gap-2'>


                            {/* <button type="submit" class="btn btn-success btn-sm" onClick={handle_Attachments_Info}  >Submit</button> */}

                            <button type="submit" class="btn btn-success btn-sm" onClick={(e) => {
                                e.preventDefault()
                                setDOCUMENTS_SUBMITED(true)
                            }}>Next</button>


                        </div>
                    </div>
                    {/* Button end */}

                </form>
            </div>
            {/* ATTACHMENTS END */}

            {/* DOCUMENTS SUBMITED START */}
            <div className={`p-3 ${DOCUMENTS_SUBMITED ? '' : 'd-none'}`}>
                <form>
                    {/* Form start */}
                    <div className="row justify-content-center m-0 ">
                        <h5 className='mt-2 heading' style={{ color: 'rgb(76,53,117)' }}>DOCUMENTS SUBMITED </h5>
                        <div className="col-lg-12 p-4 border rounded-lg ">
                            <div className="row m-0 pb-2">



                                <table class="table  table-bordered">
                                    <thead>
                                        <tr>
                                            <th>No</th>
                                            <th>Documents</th>
                                            <th>Submitted</th>
                                            <th>Will Submit On</th>

                                        </tr>
                                    </thead>
                                    <tbody>

                                        {documents.map((document, index) => (
                                            <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td><input type="text" name="documentName" value={document.documentName} onChange={(e) => handleInputChange3(index, e)} className="form-control border-0 shadow-none" /></td>
                                                <td><input type="text" name="submitted" value={document.submitted} onChange={(e) => handleInputChange3(index, e)} className="form-control border-0 shadow-none" /></td>
                                                <td><input type="text" name="willSubmitOn" value={document.willSubmitOn} onChange={(e) => handleInputChange3(index, e)} className="form-control border-0 shadow-none" /></td>
                                            </tr>
                                        ))}


                                    </tbody>
                                </table>
                                <div className='d-flex justify-content-end'>
                                    <button onClick={handleAddRow3} className='btn btn-sm btn-success'>add</button>
                                </div>


                            </div>
                        </div>
                    </div>
                    {/* form end */}

                    {/* Button start */}
                    <div class=" d-flex justify-content-end mt-2" >

                        <div className='d-flex gap-2'>


                            {/* <button type="submit" class="btn btn-success btn-sm" onClick={handle_Documents_Submited_Details}  >Submit</button> */}

                            <button type="submit" class="btn btn-success btn-sm" onClick={(e) => {
                                e.preventDefault()
                                setDECLARATION(true)
                            }}>Next</button>


                        </div>
                    </div>
                    {/* Button end */}

                </form>
            </div>
            {/* DOCUMENTS SUBMITED END */}


            {/* DECLARATION START */}
            <div className={`p-3 ${DECLARATION ? '' : 'd-none'}`}>
                <form>
                    {/* Form start */}
                    <div className="row justify-content-center m-0 ">
                        <h5 className='mt-2 heading' style={{ color: 'rgb(76,53,117)' }}>DECLARATION </h5>
                        <div className="col-lg-12 p-4 border rounded-lg ">

                            <p>
                                I DECLARE THAT THE INFORMATION GIVEN, HEREIN ABOVE, IS TRUE & CORRECT TO THE BEST OF MY KNOWLEDGE & BELIEF & NO MATERIAL INFORMATION HAS BEEN CONCEALED. I UNDERSTAND THAT THE ABOVE INFORMATION IN FOUND FALSE OR INCORRECT, AT ANY TIME DURING THE COURSE OF MY EMPLOYMENT, MY SERVICES WILL BE TERMINATED FORTHWITH WITHOUT ANY NOTICE OR COMPENSATION.
                            </p>

                            <div className='d-flex justify-content-between'>
                                <div className='d-flex' >

                                    <div className='mt-4' style={{ lineHeight: '50px' }}>

                                        <div>Name</div>
                                        <div>Date</div>
                                        <div>Place</div>

                                    </div>

                                    <div className='mt-3 ms-3'>
                                        <div className='mt-2'>
                                            <input type="text" value={Name} onChange={(e) => setName(e.target.value)} className="form-control shadow-none border-bottom border-top-0 border-end-0 border-start-0 bg-transparent " id="Name" name="Name" />
                                        </div>
                                        <div className='mt-2'>
                                            <input type="date" value={Date} onChange={(e) => setDate(e.target.value)} className="form-control shadow-none border-bottom border-top-0 border-end-0 border-start-0 bg-transparent " id="Name" name="Name" />
                                        </div>
                                        <div className='mt-3'>
                                            <input type="text" value={Place} onChange={(e) => setPlace(e.target.value)} className="form-control shadow-none border-bottom border-top-0 border-end-0 border-start-0 bg-transparent " id="Name" name="Name" />
                                        </div>

                                    </div>



                                </div>

                                <div>

                                    <div className="col-md-12 col-lg-12 mb-3 mt-5 pt-4">
                                        <input type="text" value={Signature} onChange={(e) => setSignature(e.target.value)} className="form-control mt-4 shadow-none border-bottom border-top-0 border-end-0 border-start-0 bg-transparent " id="Name" name="Name" />

                                    </div>
                                    <h6>SIGNATURE OF APPLICANT</h6>

                                </div>
                            </div>

                        </div>
                    </div>
                    {/* form end */}
                    {/* Button start */}
                    {/* <div class=" d-flex justify-content-end mt-2">
                        <div className='d-flex gap-2'>
                            <button type="submit" class="btn btn-success btn-sm" onClick={handle_Declaration}  >Submit</button>
                        </div>
                    </div> */}
                    <div className='p-3 d-flex justify-content-end'>

                        <button onClick={Complete_Emp_Form} className='btn  btn-danger'  >Submit Form</button>
                    </div>
                    {/* Button end */}


                </form>
            </div>


        </div>
    );
};

export default Employeeallform;
