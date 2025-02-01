const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Set app dependencies
app.set("receiptSchema", require("./schemas/receipt"));
app.set("receiptStorage", require("./storage/receipt"));
app.set("receiptIdGenerator", require("uuid").v4);
app.set("receiptPointCalculator", require("../../src/app/points/receipt"));
app.set("logger", console);

// Accept JSON requests
app.use(express.json());

// Log incoming HTTP requests
const morgan = require("morgan");
app.use(morgan("combined"));

// Routes
app.use("/receipts", require("./routes/receipts"));

// Listen for requests
app.listen(port, "0.0.0.0", () => {
   console.log(`Server listening on port ${port}.`);
});

module.exports = {
    app,
};