import React, { Component } from "react"

import "./AddCatagoryModal.scss"

class AddCatagoryModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            catagory: {}
        }
    }

    render() {
        let className = this.props.show ? "modal" : "display_none"
        return (
            <div className={className}>
                <button className="toggle_show_btn" 
                onClick={this.props.toggleShow}>X</button>
                <div></div>
                <div className="modal_content">
                    <div>
                        <p>Add Catagory Modal</p>
                    </div>
                </div>
                <div></div>
            </div>
        )
    }
}

export default AddCatagoryModal