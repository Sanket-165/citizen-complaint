import React from 'react';
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '500px',
  marginBottom: '2rem',
  borderRadius: '8px'
};

const center = {
  lat: 18.5204, // Pune Center
  lng: 73.8567,
};

const MapView = ({ complaints }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY, // Vite way
  });

  const getMarkerIcon = (priority) => {
    if(!window.google) return null; // Guard against maps API not loaded yet
    const color = priority === 'High' ? 'red' : priority === 'Medium' ? 'orange' : 'green';
    return {
        path: window.google.maps.SymbolPath.CIRCLE,
        fillColor: color,
        fillOpacity: 0.9,
        strokeColor: 'white',
        strokeWeight: 1,
        scale: 9,
    };
  }

  return isLoaded ? (
    <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={12}>
      {complaints.map((complaint) => (
        <MarkerF
          key={complaint._id}
          position={{
            lat: complaint.location.coordinates[1], // Latitude
            lng: complaint.location.coordinates[0], // Longitude
          }}
          title={`${complaint.title} (Priority: ${complaint.priority})`}
          icon={getMarkerIcon(complaint.priority)}
        />
      ))}
    </GoogleMap>
  ) : <p>Loading map...</p>;
};

export default React.memo(MapView);