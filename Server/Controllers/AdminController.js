const bcrypt = require("bcryptjs")
const { response } = require("express")

module.exports = {
    login: async (req, res) => {
        try {
            const db = req.app.get("db")
            const { username, password } = req.body

            let loginRes = await db.login()

            let adminUsername = loginRes[0].un
            let adminPassword = loginRes[0].pw

            bcrypt.compare(username, adminUsername, (err, response) => {
                if(err) {
                    console.log(err)
                    res.status(500).send("unable to compare")
                }
                else {
                    if(response === false) {
                        res.sendStatus(401)
                    }
                    else {
                        bcrypt.compare(password, adminPassword, (err, response) => {
                            if(err) {
                                console.log(err)
                                res.status(500).send("unable to compare")
                            }
                            else {
                                if(response === false) {
                                    res.sendStatus(401)
                                }
                                else {
                                    let admin = {id: loginRes[0].id, username: username}
                                    req.session.admin = admin
                                    res.sendStatus(200)
                                }
                            }
                        })
                    }
                }
            })
        }
        catch(err) {
            console.log(err)
        }
    },

    logout: (req, res) => {
        try {
            req.session.destroy()
            res.redirect("/#/a/login")
        }
        catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    },

    checkAdminCred: (req, res) => {
        try {
            if(req.session.admin) {
                res.status(200).send(req.session.admin)
            }
            else {
                res.status(403).send("Unauthorized")
            }
        }
        catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    },

    getProduct: async (req, res) => {
        try{
            const db = req.app.get("db")
            const id = Number(req.params.productid)

            let productRes = await db.get_product([id])

            res.status(200).send(productRes)
        }
        catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    },

    getCatagories: async (req, res) => {
        try{
            const db = req.app.get("db")

            let catagoriesRes = await db.get_catagories()

            res.status(200).send(catagoriesRes)
        }
        catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    },

    addProduct: async (req, res) => {
        try{
            const db = req.app.get("db")
            const {
                catagoryType,
                name,
                description,
                color,
                pic,
                price
            } = req.body

            let productRes = await db.add_product([catagoryType, name, description, color, pic, price])
            res.status(200).send(productRes)
        }
        catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    },

    addCatagory: async (req, res) => {
        try {
            const db = req.app.get("db")
            const { name } = req.body

            await db.add_catagory([name])

            res.sendStatus(200)
        }
        catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    },

    updateProductCatagory: async (req, res) => {
        try {
            const db = req.app.get("db")
            const {
                catagory,
                id
            } = req.body

            await db.update_product_catagory([catagory, id])

            res.sendStatus(200)
        }
        catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    },

    updateProductName: async (req, res) => {
        try {
            const db = req.app.get("db")
            const {
                name,
                id
            } = req.body

            await db.update_product_name([name, id])
            res.sendStatus(200)
        }
        catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    },

    updateProductDescription: async (req, res) => {
        try{
            const db = req.app.get("db")
            const {
                description,
                id
            } = req.body

            await db.update_product_description([description, id])

            res.sendStatus(200)
        }
        catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    },

    updateProductColor: async (req, res) => {
        try {
            const db = req.app.get("db")
            const {
                color,
                id
            } = req.body

            await db.update_product_color([color, id])

            res.sendStatus(200)
        }
        catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    },

    updateProductPicture: async (req, res) => {
        try {
            const db = req.app.get("db")
            const {
                picture,
                id
            } = req.body

            await db.update_product_picture([picture, id])

            res.sendStatus(200)
        }
        catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    },

    updateProductPrice: async (req, res) => {
        try {
            const db = req.app.get("db")
            const {
                price,
                id
            } = req.body

            await db.update_product_price([price, id])

            res.sendStatus(200)
        }
        catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    }
}