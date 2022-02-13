var img1 = document.getElementById("img1")
var img2 = document.getElementById("img2")
var img3 = document.getElementById("img3")
var img4 = document.getElementById("img4")
var div2 = document.getElementsByClassName("menu-div2")
var div3a = document.getElementsByClassName("menu-div3a")
var div3b = document.getElementsByClassName("menu-div3b")
var div3c = document.getElementsByClassName("menu-div3c")
var menuImg = document.getElementsByClassName('menu-img')
var head = document.getElementsByTagName('head')
var form = document.getElementById("outputs-form")
var table = document.getElementById("outputs-table")
var inputs = document.getElementsByClassName("inputs")
var outputs = document.getElementsByClassName("outputs")
var menu = document.getElementsByClassName("menu")
var body = document.getElementsByTagName("body")
var fillersLink = '../javascript_materials/fillers.js'
var sheetsLink = '../javascript_materials/sheets.js'
var stripsLink = '../javascript_materials/strips.js'
var labourLink = '../javascript_materials/labour.js'
var camLink = '../javascript_materials/camprofile.js'
var mathLink = '../javascript/math.js'

var links = [fillersLink, sheetsLink, stripsLink, labourLink, camLink, mathLink]

//add JS scripts
for (var x = 0; x < links.length; x++) {
    scriptToAdd = document.createElement('script')
    scriptToAdd.type = 'text/javascript'
    scriptToAdd.src = links[x]
    document.head.appendChild(scriptToAdd)
}

//create buttons to hide and show menu
var para = document.createElement("p")
para.innerHTML = "Hide menu"
para.setAttribute("id", "hide-menu")
menu[0].appendChild(para)

var paraShow = document.createElement("p")
paraShow.innerHTML = "Show menu"
paraShow.setAttribute("id", "menu-icon")
body[0].appendChild(paraShow)

var menuHide = document.getElementById("hide-menu")
var menuIcon = document.getElementById("menu-icon")

menuIcon.style.display = "none"

menuHide.addEventListener('click', e => {
    menu[0].style.display = "none"
    try {
        inputs[0].style.width = "70%"
    } catch (error) {
        document.getElementsByClassName("materials-inputs")[0].style.marginLeft = "10%"
        document.getElementsByClassName("materials-inputs")[0].style.width = "60%"
    }
    outputs[0].style.width = "30%"
    menuIcon.style.display = "block"
})
menuIcon.addEventListener('click', e => {
    menu[0].style.display = "flex"
    menu[0].style.width = "20vw"
    try {
        inputs[0].style.width = "48vw"
    } catch (error) {
        document.getElementsByClassName("materials-inputs")[0].style.marginLeft = "0"
        document.getElementsByClassName("materials-inputs")[0].style.width = "48vw"
    }
    outputs[0].style.width = "28vw"
    menuIcon.style.display = "none"
})

img1.style.transform = "rotate(90deg)"
img2.style.transform = "rotate(90deg)"
img3.style.transform = "rotate(90deg)"
img4.style.transform = "rotate(90deg)"

//add logos and button for partial results
function addLogo(url, gridName) {
    let image = document.createElement("img")
    image.setAttribute("src", url)
    image.style.gridArea = gridName
    image.alt = "logo"
    image.setAttribute("class", "logo")
    outputs[0].appendChild(image)
}

let partialResDivC = document.createElement("div")
partialResDivC.setAttribute("id", "partialResDiv")
outputs[0].appendChild(partialResDivC)
let partialResDiv = document.getElementById("partialResDiv")

let divC = document.createElement("div")
divC.setAttribute("id", "partialResUl")
partialResDiv.appendChild(divC)
var partialResList = document.getElementById("partialResUl")

let buttonC = document.createElement("button")
buttonC.setAttribute("id", "partialResBtn")
buttonC.innerHTML = "Partial results"
partialResDiv.appendChild(buttonC)
let partialResbtn = document.getElementById("partialResbtn")

function addResPoint() {
    let liC = document.createElement("p")
    liC.innerHTML = arguments[0]
    partialResList.appendChild(liC)
}

addLogo("../AJlogo.png", "AJlogo")
addLogo("../LGlogo.png", "LGlogo")

//function to choose elements in class 
function displayDiv(arr){
    for (var x = 0; x < arr.length; x++){
        arr[x].style.display = "none";
    }
}

//function to change display of elements
function imageMove(pic, arr){
    pic.addEventListener('click', e => {
        picTransform = window.getComputedStyle(pic, null)
        if (picTransform.getPropertyValue('transform') == "matrix(6.12323e-17, 1, -1, 6.12323e-17, 0, 0)") {
            pic.style.transform = "rotate(0deg)";
            for (var x = 0; x < arr.length; x++){
                arr[x].style.display = "none";
            }
        } else {
            pic.style.transform = "rotate(90deg)"
            for (var x = 0; x < arr.length; x++){
                arr[x].style.display = "flex";
            }
        }
        if (div2[0].style.getPropertyValue('display') == "none") {
            displayDiv(div3a)
            displayDiv(div3b)
            displayDiv(div3c)
            for (var x = 0; x < menuImg.length; x++) {
                menuImg[x].style.transform = "rotate(0deg)";
            }
        }
    })
}

imageMove(img1, div2)
imageMove(img2, div3a)
imageMove(img3, div3b)
imageMove(img4, div3c)

//to add options into form
function addOptions(json, elem) {
    for (var x = 0; x < json.length; x = x+1) {
        let option = document.createElement("option");
        option.text = json[x]["id"]
        elem.add(option)
    }
}

//functions to load possible widths
function addWidth(type, elem) {
    let sizes = []
    type == "strip" ? sizes = [2.5, 3.2, 4.8, 6.4, 7.2]
    : type == "sheet" ? sizes = [0.5, 0.6, 0.8, 1, 1.5, 2, 3, 4, 5, 6]
    : sizes = [0.38, 0.5, 0.8, 1, 1.2];
    for (var x = 0; x < sizes.length; x += 1) {
        let option = document.createElement("option");
        option.text = sizes[x]
        elem.add(option)
    }
}

//function to add possible units
function addButton(type, options, idName, gridAreaName) {
    let button = document.createElement(type)
    button.setAttribute("id", idName)
    button.style.textAlign = "center"
    button.style.gridArea = gridAreaName
    if (type == "input") {
        button.type = "number";
        button.value = options
        button.setAttribute("class", "form-input")
    } else if (type == "select") {
        options.forEach(opt => {
            let optionCreate = document.createElement("option")
            optionCreate.text = opt
            button.appendChild(optionCreate)
        })
        button.setAttribute("class", "form-input")
    } else if (type == "button") {
        button.setAttribute("onclick", options)
        button.innerHTML = "count"
        button.setAttribute("class", "form-input")
    } else if (type == "label") {
        button.innerHTML = options
        button.setAttribute("class", "input-label")
        button.style.margin = "2vh 0 2vh 0"
        button.style.fontWeight = "bold"
    }
    inputs[0].appendChild(button)
}

//function to create chooseble properties
function addPossibilities(func) {
    addButton("input", 0, "labourInput", "labour")
    addButton("input", 10, "profitInput", "profit",)
    addButton("select", ["euro", "pound", "dollar"], "priceSelect", "priceUnit")
    addButton("select", ["gram", "kilogram"], "weightSelect", "weightUnit")
    addButton("select", ["millimiter", "inch"], "sizeSelect", "sizeUnit")
    addButton("label", "add labour", "label1", "labourLabel")
    addButton("label", "profit", "label2", "profitLabel")
    addButton("label", "price unit", "label3", "priceLabel")
    addButton("label", "weight unit", "label4", "weightLabel")
    addButton("label", "size unit", "label5", "sizeLabel")
    addButton("button", func, "button-form", "count")
    document.getElementById("profitInput").max = "99";
}
//function to get values from possibilities
function getPossibilities() {
    return {
        "labour": parseFloat(document.getElementById("labourInput").value),
        "profit": parseFloat(document.getElementById("profitInput").value),
        "priceUnit": document.getElementById("priceSelect").value,
        "weightUnit": document.getElementById("weightSelect").value,
        "sizeUnit": document.getElementById("sizeSelect").value
    }
}

//two possible result tables
let SWGtable = {
    "Material": "---",
    "Labour": "---",
    "Overhead": "---",
    "SC": "---",
    "1 pc": "---",
    "2-5 pc": "---",
    "6-20 pc": "---",
    "21-50 pc": "---",
    ">50 pc": "---",
    "Inner ring": "---",
    "Winding": "---",
    "Outer ring": "---",
    "Total weight": "---"
}
let CGtable = {
    "Material": "---",
    "Labour": "---",
    "Overhead": "---",
    "SC": "---",
    "1 pc": "---",
    "2-5 pc": "---",
    "6-20 pc": "---",
    "21-50 pc": "---",
    ">50 pc": "---",
    "Metal Cord": "---",
    "Covers": "---",
    "Total weight": "---"
}

//make row in table
function makeRowMath(propName, propVal) {
    let row = document.createElement("tr")
    let column1 = document.createElement("td")
    let column2 = document.createElement("td")
    row.style.width = "100%"
    column1.innerHTML = propName
    column1.style.width = "50%"
    column1.style.fontWeight = "bold"
    column2.innerHTML = propVal
    column2.style.width = "50%"
    table.style.fontSize = "1.3em"
    table.appendChild(row)
    row.appendChild(column1)
    row.appendChild(column2)
}

//outputs table
function createTable(table) {
    Object.keys(table)
    .forEach((prop) => {
        makeRowMath(prop, table[prop])
    })
}

$(document).keypress(function(e){
    if (e.which == 13){
        $("#button-form").click();
    }
});