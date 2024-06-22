import React from 'react'
// import { usePDF } from 'react-to-pdf/dist/types';
import { usePDF } from 'react-to-pdf';

const Downloadpdf = () => {
    const { toPDF, targetRef } = usePDF({filename: 'page.pdf'});
  return (
    <div>
    <button onClick={() => toPDF()}>Download PDF</button>
    <div ref={targetRef}>
       hi i am Rakkiii ,
       How are you
    </div>
 </div>
  )
}

export default Downloadpdf