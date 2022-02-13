function LG05() {
    metal1 = document.getElementById("metal-form1")
    fillerOp = document.getElementById("filler-form")
    sheetWidth1 = document.getElementById("thickness-form1")
    sheetWidth2 = document.getElementById("thickness-form2")
    sheetWidth3 = document.getElementById("ELELELELELE")
    addOptions(sheets, metal1)
    addOptions(camCover, fillerOp)
    addWidth("sheet", sheetWidth1)
    addWidth("camprofile", sheetWidth2)
    createTable(CGtable)
    addPossibilities("resultLG05()")
}
function resultLG05() {
    d1Val = parseFloat(document.getElementById("d1-form").value)
    d2Val = parseFloat(document.getElementById("d2-form").value)
    materialVal = document.getElementById("metal-form1").value
    coverVal = document.getElementById("filler-form").value
    cordThic = parseFloat(document.getElementById("thickness-form1").value)
    coverThic = parseFloat(document.getElementById("thickness-form2").value)

    let cordMaterial = sheets.filter(material => material["id"] == materialVal)
    let coverMaterial = camCover.filter(material => material["id"] == coverVal)
    let mid  = corrugatedMid(d1Val, d2Val, cordMaterial[0], cordThic)
    let covers = corrugatedCover(d1Val, d2Val, coverMaterial[0], coverThic)
    makeTableCG(mid, covers, "overheadCG")
}
function LG05A() {
    metal1 = document.getElementById("metal-form1")
    fillerOp = document.getElementById("filler-form")
    sheetWidth1 = document.getElementById("thickness-form1")
    sheetWidth2 = document.getElementById("thickness-form2")
    addOptions(sheets, metal1)
    addOptions(camCover, fillerOp)
    addWidth("sheet", sheetWidth1)
    addWidth("camprofile", sheetWidth2)
    createTable(CGtable)
    addPossibilities("resultLG05A()")
}
function resultLG05A() {
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
    makeTableCG(mid, covers, "overheadCG")
}