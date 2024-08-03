import React, { useContext } from 'react'
import { HrmStore } from '../Context/HrmContext'

const InternLetter = ({ data, pdfRef }) => {
    let { getCurrentDate } = useContext(HrmStore)

    return (
        <div ref={pdfRef} className='container bg-white  p-5'>
            <h6> Date : {getCurrentDate()} </h6>

            <h4 className='text-center'>Letter Offer </h4>
            <p>Dear {data.Name},</p>
            <p>
                Further to the interviews you had with us and upon agreeing to the Terms and Conditions, Leave Policy,
                Separation Policy, Working Policy, etc., we are pleased to welcome you as an intern at Merida Tech Minds as
                <span className='fw-semibold '>  “{data.position_name}” </span>. Your place of posting for the present will be at <span className='fw-semibold'>{data.WorkLocation}</span> .
            </p>
            <p>
                Your total stipend will be <span className='fw-semibold '>  Rs.{data.CTC}/- per month </span>. The same is subject to all statutory deductions.
            </p>
            <p>
                Merida Tech Minds is a professionally managed organization in Bangalore. We set forth our customers first
                and value our customers living by our Motto -Customer is God. The same is what has helped us grow to this
                level in a short span of 8 plus years. At Merida Tech Minds, we place strong emphasis on our customer,
                employee, and stakeholder satisfaction.
            </p>
            <p>
                Merida Tech Minds can offer you the right blend of career growth, international exposure, extensive project
                exposure, a professional working environment, leadership opportunities and financial gains over the long term.
            </p>
            <p>
                You will also have the unique satisfaction of being part of growing this organization to the next level and
                growing along with the organization. We completely believe in a performance-based model and incentivizing
                our people to the fullest. We believe in equal employment opportunity and also in recognizing talent and
                potential at the right time. We respect and value our employees and completely believe in offering both
                personal and professional growth. We believe that your skills and knowledge are a valuable asset to our
                organization and will contribute immensely towards achieving our goals. We offer a win-win environment where
                both the organization and you are immensely benefited and we see success together.
            </p>
            <h4>Working Hours</h4>
            <ul>
                <li>
                    Your shift timings and regular working hours will be as per the policy of the company depending on the
                    department and the same can be chosen after discussing with your reporting managers.
                </li>
                <li>
                    You will be abide by the working hours, weekly offs and paid holidays of the department, Centers, office or
                    establishment where you are posted. In case of unforeseen events and/or workload you may be required to work
                    beyond the working hours or on weekly off days/holidays.
                </li>
            </ul>
            <h4>Training & Development</h4>
            <ul>
                <li>
                    You will go through an extensive training with the trainers both internally / externally and Merida Tech Minds
                    has strict policies and practices in terms of the training policy. You will abide by and will be governed by
                    the Training Policy as long as you are in your training period.
                </li>
            </ul>
            <h4>Code of Conduct</h4>
            <ul>
                <li>
                    During your employment with Merida Tech Minds, you will exhibit professional behavior at all times be it with
                    customers and/or your reporting managers and/or your peers or anybody you come in contact with.
                </li>
                <li>
                    You will follow ethical practices in all your work and will remain honest and loyal towards your employer and
                    your profession. Dishonesty and partiality at work or towards any of your team members or anyone else is
                    strictly unacceptable. In the event of any such issues, the company would choose to make the decision based
                    on the severity of the case.
                </li>
                <li>
                    Socializing in terms of dating and/or a relationship with another Merida Tech Minds employee who is currently
                    working or an ex-employee of Merida Tech Minds against the Company policy and if any found will lead to
                    termination of services for both the employees.
                </li>
                <li>
                    You will follow the company's dress code during all working days and will be presentable at all times.
                </li>
            </ul>
            <h4>Notice Period</h4>
            <p>
                Should you desire to leave the services of Merida Tech Minds, either during your training or immediately after
                your training or during your Probationary Period or after confirmation of your services, you are required to
                furnish/serve at least <span className='fw-semibold '> {data.notice_period} </span>days’ notice period, failing to which 2 months gross compensation to be paid against
                notice period buyout in lieu thereof, before you can be relieved from the services of Merida Tech Minds. Based
                on the business necessity and the designation the company holds the right to revisit the notice period.
            </p>
            <p>
                This letter of Offer is from <span className='fw-semibold '>{data.internship_Duration_From} till {data.internship_Duration_To}</span> .
            </p>
            <p>
                We shall be obliged if you could kindly confirm your acceptance of the above by returning the duplicate of this
                letter duly signed by you, to the HR Department. We would be glad to assist you with any queries you may have
                about joining Merida Tech Minds as we embark on an exciting journey of growth together, we look forward to
                having you on board.
            </p>
            <p>For Merida Tech Minds (OPC) Pvt. Ltd.</p>
            <p>Authorized Signatory</p>
            <p>
                I accept the offer and my Date of Joining will be on <span className='fw-semibold '> {data.Date_of_Joining}</span>
            </p>
            <p>Name: {data.Name}</p>
            <p>Signature:</p>
            <p>Date:</p>
        </div>
    )
}

export default InternLetter