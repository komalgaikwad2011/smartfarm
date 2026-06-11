const express = require("express");
const router = express.Router();
const db = require("../db");

const verifyToken = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

router.post("/crop_cycles1", verifyToken, [
    body("id").notEmpty().withMessage("id is required"),
    body("parcel_id").notEmpty().withMessage("parcel_id is required"),
    body("crop_name").notEmpty().withMessage("crop_name is required"),
    body("variety").notEmpty().withMessage("variety is required"),
    body("sow_date").notEmpty().withMessage("sow_date is required"),
    body("harvest_date").notEmpty().withMessage("harvest_date is required"),
    body("status").notEmpty().withMessage("status is required"),
    body("created_by").notEmpty().withMessage("created_by is required"),
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

        const { id, parcel_id, crop_name, variety, sow_date, harvest_date, status, created_by, created_at } = req.body;
        const sql = "INSERT INTO crop_cycles ( id, parcel_id, crop_name, variety, sow_date, harvest_date, status, created_by, created_at 	) VALUES (?,?,?,?,?,?,?,?,?)";
        db.query(sql, [id, parcel_id, crop_name, variety, sow_date, harvest_date, status, created_by, created_at], (err, result) => {
            if (err) {
                return res.send(err);
            }
            res.send({
                status: true,
                message: "data saved in crop_cycles table"
            });
        });



    });


router.get("/crop_cycles2", (req, res) => {
    db.query("select * from crop_cycles", (err, result) => {
        if (err) {
            return res.send(err);
        }
        res.send(result);
    });
});








module.exports = router;