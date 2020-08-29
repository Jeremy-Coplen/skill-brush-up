import React from "react"

import "./CartItem.scss"

function CartItem(props) {
    return (
        <div className="cart_item">
            <div className="cart_item_info">
                <img src={props.cartItem.picture} alt=""/>
                <div>
                    <p>{props.cartItem.name}</p>
                    <p>Price: {props.cartItem.price}</p>
                    <p>Qty: {props.cartItem.qty}</p>
                </div>
            </div>
            <div>
                <button name={`${props.cartItem.id}`} 
                onClick={props.removeFromCart}>-</button>
                <button name={`${props.cartItem.id}`} 
                onClick={props.addToQty}>+</button>
            </div>
        </div>
    )
}

export default CartItem