const express = require("express");
const router = express.Router();
const db = require("../db");

const verifyToken = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

router.post("/inv_transactions1", verifyToken, [
    body("id").notEmpty().withMessage("id is required"),
    body("item_id").notEmpty().withMessage("item_id is required"),
    body("crop_cycle_id").notEmpty().withMessage("crop_cycle_id is required"),
    body("type").notEmpty().withMessage("type is required"),
    body("volume").notEmpty().withMessage("volume is required"),
    body("logged_by").notEmpty().withMessage("logged_by is required"),
    body("bill_url").notEmpty().withMessage("bill_url is required"),
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

        const { id, item_id, crop_cycle_id, type, volume, logged_by, bill_url, created_at } = req.body;
        const sql = "INSERT INTO inv_transactions (id, item_id, crop_cycle_id, type, volume, logged_by, bill_url, created_at ) VALUES (?,?,?,?,?,?,?,?)";
        db.query(sql, [id, item_id, crop_cycle_id, type, volume, logged_by, bill_url, created_at], (err, result) => {
            if (err) {
                return res.send(err);
            }
            res.send({
                status: true,
                message: "data saved in inv_transactions table"
            });
        });



    });


router.get("/inv_transactions2", (req, res) => {
    db.query("select * from inv_transactions", (err, result) => {
        if (err) {
            return res.send(err);
        }
        res.send(result);
    });
});








module.exports = router;