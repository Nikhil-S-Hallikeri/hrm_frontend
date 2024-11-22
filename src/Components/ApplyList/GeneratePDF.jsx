import React, { useState } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const GeneratePDF = ({ divRef }) => {
    const [loading, setLoading] = useState(false);

    const generatePdf = async () => {
        // Check if divRef is valid
        if (!divRef?.current) {
            console.error("divRef is not set properly.");
            setLoading(false);
            return;
        }

        setLoading(true);
        const divElement = divRef.current;

        try {
            const canvas = await html2canvas(divElement, { scale: 2, useCORS: true });
            const imgData = canvas.toDataURL('image/png');
            const pdfWidth = 1200;
            const pdfHeight = 1000;

            const pdf = new jsPDF('p', 'px', [pdfWidth, pdfHeight]);
            const imgProps = pdf.getImageProperties(imgData);
            const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;
            let heightLeft = imgHeight;
            let position = 0;

            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
            heightLeft -= pdfHeight;

            while (heightLeft > 0) {
                position -= pdfHeight;
                pdf.addPage();
                pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, imgHeight);
                heightLeft -= pdfHeight;
            }

            pdf.save('document.pdf');
        } catch (error) {
            console.error("Error generating PDF:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <button
                disabled={loading}
                onClick={generatePdf}
                className="bg-blue-600 text-white rounded p-2 px-3"
            >
                {loading ? "Loading..." : "Download PDF"}
            </button>
        </div>
    );
};

export default GeneratePDF;
