//! ...Ring = new mathResult(0, 0, 0, 0)
//! innerRing, windingRing, outerRing are required for every function

/*
let innerMaterial = sheets.filter(material => material["id"] == metal1Val)
let innerRing = massFunc(d1Val, d2Val, thic1Val, innerMaterial, labourD1)

let windingMaterial = strips.filter(material => material["id"] == metal2Val)
let fillerMaterial = fillers.filter(material => material["id"] == fillerVal)
let windingRing  = windingFunc(d2Val, d3Val, thic2Val, windingMaterial, labourD2, fillerMaterial[0])

let outerMaterial = sheets.filter(material => material["id"] == metal3Val)
let outerRing = massFunc(d2Val, d3Val, thic3Val, outerMaterial, labourD3)

makeTableSWG(innerRing, windingRing, outerRing)
*/

function LG11() {
    metal2 = document.getElementById("metal-form2")
    fillerOp = document.getElementById("filler-form")
    stripWidthForm = document.getElementById("thickness-form2")
    addOptions(strips, metal2)
    addOptions(fillers, fillerOp)
    addWidth("strip", stripWidthForm)
    addPossibilities("resultLG11()")
    createTable(SWGtable)   
}
function resultLG11() {
    d2Val = parseFloat(document.getElementById("d2-form").value)
    d3Val = parseFloat(document.getElementById("d3-form").value)
    thic2Val = parseFloat(document.getElementById("thickness-form2").value)
    metal2Val = document.getElementById("metal-form2").value
    fillerVal = document.getElementById("filler-form").value
    priceUnit = document.getElementById("priceSelect").value
    
    let innerRing = new mathResult(0, 0, 0, 0)
    let outerRing = new mathResult(0, 0, 0, 0)

    let windingMaterial = strips.filter(material => material["id"] == metal2Val)
    let fillerMaterial = fillers.filter(material => material["id"] == fillerVal)
    let windingRing  = windingFunc(d2Val, d3Val, thic2Val, windingMaterial[0], labourD2, fillerMaterial[0])
    
    makeTableSWG(innerRing, windingRing, outerRing, overheadSWG)
}

function LG11IR() {
    metal1 = document.getElementById("metal-form1")
    metal2 = document.getElementById("metal-form2")
    fillerOp = document.getElementById("filler-form")
    sheetWidth1 = document.getElementById("thickness-form1")
    stripWidthForm = document.getElementById("thickness-form2")
    addOptions(sheets, metal1)
    addOptions(strips, metal2)
    addOptions(fillers, fillerOp)
    addWidth("sheet", sheetWidth1)
    addWidth("strip", stripWidthForm)
    addPossibilities("resultLG11IR()")
    createTable(SWGtable)
    
}
function resultLG11IR() {
    d1Val = parseFloat(document.getElementById("d1-form").value)
    d2Val = parseFloat(document.getElementById("d2-form").value)
    d3Val = parseFloat(document.getElementById("d3-form").value)
    thic1Val = parseFloat(document.getElementById("thickness-form1").value)
    thic2Val = parseFloat(document.getElementById("thickness-form2").value)
    metal1Val = document.getElementById("metal-form1").value
    metal2Val = document.getElementById("metal-form2").value
    fillerVal = document.getElementById("filler-form").value
    priceUnit = document.getElementById("priceSelect").value
    
    let innerMaterial = sheets.filter(material => material["id"] == metal1Val)
    let innerRing = massFunc(d1Val, d2Val+1.5, thic1Val, innerMaterial[0], labourD1)

    let windingMaterial = strips.filter(material => material["id"] == metal2Val)
    let fillerMaterial = fillers.filter(material => material["id"] == fillerVal)
    let windingRing  = windingFunc(d2Val, d3Val, thic2Val, windingMaterial[0], labourD2, fillerMaterial[0])

    let outerRing = new mathResult(0, 0, 0, 0)

    makeTableSWG(innerRing, windingRing, outerRing, overheadSWG)
}

function LG13() {
    metal2 = document.getElementById("metal-form2")
    metal3 = document.getElementById("metal-form3")
    fillerOp = document.getElementById("filler-form")
    sheetWidth2 = document.getElementById("thickness-form3")
    stripWidthForm = document.getElementById("thickness-form2")
    addOptions(strips, metal2)
    addOptions(sheets, metal3)
    addOptions(fillers, fillerOp)
    addWidth("sheet", sheetWidth2)
    addWidth("strip", stripWidthForm)
    createTable(SWGtable)
    addPossibilities("resultLG13()")
}
function resultLG13() {
    d2Val = parseFloat(document.getElementById("d2-form").value)
    d3Val = parseFloat(document.getElementById("d3-form").value)
    d4Val = parseFloat(document.getElementById("d4-form").value)
    thic2Val = parseFloat(document.getElementById("thickness-form2").value)
    thic3Val = parseFloat(document.getElementById("thickness-form3").value)
    metal2Val = document.getElementById("metal-form2").value
    metal3Val = document.getElementById("metal-form3").value
    fillerVal = document.getElementById("filler-form").value
    priceUnit = document.getElementById("priceSelect").value

    let innerRing = new mathResult(0, 0, 0, 0)

    let windingMaterial = strips.filter(material => material["id"] == metal2Val)
    let fillerMaterial = fillers.filter(material => material["id"] == fillerVal)
    let windingRing  = windingFunc(d2Val, d3Val, thic2Val, windingMaterial[0], labourD2, fillerMaterial[0])

    let outerMaterial = sheets.filter(material => material["id"] == metal3Val)
    let outerRing = massFunc(d2Val, d3Val, thic3Val, outerMaterial[0], labourD3)

    makeTableSWG(innerRing, windingRing, outerRing, overheadSWG)
}

function LG13IR() {
    metal1 = document.getElementById("metal-form1")
    metal2 = document.getElementById("metal-form2")
    metal3 = document.getElementById("metal-form3")
    fillerOp = document.getElementById("filler-form")
    sheetWidth1 = document.getElementById("thickness-form1")
    sheetWidth2 = document.getElementById("thickness-form3")
    stripWidthForm = document.getElementById("thickness-form2")
    addOptions(sheets, metal1)
    addOptions(strips, metal2)
    addOptions(sheets, metal3)
    addOptions(fillers, fillerOp)
    addWidth("sheet", sheetWidth1)
    addWidth("sheet", sheetWidth2)
    addWidth("strip", stripWidthForm)
    createTable(SWGtable)
    addPossibilities("resultLG13IR()")
}
function resultLG13IR() {
    d1Val = parseFloat(document.getElementById("d1-form").value)
    d2Val = parseFloat(document.getElementById("d2-form").value)
    d3Val = parseFloat(document.getElementById("d3-form").value)
    d4Val = parseFloat(document.getElementById("d4-form").value)
    thic1Val = parseFloat(document.getElementById("thickness-form1").value)
    thic2Val = parseFloat(document.getElementById("thickness-form2").value)
    thic3Val = parseFloat(document.getElementById("thickness-form3").value)
    metal1Val = document.getElementById("metal-form1").value
    metal2Val = document.getElementById("metal-form2").value
    metal3Val = document.getElementById("metal-form3").value
    fillerVal = document.getElementById("filler-form").value
    weightUnit = document.getElementById("weightSelect").value
    priceUnit = document.getElementById("priceSelect").value

    let innerMaterial = sheets.filter(material => material["id"] == metal1Val)
    let innerRing = massFunc(d1Val, d2Val+1.5, thic1Val, innerMaterial[0], labourD1)

    let windingMaterial = strips.filter(material => material["id"] == metal2Val)
    let fillerMaterial = fillers.filter(material => material["id"] == fillerVal)
    let windingRing  = windingFunc(d2Val, d3Val, thic2Val, windingMaterial[0], labourD2, fillerMaterial[0])
    
    let outerMaterial = sheets.filter(material => material["id"] == metal3Val)
    let outerRing = massFunc(d3Val, d4Val, thic3Val, outerMaterial[0], labourD3)

    makeTableSWG(innerRing, windingRing, outerRing, overheadSWG)
}

function LG14() {
    metal1 = document.getElementById("metal-form1")
    fillerOp = document.getElementById("filler-form")
    sheetWidth1 = document.getElementById("thickness-form1")
    addPossibilities("resultLG14()")
    addOptions(strips, metal1)
    addOptions(fillers, fillerOp)
    addWidth("strip", sheetWidth1)
    createTable(SWGtable)
}
function resultLG14() {
    let minor = parseFloat(document.getElementById("d1-form").value)
    let major = parseFloat(document.getElementById("d2-form").value)
    let width = parseFloat(document.getElementById("d3-form").value)
    thic1Val = parseFloat(document.getElementById("thickness-form1").value)
    metal1Val = document.getElementById("metal-form1").value
    fillerVal = document.getElementById("filler-form").value

    table.innerHTML=""

    let innerRing = new mathResult(0, 0, 0, 0)
    let outerRing = new mathResult(0, 0, 0, 0)

    let stripMaterial = strips.filter(material => material["id"] == metal1Val)
    let fillerMaterial = fillers.filter(material => material["id"] == fillerVal)

    let windingRing = LG14Math(minor, major, width, thic1Val, stripMaterial[0], fillerMaterial[0])

    makeTableSWG(innerRing, windingRing, outerRing, overheadSWG)
}
