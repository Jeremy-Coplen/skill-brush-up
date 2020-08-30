import React, { Component } from "react"
import axios from "axios"

import "./AddCatagoryModal.scss"

class AddCatagoryModal extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: ""
        }
    }

    updateInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    addCatagory = async () => {
        try {
            await axios.post("/api/a/add/catagory", {name: this.state.name})

            this.props.toggleShow()

            this.setState({
                name: ""
            })

            await alert("Catagory Added")

            window.location.reload()
        }
        catch(err) {
            alert("Server Error Please Try Again Later")
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
                    <div className="add_catagory_content">
                        <div></div>
                        <div className="add_catagory_input_container">
                            <p>Name:</p>
                            <input type="text"
                            placeholder="Name"
                            name="name"
                            value={this.state.name} 
                            onChange={this.updateInput} />
                            <button disabled={!this.state.name} 
                            onClick={this.addCatagory} >Add Catagory</button>
                        </div>
                        <div></div>
                    </div>
                </div>
                <div></div>
            </div>
        )
    }
}

export default AddCatagoryModal