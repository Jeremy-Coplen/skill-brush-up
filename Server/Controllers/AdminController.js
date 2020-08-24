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
    }
}