
let productTitle = document.getElementById("productTitle").innerHTML

console.log(productTitle)

chrome.runtime.sendMessage({productTitle: productTitle}, function(response) {console.log(response.farewell)  });