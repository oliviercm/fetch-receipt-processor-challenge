const express = require("express");
const router = express.Router({ mergeParams: true });

/**
 * Submits a receipt for processing.
 */
router.post("/process", async (req, res, next) => {
    const receipt = req.body;
    const { error: validationError } = req.app.get("receiptSchema").validate(receipt);

    if (validationError) {
        return res.status(400).send("The receipt is invalid.");
    }

    const id = req.app.get("receiptIdGenerator")();
    req.app.get("receiptStorage").putReceipt(id, receipt);

    return res.status(200).json({ id });
});

/**
 * Returns the points awarded for the receipt.
 */
router.get("/:id/points", async (req, res, next) => {
    const receipt = req.app.get("receiptStorage").getReceipt(req.params.id);

    if (!receipt) {
        return res.status(404).send("No receipt found for that ID.");
    }

    const points = req.app.get("receiptPointCalculator").getPointsForReceipt(receipt);

    return res.status(200).json({ points });
});

module.exports = router;