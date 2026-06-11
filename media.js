const express = require("express");
const router = express.Router();
const db = require("../db");

const verifyToken = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

router.post("/media1", verifyToken, [
    body("id").notEmpty().withMessage("id is required"),
    body("reference_id").notEmpty().withMessage("reference_id is required"),
    body("reference_type").notEmpty().withMessage("reference_type is required"),
    body("file_url").notEmpty().withMessage("file_url is required"),
    body("uploaded_by").notEmpty().withMessage("uploaded_by is required"),
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

        (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    status: false,
                    errors: errors.array()
                });
            }

            const { id, reference_id, reference_type, file_url, uploaded_by, created_at } = req.body;
            const sql = "INSERT INTO media ( id, reference_id, reference_type, file_url, uploaded_by, created_at 	) VALUES (?,?,?,?,?,?)";
            db.query(sql, [id, reference_id, reference_type, file_url, uploaded_by, created_at], (err, result) => {
                if (err) {
                    return res.send(err);
                }
                res.send({
                    status: true,
                    message: "data saved in farms table"
                });
            });



        });


router.get("/media2", (req, res) => {
    db.query("select * from media", (err, result) => {
        if (err) {
            return res.send(err);
        }
        res.send(result);
    });
});








module.exports = router;