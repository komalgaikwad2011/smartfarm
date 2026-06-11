const express = require("express");
const router = express.Router();
const db = require("../db");

const verifyToken = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

router.post("/create", verifyToken, [
    body("id").notEmpty().withMessage("id is required"),
    body("farm_id").notEmpty().withMessage("farm_id is required"),
    body("name").notEmpty().withMessage("name is required"),
    body("email").notEmpty().withMessage("email is required"),
    body("phone").notEmpty().withMessage("phone is required"),
    body("role").notEmpty().withMessage("role is required"),
    body("password_hash").notEmpty().withMessage("password_hash is required"),
    body("lang_pref").notEmpty().withMessage("lang_pref is required"),
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

        const { id, farm_id, name, email, phone, role, password_hash, lang_pref, created_at } = req.body;
        const sql = "INSERT INTO users (id,farm_id,name,email,phone,role,password_hash,lang_pref,created_at) VALUES (?,?,?,?,?,?,?,?,?)";
        db.query(sql, [id, farm_id, name, email, phone, role, password_hash, lang_pref, created_at], (err, result) => {
            if (err) {
                return res.send(err);
            }
            res.send({
                status: true,
                message: "user created"
            });
        });



    });


router.get("/list", (req, res) => {
    db.query("select * from users", (err, result) => {
        if (err) {
            return res.send(err);
        }
        res.send(result);
    });
});








module.exports = router;