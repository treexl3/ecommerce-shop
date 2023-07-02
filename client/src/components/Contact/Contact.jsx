import React from 'react';
import "./Contact.scss";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import GoogleIcon from "@mui/icons-material/Google";
import PinterestIcon from "@mui/icons-material/Pinterest";

const Contact = () => {
   return (
      <div className='contact'>
         <div className="wrapper">
            <span>BE IN TOUCH WITH US:</span>
            <div className="mail">
               <input type="email" placeholder='Enter your e-mail...' />
               <button>JOIN US</button>
            </div>
            <div className="icons">
               <a href='#' className="icon">
                  <FacebookIcon />
               </a>
               <a href='#' className="icon">
                  <InstagramIcon />
               </a>
               <a href='#' className="icon">
                  <TwitterIcon />
               </a>
               <a href='#' className="icon">
                  <GoogleIcon />
               </a>
               <a href='#' className="icon">
                  <PinterestIcon />
               </a>
            </div>
         </div>
      </div>
   )
}

export default Contact