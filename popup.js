let productValueDisplay = document.getElementById("loadValue")

chrome.storage.sync.get(['Products'], async function (result) {
    for (Product of result.Products) {
        addProductToHtml(Product, productValueDisplay);
    }
});

// let resetButton = createResetButton()
// productValueDisplay.innerHTML = (resetButton) + productValueDisplay.innerHTML

// function resetHtml() {
//     let resetButton = createResetButton()
//     productValueDisplay.innerHTML = resetButton
// }

// function createResetButton() {
//     let resetButton = document.createElement("button")
//     resetButton.innerHTML = "Reset"
//     resetButton.addEventListener("click", () => {
//         resetHtml()
//     });
//     return resetButton
// }

chrome.runtime.onMessage.addListener(
    async function (request, sender, sendResponse) {
        let Products = []
        await chrome.storage.sync.get(['Products'], async function (result) {
            for (Product in result.Products) {
                Products.push(Product)
            }
        });
        Products.push(request.Product)
        Products.push({name:"this is a product :)"})
        addProductToHtml(request.Product, productValueDisplay);
        chrome.storage.sync.set({ Products: Products }, function () { });
    }
);

function addProductToHtml(Product, productValueDisplay) {
    let button = `<button>` + Product.productTitle + "<br><br>" + Product.unitValue100g.toFixed(2) + " " + Product.currency + "/ 100 g" + `</button><br><br>`;
    productValueDisplay.innerHTML += button 
    console.log(button)
}

