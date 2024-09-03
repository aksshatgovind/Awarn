
import React from 'react'

import Navbar from '../components/Navbar'
import Footer from '../components/footer'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
  import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";


export default function About() {
    useEffect(() => {
        AOS.init();
      }, []);
  return (
    <>
    <div className='mb-10px'>
    <Navbar/>
    </div>
   
 <div className='border-y-0' data-aos="fade-right"
   
   data-aos-easing="ease-in-sine"
     data-aos-duration="1500" style={{marginTop:'100px'}}> 

    <Card style={{marginLeft: '100px', marginRight: '100px', marginTop: '20px',marginBottom: '20px'}}>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-4" style={{justifyContent:'center'}}>
         About Us
        </Typography>
        <Typography>
        Natural calamities, including earthquakes, hurricanes, floods, wildfires, and tsunamis, pose multifaceted threats to human lives, infrastructure, and ecosystems worldwide. The unpredictability and sudden onset of these events underscore the importance of early warning mechanisms that can provide timely alerts to at-risk populations, enabling them to take proactive measures to safeguard lives and property.
Traditional early warning systems have relied on predefined thresholds and simplistic algorithms, often lacking the adaptability and accuracy necessary to address the complexities of modern disaster dynamics. However, recent advancements in ML techniques offer a paradigm shift in disaster forecasting and risk assessment. By harnessing the vast troves of historical datasets encompassing past disaster occurrences, ML models can discern intricate patterns, identify subtle indicators, and deliver more precise predictions of future events.
        </Typography>
      </CardBody>
      <CardFooter className="border-gray-0">
        
      </CardFooter>
    </Card>
    </div>

    <div className='border-y-0'data-aos="fade-left"
   
   data-aos-easing="ease-in-sine"
     data-aos-duration="1500">
    <Card style={{marginLeft: '100px', marginRight: '100px', marginTop: '20px',marginBottom: '20px'}}>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
        Vision
        </Typography>

        <Typography>
        <ul>
        <li>To excel in training for disaster risk mitigation and alerting systems</li>

        <li>To strive relentlessly towards making a disaster free India by promoting preparedness at various levels</li>
</ul>


        </Typography>
      
      </CardBody>
      <CardFooter className="border-gray-2">
       
      </CardFooter>
    </Card>
</div>
<div className='border-y-0'data-aos="fade-right"
   
   data-aos-easing="ease-in-sine"
     data-aos-duration="1500">
    <Card style={{marginLeft: '100px', marginRight: '100px', marginTop: '20px',marginBottom: '20px'}}>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
        Mission
        </Typography>

        <Typography>
        <ul>
        <li>Planning and designing an ideal warning system</li>

        <li>Promoting awareness and enhancing knowledge of all stakeholders</li>
        <li>Aiming to work with government agencies</li>
</ul>


        </Typography>
      
      </CardBody>
      <CardFooter className="border-gray-0">
       
      </CardFooter>
    </Card >
  
    </div>

    <div className='border-y-0'data-aos="fade-left"
   
   data-aos-easing="ease-in-sine"
     data-aos-duration="1500">
    <Card style={{marginLeft: '100px', marginRight: '100px', marginTop: '20px',marginBottom: '20px'}}>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2">
        Disclaimer:
        </Typography>
        Although the maps represent the affected areas with labels, some uncertainty is associated with these maps. 
Unique meteorological factors (timing and distribution of precipitation) may cause actual streamflows along the modeled reach to vary from those assumed, which may lead to deviations in the water surface elevations
        <Typography>
       

        </Typography>
      
      </CardBody>
      <CardFooter className="border-gray-0">
       
      </CardFooter>
    </Card>
  
    </div>


<div className='mt-20'>
   
   <Footer/>
   </div>
   </>
  )
}

