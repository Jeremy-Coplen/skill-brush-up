import React, { Component } from "react"

import SiteBanner from "../../ReusableComponents/SiteBanner/SiteBanner"
import "./AdminLogin.scss"

class AdminLogin extends Component {
    constructor() {
        super()

        this.state = {
            username: "",
            password: ""
        }
    }

    render() {
        return (
            <div className="admin_login">
                <SiteBanner />
                <div className="admin_login_nav">
                    <button>Home</button>
                </div>
            </div>
        )
    }
}

export default AdminLogin