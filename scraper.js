let prodTitle = document.getElementById("productTitle")
let values = getNumerical(prodTitle.textContent)
let formattedValues = applyFunctionToArrayElements(values, evaluateValue)
let Product = {}
addValuesToProduct(Product, formattedValues)

function applyFunctionToArrayElements(arr, fn) {
    let newArr = []
    for (i of arr) {
        newArr.push(fn(i))
    }
    return newArr
}

function addPriceToProduct(Product) {
    let price = document.getElementsByClassName("a-offscreen")
    console.log(price)
}

function addValuesToProduct(Product, formattedValues) {
    let units = ["mcg", "mg", "g"]
    let beverages = ["tabletten", "kapseln", "pulver"]
    for (value of formattedValues) {
        for (unit of units) {
            if (value[1].toLowerCase() == unit) {
                Product.units = value[0]
                break 
            }
        }
        for (beverage of beverages) {
            if (value[1].toLowerCase() == beverage) {
                Product.beverages = value[0]
            }
        }
    }
}

// returns an array with each numerical and it's 
// subsequent word (syntax: "1000mcg string", "800 mg")
function getNumerical(text) {
    let words = text.split(" ")
    let values = []
    let i = 0
    for (word of words) {
        if (! isNaN(word[0])) {
            values.push(word + " " + words[i+1])       
        }
        i++
    }
    return values 
}

// splits string from number and returns as array like ["1000", "mcg"]
function evaluateValue(value) {
    let values = value.split(" ")
    // case 1: the string is at the end of the number
    if (isNaN(values[0].slice(-1)) == true) {
        value = values[0]
        for (i = 0; i<value.length; i++) {
            if (isNaN(value[i])) {
                return [value.substring(0, i), value.substring(i)]
            }
        }
    }
    // case 2: the number is already splittet correctly from the identifier
    return [values[0], values[1]]
}
