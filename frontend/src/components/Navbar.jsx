import React from 'react'
import './Navbar.css'
import logo from '../constants/V_Bug_Positive_Red.png'

const Navbar = () => {
    return (
        <header class ="header">
            <div class ="logosection">
                <img src={logo} alt="Logo"></img>
                <h1>RankOne</h1>
            </div>
            <nav>
                <ul class ="navlist">
                    <li><a href="/">Home</a></li>
                </ul>
            </nav> 
        </header>
    )
}

export default Navbar;