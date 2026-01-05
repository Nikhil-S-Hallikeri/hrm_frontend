import React from 'react';

const Loader = ({ height = '200px' }) => (
    <div className="flex justify-center items-center" style={{ height }}>
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
    </div>
);

const DetailsTable = ({ data }) => {
    if (!data || data.length === 0) {
        return <p className="text-center text-gray-500">No data found for this category.</p>;
    }

    return (
        <div className="overflow-x-auto text-center">
            <table className="min-w-full border border-gray-300 rounded-md text-sm">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 border">Type</th>
                        <th className="p-3 border">Name / Position</th>
                        <th className="p-3 border">Contact</th>
                        <th className="p-3 border">Status / Purpose</th>
                        <th className="p-3 border">Details</th>
                    </tr>
                </thead>

                <tbody>
                    {data.map(item => {
                        if (item.candidate_name) {
                            return (
                                <tr key={`interview-${item.id}`} className="hover:bg-gray-50">
                                    <td className="p-3 border">
                                        <span className="text-xs px-2 py-1 bg-blue-500 text-white rounded">Interview</span>
                                    </td>
                                    <td className="p-3 border">{item.candidate_name}</td>
                                    <td className="p-3 border">{item.candidate_phone}</td>
                                    <td className="p-3 border">{item.interview_status}</td>
                                    <td className="p-3 border">{item.candidate_designation}</td>
                                </tr>
                            );
                        }

                        if (item.client_name) {
                            return (
                                <tr key={`client-${item.id}`} className="hover:bg-gray-50">
                                    <td className="p-3 border">
                                        <span className="text-xs px-2 py-1 bg-green-500 text-white rounded">Client Call</span>
                                    </td>
                                    <td className="p-3 border">{item.client_name}</td>
                                    <td className="p-3 border">{item.client_phone}</td>
                                    <td className="p-3 border">{item.client_enquire_purpose}</td>
                                    <td className="p-3 border">{item.client_status}</td>
                                </tr>
                            );
                        }

                        if (item.position) {
                            return (
                                <tr key={`job-${item.id}`} className="hover:bg-gray-50">
                                    <td className="p-3 border">
                                        <span className="text-xs px-2 py-1 bg-cyan-500 text-white rounded">Job Post</span>
                                    </td>
                                    <td className="p-3 border">{item.position}</td>
                                    <td className="p-3 border">
                                        <a
                                            href={item.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 underline"
                                        >
                                            View Post
                                        </a>
                                    </td>
                                    <td className="p-3 border">N/A</td>
                                    <td className="p-3 border">{item.job_post_remarks}</td>
                                </tr>
                            );
                        }

                        return null;
                    })}
                </tbody>
            </table>
        </div>
    );
};

const DetailsModal = ({ show, onHide, title, data, isLoading }) => {
    if (!show) return null;

    const closeOnOutsideClick = (e) => {
        if (e.target.id === 'modalBackdrop') {
            onHide();
        }
    };

    return (
        <div
            id="modalBackdrop"
            onClick={closeOnOutsideClick}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-md p-4 "
        >
            <div
                className="bg-white w-full max-w-6xl rounded-lg shadow-xl max-h-[80vh] overflow-hidden "
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold">{title}</h2>
                    <button
                        onClick={onHide}
                        className="text-gray-600 hover:text-black text-2xl"
                    >
                        &times;
                    </button>
                </div>

                <div className="p-4 overflow-y-auto max-h-[60vh]">
                    {isLoading ? <Loader height="300px" /> : <DetailsTable data={data} />}
                </div>

                <div className="p-4 border-t text-right">
                    {/* <button
                        onClick={onHide}
                        className="px-4 bg-gray-600 text-white rounded hover:bg-gray-700"
                    >
                        Close
                    </button> */}
                </div>
            </div>
        </div>
    );
};

export default DetailsModal;
