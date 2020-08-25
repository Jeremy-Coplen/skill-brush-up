import React, { Component } from "react"

import "./DeleteProductsModal.scss"

class DeleteProductsModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            products: []
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
                        <p>Delete Products Modal</p>
                    </div>
                </div>
                <div></div>
            </div>
        )
    }
}

export default DeleteProductsModal