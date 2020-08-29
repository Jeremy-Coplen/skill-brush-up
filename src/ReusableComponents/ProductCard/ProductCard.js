import React from "react"
import { Link } from "react-router-dom"

import "./ProductCard.scss"

function ProductCard(props) {
    return (
        <Link className="link" to={`/p/${props.product.id}`}>
            <div className="product_card">
                <img src={props.product.picture} alt="product"/>
                <p>{props.product.name}</p>
            </div>
        </Link>
    )
}

export default ProductCard