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

            console.log(username, password)

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
    }
}