import React, { useEffect, useState } from 'react';

const MapComponent = () => {
    // State to store flood risk data
    const [floodRiskData, setFloodRiskData] = useState([]);

    // Fetch flood risk data from backend
    useEffect(() => {
        fetchFloodRiskData();
    }, []);

    const fetchFloodRiskData = async () => {
        try {
            const response = await fetch('/api/flood-risk-data/');
            const data = await response.json();
            setFloodRiskData(data);
        } catch (error) {
            console.error('Error fetching flood risk data:', error);
        }
    };

    // Function to render images based on flood risk level
    const renderImages = () => {
        return floodRiskData.map(region => {
            let imageUrl;
            switch (region.risk_level) {
                case 'Low':
                    imageUrl = '/images/green.png';
                    break;
                case 'Moderate':
                    imageUrl = '/images/yellow.png';
                    break;
                case 'High':
                    imageUrl = '/images/red.png';
                    break;
                default:
                    imageUrl = '';
            }
            return <img key={region.name} src={imageUrl} alt={region.name} />;
        });
    };

    return (
        <div>
            {/* Map component code goes here */}
            {/* Overlay PNG images based on flood risk data */}
            {renderImages()}
        </div>
    );
};

export default MapComponent;
