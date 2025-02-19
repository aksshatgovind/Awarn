import React from "react";
import Logo from "../images/Logo-f.png";

function Footer(){

    return(
      <footer className="footer p-10 bg-black-200 text-base-content font-mono">
  <aside>
    <img src={Logo} width="50" height="60"/>
    <p className="text-sm text-gray-500"><h2 className="text-xl font-semibold text-gray-500">A-WARN</h2><br/>A reliable forewarning system for natural calimities.</p>

    <br></br>
    <p className="text-gray-800">© 2025 A-WARN</p>
  </aside> 
  <nav>
    <h6 className="footer-title font-medium text-gray-500">Services</h6> 
    <a className="link link-hover text-gray-700">Design</a>
  </nav> 
  <nav>
    <h6 className="footer-title font-medium text-gray-500">Company</h6> 
    <a className="link link-hover text-gray-700">About us</a>
    <a className="link link-hover text-gray-700">Contact</a>
   
   
  </nav> 
  <nav>
    <h6 className="footer-title font-medium text-gray-500">Legal</h6> 
    <a className="link link-hover text-gray-700">Terms of use</a>
    <a className="link link-hover text-gray-700">Privacy policy</a>
    <a className="link link-hover text-gray-700">Cookie policy</a>
  </nav>


  
</footer>
    )
}

export default Footer