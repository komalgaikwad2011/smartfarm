const express = require("express");
const router = express.Router();
const db = require("../db");

const verifyToken = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

router.post("/tasks1", verifyToken, [
    body("id").notEmpty().withMessage("id is required"),
    body("farm_id").notEmpty().withMessage("farm_id is required"),
    body("crop_cycle_id").notEmpty().withMessage("crop_cycle_id is required"),
    body("task_type").notEmpty().withMessage("task_type is required"),
    body("description").notEmpty().withMessage("description is required"),
    body("assigned_to").notEmpty().withMessage("assigned_to is required"),
    body("assigned_date").notEmpty().withMessage("assigned_date is required"),
    body("status").notEmpty().withMessage("status is required"),
],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: false,
                errors: errors.array()
            });
        }


        const { id, farm_id, crop_cycle_id, task_type, description, assigned_to, assigned_date, status } = req.body;
        const sql = "INSERT INTO tasks ( id, farm_id, crop_cycle_id, task_type, description, assigned_to, assigned_date, status) VALUES (?,?,?,?,?,?,?,?)";
        db.query(sql, [id, farm_id, crop_cycle_id, task_type, description, assigned_to, assigned_date, status], (err, result) => {
            if (err) {
                return res.send(err);
            }
            res.send({
                status: true,
                message: "data saved in tasks table"
            });
        });



    });


router.get("/tasks2", (req, res) => {
    db.query("select * from tasks", (err, result) => {
        if (err) {
            return res.send(err);
        }
        res.send(result);
    });
});








module.exports = router;