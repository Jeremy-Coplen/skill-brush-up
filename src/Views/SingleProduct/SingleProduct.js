import React, { Component } from "react"
import axios from "axios"
import { Link, withRouter } from "react-router-dom"

import { connect } from "react-redux"
import { updateUserCart, updateUserSubtotal, updateUserTotal } from "../../Ducks/reducer"
import Cart from "../../ReusableComponents/Cart/Cart"
import SiteBanner from "../../ReusableComponents/SiteBanner/SiteBanner"
import SiteFooter from "../../ReusableComponents/SiteFooter/SiteFooter"
import cartIcon from "../../Images/cart.png"
import "./SingleProduct.scss"

class SingleProduct extends Component {
    constructor(props) {
        super(props)

        this.state = {
            product: {},
            cart: [],
            cartShow: false,
        }
    }

    async componentDidMount() {
        try {
            let productRes = await axios.get(`/api/a/get/product/${this.props.match.params.productid}`)
            let cart = this.props.cart

            this.setState({
                product: productRes.data[0],
                cart
            })
        }
        catch(err) {
            alert("Error getting Product info please try again later")
            this.props.history.push("/")
        }
    }

    showCart = () => {
        if(document.getElementById("cart_container_single")) {
            this.setState({
                cartShow: true
            })
    
            document.getElementById("cart_container_single").style.width = "30vw"
        }
        else {
            return
        }
    }

    hideCart = () => {      
        if(document.getElementById("cart_container_single")) {
            this.setState({
                cartShow: false
            })
            
            document.getElementById("cart_container_single").style.width = "0"
        }
        else {
            return
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

    addToCart = async () => {
        try {
            let cart = [...this.props.cart]
            const index = cart.findIndex(e => e.id === this.state.product.id)

            if(index === -1) {
                let newProduct = { ...this.state.product }
                newProduct.qty = 1
                cart.push(newProduct)
            }
            else {
                let newProduct = cart[index]
                newProduct.qty++
                cart[index] = newProduct
            }

            await this.props.updateUserCart(cart)
            this.calculateTotal()
        }
        catch(err) {
            alert("Error adding to cart")
        }
    }

    render() {
        const className = this.state.cartShow ? "cart_icon_none" : "cart_icon"
        return (
            <div className="single_product">
                <SiteBanner />
                <div className="one_item_nav">
                    <Link to="/"><button>Home</button></Link>
                </div>
                <div className="single_product_container">
                    <div className="single_product_info_container">
                        <img src={this.state.product.picture} alt="product"/>
                        <div className="single_product_name_info">
                            <div className="single_product_name_container">
                                <p>{this.state.product.name}</p>
                            </div>
                            <div className="single_product_info">
                                <div className="single_product_description">
                                    <p>{this.state.product.description}</p>
                                </div>
                                <div>
                                    <p>Color:</p>
                                    <p>{this.state.product.color}</p>
                                </div>
                                <div>
                                    <p>Price:</p>
                                    <p>${this.state.product.price}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <button onClick={this.addToCart}>Add To Cart</button>
                </div>
                <SiteFooter />
                <div className={className}>
                    <img src={cartIcon} onClick={this.showCart} alt="cart"/>
                    <p>${this.props.total}</p>
                </div>
                <div id="cart_container_single">
                    <Cart show={this.state.cartShow}
                    hideCart={this.hideCart}
                    cart={this.props.cart}
                    addToCart={this.addToCart}
                    calculateTotal={this.calculateTotal} />
                </div>
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

export default withRouter(connected(SingleProduct))