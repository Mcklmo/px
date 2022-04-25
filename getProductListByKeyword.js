const express = require("express")
const app = express()
// const scraper = require(".scraper.js")
app.use(express.static(__dirname + "/"));
app.use(express.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

// prompt keyword
app.post("/keyword", async (req, res) => {
    let keyword = await (req.body.keyword)
    let productList = [keyword]
    // productList = await getProducts(keyword)
    // for (Product in productList) {
    //     calculateValue(Product)
    // }
    // display list, sorted by relevant value, on client, buttons are linked to the urls 
    // productList = productList.sort((a, b) => { return a.value - b.value })
    res.json( JSON.stringify({productList: keyword}) )
})

function calculateValue(Product) {
    // scraper functionality here
    // eg scraper.isNumerical(whatever)
}

async function getProducts(keyword) {
    // get amazon html with { keyword: keyword}
    let amazonProductsHtml = new document
    let Products = []
    let dummyProduct = {}

    // go through all products of the html, make get requests for the products, return html
    for (productLink of amazonProductsHtml.getElementsByClassName("")) {
        // amazon get request for each product url
        dummyProduct = {}
        dummyProduct.name = ""
        dummyProduct.value = ""
        dummyProduct.currency = ""
        dummyProduct.url = ""
        // for a single html product element
        // get url, name, product stats (desc,title,values), and sort in the list
        Products.push(dummyProduct)
    }
    return Products
}

app.listen(5000, () =>
    console.log("Server is running on http://localhost:5000")
);
