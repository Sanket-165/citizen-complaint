// frontend/src/components/ComplaintForm.jsx

import React, { useState, useEffect, useCallback } from 'react';
import api from '../api/api';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

// Map styles and options
const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '8px',
  marginBottom: '1rem',
};

const ComplaintForm = ({ onComplaintSubmitted }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [voiceNote, setVoiceNote] = useState(null);
    
    // ✨ NEW MAP-RELATED STATE
    const [mapCenter, setMapCenter] = useState({ lat: 18.5204, lng: 73.8567 }); // Default to Pune
    const [markerPosition, setMarkerPosition] = useState(null);

    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // Load Google Maps script
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    });

    // Get user's current location to center the map initially
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const currentLocation = { lat: latitude, lng: longitude };
                setMapCenter(currentLocation);
                setMarkerPosition(currentLocation); // Place initial marker at user's location
            },
            () => {
                console.warn('Location access denied. Defaulting to city center.');
                // If denied, marker is null and user must place it
            }
        );
    }, []);

    // ✨ NEW: Handler for updating marker position by dragging
    const onMarkerDragEnd = useCallback((e) => {
        setMarkerPosition({
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!markerPosition) {
            setError('Please place a pin on the map to mark the location of the issue.');
            return;
        }
        if (!image) {
            setError('An image of the issue is required.');
            return;
        }

        setLoading(true);
        setError('');

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('latitude', markerPosition.lat); // Use marker's position
        formData.append('longitude', markerPosition.lng); // Use marker's position
        formData.append('image', image);
        if (voiceNote) {
            formData.append('voiceNote', voiceNote);
        }

        try {
            await api.post('/complaints', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            onComplaintSubmitted();
            // Reset form fields...
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to submit complaint.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{maxWidth: '800px'}}>
            <h2>Report a New Issue</h2>
            {error && <p className="error-message">{error}</p>}
            
            <div className="form-group">
                <label>Step 1: Pinpoint the Location</label>
                <p>Click and drag the marker to the exact location of the issue.</p>
                {isLoaded ? (
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        center={mapCenter}
                        zoom={15}
                    >
                        {markerPosition && (
                            <MarkerF
                                position={markerPosition}
                                draggable={true}
                                onDragEnd={onMarkerDragEnd}
                            />
                        )}
                    </GoogleMap>
                ) : (
                    <p>Loading Map...</p>
                )}
            </div>

            <div className="form-group">
                <label>Step 2: Describe the Issue</label>
                <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., Large Pothole on FC Road" required />
            </div>
            <div className="form-group">
            <label>Step 3: Details of the Issue</label>
                <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="e.g., A deep pothole near the bus stop is causing traffic issues..." required />
            </div>
            <div className="form-group">
                <label>Step 4: Upload Evidence</label>
                <p>An image is required*. </p>
                <input id="image-input" type="file" onChange={(e) => setImage(e.target.files[0])} accept="image/*" required />
                <p>A voice note (optional).</p>
                <input id="voice-input" type="file" onChange={(e) => setVoiceNote(e.target.files[0])} accept="audio/*,video/mp4" style={{marginTop: '10px'}} />
            </div>
            
            <button type="submit" disabled={loading || !markerPosition}>
                {loading ? 'Submitting...' : 'Submit Report'}
            </button>
        </form>
    );
};

export default ComplaintForm;