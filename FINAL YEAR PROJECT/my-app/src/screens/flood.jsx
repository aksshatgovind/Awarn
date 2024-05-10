import React from 'react';

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
import { useEffect } from "react";

const customMarkerIcon1 = new L.Icon({
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
});
const Flood= () => {

  useEffect(() => {
    AOS.init();
  }, []);
  const minor = [
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

   
  ];


  return (

   
<div className='bg-blue-50	'>
    <Navbar/>

    <div className='flex justify-end items-end'>
    <div className="card  flex bg-blue-100 shadow-xl shadow-blue-200" data-aos="flip-left"
     data-aos-easing="ease-out-cubic"
     data-aos-duration="2000">
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

    <MapContainer center={[19.082285, 77.932324]} zoom={5} style={{ height: '500px', width: '60%', marginLeft:"20%",marginTop:"50px" }}>
      <TileLayer
        url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"


        
      />
      
      {minor.map((position, index) => (
        <Marker key={index} position={[position.lat, position.lng]} icon={customMarkerIcon3}>
          <Popup>
            A marker at lat: {position.lat}, lng: {position.lng}
          </Popup>
        </Marker>
      ))}
      {moderate.map((position, index) => (
        <Marker key={index} position={[position.lat, position.lng]} icon={customMarkerIcon2}>
          <Popup>
            A marker at lat: {position.lat}, lng: {position.lng}
          </Popup>
        </Marker>
      ))}

{major.map((position, index) => (
        <Marker key={index} position={[position.lat, position.lng]} icon={customMarkerIcon1}>
          <Popup>
            A marker at lat: {position.lat}, lng: {position.lng}
          </Popup>
        </Marker>
      ))}
    </MapContainer>

    </div>

    <div className='mt-40' data-aos="fade-down"
     data-aos-duration="2000">
      <Footer/>
    </div>
    </div>
   
    
  );
};

export default Flood;




