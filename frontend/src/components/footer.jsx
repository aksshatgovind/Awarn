import React from "react";
import Logo from "../images/Logo-f.png";

function Footer(){

    return(
      <footer className="footer p-10 bg-blue-200 text-base-content font-mono">
  <aside>
    <img src={Logo} width="50" height="60"/>
    <p className="text-sm"><h2 className="text-xl font-semibold ">A-Warn</h2><br/>A reliable forewarning system for natural calimities.</p>

    <br></br>
    <p>© 2024 AWARN</p>
  </aside> 
  <nav>
    <h6 className="footer-title font-medium">Services</h6> 
    <a className="link link-hover">Branding</a>
    <a className="link link-hover">Design</a>
    <a className="link link-hover">Marketing</a>
    <a className="link link-hover">Advertisement</a>
  </nav> 
  <nav>
    <h6 className="footer-title font-medium">Company</h6> 
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
   
   
  </nav> 
  <nav>
    <h6 className="footer-title font-medium">Legal</h6> 
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </nav>


  
</footer>
    )
}

export default Footer