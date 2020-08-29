import React, { Component } from "react"
import axios from "axios"
import { withRouter, Link } from "react-router-dom"
import { connect } from "react-redux"
import Dropzone from "react-dropzone"

import { getAdminData } from "../../Ducks/reducer"
import SiteBanner from "../../ReusableComponents/SiteBanner/SiteBanner"
import "./EditSingleProduct.scss"

class EditSingleProduct extends Component {
    constructor(props) {
        super(props)

        this.state = {
            product: {},
            catagories: [],
            editingCatagory: false,
            editingName: false,
            editingDescription: false,
            editingColor: false,
            editingPicture: false,
            editingPrice: false,
            catagoryType: 1,
            catagoryName: "",
            name: "",
            description: "",
            color: "",
            picure: "",
            price: ""
        }
    }

    async componentDidMount() {
        try {
            let adminRes = await axios.get("/api/a/check-admin-cred")
            this.props.getAdminData(adminRes.data)

            let productRes = await axios.get(`/api/a/get/product/${this.props.match.params.productid}`)
            let catagoryRes = await axios.get("/api/a/get/catagories")

            let catagory = catagoryRes.data.find(e => e.id === productRes.data[0].catagory).name

            this.setState({
                product: productRes.data[0],
                catagories: catagoryRes.data,
                catagoryType: productRes.data[0].catagory,
                catagoryName: catagory,
                name: productRes.data[0].name,
                description: productRes.data[0].description,
                color: productRes.data[0].color,
                picture: productRes.data[0].picture,
                price: productRes.data[0].price.toString()
            })
        }
        catch(err) {
            if(err.response.status === 401) {
                alert("Unauthorized")
                this.props.history.push("/a/login")
            }
        }
    }

    updateCatagory = async (e) => {
        try{
            let catagory = Number(e.target.value)
            let catagoryName = this.state.catagories.find(e => e.id === catagory).name
            let id = this.state.product.id

            this.setState({
                catagoryType: catagory,
                catagoryName: catagoryName,
                editingCatagory: false
            })

            await axios.put("/api/a/update/product/catagory", { catagory, id })

            alert("Succesfully updated catagory")
        }
        catch(err) {
            alert("Error updating catagory try again later")
        }
    }

    updateName = async () => {
        try{
            if(this.state.product.name === this.state.name) {
                this.setState({
                    editingName: false
                })
            }
            else {
                let name = this.state.name
                let id = this.state.product.id

                this.setState({
                    editingName: false
                })

                await axios.put("/api/a/update/product/name", { name, id })

                alert("Successfully updated name")
            }
        }
        catch(err) {
            alert("Error updating name try again later")
        }
    }

    updateDescription = async () => {
        try{
            if(this.state.product.description === this.state.description) {
                this.setState({
                    editingDescription: false
                })
            }
            else {
                let description = this.state.description
                let id = this.state.product.id

                this.setState({
                    editingDescription: false
                })

                await axios.put("/api/a/update/product/description", { description, id })

                alert("Successfully updated description")
            }
        }
        catch(err) {
            alert("Error updating description try again later")
        }
    }

    updateColor = async () => {
        try {
            if(this.state.product.color === this.state.color) {
                this.setState({
                    editingColor: false
                })
            }
            else {
                let color = this.state.color
                let id = this.state.product.id

                this.setState({
                    editingColor: false
                })

                await axios.put("/api/a/update/product/color", { color, id })

                alert("Successfuly updated color")
            }
        }
        catch(err) {
            alert("Error updating color")
        }
    }

    onDrop = async (acceptedFiles, rejectedFiles) => {
        try {
            const {
                REACT_APP_CL_UPLOAD_PRESET,
                REACT_APP_CL_API_KEY,
                REACT_APP_CL_URL
            } = process.env
    
            if(rejectedFiles.length >= 1) {
                let message = ""
    
                if(rejectedFiles[0].size > 8000000) {
                    message = "file is too big"
                }
                else {
                    message = "Wrong file type only images are accepted"
                }
                alert(message)
                return
            }
    
            if(acceptedFiles.length === 0) {
                return
            }
            else if(acceptedFiles.length > 1) {
                alert("Please only upload one file")
                return
            }
            else {
                const formData = new FormData()
                formData.append("file", acceptedFiles[0])
                formData.append("tags", "skillBrushUp, medium, gist")
                formData.append("upload_preset", `${REACT_APP_CL_UPLOAD_PRESET}`)
                formData.append("api_key", `${REACT_APP_CL_API_KEY}`)
                formData.append("timestamp", (Date.now() / 1000 | 0))
    
                let picRes = await axios.post(`${REACT_APP_CL_URL}`, formData)
    
                this.setState({
                    picture: picRes.data.secure_url
                })
    
                let picture = picRes.data.secure_url
                let id = this.state.product.id
    
                this.setState({
                    editingPicture: false
                })
    
                await axios.put("/api/a/update/product/picture", { picture, id})
    
                alert("Successfully updated picture")
            }
        }
        catch(err) {
            alert("Error updating picture try again later")
        }
    }

    updatePrice = async () => {
        try {
            if(this.state.product.price.toString() === this.state.price) {
                this.setState({
                    editingPrice: false
                })
            }
            else {
                let price = Math.round(Number(this.state.price) * 1e2) / 1e2
                let id = this.state.product.id
                
                this.setState({
                    editingPrice: false
                })

                await axios.put("/api/a/update/product/price", { price, id })

                alert("Successfully updated price")
            }
        }
        catch(err) {
            alert("Error updating price try again later")
        }
    }

    updateEditing = (e) => {
        this.setState({
            [e.target.name]: !this.state[e.target.name]
        })
    }

    updateInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        let catagories = this.state.catagories.map((type, i) => {
            return (
            <option key={i} value={type.id}>{type.name}</option>
            )
        })
        const dropzoneStyle = {
            height : "80px",
            width : "100px",
            marginLeft: "10px",
            marginRight: "10px"
        }
        return (
            <div className="edit_single_product">
                <SiteBanner />
                <div className="admin_nav">
                    <Link to="/a/main"><button>Admin Home</button></Link>
                    <a className="logout_btn" href={process.env.REACT_APP_LOGOUT}>logout</a>
                </div>
                <div className="edit_single_product_container">
                    <div className="edit_img_container">
                        <img className="edit_product_img" src={this.state.picture} alt="product"/>
                        {
                            this.state.editingPicture
                            ?
                                <Dropzone onDrop={this.onDrop}
                                style={dropzoneStyle}
                                accept="image/*" 
                                multiple={false}
                                maxSize={8000000} >
                                    <p>Drag images or click to upload</p>
                                </Dropzone>
                            :
                                <div>
                                    <button name="editingPicture"
                                    onClick={this.updateEditing} >Edit Image</button>
                                </div>
                        }
                    </div>
                    <div>
                        <div className="edit_product_info_container">
                            <p>Catagory:</p>
                            {
                                this.state.editingCatagory
                                ?
                                    <div>
                                        <select onChange={this.updateCatagory} >
                                            {catagories}
                                        </select>
                                        <button name="editingCatagory"
                                        onClick={this.updateEditing} >X</button>
                                    </div>
                                :
                                    <div>
                                        <p>{this.state.catagoryName}</p>
                                        <button name="editingCatagory"
                                        onClick={this.updateEditing} >Edit</button>
                                    </div>
                            }
                        </div>
                        <div className="edit_product_info_container">
                            <p>Name:</p>
                            {
                                this.state.editingName
                                ?
                                    <div>
                                        <input type="text"
                                        placeholder="Name"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.updateInput} />
                                        <button onClick={this.updateName}>Save</button>
                                    </div>
                                :
                                    <div>
                                        <p>{this.state.name}</p>
                                        <button name="editingName" 
                                        onClick={this.updateEditing} >Edit</button>
                                    </div>
                            }
                        </div>
                        <div className="edit_description_container border_bottom padding">
                            <p>Description:</p>
                            {
                                this.state.editingDescription
                                ?
                                    <div className="edit_description_container">
                                        <textarea name="description"
                                        placeholder="Description"
                                        cols="30" 
                                        rows="10"
                                        value={this.state.description}
                                        onChange={this.updateInput} ></textarea>
                                        <button onClick={this.updateDescription}>Save</button>
                                    </div>
                                :
                                    <div className="edit_description_container">
                                        <p className="edit_description_p">{this.state.description}</p>
                                        <button name="editingDescription"
                                        onClick={this.updateEditing} >Edit</button>
                                    </div>
                            }
                        </div>
                        <div className="edit_product_info_container">
                            <p>Color:</p>
                            {
                                this.state.editingColor
                                ?
                                    <div>
                                        <input type="text"
                                        placeholder="Color"
                                        name="color"
                                        value={this.state.color}
                                        onChange={this.updateInput} />
                                        <button onClick={this.updateColor}>Save</button>
                                    </div>
                                :
                                    <div>
                                        <p>{this.state.color}</p>
                                        <button name="editingColor"
                                        onClick={this.updateEditing} >Edit</button>
                                    </div>
                            }
                        </div>
                        <div className="edit_product_info_container edit_price_info">
                            <p>Price:</p>
                            {
                                this.state.editingPrice
                                ?
                                    <div>
                                        <input type="number"
                                        placeholder={0}
                                        name="price"
                                        value={this.state.price}
                                        onChange={this.updateInput} />
                                        <button onClick={this.updatePrice}>Save</button>
                                    </div>
                                :
                                    <div>
                                        <p>${this.state.price}</p>
                                        <button name="editingPrice"
                                        onClick={this.updateEditing} >Edit</button>
                                    </div>
                            }
                        </div>
                    </div>
                </div>
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

export default withRouter(connected(EditSingleProduct))