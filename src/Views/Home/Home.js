import React, { Component } from "react"
import { Link } from "react-router-dom"
import axios from "axios"
import { connect } from "react-redux"

import { updateUserCart, updateUserSubtotal, updateUserTotal } from "../../Ducks/reducer"
import ProductCard from "../../ReusableComponents/ProductCard/ProductCard"
import SiteBanner from "../../ReusableComponents/SiteBanner/SiteBanner"
import SiteFooter from "../../ReusableComponents/SiteFooter/SiteFooter"
import Cart from "../../ReusableComponents/Cart/Cart"
import cartIcon from "../../Images/cart.png"
import "./Home.scss"

class Home extends Component {
    constructor() {
        super()

        this.state = {
            products: [],
            sortedProducts: [],
            catagories: [],
            catagory: 0,
            cartShow: false,
        }
    }

    async componentDidMount() {
        try {
            let productRes = await axios.get("/api/u/get/products")
            let catagoriesRes = await axios.get("/api/a/get/catagories")
            let cart = this.props.cart

            this.setState({
                products: productRes.data,
                sortedProducts: productRes.data,
                catagories: catagoriesRes.data,
                cart
            })
        }
        catch(err) {
            console.log(err)
            alert("Error grabbing product information please try again later")
        }
    }

    updateCatagory = (e) => {
        let sortedProducts = []

        if(Number(e.target.value) === 0) {
            sortedProducts = this.state.products
        }
        else {
            for(let i = 0; i < this.state.products.length; i++) {
                if(this.state.products[i].catagory === Number(e.target.value)) {
                    sortedProducts.push(this.state.products[i])
                }
            }
        }

        this.setState({
            [e.target.name]: e.target.value,
            sortedProducts
        })
    }

    showCart = () => {
        if(document.getElementById("cart_container")) {
            this.setState({
                cartShow: true
            })
    
            document.getElementById("cart_container").style.width = "30vw"
        }
        else {
            return
        }
    }

    hideCart = () => {      
        if(document.getElementById("cart_container")) {
            this.setState({
                cartShow: false
            })
            
            document.getElementById("cart_container").style.width = "0"
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
        let catagories = this.state.catagories.map((type, i) => {
            return (
            <option key={i} value={type.id}>{type.name}</option>
            )
        })
        let sortedProducts = this.state.sortedProducts.map((product, i) => {
            return (
                <ProductCard key={i} product={product} />
            )
        })
        return (
            <div className="home">
                <SiteBanner />
                <div className="one_item_nav">
                    <Link to="/about"><button>About</button></Link>
                </div>
                <div className="home_content_container">
                     <div className="sort_selection_container">
                         <div className="select_container">
                             <p>Catagory:</p>
                            <select name="catagory"
                            onChange={this.updateCatagory} >
                                <option value={0}>All</option>
                                {catagories}
                            </select>
                         </div>
                    </div>
                    <div className="home_products_container">
                        {sortedProducts}
                    </div>
                </div>
                <div className={className}>
                    <img src={cartIcon} onClick={this.showCart} alt="cart"/>
                    <p>${this.props.total}</p>
                </div>
                <div id="cart_container">
                    <Cart show={this.state.cartShow}
                    hideCart={this.hideCart}
                    cart={this.props.cart}
                    addToCart={this.addToCart}
                    calculateTotal={this.calculateTotal} />
                </div>
                <SiteFooter />
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

export default connected(Home)