
let productTitle = document.getElementById("productTitle").innerHTML

let prodTitle = document.getElementById("productTitle")
let values = getNumerical(prodTitle.textContent) //array

// desc = "Chrom, 500 µg, hochdosiert, 180 Tabletten - für einen ausgeglichenen Blutzuckerspiegel. OHNE künstliche Zusätze, ohne Gentechnik. Vegan.produziert"
// let values = getNumerical(desc)
let cleanValues = []

for (i = 0; i < values.length; i++) {
    cleanValues[i] = evaluateValue(values[i])
}

let Product = {}
addUnitValuePairsToProduct(Product, cleanValues)
addValueToProduct(Product)
calculateIngredientValue(Product)
Product.currency = getCurrency()
Product.productTitle = productTitle
seeProduct(Product)

// send product to popup
// window.addEventListener("load", function () {
//     console.log('window loaded, message sent to popup');
//     chrome.runtime.sendMessage({ Product: Product }, function (response) { console.log(response) });

// });
function getCurrency() {

    return document.getElementById("twister-plus-price-data-price-unit").value
}
function isUnit(char) {
    if (char == undefined) { return }
    char = char.toLowerCase()
    return (!isNaN(char) || char.match(/[a-z]/i) || char.match("µ") || char.match("ü") || char.match("ä") || char.match("ö"));
}

// for each number in the string: takes the number and two subsequent words as a string and
// return's all these combinations as an array
function getNumerical(text) {
    let words = text.split(" ")
    let values = []
    let i = 0
    for (word of words) {
        if (i > words.length - 2) { break }
        if (!isNaN(words[i][0])) {
            values.push(words[i] + " " + words[i + 1] + " " + words[i + 2])
        }
        i++
    }
    return values
}

function cleanValue(val) {
    let cleanVal = ""
    for (char of val) {
        cleanVal += isUnit(char) ? char : ""
    }
    val = cleanVal
    return val
}

// splits string from number and returns as array like ["1000", "mcg"]
function evaluateValue(value) {
    value = value.split(" ")
    for (j = 0; j < value.length; j++) {
        value[j] = cleanValue(value[j])
    }

    if (isNaN(value[0][value[0].length - 1])) {
        value[2] = value[1]
        value[1] = ""
        for (j = value[0].length; j > 0; j--) {
            if (isNaN(value[0][j])) {
                value[1] = value[0][j] + value[1]
                value[0].slice(0, -1)
            }
        }
    }
    return value
}

function sliceAndGetNextUnit(i, chars) {
    let unit = ""
    charsAfterSlice = chars.slice(i)
    for (char of charsAfterSlice) {

        if (isUnit(char)) {
            unit += char
            if (!isUnit(charsAfterSlice[i + 1])) { i++; break }
        }
        i++
    }
    return [unit, i]
}

function calculateIngredientValue(Product) {
    switch (Product.unitType) {
        case "mcg":
        case "µg":
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

function stripStringToInt(string) {
    let newString = ""
    for (char of string) {
        if (isNumber(char)) {
            newString += char
        }
    }
    return parseInt(newString)
}

function isNumber(char) {
    if (typeof char !== 'string') {
        return false;
    }

    if (char.trim() === '') {
        return false;
    }

    return !isNaN(char);
}

function addValueToProduct(Product) {
    let price = ""
    if (document.getElementById("sns-base-price") == undefined) {
        a_price_whole_class = document.getElementsByClassName("a-price-whole")[0].textContent
        if (a_price_whole_class == undefined) {
            console.log("We're sorry, the price of this html has a different class or id than expected.")
        }
        else {
            price = (stripStringToInt(a_price_whole_class) + "." + document.getElementsByClassName("a-price-fraction")[0].textContent)
        }
    }
    else {
        price = document.getElementById("sns-base-price").textContent
    }
    Product.unitValue100g = ""
    for (char of price) {
        if (isNaN(char) && char !== "," && char !== ".") { break }
        Product.unitValue100g += char === " " ? "" : char === "," ? "." : char
    }
    Product.price = Product.unitValue100g
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
            else if (value[2].toLowerCase() == beverage) {
                Product.beverages = parseFloat(value[0])
            }
        }
    }
}
