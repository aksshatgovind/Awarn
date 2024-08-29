import React from "react";
import Avalanche from '../images/Avalanche-f.jpg';
import flood from '../images/Flood-f.jpg'
import Tsunami from '../images/Tsunami-f.jpg'
import { Fade } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'

const fadeImages = [
  {
    url:Avalanche
    
  },
  {
    url: flood
   
  },
  {
    url:Tsunami
    
  },
];

const Slideshow = () => {
  return (
    <div className="slide-container mx-auto  border-1 rounded-xl  overflow-hidden" style={{width:"70%" ,height:"450px"}}>
      <Fade arrows={false}
        style={{ position: "relative" }}>
        {fadeImages.map((fadeImage, index) => (
          <div key={index}  className="" >
            <img className="object-contain" src={fadeImage.url} alt=""/>
            <h2>{fadeImage.caption}</h2>
          </div>
        ))}
      </Fade>
    </div>
  )
}

export default Slideshow;