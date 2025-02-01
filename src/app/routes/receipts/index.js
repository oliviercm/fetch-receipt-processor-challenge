const express = require("express");
const router = express.Router({ mergeParams: true });

/**
 * Submits a receipt for processing.
 */
router.post("/process", (req, res, next) => {
    try {
        const { error: validationError, value: receipt } = req.app.get("receiptSchema").validate(req.body);

        if (validationError) {
            return res.status(400).send("The receipt is invalid.");
        }

        const id = req.app.get("receiptIdGenerator")();
        req.app.get("receiptStorage").putReceipt(id, receipt);

        return res.status(200).json({ id });
    } catch (e) {
        req.app.get("logger").error(e);
        return res.status(500).send();
    }
});

/**
 * Returns the points awarded for the receipt.
 */
router.get("/:id/points", (req, res, next) => {
    try {
        const receipt = req.app.get("receiptStorage").getReceipt(req.params.id);

        if (!receipt) {
            return res.status(404).send("No receipt found for that ID.");
        }

        const points = req.app.get("receiptPointCalculator").getPointsForReceipt(receipt);

        return res.status(200).json({ points });
    } catch (e) {
        req.app.get("logger").error(e);
        return res.status(500).send();
    }
});

module.exports = router;