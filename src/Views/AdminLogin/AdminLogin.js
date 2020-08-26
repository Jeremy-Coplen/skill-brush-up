import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { withRouter } from "react-router-dom"

import SiteBanner from "../../ReusableComponents/SiteBanner/SiteBanner"
import "./AdminLogin.scss"

class AdminLogin extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: ""
        }
    }

    updateInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    login = async () => {
        try {
            let loginRes = await axios.post("/api/a/login", {username: this.state.username, password: this.state.password})

            if(loginRes.status === 200) {
                this.props.history.push("/a/main")
            }
        }
        catch(err) {
            if(err.response.status === 401) {
                alert("Username or password is incorrect.")
            }
            else {
                alert("Sever error try again later.")
            }
        }
    }

    render() {
        return (
            <div className="admin_login">
                <SiteBanner />
                <div className="one_item_nav">
                    <Link to="/"><button>Home</button></Link>
                </div>
                <div className="login_field_container">
                    <div></div>
                    <div className="input_container">
                        <div className="input_field_container">
                            <p>Username:</p>
                            <input 
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={this.state.username}
                            onChange={this.updateInput}/>
                        </div>
                        <div className="input_field_container">
                            <p>Password:</p>
                            <input 
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={this.state.password}
                            onChange={this.updateInput}/>
                        </div>
                        <button 
                        disabled={!this.state.username || !this.state.password}
                        onClick={this.login}>Login</button>
                    </div>
                    <div></div>
                </div>
            </div>
        )
    }
}

export default withRouter(AdminLogin)