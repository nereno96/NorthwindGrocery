"use strict"

window.onload = function () {
    const urlParams = new URLSearchParams(location.search);
    let id = -1;
    if (urlParams.has("productId") === true) {
        id = urlParams.get("productId");
        if(id == "beverages") {
            productTable.style.display = "block";
            fetch(`http://localhost:8081/api/products`)
            .then(response => response.json())
            .then(data => {
                for (let datum of data) {
                    if(1 == datum.categoryId){
                        let row = productTableBody.insertRow(-1);
                        let cell1 = row.insertCell(0);
                        let cell2 = row.insertCell(1);
                        let cell3 = row.insertCell(2);
                        cell1.innerHTML = `<a href="productdetails.html?productId=${datum.productId}">${datum.productName}</a>`;
                        cell2.innerHTML = `$${(parseFloat(datum.unitPrice)).toFixed(2)}`;
                        cell3.innerHTML = datum.productId;
                    }
                }
            })
        }
        else if (id == "confections") {
            productTable.style.display = "block";
            fetch(`http://localhost:8081/api/products`)
            .then(response => response.json())
            .then(data => {
                for (let datum of data) {
                    if(3 == datum.categoryId){
                        let row = productTableBody.insertRow(-1);
                        let cell1 = row.insertCell(0);
                        let cell2 = row.insertCell(1);
                        let cell3 = row.insertCell(2);
                        cell1.innerHTML = `<a href="productdetails.html?productId=${datum.productId}">${datum.productName}</a>`;
                        cell2.innerHTML = `$${(parseFloat(datum.unitPrice)).toFixed(2)}`;
                        cell3.innerHTML = datum.productId;
                    }
                }
            })
        }
        else if (id == "produce") {
            productTable.style.display = "block";
            fetch(`http://localhost:8081/api/products`)
            .then(response => response.json())
            .then(data => {
                for (let datum of data) {
                    if(7 == datum.categoryId){
                        let row = productTableBody.insertRow(-1);
                        let cell1 = row.insertCell(0);
                        let cell2 = row.insertCell(1);
                        let cell3 = row.insertCell(2);
                        cell1.innerHTML = `<a href="productdetails.html?productId=${datum.productId}">${datum.productName}</a>`;
                        cell2.innerHTML = `$${(parseFloat(datum.unitPrice)).toFixed(2)}`;
                        cell3.innerHTML = datum.productId;
                    }
                }
            })
        }
        else {
            fetch(`http://localhost:8081/api/products/${id}`)
            .then(response => response.json())
            .then(data => {
                showCourseInfo(data);
            }) 
        }
        
    }
    else {
        window.location.replace("index.html");
    }
};




function showCourseInfo (data) {
    let productInfoPara = document.getElementById("productInfoPara");
    productInfoPara.innerHTML = `The ${data.productName} (supplied by ${data.supplier}) costs $${(parseFloat(data.unitPrice)).toFixed(2)} and there are ${data.unitsInStock} unit(s) in stock.`
    if (data.discontinued == "true" && parseInt(data.unitsInStock) != 0) {
        productInfoPara.innerHTML += `Get it while you can! This product is no longer in production and will not be restocked once supplies run out!`
    }
    else if (data.discontinued == "true" && parseInt(data.unitsInStock) == 0) {
        productInfoPara.innerHTML = `Sorry but ${data.productName} (formerly supplied by ${data.supplier}) is out of stock and no longer in production :(`
    }
    else if (data.discontinued == "false" && parseInt(data.unitsInStock) == 0) {
        productInfoPara.innerHTML += `This item is currently out of stock but we restock every other week so just be on the lookout for it!`
    }
}