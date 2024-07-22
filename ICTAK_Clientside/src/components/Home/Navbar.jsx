import React, { useEffect } from "react";
import "./Navbar.css";
import logo from "../../assets/company_logo.jpg";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      window.scrollY > 600 ? setSticky(true) : setSticky(false)
    });
  }, []);

  return (
    <nav className={` ${sticky? 'dark-nav': ''} `}>
      <img src={logo} alt="" className="logo" />

      <ul>
        {/* <li>About us</li> */}
        <li>
        <Link to={'/login'}>
          <button className="btn1">Login</button></Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
