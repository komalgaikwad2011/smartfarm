const express = require("express");
const router = express.Router();
const db = require("../db");

const verifyToken = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

router.post("/inventory_items1", verifyToken, [
    body("id").notEmpty().withMessage("id is required"),
    body("farm_id").notEmpty().withMessage("farm_id is required"),
    body("item_name").notEmpty().withMessage("item_name is required"),
    body("category").notEmpty().withMessage("category is required"),
    body("unit_type").notEmpty().withMessage("unit_type is required"),
    body("current_qty").notEmpty().withMessage("current_qty is required"),
    body("threshold_qty").notEmpty().withMessage("threshold_qty is required"),
],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: false,
                errors: errors.array()
            });
        }

        const { id, farm_id, item_name, category, unit_type, current_qty, threshold_qty } = req.body;
        const sql = "INSERT INTO inventory_items (id, farm_id, item_name, category, unit_type, current_qty, threshold_qty 	) VALUES (?,?,?,?,?,?,?)";
        db.query(sql, [id, farm_id, item_name, category, unit_type, current_qty, threshold_qty], (err, result) => {
            if (err) {
                return res.send(err);
            }
            res.send({
                status: true,
                message: "data saved in inventory_items table"
            });
        });



    });


router.get("/inventory_items2", (req, res) => {
    db.query("select * from inventory_items", (err, result) => {
        if (err) {
            return res.send(err);
        }
        res.send(result);
    });
});








module.exports = router;