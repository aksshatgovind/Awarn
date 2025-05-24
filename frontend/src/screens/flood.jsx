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
    import { data } from '@maptiler/sdk';
    
    
    
    const Flood= () => {
    
    const mapContainer = useRef(null);
  
    const map = useRef(null);
    const marker1 = useRef(null);
    const marker2 = useRef(null);
    const navigate = useNavigate();
    const [floodSeverity, setFloodSeverity] = useState(null);
    const [floodData, setFloodData] = useState([]);
    const [selectedRegion, setSelectedRegion] = useState("wisconsin");
    const new_york = { lng: -89.589784, lat: 44.522910 };
    const new_marker_position = { lng: -89.663033, lat: 44.583712 };
    const zoom = 11;
    maptilersdk.config.apiKey = 'MvorommUwDmyvjgiemJI';

    useEffect(() => {
        AOS.init();
      }, []);

    const fetchFloodData = async () => {
        try {
            const response = await fetch('http://127.0.0.1:5000/wisconsin');
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching flood data:', error);
            return [];
        }
    };

    // OpenWeatherMap API
    const fetchWeather = async (lat, lon) => {
      try {
          const apiKey = "6e1c655b2df93d2357975a836bb31805"; 
          const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`
          );
          const data = await response.json();
          return {
              temperature: data.main.temp,
              condition: data.weather[0].description,
          };
      } catch (error) {
          console.error("Error fetching weather:", error);
          return null;
      }
      };

      // OpenStreetMap API
      const fetchStateCountry = async (region) => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/search?format=json&q=${region}`
            );
            const data = await response.json();
            
            if (data.length > 0) {
                return {
                    state: data[0].display_name.split(", ")[0], // First part is the state
                    country: data[0].display_name.split(", ").pop(), // Last part is the country
                };
            } else {
                return { state: "Unknown", country: "Unknown" };
            }
        } catch (error) {
            console.error("Error fetching state & country:", error);
            return null;
        }
    };
    
    const [weather, setWeather] = useState(null);
    const [locationInfo, setLocationInfo] = useState({ state: "", country: "" });

    useEffect(() => {
        if (floodData.latitude && floodData.longitude) {
            fetchWeather(floodData.latitude, floodData.longitude).then(setWeather);
        }
        if (floodData.name) {
            fetchStateCountry(floodData.name).then(setLocationInfo);
        }
    }, [floodData]);

    useEffect(() => {
      const currentRegion = window.location.pathname.split("/").pop();
      setSelectedRegion(currentRegion);
    }, [window.location.pathname]); 

  
    useEffect(() => {
        // Assuming fetchFloodData() fetches the required data
        fetchFloodData().then(data => {
            setFloodData(data);
        });
    }, []);
    

    useEffect(() => {
        const fetchFloodSeverity = async () => {
            try {
                const response = await fetch('http://127.0.0.1:5000/wisconsin');
                const data = await response.json();
                setFloodSeverity(data.Flood_Severity);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchFloodSeverity();
    }, []);
    
      
     
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
    
     // Static green color for testing
    
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
    

    const LOCAL_STORAGE_KEY = 'floodSeverity_2';
    useEffect(() => {
      // Retrieve flood severity from localStorage if it exists
      const savedFloodSeverity = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (savedFloodSeverity) {
        setFloodSeverity(savedFloodSeverity);
      }
    }, [setFloodSeverity]);
  
    useEffect(() => {
      if (floodSeverity !== null) {
        localStorage.setItem(LOCAL_STORAGE_KEY, floodSeverity);
      }
    }, [floodSeverity]);
    
     
      const handleChange = (event) => {
        const selectedValue = event.target.value;
        navigate(`/${selectedValue}`);
      };
      return (
    
        
       
    // <div className='bg-blue-50'>
    //     <Navbar/>

    //     {/* Card Container for Specific Region Details */}
    //     <div className="flex justify-center mt-4">
    //         <div className="bg-white shadow-lg rounded-lg p-6 w-3/4" style={{width:'30%', top: '390px',marginTop:'120px',marginLeft:'-950px' }}>
    //             <h2 className="text-2xl font-bold text-gray-800">
    //                 1 Details
    //             </h2>
    //             <ul className="mt-1 space-y-1 text-gray-700">
    //                 <li><strong>Gage Height:</strong> 1</li>
    //                 <li><strong>Mean Temperature:</strong> 1 °C</li>
    //                 <li><strong>Mean Specific Conductance:</strong> 1</li>
    //                 <li><strong>Mean Precipitation Level:</strong> 1 mm</li>
    //                 <li><strong>Latitude:</strong> 1</li>
    //                 <li><strong>Longitude:</strong> 1</li>
    //                 <li><strong>Weather:</strong> 1</li>
    //                 <li><strong>Area:</strong> 1 km²</li>
    //                 <li><strong>State:</strong> 1</li>
    //                 <li><strong>Country:</strong> 1</li>
    //             </ul>
    //         </div>
    //     </div>
        
    //     <div className='flex justify-center items-center mt-1'style={{marginLeft:'60px',width:'80%'}}  >
    //     <div className="  flex bg-blue-100 shadow-xl shadow-blue-200" data-aos="flip-left"
    //      data-aos-easing="ease-out-cubic"
    //      data-aos-duration="2000" style={{marginTop:'90px'}} >
    //       <div className='inline-flex mt-4 mx-5'>
    //   <figure><img src={markerIcon1} className="h-8 w-10 mr-10"alt="Movie" /></figure>
    //   <div className="gap-x-7">
    //     <h2 className="card-title ">High-Severity</h2>
    //     </div>
      
    //   </div>
    //   <div className='inline-flex mt-4 mx-5'>
    //   <figure><img src={markerIcon3} className="h-8 w-21 mr-10" alt="Movie"/></figure>
    //   <div className="gap-x-7">
    //     <h2 className="card-title">Moderate-Severity</h2>
    //     </div>
      
    //   </div>
    
    //    <div className='inline-flex mt-4 mx-5 mb-6'>
    //   <figure><img src={markerIcon2} className="h-8 w-10 mr-10" alt="Movie"/></figure>
    //   <div className="gap-x-7">
    //     <h2 className="card-title">Low-Severity</h2>
    //     </div>
      
    //   </div>
    // </div>
    
    // <div className="map-wrap px-0">
    //       <div ref={mapContainer} className="map" style={{ height: '80vh', width: '60%',top: '90px' }} />
    //       <select
    //       onChange={handleChange}
    //         style={{fontWeight:"bolder",color:"darkblue",position: 'absolute', top: '90px', left: '150px', backgroundColor: 'white', padding: '5px', borderRadius:'10px' ,width:'300px'}}
    //       >
            
    //          <option value="Flood">Wisconsin</option>
            
    //         <option value="Region2">New-york</option>
    //       </select>
    
    //     </div>
    
    //     </div>

    
    //   <div className='mt-40' data-aos="fade-down"
    //     data-aos-duration="2000">
    //     <Footer/>
    //   </div>
    // </div>



    <div className="bg-blue-50 min-h-screen flex flex-col justify-start items-center p-6">
    
    <Navbar/>

    <div className="pt-20 flex w-full max-w-7xl gap-6">
        
        {/* LEFT COLUMN (Selection, Region Details, Severity Card) */}
        <div className="w-1/3 flex flex-col gap-6">

            <select
                // onChange={handleChange}
                onChange={(e) => {
                  setSelectedRegion(e.target.value); 
                  navigate(`/${e.target.value.toLowerCase()}`);  // Navigate based on selection
              }}
                className="font-bold text-blue-800 bg-white p-3 rounded-lg shadow-md w-full"
            >
                <option value="Flood">Wisconsin</option>
                <option value="Region2">New York</option>
            </select>

            {/* Region Details Card */}
            <div className="bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-800"> {floodData?.name ?? "N/A"} Details</h2>
                <ul className="mt-2 space-y-1 text-gray-700">
                    <li><strong>Gage Height:</strong> {8.4} ft</li>
                    <li><strong>Mean Temperature:</strong> {-20.1} °C</li>
                    <li><strong>Mean Specific Conductance:</strong> 218</li>
                    <li><strong>Mean Precipitation Level:</strong> 0.3 in</li>
                    <li><strong>Latitude:</strong> {floodData?.latitude ?? "N/A"}</li>
                    <li><strong>Longitude:</strong> {floodData?.longitude ?? "N/A"}</li>
                    <li><strong>Weather:</strong> {weather ? `${weather.condition}, ${weather.temperature}°C` : "Loading..."}</li>
                    <li><strong>State:</strong> {locationInfo.state || "Loading..."}</li>
                    <li><strong>Country:</strong> {locationInfo.country || "Loading..."}</li>
                </ul>
            </div>

            {/* Severity Indicator Card */}
            <div className="mt-5 bg-blue-100 shadow-xl shadow-blue-200 p-6 rounded-lg">
                <div className="flex flex-col space-y-4">
                    <div className="flex items-center">
                        <img src={markerIcon1} className="h-8 w-10 mr-4" alt="High-Severity" />
                        <h2 className="font-semibold text-lg">High-Severity</h2>
                    </div>
                    <div className="flex items-center">
                        <img src={markerIcon3} className="h-8 w-10 mr-4" alt="Moderate-Severity" />
                        <h2 className="font-semibold text-lg">Moderate-Severity</h2>
                    </div>
                    <div className="flex items-center">
                        <img src={markerIcon2} className="h-8 w-10 mr-4" alt="Low-Severity" />
                        <h2 className="font-semibold text-lg">Low-Severity</h2>
                    </div>
                </div>
            </div>

        </div>

        {/* RIGHT COLUMN (MAP) */}
        <div className="w-2/3">
            <div ref={mapContainer} className="map shadow-lg rounded-lg" style={{ height: '80vh', width: '60%' }} />
        </div>

      </div>

      <div className="mt-40" data-aos="fade-down" data-aos-duration="2000" style={{width: '100%' }} >
          <Footer />
      </div>

    </div>

       
        
      );
    };
    
    export default Flood;