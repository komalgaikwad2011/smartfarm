const express = require("express");
const router = express.Router();
const db = require("../db");

const verifyToken = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

router.post("/labores1", verifyToken, [
    body("id").notEmpty().withMessage("id is required"),
    body("farm_id").notEmpty().withMessage("farm_id is required"),
    body("user_id").notEmpty().withMessage("user_id is required"),
    body("skill_level").notEmpty().withMessage("skill_level is required"),
    body("zone").notEmpty().withMessage("zone is required"),
    body("biometric_id").notEmpty().withMessage("biometric_id is required"),
    body("photo_url").notEmpty().withMessage("photo_url is required"),
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

        const { id, farm_id, user_id, name, skill_level, zone, biometric_id, photo_url, created_at } = req.body;
        const sql = "INSERT INTO labores (id, farm_id, user_id, name, skill_level, zone, biometric_id, photo_url, created_at  	) VALUES (?,?,?,?,?,?)";
        db.query(sql, [id, farm_id, user_id, name, skill_level, zone, biometric_id, photo_url, created_at], (err, result) => {
            if (err) {
                return res.send(err);
            }
            res.send({
                status: true,
                message: "data saved in labores table"
            });
        });



    });


router.get("/labores2", (req, res) => {
    db.query("select * from labores", (err, result) => {
        if (err) {
            return res.send(err);
        }
        res.send(result);
    });
});








module.exports = router;