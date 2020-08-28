import React, { Component } from "react"
import axios from "axios"

import "./AdminEditCatagory.scss"

class AdminEditCatagory extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: "",
            editing: false
        }
    }

    async componentDidMount() {
        this.setState({
            name: this.props.catagory.name
        })
    }

    updateInput = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    updateEditing = () => {
        this.setState({
            editing: !this.state.editing
        })
    }

    updateCatagory = async () => {
        try {
            if(this.state.name === this.props.catagory.name) {
                this.setState({
                    editing: false
                })
            }
            else {
                let name = this.state.name
                let id = this.props.catagory.id

                this.setState({
                    editing: false
                })
    
                await axios.put("/api/a/update/catagory", { name, id })

                alert("Successfuly updated catagory")
            }
        }
        catch(err) {
            alert("Error updating catagory please try again later")
        }
    }

    render() {
        return (
            <div className="admin_edit_catagory">
                <p>Name:</p>
                {
                    this.state.editing
                    ?
                        <div>
                            <input type="text"
                            placeholder="Name"
                            name="name"
                            value={this.state.name}
                            onChange={this.updateInput} />
                            <button onClick={this.updateCatagory}>Update Catagory</button>
                        </div>
                    :
                        <div>
                            <p>{this.state.name}</p>
                            <button onClick={this.updateEditing}>Edit</button>
                        </div>
                }
            </div>
        )
    }
}

export default AdminEditCatagory