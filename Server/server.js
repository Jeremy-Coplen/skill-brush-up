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

app.use((req, res, next) => {
    if (ENVIRONMENT === "DEV") {
        let devAdmin = {
            id: 0,
            username: "DEV"
        }
        req.session.admin = devAdmin
        next()
    }
    else {
        next()
    }
})

// Admin Post Endpoints
app.post("/api/a/login", admin.login)
app.post("/api/a/add/product")
app.post("/api/a/add/catagory", admin.addCatagory)

// Admin Get Endpoints
app.get("/api/a/check-admin-cred", admin.checkAdminCred)
app.get("/api/a/logout", admin.logout)
app.get("/api/a/get/catagories", admin.getCatagories)

massive(CONNECTION_STRING).then(db => {
    app.set("db", db)
    app.listen(port, () => console.log(`Listening on port ${port}`))
}).catch(err => console.log(err))