import axios from 'axios';
import React, { useContext, useState } from 'react'
import { usePDF } from 'react-to-pdf';
import { domain, port } from '../App'
import HrmContext, { HrmStore } from '../Context/HrmContext';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useParams } from 'react-router-dom';



const Tempone = ({ data, targetRef }) => {
    let { changeDateYear } = useContext(HrmStore)
    let offer_letter_data = JSON.parse(sessionStorage.getItem('offer_letter_form'))
    let Login = JSON.parse(sessionStorage.getItem('user'))

    let [loading, setloading] = useState(false)
    const convertDivToPDFAndSend = async () => {
        const input = document.getElementById('contentpdf');
        if (!input) {
            console.error("Div not found");
            return;
        }
        setloading(true)
        try {
            const canvas = await html2canvas(input);

            // Create a new jsPDF instance
            const pdf = new jsPDF('p', 'px', [canvas.width, canvas.height + 10]);
            const imgData = canvas.toDataURL('image/png');

            // Add image data to PDF
            pdf.addImage(imgData, 'PNG', 0, 0, canvas.width, canvas.height);

            pdf.save('orignal.pdf')
            // Generate the PDF as a Blob
            const pdfBlob = pdf.output('blob');
            return

            // Create a File object from the Blob
            const pdfFile = new File([pdfBlob], 'divContent.pdf', { type: 'application/pdf' });

            console.log(pdfFile);
            // return
            // Create FormData and append the PDF Blob
            const formData = new FormData();
            formData.append('PDF_File', pdfFile,);

            // Send the PDF to the backend
            const response = await axios.post(`${port}/root/Offerletter/${offer_letter_data.offer_letter_ID}/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setloading(false)
            console.log('PDF sent successfully', response.data);
        } catch (error) {
            setloading(false)
            console.error('Error converting div to PDF and sending:', error);
        }
    };
    console.log("jellow", data);
    const currentDate = new Date();
    const formattedDate = `${currentDate.getDate()}-${currentDate.getMonth() + 1}-${currentDate.getFullYear()}`;

    return (
        <>

            <div id='contentpdf' className='p-4 bg-white' >

                <div className='m-3'>
                    <div ref={targetRef} className='container shadow'>
                        <div className='p-16 ' >
                            <h4 className=' text-center '>Offer Letter </h4>
                            <p style={{ textAlign: 'right', marginBottom: '40px' }}>
                                Date: <strong>05th August 2024</strong>
                            </p>

                            <p><strong>To</strong></p>
                            <p><strong>{data.Name} </strong></p>
                            <p><strong>Address</strong></p>

                            <p style={{ marginTop: '40px' }}>Dear {data.Name},</p>

                            <p><strong>Sub: Offer Letter</strong></p>

                            <p>We are delighted to offer you the position of <strong> {data.position_name} </strong>.</p>

                            <p>Your date of joining will be <strong> {changeDateYear(data.Date_of_Joining)} </strong>.</p>

                            {/* <p>You will report directly to <strong>………………………………</strong>.</p> */}

                            <p>Working hours are from <strong>9:30 AM to 6:30 PM (Monday to Saturday)</strong>.</p>

                            <p>Your Cost to Company will be <strong> {data.CTC} </strong>.</p>

                            <p>You will receive the Appointment Letter once your joining formalities are completed on the date of joining.</p>

                            <p>Please confirm your acceptance of this offer letter through E-mail.</p>

                            <p style={{ marginTop: '40px' }}>Sincerely,</p>

                            <p><strong>Authorized Signatory</strong></p>
                        </div>
                    </div>
                </div>

            </div>


        </>


    )
}

export default Tempone