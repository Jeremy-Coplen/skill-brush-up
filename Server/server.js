require("dotenv").config()
const express = require("express")
const session = require("express-session")
const massive = require("massive")

// Requiring Controllers
const admin = require("./Controllers/AdminController")
const user = require("./Controllers/UserController")

const app = express()

const {
    CONNECTION_STRING,
    SEVER_PORT,
    SECRET,
    ENVIRONMENT
} = process.env

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 0

const port = SEVER_PORT || 3005

app.use(express.json())
app.use(session({
    secret: SECRET,
    resave: false,
    saveUninitialized: true
}))

// app.use((req, res, next) => {
//     if (ENVIRONMENT === "DEV") {
//         let devAdmin = {
//             id: 0,
//             username: "DEV"
//         }
//         req.session.admin = devAdmin
//         next()
//     }
//     else {
//         next()
//     }
// })

// Admin Post Endpoints
app.post("/api/a/login", admin.login)
app.post("/api/a/add/product", admin.addProduct)
app.post("/api/a/add/catagory", admin.addCatagory)

// Admin Get Endpoints
app.get("/api/a/check-admin-cred", admin.checkAdminCred)
app.get("/api/a/logout", admin.logout)
app.get("/api/a/get/product/:productid", admin.getProduct)
app.get("/api/a/get/catagories", admin.getCatagories)

// Admin Put Endpoints
app.put("/api/a/update/product/catagory", admin.updateProductCatagory)
app.put("/api/a/update/product/name", admin.updateProductName)
app.put("/api/a/update/product/description", admin.updateProductDescription)
app.put("/api/a/update/product/color", admin.updateProductColor)
app.put("/api/a/update/product/picture", admin.updateProductPicture)
app.put("/api/a/update/product/price", admin.updateProductPrice)
app.put("/api/a/update/catagory", admin.updateCatagory)

// Admin Delete Endpoints
app.delete("/api/a/delete/product/:productid", admin.deleteProduct)
app.delete("/api/a/delete/catagory/:catagoryid", admin.deleteCatagory)

// User Get Endpoints
app.get("/api/u/get/products", user.getProducts)

massive(CONNECTION_STRING).then(db => {
    app.set("db", db)
    app.listen(port, () => console.log(`Listening on port ${port}`))
}).catch(err => console.log(err))