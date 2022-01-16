let codearea = document.getElementById("codearea")
let materialsMenu = document.getElementById("materials-menu")
let materialsDiv = document.getElementById("materials")
let options = [
    "fillers", "sheets", "strips", "camprofile cover"
]

//add options to menu in materials
options.forEach(option => {
    let optionAdd = document.createElement('option')
    optionAdd.innerHTML = option
    materialsMenu.appendChild(optionAdd)
})

//function to create buttons
//used in creation of save button in database
function addSaveButton(content, func) {
    let button = document.createElement("button")
    button.innerHTML = content
    button.setAttribute("onclick", func)
    button.style.background = "#8ecae6"
    button.style.border = "none"
    button.style.height = "5vh"
    button.style.width = "40%"
    button.style.borderRadius = "5px"
    button.style.margin = "1vh 5% 0 5%"
    button.style.fontFamily = "'Montserrat', sans-serif"
    outputs[0].appendChild(button)
}
addSaveButton("Save", "show()")

//sets array to show based on choseon option
function setArr(opt) {
    return opt == "fillers" ? fillers
    : opt == "sheets" ? sheets
    : opt == "strips" ? strips
    : camCover
}

//function to show materials in center of screen
function showMaterials() {
    materialsDiv.innerHTML = ""
    optArr = setArr(materialsMenu.value).map(material => material["id"])
    for (var x = 0; x < optArr.length; x++) {
        let buttonAdd = document.createElement('button')
        buttonAdd.innerHTML = "button"
        buttonAdd.style.width = "10vw"
        buttonAdd.style.height = "10vh"
        buttonAdd.style.margin = "1vh 1vw 1vh 1vw"
        buttonAdd.style.border = "none"
        buttonAdd.style.background = "#8ecae6"
        buttonAdd.style.borderRadius = "5px"
        buttonAdd.style.fontFamily = "'Montserrat', sans-serif"
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

//function with styling to create inputs for options of material
function makeRowMaterial(propName, propVal) {
    let column1 = document.createElement("label")
    let input = document.createElement("input")
    column1.innerHTML = propName
    column1.style.height = "auto"
    column1.style.width = "49%"
    column1.style.alignSelf = "center"
    column1.setAttribute("id", propName + "Label")
    if (typeof(propVal) == "number") {
        input.setAttribute("type", "float")
    } else {
        input.setAttribute("type", "text")
    }
    input.value = propVal
    input.style.background = "#8ecae6"
    input.style.border = "none"
    input.style.height = "5vh"
    input.style.width = "40%"
    input.style.borderRadius = "5px"
    input.style.margin = "1vh 2vw 0 0"
    input.setAttribute("id", propName)
    form.appendChild(column1)
    form.appendChild(input)
}

//following functions are to rewrite, create and save new file with materials
function show() {
    let arr = setArr(materialsMenu.value)
    let optArr = arr.filter(material => material["id"] == document.getElementById("id").value) 
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
    codearea.innerHTML = JSON.stringify(arr)
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