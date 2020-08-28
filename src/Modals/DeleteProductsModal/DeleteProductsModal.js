import React, { Component } from "react"
import axios from "axios"

import AdminDeleteProduct from "../../ReusableComponents/AdminDeleteProduct/AdminDeleteProduct"
import "./DeleteProductsModal.scss"

class DeleteProductsModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            products: []
        }
    }

    async componentDidMount() {
        try {
            let productRes = await axios.get("/api/u/get/products")

            this.setState({
                products: productRes.data
            })
        }
        catch(err) {
            alert("Error getting products try again later")
        }
    }

    getProductsAgain = async () => {
        try {
            let productRes = await axios.get("/api/u/get/products")

            this.setState({
                products: productRes.data
            })
        }
        catch(err) {
            alert("Error re-getting products try again later")
        }
    }

    render() {
        let className = this.props.show ? "modal" : "display_none"
        let products = this.state.products.map((product, i) => {
            return (
                <AdminDeleteProduct key={i} product={product} getProductsAgain={this.getProductsAgain} />
            )
        })
        return (
            <div className={className}>
                <button className="toggle_show_btn" 
                onClick={this.props.toggleShow}>X</button>
                <div></div>
                <div className="modal_content">
                    <div className="admin_delete_products_container">
                        {products}
                    </div>
                </div>
                <div></div>
            </div>
        )
    }
}

export default DeleteProductsModal