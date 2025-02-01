const { expect } = require("chai");

describe("receipt schema", function () {
    const Receipt = require("../../../src/app/schemas/receipt");

    describe("valid receipts", function () {
        it("validates receipt #1", function () {
            expect(Receipt.validate({
                "retailer": "M&M Corner Market",
                "purchaseDate": "2022-01-01",
                "purchaseTime": "13:01",
                "items": [
                    {
                        "shortDescription": "Mountain Dew 12PK",
                        "price": "6.49"
                    }
                ],
                "total": "6.49"
            })).to.have.ownProperty("value");
        });

        it("validates receipt #2", function () {
            expect(Receipt.validate({
                "retailer": "Walgreens",
                "purchaseDate": "2022-01-02",
                "purchaseTime": "08:13",
                "total": "2.65",
                "items": [
                    {"shortDescription": "Pepsi - 12-oz", "price": "1.25"},
                    {"shortDescription": "Dasani", "price": "1.40"}
                ]
            })).to.have.ownProperty("value");
        });

        it("validates receipt #3", function () {
            expect(Receipt.validate({
                "retailer": "Target",
                "purchaseDate": "2022-01-02",
                "purchaseTime": "13:13",
                "total": "1.25",
                "items": [
                    {"shortDescription": "Pepsi - 12-oz", "price": "1.25"}
                ]
            })).to.have.ownProperty("value");
        });
    });

    describe("invalid receipts", function () {
        it("must include all required properties", function () {
            expect(Receipt.validate({
                "retailer": "M&M Corner Market",
                "purchaseDate": "2022-01-01",
                "purchaseTime": "13:01",
                "items": [
                    {
                        "shortDescription": "Mountain Dew 12PK",
                        "price": "6.49"
                    }
                ]
            })).to.have.ownProperty("error");
        });

        it("cannot include extra properties", function () {
            expect(Receipt.validate({
                "retailer": "M&M Corner Market",
                "purchaseDate": "2022-01-01",
                "purchaseTime": "13:01",
                "items": [
                    {
                        "shortDescription": "Mountain Dew 12PK",
                        "price": "6.49"
                    }
                ],
                "total": "6.49",
                "foo": "bar"
            })).to.have.ownProperty("error");
        });

        it("must have a valid retailer", function () {
            expect(Receipt.validate({
                "retailer": "M&M Corner Market!",
                "purchaseDate": "2022-01-01",
                "purchaseTime": "13:01",
                "items": [
                    {
                        "shortDescription": "Mountain Dew 12PK",
                        "price": "6.49"
                    }
                ],
                "total": "6.49"
            })).to.have.ownProperty("error");
        });

        it("must have a valid purchase date", function () {
            expect(Receipt.validate({
                "retailer": "M&M Corner Market",
                "purchaseDate": "2022-13-01",
                "purchaseTime": "13:01",
                "items": [
                    {
                        "shortDescription": "Mountain Dew 12PK",
                        "price": "6.49"
                    }
                ],
                "total": "6.49"
            })).to.have.ownProperty("error");
        });

        it("must have a valid purchase time", function () {
            expect(Receipt.validate({
                "retailer": "M&M Corner Market",
                "purchaseDate": "2022-01-01",
                "purchaseTime": "25:01",
                "items": [
                    {
                        "shortDescription": "Mountain Dew 12PK",
                        "price": "6.49"
                    }
                ],
                "total": "6.49"
            })).to.have.ownProperty("error");
        });

        it("must have at least one item", function () {
            expect(Receipt.validate({
                "retailer": "M&M Corner Market",
                "purchaseDate": "2022-01-01",
                "purchaseTime": "13:01",
                "items": [],
                "total": "6.49"
            })).to.have.ownProperty("error");
        });

        it("must have valid items", function () {
            expect(Receipt.validate({
                "retailer": "M&M Corner Market",
                "purchaseDate": "2022-01-01",
                "purchaseTime": "13:01",
                "items": [
                    {
                        "shortDescription": "Mountain Dew 12PK?",
                        "price": "6.49"
                    }
                ],
                "total": "6.49"
            })).to.have.ownProperty("error");
        });

        it("must have a valid total", function () {
            expect(Receipt.validate({
                "retailer": "M&M Corner Market",
                "purchaseDate": "2022-01-01",
                "purchaseTime": "13:01",
                "items": [
                    {
                        "shortDescription": "Mountain Dew 12PK",
                        "price": "6.49"
                    }
                ],
                "total": "6.492"
            })).to.have.ownProperty("error");
        });
    });
});