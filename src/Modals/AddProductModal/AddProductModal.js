import React, { Component } from "react"
import axios from "axios"
import Dropzone from "react-dropzone"

import "./AddProductModal.scss"

class AddProductModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            catagories: [],
            catagoryType: 1,
            name: "",
            description: "",
            pic: ""
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

    render() {
        console.log(this.state)
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
                        onChange={this.updateInput} ></textarea>
                    </div>
                    <div className="add_product_input_container">
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
                        
                    </div>
                    <button>Add Product</button>
                </div>
                <div></div>
            </div>
        )
    }
}

export default AddProductModal