import React, { Component } from "react"

import "./EditCatagoriesModal.scss"

class EditCatagoriesModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            Catagories: []
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
                        <p>Edit Catagories Modal</p>
                    </div>
                </div>
                <div></div>
            </div>
        )
    }
}

export default EditCatagoriesModal