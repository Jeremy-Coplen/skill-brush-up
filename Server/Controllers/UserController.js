module.exports = {
    getProducts: async (req, res) => {
        try {
            const db = req.app.get("db")

            let productRes = await db.get_products()

            res.status(200).send(productRes)
        }
        catch(err) {
            console.log(err)
            res.sendStatus(500)
        }
    }
}