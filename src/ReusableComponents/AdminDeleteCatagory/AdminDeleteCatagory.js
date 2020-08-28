import React, { Component } from "react"

import "./AdminDeleteCatagory.scss"
import axios from "axios"

class AdminDeleteCatagory extends Component {
    confirmDelete = () => {
        if(window.confirm("Are you sure you want to delete this catagory ALL products in this catagory will be deleted")) {
            this.deleteCatagory()
        }
        else {
            return
        }
    }

    deleteCatagory = async () => {
        try {
            await axios.delete(`/api/a/delete/catagory/${this.props.catagory.id}`)

            this.props.getCatagoriesAgain()

            alert("Catagory deleted successfully")
        }
        catch(err) {
            alert("Error deleting catagory try again later")
        }
    }

    render() {
        return (
            <div className="admin_delete_catagory">
                <p>Name:</p>
                <p>{this.props.catagory.name}</p>
                <button onClick={this.confirmDelete}>Delete Catagory</button>
            </div>
        )
    }
}

export default AdminDeleteCatagory