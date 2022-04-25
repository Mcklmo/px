import fetch from "node-fetch"
getPageHTML()
async function getPageHTML() {
    page = await fetch("/https://www.amazon.de/Chrome-500-high-dose-tablets/dp/B07ZD85F28/ref=sr_1_3_sspa?crid=3CFA4OKR3BIDJ&keywords=chrom&qid=1650801946&sprefix=chrom%2Caps%2C112&sr=8-3-spons&spLa=ZW5jcnlwdGVkUXVhbGlmaWVyPUEzRkFNRVdHSkZTREhQJmVuY3J5cHRlZElkPUEwOTYzOTcyMllNSkxNQjc5QjM2NyZlbmNyeXB0ZWRBZElkPUEwMjcwODAwMTlNRExKTlRXTzNaMSZ3aWRnZXROYW1lPXNwX2F0ZiZhY3Rpb249Y2xpY2tSZWRpcmVjdCZkb05vdExvZ0NsaWNrPXRydWU&th=1")
    console.log(page)
}

let prodTitle = document.getElementById("productTitle")
let values = getNumerical(prodTitle.textContent)

// desc = "Chrom, 500 µg, hochdosiert, 180 Tabletten - für einen ausgeglichenen Blutzuckerspiegel. OHNE künstliche Zusätze, ohne Gentechnik. Vegan.produziert"
// let values = getNumerical(desc)
let cleanValues = []

let i = 0
for (value of values) {
    cleanValues[i] = evaluateValue(value)
    i++
}

let Product = {}
addUnitValuePairsToProduct(Product, cleanValues)
addValueToProduct(Product)
calculateIngredientValue(Product)
seeProduct(Product)

function isUnit(char) {
    return char != undefined && (char.toLowerCase().match(/[a-z]/i) || char.match("µ"));
}

// returns an array with each numerical and it's 
// subsequent word (syntax: "1000mcg string", "800 mg")
function getNumerical(text) {
    let words = text.split(" ")
    let values = []
    let i = 0
    for (word of words) {
        if (!isNaN(word[0])) {
            values.push(word + " " + words[i + 1])
        }
        i++
    }
    return values
}

// splits string from number and returns as array like ["1000", "mcg"]
function evaluateValue(value) {
    let chars = value.split("")
    let numbers = ""
    let unit = ""

    let i = 0
    // finds all numbers in a sequence
    for (char of chars) {

        if (!isNaN(char)) {
            numbers += char
            if (isNaN(chars[i + 1])) { break }
        }
        i++
    }
    // finds all letters in a sequence
    i = 0
    charsWithoutNumbers = chars.slice(i)
    for (char of charsWithoutNumbers) {

        if (isUnit(char)) {
            unit += char
            if (!isUnit(charsWithoutNumbers[i + 1])) { break }
        }
        i++
    }

    return [numbers, unit]
}

function calculateIngredientValue(Product) {
    switch (Product.unitType) {
        case "mcg":
        case "µg":
            Product.unitType = "g"
            Product.unitValue100g *= 100000
            break
        case "g":
            Product.unitValue100g *= 100
    }
}

function seeProduct(Product) {

    for (key of Object.keys(Product)) {
        console.log(key + ": " + Product[key])
    }
}

function addValueToProduct(Product) {
    let price = document.getElementById("sns-base-price").textContent
    // let price = "12,99 € (874 liugsadf"
    Product.unitValue100g = ""
    for (char of price) {
        Product.unitValue100g += char === " " ? "" : char === "," ? "." : char
        if (isNaN(char) && char !== ",") { break }
    }
    Product.unitValue100g = (parseFloat(Product.unitValue100g) / Product.beverages) / Product.units
}

// takes a product object and formatted values in syntax [["1000", "mcg"], ["800", "Tabletten"]]
// and updates or adds to the product's "beverages", "units" and "unitType" fields
function addUnitValuePairsToProduct(Product, formattedValues) {
    let units = ["mcg", "mg", "g", "µg"]
    let beverages = ["tabletten", "kapseln", "pulver", "stück"]
    for (value of formattedValues) {
        for (unit of units) {
            if (value[1].toLowerCase() == unit) {
                Product.units = parseFloat(value[0])
                Product.unitType = value[1]
                break
            }
        }
        for (beverage of beverages) {
            if (value[1].toLowerCase() == beverage) {
                Product.beverages = parseFloat(value[0])
            }
        }
    }
}