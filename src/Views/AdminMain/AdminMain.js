import React, { Component } from "react"
import axios from "axios"
import { connect } from "react-redux"
import { withRouter } from "react-router-dom"

import { getAdminData } from "../../Ducks/reducer"
import SiteBanner from "../../ReusableComponents/SiteBanner/SiteBanner"
import AddProductModal from "../../Modals/AddProductModal/AddProductModal"
import AddCatagoryModal from "../../Modals/AddCatagoryModal/AddCatagoryModal"
import EditProductsModal from "../../Modals/EditProductsModal/EditProductsModal"
import EditCatagoriesModal from "../../Modals/EditCatagoriesModal/EditCatagoriesModal"
import DeleteProductsModal from "../../Modals/DeleteProductsModal/DeleteProductsModal"
import DeleteCatagoriesModal from "../../Modals/DeleteCatagoriesModal/DeleteCatagoriesModal"
import "./AdminMain.scss"

class AdminMain extends Component {
    constructor() {
        super()

        this.state = {
            addProductShow: false,
            addCatagoryShow: false,
            editProductsShow: false,
            editCatagoriesShow: false,
            deleteProductsShow: false,
            deleteCatagoriesShow: false
        }
    }

    async componentDidMount() {
        try {
            let adminRes = await axios.get("/api/a/check-admin-cred")
            this.props.getAdminData(adminRes.data)
        }
        catch(err) {
            if(err.response.status === 403) {
                alert("Unauthorized")
                this.props.history.push("/a/login")
            }
        }
    }

    toggleAddProductShow = () => {
        this.setState({
            addProductShow: !this.state.addProductShow
        })
    }

    toggleAddCatagoryShow = () => {
        this.setState({
            addCatagoryShow: !this.state.addCatagoryShow
        })
    }

    toggleEditProductShow = () => {
        this.setState({
            editProductsShow: !this.state.editProductsShow
        })
    }

    toggleEditCatagoriesShow = () => {
        this.setState({
            editCatagoriesShow: !this.state.editCatagoriesShow
        })
    }

    toggleDeleteProductShow = () => {
        this.setState({
            deleteProductsShow: !this.state.deleteProductsShow
        })
    }

    toggleDeleteCatagoriesShow = () => {
        this.setState({
            deleteCatagoriesShow: !this.state.deleteCatagoriesShow
        })
    }

    render() {
        return (
            <div className="admin_main">
                <SiteBanner />
                <div className="one_item_nav">
                    <a className="logout_btn" href={`${process.env.REACT_APP_LOGOUT}`}>logout</a>
                </div>
                <div className="admin_main_nav_container">
                    <div className="admin_main_btn_container">
                        <button onClick={this.toggleAddProductShow}>Add a Product</button>
                        <button onClick={this.toggleAddCatagoryShow}>Add a Catagory</button>
                        <button onClick={this.toggleEditProductShow}>Edit Products</button>
                        <button onClick={this.toggleEditCatagoriesShow}>Edit Catagories</button>
                        <button onClick={this.toggleDeleteProductShow}>Delete Products</button>
                        <button onClick={this.toggleDeleteCatagoriesShow}>Delete Catagories</button>
                    </div>
                </div>
                <AddProductModal show={this.state.addProductShow} 
                toggleShow={this.toggleAddProductShow} />
                <AddCatagoryModal show={this.state.addCatagoryShow} 
                toggleShow={this.toggleAddCatagoryShow} />
                <EditProductsModal show={this.state.editProductsShow} 
                toggleShow={this.toggleEditProductShow} />
                <EditCatagoriesModal show={this.state.editCatagoriesShow} 
                toggleShow={this.toggleEditCatagoriesShow} />
                <DeleteProductsModal show={this.state.deleteProductsShow} 
                toggleShow={this.toggleDeleteProductShow} />
                <DeleteCatagoriesModal show={this.state.deleteCatagoriesShow} 
                toggleShow={this.toggleDeleteCatagoriesShow} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        admin: state.admin
    }
}

const actionOutputs = {
    getAdminData: getAdminData
}

const connected = connect(mapStateToProps, actionOutputs)

export default withRouter(connected(AdminMain))