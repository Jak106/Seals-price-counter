let codearea = document.getElementById("codearea")
let materialsMenu = document.getElementById("materials-menu")
let materialsDiv = document.getElementById("materials")
let options = [
    "fillers", "sheets", "strips", "camCover", "labour_Eff"
]

//add options to menu in materials
options.forEach(option => {
    let optionAdd = document.createElement('option')
    optionAdd.innerHTML = option
    materialsMenu.appendChild(optionAdd)
})
function setArr(opt) {
    //return the array of the specified type
    return opt == "fillers" ? fillers
    : opt == "sheets" ? sheets
    : opt == "strips" ? strips
    : opt == "camCover" ? camCover
    : labour_Eff;
}

//function to show materials in center of screen
function showMaterials() {
    materialsDiv.innerHTML = ""
    optArr = setArr(materialsMenu.value).map(material => material["id"])
    for (var x = 0; x < optArr.length; x++) {
        let buttonAdd = document.createElement('button')
        buttonAdd.innerHTML = optArr[x]
        buttonAdd.setAttribute("id", optArr[x])
        buttonAdd.setAttribute('onclick', "showOption($(this).attr('id'))")
        materialsDiv.appendChild(buttonAdd)
    }
}

//function to show options of chosen material
function showOption(id) {
    let optArr = setArr(materialsMenu.value).filter(material => material["id"] == id)   
    form.innerHTML = ""
    form.style.width = "90%"
    form.style.height = "auto"
    form.style.margin = "auto"
    Object.keys(optArr[0])
        .forEach((prop) => {
            makeRowMaterial(prop, optArr[0][prop])
    })
}
//objects used to set correct names
var specialNamesSheets = {
    id: "id",
    density: "density",
    price1: "0.5 mm",
    price2: "0.6 mm",
    price3: "0.8 mm",
    price4: "1 mm",
    price5: "2 mm",
    price6: "3 mm",
    price7: "4 mm",
    price8: "5 mm"
}
var specialNamesStrips = {
    id: "id",
    density: "density",
    price1: "2.5 mm",
    price2: "3.2 mm",
    price3: "4.8 mm",
    price4: "6.4 mm",
    price5: "7.2 mm",
    priceKg: "priceKg",
    width: "width"
}
//function with styling to create inputs for options of material
function makeRowMaterial(propName, propVal) {
    let column1 = document.createElement("label")
    let input = document.createElement("input")
    materialsMenu.value == "sheets" ? column1.innerHTML = specialNamesSheets[propName]
    : materialsMenu.value == "strips" ? column1.innerHTML = specialNamesStrips[propName]
    : materialsMenu.value == "labour" ? column1.innerHTML = propName + " mm"
    : column1.innerHTML = propName;
    column1.setAttribute("id", propName + "Label")
    if (typeof(propVal) == "number") {
        input.setAttribute("type", "float")
    } else {
        input.setAttribute("type", "text")
    }
    input.value = propVal
    input.setAttribute("id", propName)
    form.appendChild(column1)
    form.appendChild(input)
}

//functions to create default objects in case of creation new material
function defaultStrip() {
    this.id = document.getElementById("id").value,
    this.density = document.getElementById("density").value,
    this.price1 = document.getElementById("price1").value,
    this.price2 = document.getElementById("price2").value,
    this.price3 = document.getElementById("price3").value,
    this.price4 = document.getElementById("price4").value,
    this.price5 = document.getElementById("price5").value,
    this.priceKg = 0,
    this.width = 0
}
function defaultSheet() {
    this.id = document.getElementById("id").value,
    this.density = document.getElementById("density").value,
    this.price1 = document.getElementById("price1").value,
    this.price2 = document.getElementById("price2").value,
    this.price3 = document.getElementById("price3").value,
    this.price4 = document.getElementById("price4").value,
    this.price5 = document.getElementById("price5").value,
    this.price6 = document.getElementById("price6").value,
    this.price7 = document.getElementById("price7").value,
    this.price8 = document.getElementById("price8").value
}
function defaultFiller() {
    this.id = document.getElementById("id").value,
    this.priceKg = document.getElementById("priceKg").value,
    this.density = document.getElementById("density").value,
    this.thickness = document.getElementById("thickness").value,
    this.weight = 0,
    this.totalPrice = 0,
    this.totalThickness = 0,
    this.width = 0
}
function defaultCamCover() {
    this.id = document.getElementById("id").value,
    this.priceKg = document.getElementById("priceKg").value,
    this.density = document.getElementById("density").value
}

//following functions are to rewrite, create and save new file with materials
function show() {
    let arr = setArr(materialsMenu.value)
    let optArr = arr.filter(material => material["id"] == document.getElementById("id").value)
    if (optArr.length == 0) {
        let newMaterial = {}
        arr == fillers ? newMaterial = new defaultFiller()
        : arr == sheets ? newMaterial = new defaultSheet()
        : arr == strips ? newMaterial = new defaultStrip()
        : newMaterial = new defaultCamCover();
        arr.push(newMaterial)
    } else {
        arr.forEach(material => {
            if (material.id == optArr[0]["id"]) {
                Object.keys(optArr[0])
                    .forEach((prop) => {
                        if (optArr[0][prop] != document.getElementById(prop).value) {
                            material[prop] = document.getElementById(prop).value
                    }
                })
            }
        })
    }
    codearea.innerHTML = "var " + materialsMenu.value + " = " + JSON.stringify(arr).replace(/,/ig, ", \n")
    saveAs()
}

async function save() {
    let stream = await fileHandle.createWritable();
    await stream.write(codearea.innerText);
    await stream.close();
}

async function saveAs() {
    fileHandle = await window.showSaveFilePicker();
    save();
}

function convertEuro(arr) {
    arr.forEach(material => {
        if (material.id != "eff") {
            Object.keys(material)
                .forEach(prop => {
                    if (prop != "id") {
                        material[prop] = Math.round((material[prop]/31)*100)/100
                    }
                }
            )
        }
    })
    console.log(arr)
    codearea.innerHTML = "var labour_Eff"+ " = " + JSON.stringify(arr).replace(/,/ig, ", \n")
    saveAs()
}