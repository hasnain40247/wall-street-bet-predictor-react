import React from "react";
import { Link } from "react-router-dom";


function Navbar({to}){
   
    return(
        <nav className="navbar">
            <Link to={to}>
            <img className="logo" alt="imga"  src="candle.png"  height={50} width={50}/>
            </Link>
            <h2>Stock Analyzer.</h2>
        </nav>
    )
}

export default Navbar