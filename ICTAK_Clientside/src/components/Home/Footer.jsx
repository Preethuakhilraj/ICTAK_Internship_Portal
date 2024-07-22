import React from "react";
import "./Footer.css";
import logo from "../../assets/company_logo.jpg";
import Facebook from "../../assets/facebook.png";
import Linkedin from "../../assets/linkedin.png";
import Instagram from "../../assets/instagram.png";
import youtube from "../../assets/youtube.png";

/////////////////////////////////////////////////

const Footer = () => {
  return (
    <div className="footer">
       
      <div className="sb_footer section_padding">
      <div className="logoheading">
      <img src={logo} alt="" className="logos" />
      
        <h2>ICT ACADEMY OF KERALA</h2>
        </div>
        <div className="sb_footer-links">
      
          <div className="sb_footer-links_div">
            <h4>ABOUT</h4>
            <a href="#">
              <p>THE COMPANY</p>
            </a>
            <a href="#">
              <p>THE TEAM</p>
            </a>
            <a href="#">
              <p>THE SHAREHOLERS</p>
            </a>
            <a href="#">
              <p>THE OPERATING UNITS</p>
            </a>
          </div>
          <div className="sb_footer-links_div">
            <h4>INITIATIVES</h4>
            <a href="#">
              <p>MEMBERSHIPS</p>
            </a>
            <a href="#">
              <p>PROJECTS</p>
            </a>
            <a href="#">
              <p>SERVICES</p>
            </a>
          </div>
          <div className="sb_footer-links_div">
            <h4>PARTNERS</h4>
            <a href="#">
              <p>Oracle Academy</p>
            </a>
            <a href="#">
              <p>Google</p>
            </a>
            <a href="#">
              <p>Salesforce</p>
            </a>
            <a href="#">
              <p> Microsoft</p>
            </a>
            <a href="#">
              <p>AWS</p>
            </a>
          </div>
          <div className="sb_footer-links_div">
            <h4>PUBLICATIONS</h4>
            <a href="#">
              <p>CONVERGENCE</p>
            </a>
            <a href="#">
              <p>SKOPE</p>
            </a>
             </div>
             <div className="sb_footer-links_div">
            <h4>EVENTS</h4>
            <a href="#">
              <p>ICEST</p>
            </a>
            <a href="#">
              <p>TECHATHLON</p>
            </a>
             </div>
          <div className="sb_footer-links_div">
            <h4>FOLLOW US ON</h4>
            <div className="socialmedia">
              <p>
                <a href="https://www.facebook.com/ictkerala/"><img src={Facebook} alt="" /></a>
              </p>
              <p>
                <a href="https://www.linkedin.com/company/ictkerala/?originalSubdomain=in"><img src={Linkedin} alt="" /></a>
              </p>
              <p>
                <a href="https://www.youtube.com/@ictkerala"><img src={youtube} alt="" /></a>
              </p>
              <p>
                <a href="https://www.instagram.com/ictkerala/?hl=en"><img src={Instagram} alt="" /></a>
              </p>
            </div>
          </div>
        </div>


        <hr></hr>

        <div className="sb_footer-below">
          <div className="sb_footer-copyright">
            <p>
              @{new Date().getFullYear()} ICTAK. All right reserved.
            </p>
          </div>
          <div className="sb_footer-below-links">
            <a href="/terms"><div><p>Terms & conditions</p></div></a>
            <a href="/privacy"><div><p>Privacy</p></div></a>
            <a href="/security"><div><p>Security</p></div></a>
            <a href="/cookie"><div><p>Cookie Declaration</p></div></a>
          </div>
        </div>
      </div>
    </div>

    /////////////////////////////////////////////////
  
  );
};

export default Footer;
