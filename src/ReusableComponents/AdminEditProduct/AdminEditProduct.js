import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

import "./AdminEditProduct.scss"

class AdminEditProduct extends Component {
    constructor(props) {
        super(props)

        this.state = {
            catagories: []
        }
    }
    async componentDidMount() {
        try {
            let catagoryRes = await axios.get("/api/a/get/catagories")

            this.setState({
                catagories: catagoryRes.data
            })
        }
        catch(err) {
            alert("Error Grabing catagories")
        }
    }

    render() {
        let catagory = { name: "" }
        if(this.state.catagories.length > 1) {
            catagory = this.state.catagories.find(e => e.id === this.props.product.catagory)
        }
        return (
            <div className="admin_edit_product">
                <div>
                    <div className="admin_edit_product_picture">
                        <p className="info_name">Picture:</p>
                        <img src={this.props.product.picture} alt="product"/>
                    </div>
                    <div>
                        <p className="info_name">Catagory:</p>
                        <p>{catagory.name}</p>
                    </div>
                    <div className="admin_edit_product_name">
                        <p className="info_name">Name:</p>
                        <p>{this.props.product.name}</p>
                    </div>
                    <div className="admin_edit_product_description">
                        <p className="info_name">Description:</p>
                        <p>{this.props.product.description}</p>
                    </div>
                    <div className="admin_edit_product_color">
                        <p className="info_name">Color:</p>
                        <p>{this.props.product.color}</p>
                    </div>
                    <div>
                        <p className="info_name">Price:</p>
                        <p>${this.props.product.price}</p>
                    </div>
                </div>
                <Link to={`/a/edit/product/${this.props.product.id}`}><button>Edit</button></Link>
            </div>
        )
    }
}

export default AdminEditProduct