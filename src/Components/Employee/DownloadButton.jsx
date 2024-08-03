import React from 'react'
import { usePDF } from 'react-to-pdf';

const DownloadButton = ({ toPDF }) => {
    const downloadPDF = async () => {
        toPDF();
        // alert('Offer Letter sent successfully')
        await new Promise(resolve => setTimeout(resolve, 2000));
        const pdfBlob = await fetch('page.pdf').then((res) => res.blob());
    }
    return (
        <div>
            <button className='bg-blue-600 text-white rounded p-2  ' onClick={downloadPDF}>
                Download
            </button>

        </div>
    )
}

export default DownloadButton