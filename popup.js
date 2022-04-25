let productValueDisplay = document.getElementById("loadValue")

chrome.storage.local.get(['productTitle'], function (result) {
    productValueDisplay.innerHTML = result.productTitle
    console.log(result.productTitle)
});

chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        productValueDisplay.innerHTML = (request.productTitle)
        chrome.storage.local.set({ productTitle: request.productTitle }, function () {
            productValueDisplay.innerHTML = result.productTitle
        });
        sendResponse({ farewell: "goodbye" })
        console.log(request.productTitle)

    }
);