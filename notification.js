const express = require("express");
const router = express.Router();
const db = require("../db");

const verifyToken = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

router.post("/notification1", verifyToken, [
    body("id").notEmpty().withMessage("id is required"),
    body("user_id").notEmpty().withMessage("user_id is required"),
    body("type").notEmpty().withMessage("type is required"),
    body("message").notEmpty().withMessage("message is required"),
    body("read_at").notEmpty().withMessage("read_at is required"),
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

        const { id, user_id, type, message, read_at, created_at } = req.body;
        const sql = "INSERT INTO notification(id, user_id, type, message, read_at, created_at	) VALUES (?,?,?,?,?,?)";
        db.query(sql, [id, user_id, type, message, read_at, created_at], (err, result) => {
            if (err) {
                return res.send(err);
            }
            res.send({
                status: true,
                message: "data saved in notificationtable"
            });
        });



    });


router.get("/notification2", (req, res) => {
    db.query("select * from notification", (err, result) => {
        if (err) {
            return res.send(err);
        }
        res.send(result);
    });
});








module.exports = router;