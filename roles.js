const express = require("express");
const router = express.Router();
const db = require("../db");


const verifyToken = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

router.post("/roles1", verifyToken, [
    body("id").notEmpty().withMessage("id is required"),
    body("user_id").notEmpty().withMessage("user_id is required"),
    body("module").notEmpty().withMessage("module is required"),
    body("can_read").notEmpty().withMessage("can_read is required"),
    body("can_write").notEmpty().withMessage("can_write is required"),
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



        const { id, user_id, module, can_read, can_write, created_at } = req.body;
        const sql = "INSERT INTO roles (id, user_id, module, can_read, can_write, created_at) VALUES (?,?,?,?,?,?)";
        db.query(sql, [id, user_id, module, can_read, can_write, created_at], (err, result) => {
            if (err) {
                return res.send(err);
            }
            res.send({
                status: true,
                message: "data saved in roles table"
            });
        });



    });




router.get("/roles2", (req, res) => {
    db.query("select * from roles", (err, result) => {
        if (err) {
            return res.send(err);
        }
        res.send(result);
    });
});









module.exports = router;