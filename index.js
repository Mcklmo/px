function onload() {
    // <input id="keyword" type="text">
    //     <button id="submitKeyword" type="submit">send keyword</button>

    let submitButton = document.getElementById("submitKeyword")
    submitButton.addEventListener("click", async () => {
        let keyword = document.getElementById("keyword").value
        if (keyword == "") { return }
        // post keyword to server
        let res = await fetch("/keyword", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                keyword: keyword
            }),
        })
        let productList = await res.json().productList // this is a sorted list of products, sorted by best value
        let productDisplay = document.getElementById("productDisplay")
        for (Product of productList) {
            productDisplay.innerHTML+= `<button ref="${Product.url}">${productStringified(Product)}</button><br>`
        }
    })
}

function productStringified(Product) {
    return Product.name + ": "+Product.value+" "+Product.currency+"/ 100 g"
}