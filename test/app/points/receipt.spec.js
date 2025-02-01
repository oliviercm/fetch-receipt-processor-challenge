const { expect } = require("chai");

describe("receipt points", function () {
    const { getPointsForReceipt } = require("../../../src/app/points/receipt");

    it("calculates the correct number of points #1", function () {
        // Total Points: 28
        // Breakdown:
        //     6 points - retailer name has 6 characters
        //     10 points - 5 items (2 pairs @ 5 points each)
        //     3 Points - "Emils Cheese Pizza" is 18 characters (a multiple of 3)
        //                 item price of 12.25 * 0.2 = 2.45, rounded up is 3 points
        //     3 Points - "Klarbrunn 12-PK 12 FL OZ" is 24 characters (a multiple of 3)
        //                 item price of 12.00 * 0.2 = 2.4, rounded up is 3 points
        //     6 points - purchase day is odd
        // + ---------
        // = 28 points
        expect(getPointsForReceipt({
            "retailer": "Target",
            "purchaseDate": "2022-01-01",
            "purchaseTime": "13:01",
            "items": [
                {
                    "shortDescription": "Mountain Dew 12PK",
                    "price": "6.49"
                },{
                    "shortDescription": "Emils Cheese Pizza",
                    "price": "12.25"
                },{
                    "shortDescription": "Knorr Creamy Chicken",
                    "price": "1.26"
                },{
                    "shortDescription": "Doritos Nacho Cheese",
                    "price": "3.35"
                },{
                    "shortDescription": "   Klarbrunn 12-PK 12 FL OZ  ",
                    "price": "12.00"
                }
            ],
            "total": "35.35"
        })).to.equal(28);
    });

    it("calculates the correct number of points #2", function () {
        // Total Points: 109
        // Breakdown:
        //     50 points - total is a round dollar amount
        //     25 points - total is a multiple of 0.25
        //     14 points - retailer name (M&M Corner Market) has 14 alphanumeric characters
        //                 note: '&' is not alphanumeric
        //     10 points - 2:33pm is between 2:00pm and 4:00pm
        //     10 points - 4 items (2 pairs @ 5 points each)
        // + ---------
        // = 109 points
        expect(getPointsForReceipt({
            "retailer": "M&M Corner Market",
            "purchaseDate": "2022-03-20",
            "purchaseTime": "14:33",
            "items": [
                {
                    "shortDescription": "Gatorade",
                    "price": "2.25"
                },{
                    "shortDescription": "Gatorade",
                    "price": "2.25"
                },{
                    "shortDescription": "Gatorade",
                    "price": "2.25"
                },{
                    "shortDescription": "Gatorade",
                    "price": "2.25"
                }
            ],
            "total": "9.00"
        })).to.equal(109);
    });

    it("calculates a minimum of 0 points", function () {
        expect(getPointsForReceipt({
            "retailer": "",
            "purchaseDate": "2022-03-20",
            "purchaseTime": "00:00",
            "items": [
                {
                    "shortDescription": "Gatorade",
                    "price": "0.01"
                }
            ],
            "total": "0.01"
        })).to.equal(0);
    });

    it("awards a point for alphanumeric character in retailer name", function () {
        expect(getPointsForReceipt({
            "retailer": "a",
            "purchaseDate": "2022-03-20",
            "purchaseTime": "00:00",
            "items": [
                {
                    "shortDescription": "Gatorade",
                    "price": "0.01"
                }
            ],
            "total": "0.01"
        })).to.equal(1);
    });

    it("does not award a point for non-alphanumeric character in retailer name", function () {
        expect(getPointsForReceipt({
            "retailer": "&",
            "purchaseDate": "2022-03-20",
            "purchaseTime": "00:00",
            "items": [
                {
                    "shortDescription": "Gatorade",
                    "price": "0.01"
                }
            ],
            "total": "0.01"
        })).to.equal(0);
    });

    it("awards 50 + 25 (75) points if the total is a round dollar amount with no cents", function () {
        // 50 points for round dollar amount, 25 points for multiple of 0.25
        expect(getPointsForReceipt({
            "retailer": "",
            "purchaseDate": "2022-03-20",
            "purchaseTime": "00:00",
            "items": [
                {
                    "shortDescription": "Gatorade",
                    "price": "1.00"
                }
            ],
            "total": "1.00"
        })).to.equal(75);
    });

    it("awards 25 points if the total is a multiple of 0.25", function () {
        expect(getPointsForReceipt({
            "retailer": "",
            "purchaseDate": "2022-03-20",
            "purchaseTime": "00:00",
            "items": [
                {
                    "shortDescription": "Gatorade",
                    "price": "0.25"
                }
            ],
            "total": "0.25"
        })).to.equal(25);

        expect(getPointsForReceipt({
            "retailer": "",
            "purchaseDate": "2022-03-20",
            "purchaseTime": "00:00",
            "items": [
                {
                    "shortDescription": "Gatorade",
                    "price": "0.50"
                }
            ],
            "total": "0.50"
        })).to.equal(25);

        expect(getPointsForReceipt({
            "retailer": "",
            "purchaseDate": "2022-03-20",
            "purchaseTime": "00:00",
            "items": [
                {
                    "shortDescription": "Gatorade",
                    "price": "0.75"
                }
            ],
            "total": "0.75"
        })).to.equal(25);
    });

    it("awards 5 points for every two items on the receipt", function () {
        expect(getPointsForReceipt({
            "retailer": "",
            "purchaseDate": "2022-03-20",
            "purchaseTime": "00:00",
            "items": [
                {
                    "shortDescription": "Gatorade",
                    "price": "0.01"
                },
                {
                    "shortDescription": "Gatorade",
                    "price": "0.01"
                },
                {
                    "shortDescription": "Gatorade",
                    "price": "0.01"
                }
            ],
            "total": "0.01"
        })).to.equal(5);
    });

    it("awards points for items with a trimmed description length multiple of 3", function () {
        expect(getPointsForReceipt({
            "retailer": "",
            "purchaseDate": "2022-03-20",
            "purchaseTime": "00:00",
            "items": [
                {
                    "shortDescription": "abc",
                    "price": "10.01"
                }
            ],
            "total": "0.01"
        })).to.equal(3);
    });

    it("awards 6 points if the day in the purchase date is odd", function () {
        expect(getPointsForReceipt({
            "retailer": "",
            "purchaseDate": "2022-03-21",
            "purchaseTime": "00:00",
            "items": [
                {
                    "shortDescription": "Gatorade",
                    "price": "0.01"
                }
            ],
            "total": "0.01"
        })).to.equal(6);
    });

    it("awards 10 points if the time of purchase is after 2:00pm and before 4:00pm", function () {
        expect(getPointsForReceipt({
            "retailer": "",
            "purchaseDate": "2022-03-20",
            "purchaseTime": "15:00",
            "items": [
                {
                    "shortDescription": "Gatorade",
                    "price": "0.01"
                }
            ],
            "total": "0.01"
        })).to.equal(10);
    });

    it("awards 10 points if the time of purchase is right after 2:00pm", function () {
        expect(getPointsForReceipt({
            "retailer": "",
            "purchaseDate": "2022-03-20",
            "purchaseTime": "14:01",
            "items": [
                {
                    "shortDescription": "Gatorade",
                    "price": "0.01"
                }
            ],
            "total": "0.01"
        })).to.equal(10);
    });

    it("awards 10 points if the time of purchase is right before 4:00pm", function () {
        expect(getPointsForReceipt({
            "retailer": "",
            "purchaseDate": "2022-03-20",
            "purchaseTime": "15:59",
            "items": [
                {
                    "shortDescription": "Gatorade",
                    "price": "0.01"
                }
            ],
            "total": "0.01"
        })).to.equal(10);
    });

    it("does not award points if the time of purchase is 2:00pm", function () {
        expect(getPointsForReceipt({
            "retailer": "",
            "purchaseDate": "2022-03-20",
            "purchaseTime": "14:00",
            "items": [
                {
                    "shortDescription": "Gatorade",
                    "price": "0.01"
                }
            ],
            "total": "0.01"
        })).to.equal(0);
    });

    it("does not award points if the time of purchase is 4:00pm", function () {
        expect(getPointsForReceipt({
            "retailer": "",
            "purchaseDate": "2022-03-20",
            "purchaseTime": "16:00",
            "items": [
                {
                    "shortDescription": "Gatorade",
                    "price": "0.01"
                }
            ],
            "total": "0.01"
        })).to.equal(0);
    });
});