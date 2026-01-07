import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { port } from '../../App';
// import { useNavigate } from 'react-router-dom';
import MetricCard from '../../Components/ActivityComponents/MetricCard';
import DetailsModal from '../../Components/ActivityComponents/DetailsModal';
import DashboardFilter from '../../Components/ActivityComponents/DashboardFilter';

const Loader = ({ height = '200px' }) => (
    <div className="flex justify-center items-center" style={{ height }}>
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
    </div>
);

const ActivityDashboard = ({ targetEmpId }) => {
    const empid = JSON.parse(sessionStorage.getItem('user'))?.EmployeeId;

    // const navigate = useNavigate();
    const [dashboardData, setDashboardData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [filterType, setFilterType] = useState('this_month');
    const [customStartDate, setCustomStartDate] = useState('');
    const [customEndDate, setCustomEndDate] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalTitle, setModalTitle] = useState('');
    const [modalData, setModalData] = useState([]);
    const [isModalLoading, setIsModalLoading] = useState(false);

    const fetchDashboardData = () => {
        if (!empid) return;
        setIsLoading(true);
        const params = new URLSearchParams({ login_emp_id: empid, filter_type: filterType });
        if (targetEmpId) {
            params.append('target_emp_id', targetEmpId);
        }
        if (filterType === 'custom' && customStartDate && customEndDate) {
            params.append('start_date', customStartDate);
            params.append('end_date', customEndDate);
        }
        axios.get(`${port}/root/activity-dashboard-analytics?${params.toString()}`)
            .then(response => setDashboardData(response.data))
            .catch(error => console.error("Error fetching dashboard data:", error))
            .finally(() => setIsLoading(false));
    };

    useEffect(() => {
        if (filterType === 'custom' && (!customStartDate || !customEndDate)) return;
        fetchDashboardData();
    }, [filterType, customStartDate, customEndDate, targetEmpId]);


    // const handleRedirect = (aid) => {
    //     const date = new Date();
    //     let month = date.getMonth(); // 0-11
    //     let year = date.getFullYear();

    //     if (filterType === 'prev_month') {
    //         month -= 1;
    //         if (month < 0) {
    //             month = 11;
    //             year -= 1;
    //         }
    //     }

    //     const employeeIdToUse = targetEmpId || empid;
    //     navigate(`/activity/particularActivity/${employeeIdToUse}?aid=${aid}&month=${month}&year=${year}`);
    // };

    const handleCardClick = (metricType, title) => {
        // if (metricType === 'interview_calls') {
        //     handleRedirect(1);
        //     return;
        // }
        // if (metricType === 'client_calls') {
        //     handleRedirect(3);
        //     return;
        // }
        // if (metricType === 'job_posts') {
        //     handleRedirect(2);
        //     return;
        // }
        
        setModalTitle(title);
        setIsModalOpen(true);
        setIsModalLoading(true);
        const params = new URLSearchParams({ login_emp_id: empid, filter_type: filterType, metric_type: metricType });
        if (targetEmpId) {
            params.append('target_emp_id', targetEmpId);
        }
        if (filterType === 'custom' && customStartDate && customEndDate) {
            params.append('start_date', customStartDate);
            params.append('end_date', customEndDate);
        }
        axios.get(`${port}/root/activity-dashboard-details?${params.toString()}`)
            .then(response => setModalData(response.data))
            .catch(error => { console.error(`Error fetching details for ${metricType}:`, error); setModalData([]); })
            .finally(() => setIsModalLoading(false));
    };

    return (
        <div className="container-fluid p-4">
            <DashboardFilter
                filterType={filterType}
                setFilterType={setFilterType}
                customStartDate={customStartDate}
                setCustomStartDate={setCustomStartDate}
                customEndDate={customEndDate}
                setCustomEndDate={setCustomEndDate}
            />

            {isLoading ? (
                <Loader />
            ) : (
                dashboardData && (
                    <div className="row">
                        <MetricCard title="Total Activities" value={dashboardData.metrics?.total_activities_count || 0} icon="fa-tasks" metricType="total_activities" onClick={handleCardClick} />
                        <MetricCard title="Successful Outcomes" value={dashboardData.metrics?.successful_outcomes_count || 0} icon="fa-check-circle" metricType="successful_outcomes" onClick={handleCardClick} />
                        <MetricCard title="Follow Ups" value={dashboardData.metrics?.follow_ups_count || 0} icon="fa-history" metricType="follow_ups" onClick={handleCardClick} />
                        <MetricCard title="Rejected / Closed" value={dashboardData.metrics?.rejected_closed_count || 0} icon="fa-times-circle" metricType="rejected_closed" onClick={handleCardClick} />
                        <MetricCard title="Interview Calls" value={dashboardData.metrics?.interview_calls_count || 0} icon="fa-phone-alt" metricType="interview_calls" onClick={handleCardClick} />
                        <MetricCard title="Client Calls" value={dashboardData.metrics?.client_calls_count || 0} icon="fa-headset" metricType="client_calls" onClick={handleCardClick} />
                        <MetricCard title="Job Posts" value={dashboardData.metrics?.job_posts_count || 0} icon="fa-bullhorn" metricType="job_posts" onClick={handleCardClick} />
                    </div>
                )
            )}

            <DetailsModal
                show={isModalOpen}
                onHide={() => setIsModalOpen(false)}
                title={modalTitle}
                data={modalData}
                isLoading={isModalLoading}
            />
        </div>
    );
};

export default ActivityDashboard;