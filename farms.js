const express = require("express");
const router = express.Router();
const db = require("../db");



const verifyToken = require("../middleware/auth");
const { body, validationResult } = require("express-validator");

router.post("/farms1", verifyToken, [
    body("id").notEmpty().withMessage("id is required"),
    body("users_id").notEmpty().withMessage("users_id is required"),
    body("farm_name").notEmpty().withMessage("farm_name is required"),
    body("address").notEmpty().withMessage("address is required"),
    body("total_area_acres").notEmpty().withMessage("total_area_acres  is required"),
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



        const { id, users_id, farm_name, address, total_area_acres, created_at } = req.body;
        const sql = "INSERT INTO farms (id 	,users_id ,	farm_name ,	address ,	total_area_acres ,	created_at 	) VALUES (?,?,?,?,?,?)";
        db.query(sql, [id, users_id, farm_name, address, total_area_acres, created_at], (err, result) => {
            if (err) {
                return res.send(err);
            }
            res.send({
                status: true,
                message: "data saved in farms table"
            });
        });



    });


router.get("/farms2", (req, res) => {
    db.query("select * from farms", (err, result) => {
        if (err) {
            return res.send(err);
        }
        res.send(result);
    });
});








module.exports = router;