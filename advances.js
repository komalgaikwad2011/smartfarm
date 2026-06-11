const express = require("express");
const router = express.Router();
const db = require("../db");

const verifyToken = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

router.post("/advances1", verifyToken, [
    body("id").notEmpty().withMessage("id is required"),
    body("laborer_id").notEmpty().withMessage("laborer_id is required"),
    body("amount").notEmpty().withMessage("amount is required"),
    body("reason").notEmpty().withMessage("reason is required"),
    body("disbursed_by").notEmpty().withMessage("disbursed_by is required"),
    body("created_at").notEmpty().withMessage("created_at is required"),
],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: false,
                errors: errors.array()
            });
        }

        const { id, laborer_id, amount, reason, disbursed_by, created_at } = req.body;
        const sql = "INSERT INTO advances (id, laborer_id, amount, reason, disbursed_by, created_at) VALUES (?,?,?,?,?,?)";
        db.query(sql, [id, laborer_id, amount, reason, disbursed_by, created_at], (err, result) => {
            if (err) {
                return res.send(err);
            }
            res.send({
                status: true,
                message: "data saved in advances table"
            });
        });



    });


router.get("/advances2", (req, res) => {
    db.query("select * from advances", (err, result) => {
        if (err) {
            return res.send(err);
        }
        res.send(result);
    });
});








module.exports = router;