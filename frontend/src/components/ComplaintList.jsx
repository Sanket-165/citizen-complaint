import React from 'react';

const ComplaintList = ({ complaints, onStatusUpdate }) => {
  return (
    <div className="complaint-list">
        <h2>All Reported Issues</h2>
        <div className="complaint-table-header" style={{ gridTemplateColumns: '2fr 1fr 1fr 2fr 1fr' }}>
            <span>Title / Description</span>
            <span>Priority</span>
            <span>Reported By</span>
            <span>Status</span>
            <span>Date</span>
        </div>
        {complaints.length > 0 ? (
            complaints.map(c => (
                <div key={c._id} className="complaint-item" style={{ gridTemplateColumns: '2fr 1fr 1fr 2fr 1fr' }}>
                    <div>
                        <strong>{c.title}</strong>
                        <p>{c.description.substring(0, 100)}...</p>
                        <a href={c.imageUrl} target="_blank" rel="noopener noreferrer">View Image</a>
                        {c.voiceNoteUrl && <a href={c.voiceNoteUrl} target="_blank" rel="noopener noreferrer" style={{marginLeft: '10px'}}>Play Voice</a>}
                    </div>
                    <span className={`priority-${c.priority}`}>{c.priority}</span>
                    <span>{c.reportedBy?.name || 'N/A'}</span>
                    <div className="form-group" style={{marginBottom: 0}}>
                       <select value={c.status} onChange={(e) => onStatusUpdate(c._id, e.target.value)}>
                            <option value="pending">Pending</option>
                            <option value="under consideration">Under Consideration</option>
                            <option value="resolved">Resolved</option>
                       </select>
                    </div>
                    <span>{new Date(c.createdAt).toLocaleDateString()}</span>
                </div>
            ))
        ) : (
            <p style={{padding: '1rem', textAlign: 'center'}}>No issues have been reported yet.</p>
        )}
    </div>
  );
};

export default ComplaintList;