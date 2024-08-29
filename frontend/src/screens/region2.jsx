import React, { useRef, useEffect, useState } from 'react';
import * as maptilersdk from '@maptiler/sdk';
import "@maptiler/sdk/dist/maptiler-sdk.css";
import './map.css';
import { useNavigate } from 'react-router-dom';

import { MapContainer, TileLayer, Marker, Popup, Icon } from 'react-leaflet';
import L from 'leaflet'; 
import 'leaflet/dist/leaflet.css'; 
import markerIcon1 from '../images/pin.png'; 
import markerIcon2 from '../images/green-pin.png'
import markerIcon3 from '../images/yellow-pin.png'
import Navbar from '../components/Navbar';
import Footer from '../components/footer';
import AOS from "aos";
import "aos/dist/aos.css";


/*const customMarkerIcon1 = new L.Icon({
  iconUrl: markerIcon1,
  iconSize: [20, 20], 
  iconAnchor: [20, 40], 
});
const customMarkerIcon2 = new L.Icon({
  iconUrl: markerIcon2,
  iconSize: [20, 20], 
  iconAnchor: [20, 40], 
});
const customMarkerIcon3 = new L.Icon({
  iconUrl: markerIcon3,
  iconSize: [20, 20], 
  iconAnchor: [20, 40], 
});*/
const Region2= () => {

  useEffect(() => {
    AOS.init();
  }, []);

  const val = 1.7;
  const maxi = 1.5;
  const mini = 0.5;
  /*const minor = [
    { lat: 16.509, lng:80.518 },
    { lat: 11.237, lng: 76.782 },
    { lat: 58.389, lng: 26.606 },
    { lat: 11.049, lng: 79.358},
    { lat: 11.049, lng: 79.358 },
    { lat: 11.966, lng: 75.983 },
    { lat: 12.610, lng: 76.730 },
    { lat: 11.966, lng: 75.983},
    { lat: 12.610, lng: 76.730 },
    { lat: 11.100, lng: 77.326 },
    { lat: 25.679, lng: 84.990 },
    { lat: 12.802, lng: 76.797},
  ];
  const moderate = [
    { lat: 12.311, lng: 78.559},
    { lat: 12.419, lng: 75.521 },
    { lat: 38.041, lng: -1.490 },
    { lat: 15.344, lng: 76.493},
    { lat: 21.729, lng: 82.475 },
    { lat: 20.953, lng: 82.628 }

  ];

  const major = [
    { lat: 12.014, lng: 76.415},
    { lat: 24.150, lng: 82.897},
    { lat: 12.817, lng: 76.072},

   
  ];*/
  const mapContainer = useRef(null);
  const map = useRef(null);
  const marker1 = useRef(null);
  const marker2 = useRef(null);
  const navigate = useNavigate();
  const new_york = { lng: -74.006870, lat: 40.699429 };
  const new_marker_position = { lng: -73.922874, lat: 40.802269};
  const zoom = 11;
  maptilersdk.config.apiKey = 'MvorommUwDmyvjgiemJI';

  useEffect(() => {
    if (map.current) return; // stops map from initializing more than once

    console.log('Initializing map...');

    map.current = new maptilersdk.Map({
      container: mapContainer.current,
      style: maptilersdk.MapStyle.STREETS,
      center: [(new_york.lng + new_marker_position.lng) / 2, (new_york.lat + new_marker_position.lat) / 2],
      zoom: zoom
    });

    // Ensure the map style is fully loaded before adding sources or layers
    map.current.on('style.load', () => {
      // Adding the first marker
    
      // Function to calculate points for an oval
      function getOvalCoordinates(center, semiMajorAxis, semiMinorAxis, numPoints = 36) {
        const coordinates = [];
        for (let i = 0; i < numPoints; i++) {
          const angle = (i / numPoints) * 2 * Math.PI;
          const x = center.lng + semiMajorAxis * Math.cos(angle);
          const y = center.lat + semiMinorAxis * Math.sin(angle);
          coordinates.push([x, y]);
        }
        coordinates.push(coordinates[0]); // Close the oval
        return coordinates;
      }

      // Calculate center and radius
      const center = { lng: (new_york.lng + new_marker_position.lng) / 2, lat: (new_york.lat + new_marker_position.lat) / 2 };
      const distance = Math.sqrt(Math.pow(new_marker_position.lng - new_york.lng, 2) + Math.pow(new_marker_position.lat - new_york.lat, 2));
      const semiMajorAxis = distance / 2; // half of the distance between points
      const semiMinorAxis = 0.03; // Example value for the semi-minor axis

      // Generate oval coordinates
      const ovalCoordinates = getOvalCoordinates(center, semiMajorAxis, semiMinorAxis);

      console.log('Oval coordinates:', ovalCoordinates);

      // Add the oval shape to the map
      if (map.current) {
        map.current.addSource('oval-source', {
          type: 'geojson',
          data: {
            type: 'Feature',
            geometry: {
              type: 'Polygon',
              coordinates: [ovalCoordinates]
            }
          }
        });
        let fillColor=1.3;
        if (val < mini) {
          fillColor = '#90EE90'; // light green
        } else if (val > mini && val < maxi) {
          fillColor = '#FFFF00'; // yellow
        } else {
          fillColor = '#ff0000'; // red
        }
        map.current.addLayer({
          id: 'oval-layer',
          type: 'fill',
          source: 'oval-source',
          paint: {
            'fill-color': fillColor,
            'fill-opacity': 0.5
          }
        });
      }
    });

  }, [new_york.lng, new_york.lat, zoom, new_marker_position.lng, new_marker_position.lat]);
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    navigate(`/${selectedValue}`);
  };
  return (

   
<div className='bg-blue-50	'>
    <Navbar/>
    
    <div className='flex justify-center items-center'style={{marginLeft:'70px'}} >
    <div className="card  flex bg-blue-100 shadow-xl shadow-blue-200" /*data-aos="flip-left"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2000"*/>
  <figure><img src={markerIcon1} className="h-8 w-10"alt="Movie" /></figure>
  <div className="card-body">
    <h2 className="card-title ">Major_Risk(Flood)</h2>
    
  
  </div>
  <figure><img src={markerIcon3} className="h-8 w-10" alt="Movie"/></figure>
  <div className="card-body">
    <h2 className="card-title">Moderate_Risk(Flood)</h2>
    
  
  </div>
  <figure><img src={markerIcon2} className="h-8 w-10" alt="Movie"/></figure>
  <div className="card-body">
    <h2 className="card-title">Minor_Risk(Flood)</h2>
    
  
  </div>
</div>

<div className="map-wrap">
      <div ref={mapContainer} className="map" style={{ height: '100vh', width: '45%' }} />
      <select
      onChange={handleChange}
        style={{ fontFamily:'cursive', fontWeight:"bolder",color:"darkblue",position: 'absolute', top: '130px', left: '150px', backgroundColor: 'white', padding: '5px', borderRadius:'10px' }}
      >
         <option value="Region2">New-york</option>
         <option value="Flood">Wisconsin</option>
        
       
      </select>

    </div>

    </div>

   

    <div className='mt-40'/* data-aos="fade-down"
     data-aos-duration="2000"*/>
      <Footer/>
    </div>
    </div>
   
    
  );
};

export default Region2;




