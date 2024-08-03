import React, { useState } from 'react'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const GeneratePDF = ({ divRef }) => {
    let [loading, setLoading] = useState(false)
    const generatePdf = async () => {
        setLoading(true)
        const divElement = divRef.current;
        const canvas = await html2canvas(divElement, { scale: 2, useCORS: true });

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF('p', 'mm', 'a4');

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();

        const imgProps = pdf.getImageProperties(imgData);
        const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

        let heightLeft = imgHeight;
        let position = 0;

        pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;

        while (heightLeft > 0) {
            position = heightLeft - imgHeight;
            pdf.addPage();
            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
            heightLeft -= pdfHeight;
        }

        pdf.save('document.pdf');
        setLoading(false)
    };
    return (
        <div>
            <button disabled={loading} onClick={generatePdf} className='bg-blue-600 text-white rounded p-2 px-3 ' >
                {loading ? "Loading" : " Download PDF"}
            </button>
        </div>
    )
}

export default GeneratePDF