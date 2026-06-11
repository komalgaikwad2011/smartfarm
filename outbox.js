const express = require("express");
const router = express.Router();
const db = require("../db");

const verifyToken = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

router.post("/outbox1", verifyToken, [
    body("id").notEmpty().withMessage("id is required"),
    body(" device_id").notEmpty().withMessage("device_id is required"),
    body("event_type").notEmpty().withMessage("event_type is required"),
    body("payload").notEmpty().withMessage("payload is required"),      
    body("created_at").notEmpty().withMessage("created_at is required"),
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



        const { id, device_id, event_type, payload, created_at, synced_at } = req.body;
        const sql = "INSERT INTO outbox (id, device_id, event_type, payload, created_at, synced_at 	) VALUES (?,?,?,?,?,?)";
        db.query(sql, [id, device_id, event_type, payload, created_at, synced_at], (err, result) => {
            if (err) {
                return res.send(err);
            }
            res.send({
                status: true,
                message: "data saved in outbox table"
            });
        });



    });


router.get("/outbox2", (req, res) => {
    db.query("select * from outbox", (err, result) => {
        if (err) {
            return res.send(err);
        }
        res.send(result);
    });
});








module.exports = router;