import React, { Component } from "react"

import "./AddProductModal.scss"

class AddProductModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            product: {}
        }
    }

    render() {
        let className = this.props.show ? "modal" : "display_none"
        return (
            <div className={className}>
                <button className="toggle_show_btn" 
                onClick={this.props.toggleShow}>X</button>
                <div></div>
                <div className="modal_content add_product_content">
                    <div>
                        <p>Add Product Modal</p>
                    </div>
                </div>
                <div></div>
            </div>
        )
    }
}

export default AddProductModal