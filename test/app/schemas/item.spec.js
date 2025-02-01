const { expect } = require("chai");

describe("item schema", function () {
    const Item = require("../../../src/app/schemas/item");

    describe("valid items", function () {
        it("validates item #1", function () {
            expect(Item.validate({
                "shortDescription": "Mountain Dew 12PK",
                "price": "6.49"
            })).to.have.ownProperty("value");
        });

        it("validates item #2", function () {
            expect(Item.validate({
                "shortDescription": "Pepsi - 12-oz",
                "price": "1.25"
            })).to.have.ownProperty("value");
        });

        it("validates item #3", function () {
            expect(Item.validate({
                "shortDescription": "Dasani",
                "price": "1.40"
            })).to.have.ownProperty("value");
        });
    });

    describe("invalid items", function () {
        it("must include all required properties", function () {
            expect(Item.validate({
                "shortDescription": "Mountain Dew 12PK"
            })).to.have.ownProperty("error");
        });

        it("cannot include extra properties", function () {
            expect(Item.validate({
                "shortDescription": "Mountain Dew 12PK",
                "price": "6.49",
                "foo": "bar"
            })).to.have.ownProperty("error");
        });

        it("must have a valid short description", function () {
            expect(Item.validate({
                "shortDescription": "Dasani?",
                "price": "1.40"
            })).to.have.ownProperty("error");
        });

        it("must have a valid price", function () {
            expect(Item.validate({
                "shortDescription": "Dasani",
                "price": "1.401"
            })).to.have.ownProperty("error");
        });
    });
});