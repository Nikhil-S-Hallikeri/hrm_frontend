import React, { useEffect, useState } from 'react'
import BarcodeScannered from './BarScanner';
import { Html5QrcodeScanner } from 'html5-qrcode';

const Scanner = () => {
    let [result, setresult] = useState()

    let scanValue = () => {
        const scanner = new Html5QrcodeScanner(
            "scannreader", {
            fps: 20, qrbox: {
                width: 250,
                height: 250
            }
        },
        );
        function onScanSuccess(result) {
            console.log(result);

            setTimeout(() => {
                setresult(result)
                scanner.clear()
            }, 3000);

        }
        function onScanFailure(error) {
            console.log(error);
            // scanner.clear()
        }
        scanner.render(onScanSuccess, onScanFailure);

    }
    useEffect(() => {

    }, []);

    return (
        <div className='container mx-auto'>
            <div id='scannreader' className=' w-[400px]  mx-auto '  >
            </div>
            <p className='mx-auto text-center flex w-fit '>{result} </p>

            <div className='flex mx-auto flex-wrap w-fit gap-3'>
                enther the Machine code :
                <input type="text" className='bgclr rounded p-2 '
                    value={result} />
                <button onClick={scanValue}>Scan </button>
            </div>
        </div>
    );
}

export default Scanner