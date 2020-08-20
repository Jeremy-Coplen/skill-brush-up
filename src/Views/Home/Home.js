import React, { Component } from "react"
import { Link } from "react-router-dom"

import SiteBanner from "../../ReusableComponents/SiteBanner/SiteBanner"
import SiteFooter from "../../ReusableComponents/SiteFooter/SiteFooter"
import "./Home.scss"

class Home extends Component {
    constructor() {
        super()

        this.state = {

        }
    }

    render() {
        return (
            <div className="home">
                <SiteBanner />
                <div className="sort_navbar">
                    <button>Sort By</button>
                    <Link to="/about"><button>About</button></Link>
                </div>
                <SiteFooter />
            </div>
        )
    }
}

export default Home