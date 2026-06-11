const express = require("express");
const router = express.Router();
const db = require("../db");

const verifyToken = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

router.post("/attendance1", verifyToken, [
    body("id").notEmpty().withMessage("id is required"),
    body("laborer_id").notEmpty().withMessage("laborer_id is required"),
    body("punch_type").notEmpty().withMessage("punch_type is required"),
    body("method").notEmpty().withMessage("method is required"),
    body("timestamp").notEmpty().withMessage("timestamp is required"),
    body("selfie_url").notEmpty().withMessage("selfie_url is required"),
    body("gps_lat").notEmpty().withMessage("gps_lat is required"),
    body("gps_lng").notEmpty().withMessage("gps_lng is required"),
    body("device_id").notEmpty().withMessage("device_id is required"),
    body("synced_at").notEmpty().withMessage("synced_at is required"),
],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: false,
                errors: errors.array()
            });
        }

        const { id, laborer_id, punch_type, method, timestamp, selfie_url, gps_lat, gps_lng, device_id, synced_at } = req.body;
        const sql = "INSERT INTO attendance (id, laborer_id, punch_type, method, timestamp, selfie_url, gps_lat, gps_lng, device_id, synced_at 	) VALUES (?,?,?,?,?,?,?,?,?,?)";
        db.query(sql, [id, laborer_id, punch_type, method, timestamp, selfie_url, gps_lat, gps_lng, device_id, synced_at], (err, result) => {
            if (err) {
                return res.send(err);
            }
            res.send({
                status: true,
                message: "data saved in attendance table"
            });
        });



    });


router.get("/attendance2", (req, res) => {
    db.query("select * from attendance", (err, result) => {
        if (err) {
            return res.send(err);
        }
        res.send(result);
    });
});








module.exports = router;