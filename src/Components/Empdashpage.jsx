import React, { useContext, useEffect } from 'react'
import Topnav from './Topnav'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import { Chart as ChartJS } from "chart.js/auto";
import '../assets/css/fonts.css'
import Slider from "react-slick";
import '../assets/css/media.css'
import Empsidebar from './Empsidebar';
import { HrmStore } from '../Context/HrmContext';
import LeaveApprovalBox from './HomeComponent/LeaveApprovalBox';
import WishesCom from './WishesCom';
import MyAttendance from './Employee/MyAttendance';
import NewSideBar from './MiniComponent/NewSideBar';

const Empdashpage = ({ subpage }) => {

    let { setActivePage } = useContext(HrmStore)
    useEffect(() => {
        setActivePage('dashboard')
    }, [])

    var settings1 = {
        dots: false,
        arrows: false,
        infinite: true,
        speed: 900,
        slidesToShow: 4,
        autoplay: true,
        speed: 1000,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    initialSlide: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };
    const data1 = {
        labels: ['item1', 'item2', 'item3', 'item4', 'item5', 'item6', 'item7',],
        datasets: [
            {
                label: '',
                data: [25, 30, 20, 35, 30, 30, 20],
                fill: false,
                backgroundColor: ['rgb(51,153,255)'],
                tension: 0.1,
                barThickness: 10,

            }

        ],
    }
    const data2 = {
        labels: ['Label1', 'Label2', 'Label3', 'Label4', 'Label5'],
        datasets: [
            {
                label: 'item1',
                data: [20, 40, 90, 40, 80],
                fill: false,
                backgroundColor: 'rgb(245,85,141)',
                tension: 0.1,
                barThickness: 10,

            }


        ],
    }
    const data3 = {
        labels: ['item1', 'item2', 'item3'],
        datasets: [
            {
                label: '',
                data: [25, 35, 40, 30],
                fill: false,
                backgroundColor: ['rgb(51,153,200)', 'rgb(139,150,255)', 'rgb(240,85,141)'],
                tension: 0.1,
                barThickness: 10,

            }

        ],
    }
    return (
        <div>
            <div className=' px-2 container-fluid mx-auto ' >
              
                <WishesCom />
                <div className="chart-section p-2 bg-inf mt-4" >

                    <div class="row justify-between m-0">
                        <div className="col col-sm-6">
                            <MyAttendance />
                        </div>
                        <div className='col-sm-6' >
                            <LeaveApprovalBox />
                        </div>
                        <div className="col col-sm-5 ">
                            <h6 className='mt-2  heading' style={{ color: 'rgb(76,53,117)' }}>Statistis</h6>

                            <div class=" border rounded p-4 mt-3 bg-white" >

                                <div className='d-flex justify-content-between mt-0'>



                                    <div>

                                        <h5>Performance</h5>

                                    </div>
                                    <div style={{ height: '100px', position: 'relative', bottom: '30px' }}>

                                        <Line data={data1}></Line>


                                    </div>
                                </div>
                                <div className='d-flex justify-content-between mt-2'>



                                    <div>

                                        <h5>Success</h5>

                                    </div>
                                    <div style={{ height: '100px', position: 'relative', bottom: '30px' }}>

                                        <Line data={data1}></Line>


                                    </div>
                                </div>
                                <div className='d-flex justify-content-between mt-2'>



                                    <div>

                                        <h5>Innovations</h5>

                                    </div>
                                    <div style={{ height: '100px', position: 'relative', bottom: '30px' }}>

                                        <Line data={data1}></Line>


                                    </div>
                                </div>
                            </div>



                        </div>



                    </div>
                    <div class="row m-0">
                        <div className="col col-sm-7">
                            <h6 className='mt-2 heading' style={{ color: 'rgb(76,53,117)' }}>My Team</h6>
                            <table class="table mt-3 border">
                                <thead>
                                    <tr>
                                        <th scope="col">Profiles</th>
                                        <th scope="col">Contact</th>
                                        <th scope="col">Email Id</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row ">
                                            <div className='d-flex  '>


                                                <div>
                                                    <img class="pt-1 ms-2" src={require('../assets/Icon/profile.png')} width={40} alt="" />
                                                </div>
                                                <div class="ms-4">
                                                    <h6>Name</h6>
                                                    <small>React Devloper</small>
                                                </div>
                                            </div>
                                        </th>
                                        <td>+91 2314313241</td>
                                        <td>abc@gmail.com</td>

                                    </tr>
                                    <tr>
                                        <th scope="row ">
                                            <div className='d-flex  '>


                                                <div>
                                                    <img class="pt-1 ms-2" src={require('../assets/Icon/profile.png')} width={40} alt="" />
                                                </div>
                                                <div class="ms-4">
                                                    <h6>Name</h6>
                                                    <small>React Devloper</small>
                                                </div>
                                            </div>
                                        </th>
                                        <td>+91 2314313241</td>
                                        <td>abc@gmail.com</td>

                                    </tr>
                                    <tr>
                                        <th scope="row ">
                                            <div className='d-flex  '>


                                                <div>
                                                    <img class="pt-1 ms-2" src={require('../assets/Icon/profile.png')} width={40} alt="" />
                                                </div>
                                                <div class="ms-4">
                                                    <h6>Name</h6>
                                                    <small>React Devloper</small>
                                                </div>
                                            </div>
                                        </th>
                                        <td>+91 2314313241</td>
                                        <td>abc@gmail.com</td>

                                    </tr>

                                </tbody>
                            </table>

                        </div>
                        <div className="col col-sm-5">
                            <h6 className='mt-4 heading' style={{ color: 'rgb(76,53,117)' }}>Working History</h6>

                            <table class="table caption-top mt-4 border rounded">

                                <thead>
                                    <tr>
                                        <th scope="col">Date</th>
                                        <th scope="col">Arrival</th>
                                        <th scope="col">Deperture</th>
                                        <th scope="col">Effecure Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1/4/24</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">1/4/24</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">1/4/24</th>
                                        <td>Mark</td>
                                        <td>Otto</td>
                                        <td>@mdo</td>
                                    </tr>
                                </tbody>
                            </table>



                        </div>



                    </div>



                </div>

            </div>



        </div>
    )
}

export default Empdashpage