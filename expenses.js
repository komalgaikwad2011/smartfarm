const express = require("express");
const router = express.Router();
const db = require("../db");

const verifyToken = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

router.post("/expenses1", verifyToken, [
    body("id").notEmpty().withMessage("id is required"),
    body("farm_id").notEmpty().withMessage("farm_id is required"),
    body("crop_cycle_id").notEmpty().withMessage("crop_cycle_id is required"),
    body("category").notEmpty().withMessage("category is required"),
    body("amount").notEmpty().withMessage("amount is required"),
    body("description").notEmpty().withMessage("description is required"),
    body("invoice_url").notEmpty().withMessage("invoice_url is required"),
    body("logged_by").notEmpty().withMessage("logged_by is required"),
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

        const { id, farm_id, crop_cycle_id, category, amount, description, invoice_url, logged_by, created_at } = req.body;
        const sql = "INSERT INTO expenses ( id, farm_id, crop_cycle_id, category, amount, description, invoice_url, logged_by, created_at  	) VALUES (?,?,?,?,?,?,?,?,?)";
        db.query(sql, [id, farm_id, crop_cycle_id, category, amount, description, invoice_url, logged_by, created_at], (err, result) => {
            if (err) {
                return res.send(err);
            }
            res.send({
                status: true,
                message: "data saved in expenses table"
            });
        });



    });


router.get("/expenses2", (req, res) => {
    db.query("select * from expenses", (err, result) => {
        if (err) {
            return res.send(err);
        }
        res.send(result);
    });
});








module.exports = router;