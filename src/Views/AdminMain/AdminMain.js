import React, { Component } from "react"
import axios from "axios"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import { getAdminData } from "../../Ducks/reducer"
import SiteBanner from "../../ReusableComponents/SiteBanner/SiteBanner"
import "./AdminMain.scss"

class AdminMain extends Component {
    constructor() {
        super()

        this.state = {
            items: []
        }
    }

    async componentDidMount() {
        try {
            let adminRes = await axios.get("/api/a/check-admin-cred")
            this.props.getAdminData(adminRes.data)
        }
        catch(err) {
            if(err.response.status === 403) {
                alert("Unauthorized")
                this.props.history.push("/a/login")
            }
        }
    }

    render() {
        return (
            <div className="admin_main">
                <SiteBanner />
                <div className="one_item_nav">
                    <a className="logout_btn" href={`${process.env.REACT_APP_LOGOUT}`}>logout</a>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        admin: state.admin
    }
}

const actionOutputs = {
    getAdminData: getAdminData
}

const connected = connect(mapStateToProps, actionOutputs)

export default withRouter(connected(AdminMain))