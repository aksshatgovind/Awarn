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
  const [floodSeverity, setFloodSeverity] = useState(null);
  useEffect(() => {
    AOS.init();
  }, []);

  const val = 1.7;
  const maxi = 1.5;
  const mini = 0.5;
  
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
    const fetchFloodSeverity = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/Newyork');
       
        const data = await response.json();
        setFloodSeverity(data.Flood_Severity);
        
        localStorage.setItem('floodSeverity_region2', data.Flood_Severity);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchFloodSeverity(); // Initial fetch

    const intervalId = setInterval(fetchFloodSeverity, 60000); // Poll every 60 seconds

    return () => clearInterval(intervalId); // Clean up interval on component unmount
  }, []);
  useEffect(() => {
    const savedFloodSeverity = localStorage.getItem('floodSeverity_region2');
    if (savedFloodSeverity) {
      setFloodSeverity(savedFloodSeverity);
    }
  }, []);


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

        map.current.addLayer({
          id: 'oval-layer',
          type: 'fill',
          source: 'oval-source',
          paint: {

            'fill-color': '#FFFFFF', // Default color
            'fill-opacity': 0.5
          }
        });
      }

      
    }
  
  
  );


  return () => {
    if (map.current) {
      map.current.remove();
      map.current = null;
    }
  };

   

  }, [new_york.lng, new_york.lat, zoom, new_marker_position.lng, new_marker_position.lat]);


  useEffect(() => {
    if (!map.current) {
      console.log('Map not initialized yet.');
      return;
    }
  
    map.current.once('style.load', () => {
      console.log('Map style loaded and map is ready.');
  
      const updateLayer = () => {
        if (map.current.getLayer('oval-layer')) {
          let fillColor;
          if (floodSeverity === 'Low') {
            fillColor = '#90EE90';
          } else if (floodSeverity === 'Moderate') {
            fillColor = '#FFFF00';
          } else if (floodSeverity === 'High') {
            fillColor = '#ff0000';
          } else {
            fillColor = '#FFFFFF';
          }
  
          console.log('Updating layer with fill color:', fillColor);
  
          try {
            map.current.setPaintProperty('oval-layer', 'fill-color', fillColor);
          } catch (error) {
            console.error('Error setting paint property:', error);
          }
        } else {
          console.log('Layer "oval-layer" not found.');
        }
      };
  
      updateLayer();
    });
  }, [floodSeverity]);
  



  
  const handleChange = (event) => {
    const selectedValue = event.target.value;
    navigate(`/${selectedValue}`);
  };
  return (

   
<div className='bg-blue-50	'>
    <Navbar/>
    
     
    <div className='flex justify-center items-center'style={{marginLeft:'60px',width:'80%'}} >
        <div className="  flex bg-blue-100 shadow-xl shadow-blue-200" data-aos="flip-left"
         data-aos-easing="ease-out-cubic"
         data-aos-duration="2000" style={{marginTop:'430px'}} >
          <div className='inline-flex mt-6 mx-5'>
      <figure><img src={markerIcon1} className="h-8 w-10 mr-10"alt="Movie" /></figure>
      <div className="gap-x-7">
        <h2 className="card-title ">High-Severity</h2>
        </div>
      
      </div>
      <div className='inline-flex mt-6 mx-5'>
      <figure><img src={markerIcon3} className="h-8 w-21 mr-10" alt="Movie"/></figure>
      <div className="gap-x-7">
        <h2 className="card-title">Moderate-Severity</h2>
        </div>
      
      </div>
    
       <div className='inline-flex mt-6 mx-5 mb-8'>
      <figure><img src={markerIcon2} className="h-8 w-10 mr-10" alt="Movie"/></figure>
      <div className="gap-x-7">
        <h2 className="card-title">Low-Severity</h2>
        </div>
      
      </div>
    </div>

<div className="map-wrap">
      <div ref={mapContainer} className="map" style={{ height: '100vh', width: '45%' }} />
    
      <select
      onChange={handleChange}
        style={{ fontFamily:'cursive', fontWeight:"bolder",color:"darkblue",position: 'absolute', top: '90px', left: '150px', backgroundColor: 'white', padding: '5px', borderRadius:'10px' ,width:'300px'}}
      
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








