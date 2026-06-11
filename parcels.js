const express = require("express");
const router = express.Router();
const db = require("../db");

const verifyToken = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

router.post("/parcels1", verifyToken, [
    body("id").notEmpty().withMessage("id is required"),
    body("farm_id").notEmpty().withMessage("farm_id is required"),
    body("parcel_name").notEmpty().withMessage("parcel_name is required"),
    body("area_value").notEmpty().withMessage("area_value is required"),
    body("area_unit").notEmpty().withMessage("area_unit is required"),
    body("owner_name").notEmpty().withMessage("owner_name is required"),
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

    const { id, farm_id, parcel_name, area_value, area_unit, owner_name, created_at } = req.body;
    const sql = "INSERT INTO parcels (id, farm_id, parcel_name, area_value, area_unit, owner_name, created_at ) VALUES (?,?,?,?,?,?,?)";
    db.query(sql, [id, farm_id, parcel_name, area_value, area_unit, owner_name, created_at], (err, result) => {
        if (err) {
            return res.send(err);
        }
        res.send({
            status: true,
            message: "data saved in parcels table"
        });
    });



});


router.get("/parcels2", (req, res) => {
    db.query("select * from parcels", (err, result) => {
        if (err) {
            return res.send(err);
        }
        res.send(result);
    });
});








module.exports = router;