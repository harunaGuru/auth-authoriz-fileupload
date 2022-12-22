const express = require('express')
const router = express.Router();
const { isAuthenticated, isSeller } = require('../middlewares/auth')
const upload = require('../utils/fileupload');

router.post('/create', isAuthenticated, isSeller, (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            console.log("incoming err ", err)
            return res.status(500).send(err)
        }
        const { name, price } = req.body;
        if (!name || !price || !req.file) {
            return res.status(400).json({
                err: "Name, price and file are required field"
            })
        }
        if (Number.isNaN(price)) {
            return res.status(400).json({
                err: "price should be a number"
            })
        }
        let productDetails = {
            name,
            price,
            content: req.file.path
        }
        return res.status(200).json({
            status: "ok",
            productDetails
        })
    })
})

module.exports = router;