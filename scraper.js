let prodTitle = document.getElementById("productTitle")

// returns an array with each numerical and it's 
// subsequent word (syntax: "1000 mcg")
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

let values = getNumerical(prodTitle.textContent)
for (value of values) {
    console.log(evaluateValue(value))
}

// takes a string with a number and a string indicator
// returns a number and a string, which is it's correct
// identifier
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
