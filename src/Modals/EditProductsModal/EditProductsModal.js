import React, { Component } from "react"
import axios from "axios"

import AdminEditProduct from "../../ReusableComponents/AdminEditProduct/AdminEditProduct"
import "./EditProductsModal.scss"

class EditProductsModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            products: []
        }
    }

    async componentDidMount() {
        let productRes = await axios.get("/api/u/get/products")

        this.setState({
            products: productRes.data
        })
    }

    render() {
        let className = this.props.show ? "modal" : "display_none"
        let products = this.state.products.map((product, i) => {
            return (
                <AdminEditProduct key={i} product={product} />
            )
        })
        return (
            <div className={className}>
                <button className="toggle_show_btn" 
                onClick={this.props.toggleShow}>X</button>
                <div></div>
                <div className="modal_content edit_product_list">
                    {products}
                </div>
                <div></div>
            </div>
        )
    }
}

export default EditProductsModal