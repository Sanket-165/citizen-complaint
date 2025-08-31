import React, { useState, useEffect, useCallback } from 'react';
import api from '../api/api';
import ComplaintForm from './ComplaintForm.jsx';

const CitizenDashboard = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchComplaints = useCallback(async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/complaints/mycomplaints');
            setComplaints(data);
        } catch (err) {
            setError('Failed to fetch your reported issues.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchComplaints();
    }, [fetchComplaints]);

    return (
        <div>
            <h1>My Dashboard</h1>
            <ComplaintForm onComplaintSubmitted={fetchComplaints} />
            
            <div className="complaint-list">
                <h2>My Reported Issues</h2>
                {loading && <p>Loading issues...</p>}
                {error && <p className="error-message">{error}</p>}
                <div className="complaint-table-header">
                    <span>Title</span>
                    <span>Priority</span>
                    <span>Status</span>
                    <span>Date Reported</span>
                </div>
                {complaints.length > 0 ? (
                    complaints.map(c => (
                        <div key={c._id} className="complaint-item">
                            <div>
                                <strong>{c.title}</strong>
                                <p>{c.description.substring(0, 100)}...</p>
                            </div>
                            <span className={`priority-${c.priority}`}>{c.priority}</span>
                            <span className={`status-badge status-${c.status.replace(/\s+/g, '-')}`}>{c.status}</span>
                            <span>{new Date(c.createdAt).toLocaleDateString()}</span>
                        </div>
                    ))
                ) : (
                    !loading && <p style={{padding: '1rem', textAlign: 'center'}}>You have not reported any issues yet.</p>
                )}
            </div>
        </div>
    );
};

export default CitizenDashboard;