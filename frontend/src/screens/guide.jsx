import React from 'react'
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
  } from "@material-tailwind/react";
  
import Navbar from '../components/Navbar'
import Footer from '../components/footer';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

export default function Guide() {
    useEffect(() => {
        AOS.init();
      }, []);
  return (
    
    <>
    <div className="bg-black-50" >
    <Navbar/>
<div data-aos="zoom-in" data-aos-duration="1500" >
    <Card className="mt-6 mb-10 w-96 mx-auto" style={{marginTop:'100px'}}>
      <CardBody>
        <Typography variant="h5" color="blue-gray" className="mb-2" >
          Guide
        </Typography>
        <Typography>
         <ul>
            <li><h3 className="font-semibold">Zooming</h3>
The scroll wheel on the mouse can be used to control zooming. In the upper left area of the map interface are "+" and "-" icons; these can also be used to zoom in and out, respectively.
</li>
            <li><h3 className="font-semibold">Legends
</h3>The legend box explains the symbols, patterns, and colors of the visible data layers on the map.
</li>
            <li><h3 className="font-semibold">Zoom to Location
</h3>Selecting 'Zoom to location' will fit the interactive map window to display the extent of the flood library selected.
</li>
            <li><h3 className="font-semibold">Bell Icon(Warning Systems)
</h3>By clicking the 'Bell Icon', a drop down menu select comes forward to select which type of forewarning to visit</li>
         </ul>

        </Typography>
      </CardBody>
      <CardFooter className="pt-0">
      more guides coming soon....
      </CardFooter>
    </Card>
    </div>
    
      <Footer/>
      </div>
    </>
  )
}
