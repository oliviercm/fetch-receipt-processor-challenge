function getPointsForReceipt(receipt) {
    let points = 0;

    // One point for every alphanumeric character in the retailer name.
    points += receipt.retailer.replace(/[^a-z0-9]/gi, "").length;

    // 50 points if the total is a round dollar amount with no cents.
    if (receipt.total.endsWith(".00")) {
        points += 50;
    }

    // 25 points if the total is a multiple of 0.25.
    if (receipt.total.endsWith(".00") || receipt.total.endsWith(".25") || receipt.total.endsWith(".50") || receipt.total.endsWith(".75")) {
        points += 25;
    }

    // 5 points for every two items on the receipt.
    points += 5 * Math.floor(receipt.items.length / 2);

    // If the trimmed length of the item description is a multiple of 3, multiply the price by 0.2 and round up to the nearest integer. The result is the number of points earned.
    for (const item of receipt.items) {
        if (item.shortDescription.trim().length % 3 === 0) {
            points += Math.ceil(Number(item.price) * 0.2);
        }
    }

    // 6 points if the day in the purchase date is odd.
    if (Number(receipt.purchaseDate.slice(-2)) % 2 !== 0) {
        points += 6;
    }

    // 10 points if the time of purchase is after 2:00pm and before 4:00pm.
    const hour = receipt.purchaseTime.slice(0, 2);
    const minute = receipt.purchaseTime.slice(-2);
    if ((hour === "14" && minute !== "00") || hour === "15") {
        points += 10;
    }

    return points;
}

module.exports = { getPointsForReceipt };