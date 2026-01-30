import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { port } from '../../App';
import { toast } from 'react-toastify';
import DashboardFilter from '../../Components/ActivityComponents/DashboardFilter';
import BackButton from '../../Components/MiniComponent/BackButton';

const Loader = ({ height = '200px' }) => (
    <div className="flex justify-center items-center w-full" style={{ height }}>
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
    </div>
);

const ActivityMetricDetailsPage = () => {
    const { metricType } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const empid = JSON.parse(sessionStorage.getItem('user'))?.EmployeeId;

    // Initialize states from URL search parameters
    const [filterType, setFilterType] = useState(searchParams.get('filter_type') || 'this_month');
    const [customStartDate, setCustomStartDate] = useState(searchParams.get('start_date') || '');
    const [customEndDate, setCustomEndDate] = useState(searchParams.get('end_date') || '');
    const [targetEmpId, setTargetEmpId] = useState(searchParams.get('target_emp_id') || '');
    const [search, setSearch] = useState(searchParams.get('search') || '');

    const [data, setData] = useState([]);
    const [pagination, setPagination] = useState({
        count: 0,
        next: null,
        previous: null,
        currentPage: parseInt(searchParams.get('page')) || 1
    });
    const [isLoading, setIsLoading] = useState(true);
    const [debouncedSearch, setDebouncedSearch] = useState(search);

    // Action Modal States
    const [showActionForm, setShowActionForm] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [actionType, setActionType] = useState(''); // 'followup', 'reject', 'close', 'call_again', 'complete'
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Action Form Fields
    const [expectedDate, setExpectedDate] = useState('');
    const [expectedTime, setExpectedTime] = useState('');
    const [notes, setNotes] = useState('');
    const [rejectionType, setRejectionType] = useState('emp_rejected');

    const getTitle = () => {
        const titles = {
            'total-activities': 'Total Activities',
            'successful-outcomes': 'Successful Outcomes',
            'rejected': 'Rejected Leads',
            'closed': 'Closed Leads',
            'pending-followups': 'Pending Follow Ups',
            'completed-followups': 'Follow Ups Done',
            'interview-calls': 'Interview Calls',
            'client-calls': 'Client Calls',
            'job-posts': 'Job Posts'
        };
        return titles[metricType] || 'Activity Details';
    };

    const getEndpoint = () => {
        // Ensure port doesn't have trailing slash when concatenating with /root
        const basePort = port.endsWith('/') ? port.slice(0, -1) : port;
        return `${basePort}/root/activity/${metricType}`;
    };

    // URL Synchronization effect
    useEffect(() => {
        const params = new URLSearchParams();
        if (filterType !== 'this_month') params.set('filter_type', filterType);
        if (filterType === 'custom') {
            if (customStartDate) params.set('start_date', customStartDate);
            if (customEndDate) params.set('end_date', customEndDate);
        }
        if (targetEmpId) params.set('target_emp_id', targetEmpId);
        if (debouncedSearch) params.set('search', debouncedSearch);
        if (pagination.currentPage > 1) params.set('page', pagination.currentPage);

        setSearchParams(params, { replace: true });
    }, [filterType, customStartDate, customEndDate, targetEmpId, debouncedSearch, pagination.currentPage, setSearchParams]);

    // Debounce search effect
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
            setPagination(prev => ({ ...prev, currentPage: 1 })); // Reset to page 1 on search change
        }, 500);

        return () => clearTimeout(timer);
    }, [search]);

    const fetchData = useCallback(async (page = 1) => {
        if (!empid) return;
        setIsLoading(true);

        try {
            const params = new URLSearchParams({
                login_emp_id: empid,
                filter_type: filterType,
                page: page,
                search: debouncedSearch
            });

            if (targetEmpId) params.append('target_emp_id', targetEmpId);
            if (filterType === 'custom' && customStartDate && customEndDate) {
                params.append('start_date', customStartDate);
                params.append('end_date', customEndDate);
            }

            const response = await axios.get(`${getEndpoint()}?${params.toString()}`);

            // Handle different response structures for Follow-ups vs others
            if (metricType === 'pending-followups') {
                setData(response.data.pending_followups || []);
            } else if (metricType === 'completed-followups') {
                setData(response.data.completed_followups || []);
            } else {
                setData(response.data.results || response.data);
            }

            setPagination({
                count: response.data.count || 0,
                next: response.data.next,
                previous: response.data.previous,
                currentPage: page
            });
        } catch (error) {
            console.error("Error fetching metric details:", error);
            toast.error("Failed to load data");
        } finally {
            setIsLoading(false);
        }
    }, [empid, metricType, filterType, debouncedSearch, customStartDate, customEndDate, targetEmpId]);

    useEffect(() => {
        fetchData(1);
    }, [fetchData]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handlePageChange = (newPage) => {
        if (newPage >= 1) {
            fetchData(newPage);
            window.scrollTo(0, 0);
        }
    };

    // Action Handlers
    const openActionForm = (item, type) => {
        setSelectedItem(item);
        setActionType(type);
        setShowActionForm(true);
        // Reset fields
        setExpectedDate('');
        setExpectedTime('');
        setNotes('');
        setRejectionType('emp_rejected');
    };

    const handleSubmitAction = async () => {
        const isFollowUpAction = metricType.includes('followup');
        const id = isFollowUpAction ? selectedItem.id : selectedItem.id;

        setIsSubmitting(true);
        try {
            if (actionType === 'followup') {
                await axios.post(`${port}/root/activity/convert-to-followup`, {
                    activity_record_id: selectedItem.id,
                    expected_date: expectedDate,
                    expected_time: expectedTime,
                    notes: notes,
                    login_emp_id: empid
                });
                toast.success('Converted to follow-up!');
            } else if (['complete', 'call_again', 'reject', 'close'].includes(actionType)) {
                // If it's a direct action from a non-followup list, we might need the two-step process
                // But if the list is already followups, we hit the action endpoint directly

                let endpoint;
                let method = 'patch';
                let payload = { action: actionType === 'reject' ? 'rejected' : actionType === 'close' ? 'closed' : actionType };

                if (!isFollowUpAction && (actionType === 'reject' || actionType === 'close')) {
                    // Two-step for direct reject/close from main list
                    const followUpResponse = await axios.post(`${port}/root/activity/convert-to-followup`, {
                        activity_record_id: selectedItem.id,
                        expected_date: new Date().toISOString().split('T')[0],
                        expected_time: new Date().toTimeString().split(' ')[0].substring(0, 5),
                        notes: notes,
                        login_emp_id: empid
                    });
                    endpoint = `${port}/root/activity/followup/${followUpResponse.data.follow_up.id}/action`;
                    payload.reason = notes;
                    payload.rejection_type = rejectionType;
                } else {
                    endpoint = `${port}/root/activity/followup/${selectedItem.id}/action`;
                    if (actionType === 'call_again') {
                        payload.expected_date = expectedDate;
                        payload.expected_time = expectedTime;
                        payload.notes = notes;
                    } else {
                        payload.reason = notes;
                        payload.rejection_type = rejectionType;
                    }
                }

                await axios({ method, url: endpoint, data: payload });
                toast.success(`Action ${actionType} successful!`);
            }

            setShowActionForm(false);
            fetchData(pagination.currentPage);
        } catch (error) {
            console.error("Action error:", error);
            toast.error(error.response?.data?.error || "Action failed");
        } finally {
            setIsSubmitting(false);
        }
    };

    const formatTimeTo12Hour = (time24) => {
        if (!time24) return '-';
        const [hours, minutes] = time24.split(':');
        const hour = parseInt(hours, 10);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${ampm}`;
    };

    return (
        <div className="container-fluid p-3 p-md-4 poppins">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-sm-center gap-3 mb-4">
                <BackButton />
                <h2 className="text-xl md:text-2xl font-bold text-gray-800 m-0 text-center flex-grow-1">{getTitle()}</h2>
                <div className="hidden sm:block w-24"></div> {/* Spacer for symmetry on desktop */}
            </div>

            <div className="bg-white rounded-lg shadow-md p-3 p-md-4 mb-4">
                <div className="d-flex flex-column flex-lg-row align-items-lg-center justify-content-between gap-4">
                    <div className="d-flex flex-column flex-sm-row align-items-sm-center gap-3 flex-grow-1">
                        <h4 className="fw-bold mb-0 whitespace-nowrap text-lg">Activity Dashboard</h4>
                        <div className="d-flex flex-wrap align-items-center gap-2">
                            <select
                                className="form-select w-auto"
                                value={filterType}
                                onChange={(e) => setFilterType(e.target.value)}
                            >
                                <option value="today">Today</option>
                                <option value="this_month">This Month</option>
                                <option value="prev_month">Previous Month</option>
                                <option value="custom">Custom Date Range</option>
                            </select>
                            {filterType === 'custom' && (
                                <div className="d-flex gap-2 w-100 w-sm-auto mt-2 mt-sm-0">
                                    <input
                                        type="date"
                                        className="form-control form-control-sm"
                                        value={customStartDate}
                                        onChange={(e) => setCustomStartDate(e.target.value)}
                                    />
                                    <input
                                        type="date"
                                        className="form-control form-control-sm"
                                        value={customEndDate}
                                        onChange={(e) => setCustomEndDate(e.target.value)}
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="w-100 lg:w-auto ms-lg-auto" style={{ maxWidth: '400px' }}>
                        <div className="input-group">
                            <span className="input-group-text bg-white border-end-0">
                                <i className="fas fa-search text-gray-400"></i>
                            </span>
                            <input
                                type="text"
                                className="form-control border-start-0 ps-0 focus:ring-0 focus:border-0"
                                placeholder="Search by name or phone..."
                                value={search}
                                onChange={handleSearchChange}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row tablebg table-responsive h-[60vh] overflow-y-scroll rounded-xl my-3 mt-3 p-0 mx-0 shadow-md bg-white">
                {isLoading ? (
                    <Loader height="400px" />
                ) : (
                    <>
                        <div className="w-full p-0">
                            <table className="table table-hover mb-0 text-center align-middle w-full p-0">
                                <thead className="table-light sticky top-0 z-10">
                                    <tr>
                                        <th>Type</th>
                                        <th>Name / Position</th>
                                        <th>Contact</th>
                                        {metricType.includes('followup') ? (
                                            <>
                                                <th>Expected Date</th>
                                                <th>Time</th>
                                            </>
                                        ) : (
                                            <>
                                                <th>Status / Purpose</th>
                                                <th>Details</th>
                                            </>
                                        )}
                                        <th>Notes</th>
                                        <th>Lead Status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {data.length === 0 ? (
                                        <tr>
                                            <td colSpan="8" className="p-5 text-gray-500">No records found.</td>
                                        </tr>
                                    ) : (
                                        data.map(item => (
                                            <tr key={item.id}>
                                                <td>
                                                    <span className={`badge ${(item.candidate_name || item.follow_up_type === 'interview') ? 'bg-primary' :
                                                        (item.client_name || item.follow_up_type === 'client') ? 'bg-success' : 'bg-info'
                                                        }`}>
                                                        {item.candidate_name || item.follow_up_type === 'interview' ? 'Interview' :
                                                            item.client_name || item.follow_up_type === 'client' ? 'Client' : 'Job Post'}
                                                    </span>
                                                </td>
                                                <td>{item.candidate_name || item.client_name || item.candidate_or_client_name || item.position}</td>
                                                <td>{item.candidate_phone || item.client_phone || item.candidate_or_client_phone || '-'}</td>

                                                {metricType.includes('followup') ? (
                                                    <>
                                                        <td>{item.expected_date}</td>
                                                        <td>{formatTimeTo12Hour(item.expected_time)}</td>
                                                    </>
                                                ) : (
                                                    <>
                                                        <td>{item.interview_status || item.client_enquire_purpose || '-'}</td>
                                                        <td>{item.candidate_designation || item.client_status || item.job_post_remarks || '-'}</td>
                                                    </>
                                                )}

                                                <td>{item.closure_reason || item.notes || '-'}</td>
                                                <td>
                                                    {(() => {
                                                        const status = item.lead_status || item.activity_lead_status;
                                                        if (status === 'follow_up') return <span className="badge bg-purple-500 text-white">Follow-Up</span>;
                                                        if (status === 'rejected') return <span className="badge bg-red-500 text-white">Rejected</span>;
                                                        if (status === 'closed') return <span className="badge bg-gray-500 text-white">Closed</span>;
                                                        return <span className="badge bg-green-500 text-white">Active</span>;
                                                    })()}
                                                </td>
                                                <td>
                                                    {metricType === 'completed-followups' ? (
                                                        <span className="text-muted text-sm">Completed</span>
                                                    ) : (item.lead_status || item.activity_lead_status) && (item.lead_status || item.activity_lead_status) !== 'active' ? (
                                                        <span className="text-muted text-sm capitalize">{item.lead_status || item.activity_lead_status}</span>
                                                    ) : (
                                                        <select
                                                            className="form-select form-select-sm"
                                                            onChange={(e) => {
                                                                if (e.target.value) {
                                                                    openActionForm(item, e.target.value);
                                                                    e.target.value = '';
                                                                }
                                                            }}
                                                        >
                                                            <option value="">Action</option>
                                                            {metricType === 'pending-followups' ? (
                                                                <>
                                                                    <option value="complete">Done</option>
                                                                    <option value="call_again">Call Again</option>
                                                                </>
                                                            ) : (
                                                                <option value="followup">Follow Up</option>
                                                            )}
                                                            <option value="reject">Reject</option>
                                                            <option value="close">Close</option>
                                                        </select>
                                                    )}
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>

                        {/* Pagination Controls */}
                        {pagination.count > 10 && (
                            <div className="p-3 p-md-4 border-top d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
                                <p className="mb-0 text-muted text-sm text-center">
                                    Showing {Math.min(pagination.count, (pagination.currentPage - 1) * 10 + 1)} to {Math.min(pagination.count, pagination.currentPage * 10)} of {pagination.count} entries
                                </p>
                                <nav>
                                    <ul className="pagination pagination-sm mb-0">
                                        <li className={`page-item ${!pagination.previous ? 'disabled' : ''}`}>
                                            <button className="page-link" onClick={() => handlePageChange(pagination.currentPage - 1)}>
                                                <i className="fas fa-chevron-left"></i>
                                            </button>
                                        </li>
                                        <li className="page-item active">
                                            <span className="page-link">{pagination.currentPage}</span>
                                        </li>
                                        <li className={`page-item ${!pagination.next ? 'disabled' : ''}`}>
                                            <button className="page-link" onClick={() => handlePageChange(pagination.currentPage + 1)}>
                                                <i className="fas fa-chevron-right"></i>
                                            </button>
                                        </li>
                                    </ul>
                                </nav>
                            </div>
                        )}
                    </>
                )}
            </div>

            {/* Action Form Modal - Reused logic from DetailsModal */}
            {showActionForm && (
                <div className="fixed inset-0 z-[1050] flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-lg shadow-xl p-6 max-w-md w-full mx-4 border">
                        <h3 className="text-lg font-bold mb-4 border-bottom pb-2">
                            {actionType === 'followup' || actionType === 'call_again' ? 'Schedule Follow-Up' :
                                actionType === 'reject' ? 'Reject Lead' :
                                    actionType === 'close' ? 'Close Lead' : 'Confirm Action'}
                        </h3>

                        <div className="mb-4">
                            <p className="text-sm mb-1 uppercase text-gray-500 font-bold">Target</p>
                            <p className="font-medium">{selectedItem?.candidate_name || selectedItem?.client_name || selectedItem?.candidate_or_client_name}</p>
                        </div>

                        <div className="space-y-4">
                            {(actionType === 'followup' || actionType === 'call_again') && (
                                <>
                                    <div className="row">
                                        <div className="col-6">
                                            <label className="form-label font-bold text-sm">Date *</label>
                                            <input type="date" className="form-control" value={expectedDate} onChange={e => setExpectedDate(e.target.value)} />
                                        </div>
                                        <div className="col-6">
                                            <label className="form-label font-bold text-sm">Time *</label>
                                            <input type="time" className="form-control" value={expectedTime} onChange={e => setExpectedTime(e.target.value)} />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="form-label font-bold text-sm">Notes</label>
                                        <textarea className="form-control" rows="3" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Next steps..."></textarea>
                                    </div>
                                </>
                            )}

                            {actionType === 'reject' && (
                                <>
                                    <label className="form-label font-bold text-sm">Rejection Type *</label>
                                    <div className="d-flex gap-4 mb-3">
                                        <label className="flex items-center cursor-pointer">
                                            <input type="radio" value="emp_rejected" checked={rejectionType === 'emp_rejected'} onChange={e => setRejectionType(e.target.value)} className="mr-2" />
                                            Employee
                                        </label>
                                        <label className="flex items-center cursor-pointer">
                                            <input type="radio" value="candidate_rejected" checked={rejectionType === 'candidate_rejected'} onChange={e => setRejectionType(e.target.value)} className="mr-2" />
                                            Candidate
                                        </label>
                                    </div>
                                    <div>
                                        <label className="form-label font-bold text-sm">Reason *</label>
                                        <textarea className="form-control" rows="3" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Why rejected?"></textarea>
                                    </div>
                                </>
                            )}

                            {actionType === 'close' && (
                                <div>
                                    <label className="form-label font-bold text-sm">Closure Reason *</label>
                                    <textarea className="form-control" rows="3" value={notes} onChange={e => setNotes(e.target.value)} placeholder="Why closed?"></textarea>
                                </div>
                            )}

                            {actionType === 'complete' && (
                                <p>Are you sure you want to mark this follow-up as completed?</p>
                            )}
                        </div>

                        <div className="flex gap-3 mt-5">
                            <button
                                onClick={handleSubmitAction}
                                disabled={isSubmitting}
                                className="btn btn-primary flex-grow font-bold py-2"
                            >
                                {isSubmitting ? 'Wait...' : 'Confirm'}
                            </button>
                            <button
                                onClick={() => setShowActionForm(false)}
                                className="btn btn-light border flex-grow py-2"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ActivityMetricDetailsPage;
