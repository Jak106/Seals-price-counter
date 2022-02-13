function LC411() {
    metal1 = document.getElementById("metal-form1")
    fillerOp = document.getElementById("filler-form")
    sheetWidth1 = document.getElementById("thickness-form1")
    sheetWidth2 = document.getElementById("thickness-form2")
    addOptions(sheets, metal1)
    addOptions(camCover, fillerOp)
    addWidth("sheet", sheetWidth1)
    addWidth("camprofile", sheetWidth2)
    createTable(CGtable)
    addPossibilities("resultLC411()")
}
function resultLC411() {
    d1Val = parseFloat(document.getElementById("d1-form").value)
    d2Val = parseFloat(document.getElementById("d2-form").value)
    materialVal = document.getElementById("metal-form1").value
    coverVal = document.getElementById("filler-form").value
    cordThic = parseFloat(document.getElementById("thickness-form1").value)
    coverThic = parseFloat(document.getElementById("thickness-form2").value)
    partialResList.innerHTML = ""
    let cordMaterial = sheets.filter(material => material["id"] == materialVal)
    let coverMaterial = camCover.filter(material => material["id"] == coverVal)
    let mid  = corrugatedMid(d1Val, d2Val, cordMaterial[0], cordThic)
    let covers = corrugatedCover(d1Val, d2Val, coverMaterial[0], coverThic)
    makeTableCG(mid, covers, "overheadCM")
}

function LC413() {
    metal1 = document.getElementById("metal-form1")
    fillerOp = document.getElementById("filler-form")
    sheetWidth1 = document.getElementById("thickness-form1")
    sheetWidth2 = document.getElementById("thickness-form2")
    addOptions(sheets, metal1)
    addOptions(camCover, fillerOp)
    addWidth("sheet", sheetWidth1)
    addWidth("camprofile", sheetWidth2)
    createTable(CGtable)
    addPossibilities("resultLC413()")
}
function resultLC413() {
    d1Val = parseFloat(document.getElementById("d1-form").value)
    d2Val = parseFloat(document.getElementById("d2-form").value)
    d3Val = parseFloat(document.getElementById("d3-form").value)
    materialVal = document.getElementById("metal-form1").value
    coverVal = document.getElementById("filler-form").value
    cordThic = parseFloat(document.getElementById("thickness-form1").value)
    coverThic = parseFloat(document.getElementById("thickness-form2").value)
    let cordMaterial = sheets.filter(material => material["id"] == materialVal)
    let coverMaterial = camCover.filter(material => material["id"] == coverVal)
    let mid  = corrugatedMid(d1Val, d3Val, cordMaterial[0], cordThic)
    let covers = corrugatedCover(d1Val, d2Val, coverMaterial[0], coverThic)
    makeTableCG(mid, covers, "overheadCM")
}

function LC413f() {
    metal1 = document.getElementById("metal-form1")
    metal2 = document.getElementById("metal-form2")
    fillerOp = document.getElementById("filler-form")
    sheetWidth1 = document.getElementById("thickness-form1")
    sheetWidth2 = document.getElementById("thickness-form2")
    coverWidth = document.getElementById("thickness-form3")
    addOptions(sheets, metal1)
    addOptions(sheets, metal2)
    addOptions(camCover, fillerOp)
    addWidth("sheet", sheetWidth1)
    addWidth("sheet", sheetWidth2)
    addWidth("camprofile", coverWidth)
    createTable(CGtable)
    addPossibilities("resultLC413f()")
}
function resultLC413f() {
    d1Val = parseFloat(document.getElementById("d1-form").value)
    d2Val = parseFloat(document.getElementById("d2-form").value)
    d3Val = parseFloat(document.getElementById("d3-form").value)
    cordVal = document.getElementById("metal-form1").value
    floatingVal = document.getElementById("metal-form2").value
    coverVal = document.getElementById("filler-form").value
    cordThic = parseFloat(document.getElementById("thickness-form1").value)
    floatingThic = parseFloat(document.getElementById("thickness-form2").value)
    coverThic = parseFloat(document.getElementById("thickness-form3").value)
    let cordMaterial = sheets.filter(material => material["id"] == cordVal)
    let coverMaterial = camCover.filter(material => material["id"] == coverVal)
    let floatingMaterial = sheets.filter(material => material["id"] == floatingVal)
    let mid  = corrugatedMid(d1Val, d3Val, cordMaterial[0], cordThic)
    let floating = massFunc(d2Val, d3Val, floatingThic, floatingMaterial[0], "camprofileLabour")
    let cover = corrugatedCover(d1Val, d2Val, coverMaterial[0], coverThic)
    
    let possibilities = getPossibilities()


    let overheadVal = labour_Eff.filter(type => type.id === "overhead")
    let totPrice = mid["price"] + cover["price"] + floating["price"] +
        mid["labour"] + cover["labour"] + possibilities.labour + floating["labour"] +
        (mid.labour + cover.labour + possibilities.labour + floating.labour)*overheadVal[0].overheadCM

    table.innerHTML = ""
    CGtable["Material"] = Math.round((mid.price + cover.price)*100)/100 + " " + possibilities.priceUnit //Sum of all prices of materials
    CGtable["Labour"] = Math.round((mid.labour + cover.labour)*100)/100 + possibilities.labour + " " + possibilities.priceUnit//Sum of all prices of labour
    CGtable["Overhead"] =  Math.round(((mid.labour + cover.labour)*overheadVal[0].overheadCM)*100)/100 + possibilities.labour + " " + possibilities.priceUnit
    CGtable["SC"] = Math.round(totPrice*100)/100 + " " + possibilities.priceUnit
    CGtable["1 pc"] = Math.round(getProfit(totPrice, possibilities.profit)*1.3*100)/100 + " " + possibilities.priceUnit // math
    CGtable["2-5 pc"] = Math.round(getProfit(totPrice, possibilities.profit)*1.15*100)/100 + " " + possibilities.priceUnit // math
    CGtable["6-20 pc"] = Math.round(getProfit(totPrice, possibilities.profit)*100)/100 + " " + possibilities.priceUnit// math
    CGtable["21-50 pc"] = Math.round(getProfit(totPrice, possibilities.profit)*0.95*100)/100 + " " + possibilities.priceUnit // math
    CGtable[">50 pc"] = Math.round(getProfit(totPrice, possibilities.profit)*0.85*100)/100 + " " + possibilities.priceUnit // math
    CGtable["Metal Cord"] = Math.round(mid.weight*100)/100 + " " + possibilities.weightUnit // weight of inner ring
    CGtable["Covers"] = Math.round(cover.weight*100)/100 + " " + possibilities.weightUnit // weight of winding
    CGtable["Total weight"] = Math.round((mid.weight + cover.weight)*100)/100 + " " + possibilities.weightUnit //weight of all materials summed
    createTable(CGtable)
}