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
const Avalanche = () => {

  useEffect(() => {
    AOS.init();
  }, []);
  const minor = [
    { lat: 32.2228, lng: 79.1478 },
    { lat: 34.05, lng: 74.38 },
    { lat: 30.50, lng: 79.10 },
  ];
  const moderate = [
    { lat: 34.37, lng: 74.13},
    { lat: 34.5, lng: 74.7 },
    { lat: 34.23, lng: 74.9 },
  ];

  const major = [
    { lat: 27.2313, lng: 88.4951}
   
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
    <h2 className="card-title ">Major_Risk(Avalanche)</h2>
    
  
  </div>
  <figure><img src={markerIcon3} className="h-8 w-10" alt="Movie"/></figure>
  <div className="card-body">
    <h2 className="card-title">Moderate_Risk(Avalanche)</h2>
    
  
  </div>
  <figure><img src={markerIcon2} className="h-8 w-10" alt="Movie"/></figure>
  <div className="card-body">
    <h2 className="card-title">Minor_Risk(Avalanche)</h2>
    
  
  </div>
</div>

    <MapContainer center={[32.1024, 77.5619]} zoom={5} style={{ height: '500px', width: '60%', marginLeft:"20%",marginTop:"50px" }}>
      <TileLayer
        url="https://mt0.google.com/vt/lyrs=s&x={x}&y={y}&z={z}


        "
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

export default Avalanche;




