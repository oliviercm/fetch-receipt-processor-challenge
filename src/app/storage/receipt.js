const receipts = {};

function getReceipt(id) {
    return receipts[id];
}

function putReceipt(id, receipt) {
    receipts[id] = receipt;
}

module.exports = { getReceipt, putReceipt };