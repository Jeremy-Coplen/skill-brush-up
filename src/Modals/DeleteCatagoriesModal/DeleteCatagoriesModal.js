import React, { Component } from "react"
import axios from "axios"

import AdminDeleteCatagory from "../../ReusableComponents/AdminDeleteCatagory/AdminDeleteCatagory"
import "./DeleteCatagoriesModal.scss"

class DeleteCatagoriesModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            catagories: []
        }
    }

    async componentDidMount() {
        try {
            let catagoriesRes = await axios.get("/api/a/get/catagories")

            this.setState({
                catagories: catagoriesRes.data
            })
        }
        catch(err) {
            alert("Error getting catagories try again later")
        }
    }

    getCatagoriesAgain = async () => {
        try {
            let catagoriesRes = await axios.get("/api/a/get/catagories")

            this.setState({
                catagories: catagoriesRes.data
            })
        }
        catch(err) {
            alert("Error getting catagories try again later")
        }
    }

    render() {
        let className = this.props.show ? "modal" : "display_none"
        let catagories = this.state.catagories.map((catagory, i) => {
            return (
                <AdminDeleteCatagory key={i} catagory={catagory} getCatagoriesAgain={this.getCatagoriesAgain} />
            )
        })
        return (
            <div className={className}>
                <button className="toggle_show_btn" 
                onClick={this.props.toggleShow}>X</button>
                <div></div>
                <div className="modal_content delete_catagories_container">
                    <div>
                        {catagories}
                    </div>
                </div>
                <div></div>
            </div>
        )
    }
}

export default DeleteCatagoriesModal