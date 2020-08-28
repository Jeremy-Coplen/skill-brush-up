import React, { Component } from "react"
import axios from "axios"

import AdminEditCatagory from "../../ReusableComponents/AdminEditCatagory/AdminEditCatagory"
import "./EditCatagoriesModal.scss"

class EditCatagoriesModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            catagories: []
        }
    }

    async componentDidMount() {
        let catagoriesRes = await axios.get("/api/a/get/catagories")

        this.setState({
            catagories: catagoriesRes.data
        })
    }

    render() {
        let className = this.props.show ? "modal" : "display_none"
        let catagories = this.state.catagories.map((catagory, i) => {
            return (
                <AdminEditCatagory key={i} catagory={catagory} />
            )
        })
        return (
            <div className={className}>
                <button className="toggle_show_btn" 
                onClick={this.props.toggleShow}>X</button>
                <div></div>
                <div className="modal_content admin_edit_catagories">
                    <div className="admin_edit_catagories_info">
                        {catagories}
                    </div>
                </div>
                <div></div>
            </div>
        )
    }
}

export default EditCatagoriesModal