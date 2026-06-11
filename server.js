const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors());
app.use(bodyParser.json());





app.get("/token", (req, res) => {
    const token = jwt.sign(
        { user_id: 1 },
        "vishal",
        { expiresIn: "1h" }

    );
    res.json({ token });
});




app.use("/api/users", require("./routes/users"));
app.use("/api/roles", require("./routes/roles"));
app.use("/api/farms", require("./routes/farms"));
app.use("/api/parcels", require("./routes/parcels"));
app.use("/api/crop_cycles", require("./routes/crop_cycles"));
app.use("/api/advances", require("./routes/advances"));

app.use("/api/attendance", require("./routes/attendance"));
app.use("/api/expenses", require("./routes/expenses"));
app.use("/api/inventory_items", require("./routes/inventory_items"));
app.use("/api/media", require("./routes/media"));
app.use("/api/notification", require("./routes/notification"));
app.use("/api/payroll_log", require("./routes/payroll_log"));
app.use("/api/salary_requests", require("./routes/salary_requests"));
app.use("/api/inv_transactions", require("./routes/inv_transactions"));
app.use("/api/wage_config", require("./routes/wage_config"));
app.use("/api/yield", require("./routes/yield"));
app.use("/api/labores", require("./routes/labores"));
app.use("/api/outbox", require("./routes/outbox"));
app.use("/api/tasks", require("./routes/tasks"));




app.listen(3000, () => {
    console.log("Server is running on port 3000");
});