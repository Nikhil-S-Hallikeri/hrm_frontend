import axios from 'axios';
import React from 'react'
import { usePDF } from 'react-to-pdf';
import {port} from '../App' 



const Tempone = () => {

    const { toPDF, targetRef } = usePDF({ Offer_Letter: 'page.pdf' });

    let offer_letter_data = JSON.parse(sessionStorage.getItem('offer_letter_form'))
    let Login = JSON.parse(sessionStorage.getItem('user'))


      console.log("SS",offer_letter_data.Date_Of_Joning);


    const sendbackend = async () => {
        toPDF();
        alert('Offer Letter sent successfully')
        await new Promise(resolve => setTimeout(resolve, 2000));

        const pdfBlob = await fetch('page.pdf').then((res) => res.blob());
        console.log(pdfBlob)
        const formData = new FormData();
        formData.append('PDF_File', pdfBlob, 'page.pdf');
        formData.append('Letter_sended_by', Login.EmployeeId);
        formData.append('Date_of_Joining', offer_letter_data.Date_Of_Joning);
        formData.append('Employeement_Type', offer_letter_data.Employee_Current_Role);
        formData.append('probation_Duration_From', offer_letter_data.Probation_From_Date);
        formData.append('probation_Duration_To', offer_letter_data.Probation_To_Date);
        formData.append('WorkLocation', offer_letter_data.workLocation);
        formData.append('CTC', offer_letter_data.ctc);
        formData.append('internship_Duration_From', offer_letter_data.Intern_From_Date);
        formData.append('internship_Duration_To', offer_letter_data.Intern_To_Date);
        formData.append('probation_status', offer_letter_data.Under_Probation);
        formData.append('notice_period', offer_letter_data.notice_period);
        // formData.append('dob', offer_letter_data.dob);
        // formData.append('dob', offer_letter_data.offer_letter_ID);
        // formData.append('dob', offer_letter_data.offer_letter_Phone);
        // formData.append('dob', offer_letter_data.offer_letter_designation);
        // formData.append('dob', offer_letter_data.offer_letter_email);
        // formData.append('dob', offer_letter_data.offer_letter_name);
      
        formData.append('Accept_Form', `http://localhost:3000/offeraccept/`);
        // http://localhost:3000/offeraccept/:id

        
        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        try {
            const response = await axios.post(`${port}/root/Offerletter/${offer_letter_data.offer_letter_ID}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
           
            console.log('PDF sent successfully:', response.data);
        } catch (error) {
            console.error('Error sending PDF:', error);
        }
    };

    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;

    return (
        <>

            <div className='p-4' ref={targetRef}>

                <div>
                    <h2 className='text-center'>Offer Letter</h2>
                </div>
                <div className='m-3'>

                    <div className='p-4'>
                        <p>
                            <strong>Date : {formattedDate}  </strong>
                        </p>
                        <p>
                            <strong> Name :  {offer_letter_data.offer_letter_name} </strong>
                        
                        </p>
                        <h2>Letter of Appointment</h2>
                        <p>
                            Further to the subsequent meetings and interviews, we are pleased to appoint you as " <span className='fw-bold'> {offer_letter_data.offer_letter_designation} </span> ” effectiveDate Of Joining. As per the requirement of our company, your appointment will be on the terms and conditions mentioned below:
                        </p>
                    </div>

                    <ol>
                        <li>
                            <strong>Commencement Date</strong>
                            <p>Your appointment will be effectiveDate Of Joining. This offer of appointment is valid only till the date of joining you have accepted and committed as per the offer letter, and it will automatically cease in the event of you not joining us by the said date.</p>
                        </li>
                        <li>
                            <strong>Place of Work</strong>
                            <ol>
                                <li>
                                    <p>Your place of posting will be at our office in Jayanagar 4th Block, Bengaluru, till the Company intimates you otherwise.</p>
                                </li>
                                <li>
                                    <p>You are liable to be transferred from one job to another job, or from one Department to another Department, any Centers/Branches or associate company of “Merida Tech Minds (OPC) Pvt. Ltd”, as existing or may be set up in future within or outside India. In such cases, you will automatically be governed by the terms and conditions of employment applicable to you in the transferee company.</p>
                                </li>
                            </ol>
                        </li>
                        <li>
                            <strong>Salary and Benefits</strong>
                            <ol>
                                <li>
                                    <strong>Fixed Pay:</strong>
                                    <p>Your Fixed compensation will be Rs.Fixed Salary/- per annum. The same is subject to all statutory deductions.</p>
                                </li>
                                <li>
                                    <p>Fixed Pay will be paid on a Monthly basis.</p>
                                </li>
                                <li>
                                    <p>Compensation will be paid based on your performance and the company policy.</p>
                                </li>
                                <li>
                                    <p>Your Salary paid, as agreed in this appointment letter or as agreed in your salary revision letter if there any, has been offered and agreed to be paid by the employer towards the delivery of your Key Result Area - KRA as agreed in your KRA Documentation.</p>
                                </li>
                                <li>
                                    <p>Your individual salary package and payments are purely a matter of utmost confidentiality between you and the company and have been arrived at on the basis of job, skills, and professional merit. We expect you to maintain this information and any changes pertaining to your remuneration made from time to time as personal and confidential.</p>
                                </li>
                            </ol>
                        </li>
                        <li>
                            <strong>Working Hours</strong>
                            <ol>
                                <li>
                                    <p>Your shift timing and regular working hours will be as per the policy of the company depending on the department, and the same can be chosen after discussing with your reporting managers.</p>
                                </li>
                                <li>
                                    <p>You will abide by the working hours, weekly offs, and paid holidays of the department, Centers, office, or establishment where you are posted. In case of unforeseen events and/or workload, you may be required to work beyond the working hours or on weekly off days/holidays.</p>
                                </li>
                            </ol>
                        </li>
                        <li>
                            <strong>Training & Development</strong>
                            <ol>
                                <li>
                                    <p>You will go through extensive training with trainers both internally/externally and have strict policies and practices in terms of the training policy. You will abide by and will be governed by the Training Policy as long as you are in your training period.</p>
                                </li>
                                <li>
                                    <p>If the performance during your training period/results are not as expected, then the company holds the right to extend your training period and/or change your role based on where it seems fit and/or on your continuity of employment/services. And the company holds the right to do so without any prior notice or notice in lieu.</p>
                                </li>
                            </ol>
                        </li>
                        <li>
                            <strong>Job Assignment and Reporting</strong>
                            <p>In your assignment, you will be responsible for the duties based on the role assigned to you, as more particularly laid out in the job description for this position. You will report directly to the supervisor nominated by the Management. The Key Responsibilities Areas would be given to you on joining the duty.</p>
                        </li>
                        <li>
                            <strong>Probation and Confirmation of Services</strong>
                            <ol>
                                <li>
                                    <p>You will be on a Probation Period of six (6) months from the date of acceptance of this offer. Your employment will be confirmed by a letter of confirmation subject to satisfactory work, conduct attendance and continue to serve the company on the terms hereinafter contained or as the same may from time to time be modified by mutual consent.</p>
                                </li>
                                <li>
                                    <p>The management reserves the right to extend the period of probation, if your capability and conduct during the period is not satisfactory and the company has the right to initiate closure based on the case.</p>
                                </li>
                                <li>
                                    <p>During the probation period or the extended period of probation, an Employee is bound to provide the company with the needed notice period or as per policy under Separation/Termination of Services clause as per this appointment letter.</p>
                                </li>
                                <li>
                                    <p>By signing this letter, you consent hereby, that if you leave the company within 6 months of joining, the company reserves the right to recover any cost incurred during your recruitment and training and/or any other cost that may be deemed to be considered by the company during your exit and it is at the discretion of the company to initiate the same.</p>
                                </li>
                            </ol>
                        </li>
                        <li>
                            <strong>Leaves and Permissions</strong>
                            <ol>
                                <li>
                                    <p>Your leaves and permissions will be available as per the leave policy of the company and the same is subject to be revised every year or as deemed fit.</p>
                                </li>
                                <li>
                                    <p>All leaves and Permissions need prior approval from your immediate reporting manager over an email. In case of any emergency leaves or permissions are needed, you are expected to inform your immediate reporting manager in person or over the phone and NO SMS or passing on information through your peers or colleagues or at the front office will be accepted. Unless the leaves or permissions are approved by your manager, the same will be considered only as unapproved and will be processed as per the same.</p>
                                </li>
                                <li>
                                    <p>In case if you are absent from work for more than three(3) consecutive days, without informing your Reporting Manager/ HR Department, the management reserves the right to terminate your services with immediate effect on the grounds of no call/no show to work and unapproved leaves and the Company reserves the right to recover the damages, by issuing a Notice.</p>
                                </li>
                            </ol>
                        </li>
                        <li>
                            <strong>Code of Conduct</strong>
                            <ol>
                                <li>
                                    <p>During your employment with Merida Tech Minds, you will exhibit professional behavior at all times be it with customers and/or your reporting managers and/or your peers or anybody you come in contact with.</p>
                                </li>
                                <li>
                                    <p>You will follow ethical practices in all your work and will remain honest and loyal towards your employer and your profession. Dishonesty and partiality at work or towards any of your team members or anyone else is strictly unacceptable. In the event of any such issues, the company would choose to make the decision based on the severity of the case.</p>
                                </li>
                                <li>
                                    <p>Socializing in terms of dating and/or a relationship with another Merida Tech Minds, employee who is currently working or an ex-employee of Merida Tech Minds against the Company policy and if any found will lead to termination of services for both the employees.</p>
                                </li>
                                <li>
                                    <p>Blood relations / Husband and wife will not be offered and cannot be employed with Merida Tech Minds at the same time. If any information pertaining to the same is hidden or misguided by any employee then the employer will initiate for closure of employment.</p>
                                </li>
                                <li>
                                    <p>You will follow the company's dress code during all working days and will be presentable at all times.</p>
                                </li>
                                <li>
                                    <p>You shall not form any union of the Employee of the Company or join any union and/or instigate or persuade any employees of the Company to join a Union of Employees or Workers. If found and proven otherwise the company not only holds the right to initiate separation of employment but also to claim any loss incurred by the company due to such an act either across the table or through legal proceedings.</p>
                                </li>
                                <li>
                                    <p>Merida Tech Minds uses the National Skills Registry for verification of employment purposes. Your profile will be created (if one is not available already) and all your details will be updated in NSR (National Skills Registry) including your mode of exit from the company.</p>
                                </li>
                            </ol>
                        </li>
                        <li>
                            <strong>You will be governed by the company's Policies and Procedures and be guided by the employee handbook.</strong>
                        </li>
                        <li>
                            <strong>Separation / Termination of Employment</strong>
                            <ol>
                                <li>
                                    <p>Should you desire to leave the services of Merida Tech Minds, either during your training or immediately after your training or during your Probationary Period or after confirmation of your services, you are required to furnish/serve at least 45 days’ notice period, failing to which Rs.50,000/- compensation to be paid against notice period buyout in lieu thereof, before you can be relieved from the services of Merida Tech Minds. Based on the business necessity and the designation the company holds the right to revisit the notice period.</p>
                                </li>
                                <li>
                                    <p>The 45 days salary compensation option is applicable and available only for employees who have successfully completed their probationary period and who inform on their resignation and who separate from the Company on a mutual note (where the company has agreed upon relieving without notice period but in compensation in lieu paid in full) without serving the notice period. Either during the course of the Probationary period or after completion of the probationary, if the separation is without any information and not turning up to work resulting in absconding from one's work then you will be liable to pay Rs.50,000/- or 45 Days compensation whichever is higher towards your compensation. In lieu of not abiding by the same, the company shall proceed in Termination and will proceed legally to claim/recover what is agreed in this letter.</p>
                                </li>
                                <li>
                                    <p>During your probation period, based on not clearing the training, failing to clear the background verification, medical or Criminal verification and/or failure to provide sufficient documentary evidence and /or non-performance and /or any ethical and / or behavioral issues and/or any other concerns that are against the policy and practice of Merida Tech Minds, your employment with the “Merida Tech Minds”, can be terminated without any notice or salary in lieu.</p>
                                </li>
                                <li>
                                    <p>Any breach of the terms and conditions of your employment or are guilty of misconduct (including drunkenness, dishonesty, absence without notice, infringement of the company’s regulations and disobedience to lawful orders or instructions) or conduct yourself in a manner calculated to bring to the company or its employees into disrepute or if you borrow money from any of the clients of the company or from anyone associated with the company, you will be discharged immediately from the company without any notice or salary in lieu of notice and in such case you will have no claim from the company whatsoever.</p>
                                </li>
                                <li>
                                    <p>The company believes in performance and in giving equal opportunity to all employees to come forth with their performance. However, the company holds the right to end your employment on the grounds of non-performance / lack of performance and the process will be governed as per the Performance Improvement Plan (PIP) followed by the Company. The grounds of non-performance / lack of performance will be as explained and detailed in the Performance Improvement Plan (PIP). The Plan is subject to change based on the current industry and company standards.</p>
                                </li>
                                <li>
                                    <p>Your Date of Birth as confirmed by you isDate Of Birth and you will retire from the services of the company on the day you complete 58 years of age. The company, however, reserves the right to modify and amend the retirement policy and age.</p>
                                </li>
                                <li>
                                    <p>You must be physically and mentally fit to be able to handle the role given and the same must be certified by an authorized medical practitioner (acceptable and suggested by the company only). If found otherwise either before your employment or while your employment with Merida Tech Minds, the company holds all rights to make the needed decision based on the severity of the case. You will be signing a medical declaration form, and the further proceedings will be as per the same.</p>
                                </li>
                            </ol>
                        </li>
                    </ol>

                    <div className='p-4'>


                        <p>
                            Please confirm your acceptance of this appointment by returning the enclosed copy of this letter and the declaration of Secrecy Agreement of Non-Disclosure/Confidentiality duly signed. We welcome you to “Merida Tech Minds(OPC) Pvt Ltd” and very much hope that your period of service with us will be long, pleasant and you will work towards fulfilling your career aspirations. Looking forward to your contribution in achieving our success plans.
                        </p>
                        <p>We wish you all the very Best!</p>
                        <p>
                            Yours Sincerely
                            <br />
                            For Merida Tech Minds (OPC) Pvt. Ltd.
                        </p>
                        <p>
                            Authorized Signatory
                        </p>
                        <h3>DECLARATION</h3>
                        <p>
                            I abide by the conditions stipulated in the Letter of Appointment datedDate and as desired.
                        </p>
                        <p>
                            I will join the services onDate of Joining
                            <br />
                            Name : {offer_letter_data.offer_letter_name}
                            <br />
                            Signature:
                            <br />
                            Date:  {offer_letter_data.offeredDate}
                        </p>

                    </div>

                </div>


            </div>
            <div className='d-flex justify-content-end p-3' id='buttons'>
                {/* <button className='btn btn-success btn-sm me-3' onClick={() => toPDF()}>Download PDF</button> */}

                <button className='btn btn-warning btn-sm' onClick={sendbackend}>Submit</button>
            </div>

        </>


    )
}

export default Tempone