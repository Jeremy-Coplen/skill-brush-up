import React, { Component } from "react"
import axios from "axios"

import "./AdminDeleteProduct.scss"

class AdminDeleteProduct extends Component {
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

    confirmDelete = () => {
        if(window.confirm("Are you sure you want to delete this product?")) {
            this.deleteProduct()
        }
        else {
            return
        }
    }

    deleteProduct = async () => {
        try {
            await axios.delete(`/api/a/delete/product/${this.props.product.id}`)

            this.props.getProductsAgain()

            alert("Successfully deleted product")
        }
        catch(err) {
            alert("Error deleteing product try again later")
        }
    }

    render() {
        let catagory = { name: "" }
        if (this.state.catagories.length > 1) {
            catagory = this.state.catagories.find(e => e.id === this.props.product.catagory)
        }
        return (
            <div className="admin_delete_product">
                <div>
                    <div className="admin_delete_product_picture">
                        <p className="info_name">Picture:</p>
                        <img src={this.props.product.picture} alt=""/>
                    </div>
                    <div>
                        <p className="info_name">Catagory:</p>
                        <p>{catagory.name}</p>
                    </div>
                    <div className="admin_delete_product_name">
                        <p className="info_name">Name:</p>
                        <p>{this.props.product.name}</p>
                    </div>
                    <div className="admin_delete_product_description">
                        <p className="info_name">Description:</p>
                        <p>{this.props.product.description}</p>
                    </div>
                    <div className="admin_delete_product_color">
                        <p className="info_name">Color:</p>
                        <p>{this.props.product.color}</p>
                    </div>
                    <div>
                        <p className="info_name">Price:</p>
                        <p>${this.props.product.price}</p>
                    </div>
                </div>
                <button onClick={this.confirmDelete}>Delete Product</button>
            </div>
        )
    }
}

export default AdminDeleteProduct