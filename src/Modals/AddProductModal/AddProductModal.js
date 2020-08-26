import React, { Component } from "react"
import axios from "axios"
import Dropzone from "react-dropzone"

import "./AddProductModal.scss"

class AddProductModal extends Component {
    constructor(props) {
        super(props)

        this.descRef = React.createRef()

        this.state = {
            catagories: [],
            catagoryType: 1,
            name: "",
            description: "",
            color: "",
            pic: "",
            price: ""
        }
    }

    async componentDidMount() {
        let catagoriesRes = await axios.get("/api/a/get/catagories")
        
        this.setState({
            catagories: catagoriesRes.data
        })
    }

    updateInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onDrop = async (acceptedFiles, rejectedFiles) => {
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
                pic: picRes.data.secure_url
            })
        }
    }

    addProduct = async () => {
        try{
            if(this.state.catagoryType < 1 ||
            this.state.name.length < 1 ||
            this.state.description.length < 1 ||
            this.state.color.length < 1 ||
            this.state.pic.length < 1 ||
            this.state.price.length < 1) {
                alert("Please fill out all fields")
                return
            }
            else {
                let number = parseFloat(Number(this.state.price).toFixed(2))
                let payload = {
                    catagoryType: this.state.catagoryType,
                    name: this.state.name,
                    description: this.state.description,
                    color: this.state.color,
                    pic: this.state.pic,
                    price: number
                }
                await axios.post("/api/a/add/product", payload)
    
                this.setState({
                    catagoryType: 1,
                    name: "",
                    description: "",
                    color: "",
                    pic: "",
                    price: ""
                })

                this.descRef.current.value=""
    
                this.props.toggleShow()
                alert("Added product")
            }
        }
        catch(err) {
            alert("Error adding product please try again later")
        }
    }

    render() {
        let className = this.props.show ? "modal" : "display_none"
        const catagoryTypes = this.state.catagories.map((type, i) => {
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
            <div className={className}>
                <button className="toggle_show_btn" 
                onClick={this.props.toggleShow}>X</button>
                <div></div>
                <div className="modal_content add_product_content">
                    <div className="add_product_input_container">
                        <p>Catagory:</p>
                        <select name="catagoryType"
                        onChange={this.updateInput} >
                            {catagoryTypes}
                        </select>
                    </div>
                    <div className="add_product_input_container">
                        <p>Name:</p>
                        <input type="text"
                        placeholder="Name"
                        name="name"
                        value={this.state.name}
                        onChange={this.updateInput} />
                    </div>
                    <div className="add_product_input_container">
                        <p>Description:</p>
                        <textarea name="description"
                        placeholder="Description"  
                        cols="30" 
                        rows="10"
                        ref={this.descRef}
                        onChange={this.updateInput} ></textarea>
                    </div>
                    <div className="add_product_input_container">
                        <p>Color:</p>
                        <input type="text" 
                        placeholder="Color"
                        name="color"
                        value={this.state.color}
                        onChange={this.updateInput} />
                    </div>
                    <div className="add_product_input_container">
                        <p>Picture:</p>
                        <Dropzone onDrop={this.onDrop} 
                        style={dropzoneStyle}
                        accept="image/*"
                        multiple={false}
                        maxSize={8000000} >
                            <p>Drag images or click to upload</p>
                        </Dropzone>
                        <img src={this.state.pic} alt="upload pic"/>
                    </div>
                    <div className="add_product_input_container">
                        <p>Price:</p>
                        <input type="number"
                        placeholder={0}
                        name="price"
                        value={this.state.price}
                        onChange={this.updateInput} />
                    </div>
                    <button onClick={this.addProduct}>Add Product</button>
                </div>
                <div></div>
            </div>
        )
    }
}

export default AddProductModal