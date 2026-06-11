const express = require("express");
const router = express.Router();
const db = require("../db");

const verifyToken = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

router.post("/salary_requests1", verifyToken, [
    body("id").notEmpty().withMessage("id is required"),
    body("laborer_id").notEmpty().withMessage("laborer_id is required"),
    body("requested_at").notEmpty().withMessage("requested_at is required"),
    body("status").notEmpty().withMessage("status is required"),
    body("approved_by").notEmpty().withMessage("approved_by is required"),
    body("approved_at").notEmpty().withMessage("approved_at is required"),
    body("rejection_reason").notEmpty().withMessage("rejection_reason is required"),
],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: false,
                errors: errors.array()
            });
        }

        const { id, laborer_id, requested_at, status, approved_by, approved_at, rejection_reason } = req.body;
        const sql = "INSERT INTO salary_requests ( id, laborer_id, requested_at, status, approved_by, approved_at, rejection_reason ) VALUES (?,?,?,?,?,?,?)";
        db.query(sql, [id, laborer_id, requested_at, status, approved_by, approved_at, rejection_reason], (err, result) => {
            if (err) {
                return res.send(err);
            }
            res.send({
                status: true,
                message: "data saved in salary_requests table"
            });
        });



    });


router.get("/roles2", (req, res) => {
    db.query("select * from salary_requests", (err, result) => {
        if (err) {
            return res.send(err);
        }
        res.send(result);
    });
});








module.exports = router;