const express = require("express");
const router = express.Router();
const db = require("../db");

const verifyToken = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

router.post("/yield1", verifyToken, [
    body("id").notEmpty().withMessage("id is required"),
    body("crop_cycle_id").notEmpty().withMessage("crop_cycle_id is required"),
    body("harvest_qty").notEmpty().withMessage("harvest_qty is required"),
    body("qty_unit").notEmpty().withMessage("qty_unit is required"),
    body("price_per_unit").notEmpty().withMessage("price_per_unit is required"),
    body("total_revenue").notEmpty().withMessage("total_revenue is required"),
    body("buyer_name").notEmpty().withMessage("buyer_name is required"),
    body("buyer_invoice_url").notEmpty().withMessage("buyer_invoice_url is required"),
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

        const { id, crop_cycle_id, harvest_qty, qty_unit, price_per_unit, total_revenue, buyer_name, buyer_invoice_url, logged_by, created_at } = req.body;
        const sql = "INSERT INTO yield (id, crop_cycle_id, harvest_qty, qty_unit, price_per_unit, total_revenue, buyer_name, buyer_invoice_url, logged_by, created_at) VALUES (?,?,?,?,?,?,?,?,?,?)";
        db.query(sql, [id, crop_cycle_id, harvest_qty, qty_unit, price_per_unit, total_revenue, buyer_name, buyer_invoice_url, logged_by, created_at], (err, result) => {
            if (err) {
                return res.send(err);
            }
            res.send({
                status: true,
                message: "data saved in yield_data table"
            });
        });



    });


router.get("/yield2", (req, res) => {
    db.query("select * from yield", (err, result) => {
        if (err) {
            return res.send(err);
        }
        res.send(result);
    });
});








module.exports = router;