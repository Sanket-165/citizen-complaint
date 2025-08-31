import React, { useState, useEffect, useCallback } from 'react';
import api from '../api/api';
import MapView from './MapView.jsx';
import ComplaintList from './ComplaintList.jsx';

const AdminDashboard = () => {
    const [complaints, setComplaints] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchComplaints = useCallback(async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/complaints');
            setComplaints(data);
        } catch (err) {
            setError('Failed to fetch complaints from the server.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchComplaints();
    }, [fetchComplaints]);
    
    const handleStatusUpdate = async (id, status) => {
        try {
            const { data } = await api.put(`/complaints/${id}/status`, { status });
            setComplaints(complaints.map(c => c._id === id ? data : c));
        } catch (err) {
            alert('Failed to update status. Please try again.');
        }
    };

    if(loading) return <p>Loading dashboard data...</p>
    if(error) return <p className="error-message">{error}</p>

    return (
        <div>
            <h1>Admin Dashboard</h1>
            <h2 style={{marginTop: '2rem'}}>📍 Reported Issues Map</h2>
            <MapView complaints={complaints} />
            <ComplaintList complaints={complaints} onStatusUpdate={handleStatusUpdate} />
        </div>
    );
};

export default AdminDashboard;