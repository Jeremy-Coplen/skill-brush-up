import React, { Component } from "react"
import { connect } from "react-redux"

import { updateUserCart, updateUserSubtotal, updateUserTotal } from "../../Ducks/reducer"
import CartItem from "../../ReusableComponents/CartItem/CartItem"
import "./Cart.scss"

class Cart extends Component {
    addToQty = async (e) => {
        try {
            console.log("hit")
            let cart = [...this.props.cart]
            let index = cart.findIndex(elem => elem.id === Number(e.target.name))

            let productCopy = { ...cart[index] }
            productCopy.qty++
            cart[index] = productCopy

            this.props.updateUserCart(cart)
            this.calculateTotal()

        }
        catch(err) {
            alert("Error adding to cart try again later")
        }
    }

    removeFromCart = async (e) => {
        try {
            let cart = [...this.props.cart]
            let index = cart.findIndex(elem => elem.id === Number(e.target.name))
    
            if(cart[index].qty === 1) {
                cart.splice(index, 1)
                await this.props.updateUserCart(cart)
            }
            else {
                let productCopy = { ...cart[index] }
                productCopy.qty--
                cart[index] = productCopy

                await this.props.updateUserCart(cart)
                this.calculateTotal()
            }
        }
        catch(err) {
            alert("Error removing from cart try again later")
        }
    }

    calculateTotal = async () => {
        const reducer = (total, current) => {
            if(current.qty) {
                return total + (Number(current.price) * current.qty)
            }
            else {
                return total + Number(current.price)
            }
        }
        
        let subtotal = Math.round(this.props.cart.reduce(reducer, 0) * 1e2) / 1e2
        let total = Math.round(Number((subtotal * 1.0485) *1e2)) / 1e2

        await this.props.updateUserSubtotal(subtotal)
        await this.props.updateUserTotal(total)
    }

    render() {
        const className = this.props.show ? "cart" : "cart_display_none"
        const cartItems = this.props.cart.map((item, i) => {
            return (
                <CartItem key={i} 
                cartItem={item}
                addToQty={this.addToQty}
                removeFromCart={this.removeFromCart} />
            )
        })
        return (
            <div className={className}>
                {cartItems}
                <button className="cart_x" 
                onClick={this.props.hideCart}>X</button>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        cart: state.user.cart,
        subtotal: state.user.subtotal,
        total: state.user.total
    }
}

const actionOutputs = {
    updateUserCart: updateUserCart,
    updateUserSubtotal: updateUserSubtotal,
    updateUserTotal: updateUserTotal
}

const connected = connect(mapStateToProps, actionOutputs)

export default connected(Cart)