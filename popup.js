let productValueDisplay = document.getElementById("loadValue")

chrome.storage.local.get(['Product'], async function (result) {
    let valueWithCurrency = result.Product.unitValue100g.toFixed(2) + " " + result.Product.currency + "/" + result.Product.unitType
    productValueDisplay.innerHTML = result.Product.productTitle + "<br><br>" + valueWithCurrency
});

chrome.runtime.onMessage.addListener(
    async function (request, sender, sendResponse) {
        productValueDisplay.innerHTML = "waiting for page to load"
        let valueWithCurrency = request.Product.unitValue100g.toFixed(2) + " " + request.Product.currency + "/" + request.Product.unitType
        productValueDisplay.innerHTML = request.Product.productTitle + "<br><br>" + valueWithCurrency
        chrome.storage.local.set({ Product: request.Product }, function () { });
        sendResponse({ farewell: "goodbye" })
    }
);
