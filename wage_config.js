const express = require("express");
const router = express.Router();
const db = require("../db");

const verifyToken = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

router.post("/wage_config", verifyToken, [
    body("id").notEmpty().withMessage("id is required"),
    body("farm_id").notEmpty().withMessage("farm_id is required"),
    body("skill_level").notEmpty().withMessage("skill_level is required"),
    body("zone").notEmpty().withMessage("zone is required"),
    body("basic_wage").notEmpty().withMessage("basic_wage is required"),
    body("vda").notEmpty().withMessage("vda is required"),
    body("effective_from").notEmpty().withMessage("effective_from is required"),
],
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                status: false,
                errors: errors.array()
            });
        }

        const { id, farm_id, skill_level, zone, basic_wage, vda, effective_from } = req.body;
        const sql = "INSERT INTO wage_config (id, farm_id, skill_level, zone, basic_wage, vda, effective_from ) VALUES (?,?,?,?,?,?,?)";
        db.query(sql, [id, farm_id, skill_level, zone, basic_wage, vda, effective_from], (err, result) => {
            if (err) {
                return res.send(err);
            }
            res.send({
                status: true,
                message: "data saved in wage_config table"
            });
        });



    });


router.get("/wage_config2", (req, res) => {
    db.query("select * from wage_config", (err, result) => {
        if (err) {
            return res.send(err);
        }
        res.send(result);
    });
});








module.exports = router;