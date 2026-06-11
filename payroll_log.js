const express = require("express");
const router = express.Router();
const db = require("../db");

const verifyToken = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

router.post("/payroll_log1", verifyToken, [
    body("id").notEmpty().withMessage("id is required"),
    body("laborer_id").notEmpty().withMessage("laborer_id is required"),
    body("period_start").notEmpty().withMessage("period_start is required"),
    body("period_end").notEmpty().withMessage("period_end is required"),
    body("days_present").notEmpty().withMessage("days_present is required"),
    body("basic_wage").notEmpty().withMessage("basic_wage is required"),
    body("vda").notEmpty().withMessage("vda is required"),
    body("advance_deducted").notEmpty().withMessage("advance_deducted is required"),
    body("net_payable").notEmpty().withMessage("net_payable is required"),
    body("paid_at").notEmpty().withMessage("paid_at is required"),
],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: false,
                errors: errors.array()
            });
        }

        const { id, laborer_id, period_start, period_end, days_present, basic_wage, vda, advance_deducted, net_payable, paid_at } = req.body;
        const sql = "INSERT INTO payroll_log (id, laborer_id, period_start, period_end, days_present, basic_wage, vda, advance_deducted, net_payable, paid_at  	) VALUES (?,?,?,?,?,?,?,?,?,?)";
        db.query(sql, [id, laborer_id, period_start, period_end, days_present, basic_wage, vda, advance_deducted, net_payable, paid_at], (err, result) => {
            if (err) {
                return res.send(err);
            }
            res.send({
                status: true,
                message: "data saved in payroll_log table"
            });
        });



    });


router.get("/payroll_log2", (req, res) => {
    db.query("select * from payroll_log", (err, result) => {
        if (err) {
            return res.send(err);
        }
        res.send(result);
    });
});








module.exports = router;