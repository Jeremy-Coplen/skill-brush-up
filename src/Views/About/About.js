import React from "react"
import { Link } from "react-router-dom"

import SiteBanner from "../../ReusableComponents/SiteBanner/SiteBanner"
import SiteFooter from "../../ReusableComponents/SiteFooter/SiteFooter"
import "./About.scss"

function About() {
    return (
        <div className="about">
            <SiteBanner />
            <div className="about_navbar">
                <p></p>
                <Link to="/"><button>Shop</button></Link>
            </div>
            <div className="about_main_container">
                <div></div>
                <div className="about_description_container">
                    <p>This is a skill brush up project</p>
                </div>
                <div></div>
            </div>
            <SiteFooter />
        </div>
    )
}

export default About