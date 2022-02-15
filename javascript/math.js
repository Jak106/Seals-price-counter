//functions to define prices of materials based on their thickness
function stripPrice(arr, thickness) {
    return thickness == 2.5 ? arr["priceKg"] = arr["price1"]
    : thickness == 3.2 ? arr["priceKg"] = arr["price2"]
    : thickness == 4.8 ? arr["priceKg"] = arr["price3"]
    : thickness == 6.4 ? arr["priceKg"] = arr["price4"]
    : arr["priceKg"] = arr["price5"];
}
function stripWidth(arr, thickness) {
    return thickness == 2.5 ? arr["width"] = 3.17
    : thickness == 3.2 ? arr["width"] = 3.96
    : thickness == 4.8 ? arr["width"] = 5
    : thickness == 6.4 ? arr["width"] = 8
    : arr["width"] = 9;
}
function metalSheetsPrice(arr, thickness) {
    return thickness == 0.50 ? arr["priceKg"] = arr["price1"]
    : thickness == 0.60 ? arr["priceKg"] = arr["price2"]
    : thickness == 0.80 ? arr["priceKg"] = arr["price3"]
    : thickness == 1 || thickness == 1.5 ? arr["priceKg"] = arr["price4"]
    : thickness == 2 ? arr["priceKg"] = arr["price5"]
    : thickness == 3 ? arr["priceKg"] = arr["price6"]
    : thickness == 4 ? arr["priceKg"] = arr["price7"]
    : arr["priceKg"] = arr["price8"];
}
function fillersWidth(arr, thickness) {
    return thickness == 2.50 ? arr["width"] = 4
    : thickness == 3.2 ? arr["width"] = 4.5
    : thickness == 4.8 ? arr["width"] = 5.6
    : thickness == 6.4 ? arr["width"] = 9
    : arr["width"] = 10
}

function shape(inc) {
    document.getElementById("shape-button").innerHTML = inc;
    document.getElementById("shape-button").value = inc;
}

//function to create result of object
function mathResult(volume, weight, price, labour) {
    this.volume = volume,
    this.weight = weight,
    this.price = price,
    this.labour = labour
}

//universal functions
function getEFF(size) {
    let result = []
    let eff = labour_Eff.filter(material => material["id"] == "eff")
    Object.keys(...eff)
        .forEach(factor => {
            if (factor != "id") {
                if (size <= parseFloat(factor)) {
                    result.push(eff[0][factor])
                }
            } 
        }
    )
    return result.length === 0 ? 1.6
    : result[0]
}

function getLabour(size, arr) {
    let result = []
    Object.keys(arr)
    .forEach(check => {
        if (size < parseFloat(check)) {
            result.push(check)
        }
    })
    return arr[result[0]]
}

function massFunc(d1, d2, thickness, arr, labourReq) {
    let possibilities = getPossibilities()
    
    if(possibilities.sizeUnit == "inch") {
        d1 = d1*0.394
        d1 = d2*0.394
    }
    
    let area1 = Math.PI*((d1/2)**2) //mm2
    let area2 = Math.PI*((d2/2)**2) //mm2
    let volume = (area2 - area1)*thickness/1000 //cm3
    let weight = volume*arr["density"] //g
    let price = (weight/1000)*metalSheetsPrice(arr, thickness) * getEFF(d2-d1)

    let labourArr = labour_Eff.filter(material => material["id"] == labourReq)
    let labour = getLabour(d2-d1, labourArr[0]) //euro
    
    if (possibilities.weightUnit == "kilogram") {
        weight = weight / 1000
    }
    
    if (possibilities.priceUnit == "dollar") {
        price, labour = price * 1.13, labour * 1.13
    } else if (possibilities.priceUnit == "pound") {
        price, labour = price * 0.84, labour * 0.84
    }

    let partRes = {
        "d1": d1,
        "d2": d2,
        "area1": Math.round(area1*100)/100,
        "area2": Math.round(area2*100)/100,
        "thickness": Math.round(thickness*100)/100,
        "volume": Math.round(volume*100)/100,
        "weight": Math.round(weight*100)/100,
        "eff": getEFF(d2-d1),
        "price": Math.round(price*100)/100,
        "sheet price": metalSheetsPrice(arr, thickness)
    }
    let stringRes = JSON.stringify(partRes).replace(/,/ig, ",<br>").replace(/:/ig, " = ")
    addResPoint("in/out ring <br>" + stringRes + "<br>")
    
    return new mathResult(volume, weight, price, labour) 
}

function windingFunc(d2, d3, thickness, materialArr, labourReq, fillerArr) {
    let possibilities = getPossibilities()
    
    if (possibilities.sizeUnit == "inch") {
        d2 = d2*0.394
        d3 = d3*0.394
    }
    
    let windingWidth = (d3+1-d2)/2 //mm
    let averageLength = Math.PI*((d3+1)+d2)/2 //mm

    let fillerWraps = (windingWidth-(6*0.18))/(fillerArr["thickness"]+0.18) //number
    let fillerLength = fillerWraps * averageLength * 1.2 //mm
    let fillerWeight = fillerArr["density"] * (fillerArr["thickness"] * fillersWidth(fillerArr, thickness) * fillerLength / 1000) //g
    let fillerCost = (fillerWeight/1000)*fillerArr["priceKg"] //kg3
    
    let stripsWraps = fillerWraps + 6 //number
    let stripLength = stripsWraps * averageLength * 1.2 //mm
    let stripWeight = materialArr["density"] * (0.18  * stripWidth(materialArr, thickness) * stripLength / 1000) //g
    let stripCost = (stripWeight/1000)*stripPrice(materialArr, thickness) //kg3

    let weight = fillerWeight + stripWeight
    let price = fillerCost + stripCost

    let labourArr = labour_Eff.filter(material => material["id"] == labourReq)
    let labour = getLabour(windingWidth, labourArr[0])
    
    if (possibilities.weightUnit == "kilogram") {
        weight = weight / 1000 
    }
    if (possibilities.priceUnit == "dollar") {
        price = price * 1.13
        labour = labour * 1.13
    } else if (possibilities.priceUnit == "pound") {
        price = price * 0.84
        labour = labour * 0.84
    }

    let partRes = {
        "d2": d2,
        "d3": d3,
        "Winding width": Math.round(windingWidth*100)/100,
        "Num of filler wraps": Math.round(fillerWraps*10)/10,
        "Num of material wraps": Math.round(stripsWraps*10)/10,
        "Average length": Math.round(averageLength*100)/100,
        "Filler length": Math.round(fillerLength*100)/100,
        "Filler weight": Math.round(fillerWeight*100)/100,
        "Filler price": Math.round(fillerCost*100)/100,
        "Material length": Math.round(stripLength*100)/100,
        "Material weight": Math.round(stripWeight*100)/100,
        "Material price": Math.round(stripCost*100)/100,
    }
    let stringRes = JSON.stringify(partRes).replace(/,/ig, ",<br>").replace(/:/ig, " = ")
    addResPoint("winding <br>" + stringRes + "<br>")
    
    return new mathResult(0, weight, price, labour)
}

function LG14Math(minor, major, width, thickness, materialArr, fillerArr) {
    let possibilities = getPossibilities()
    
    if (possibilities.sizeUnit == "inch") {
        major = major*0.394
        minor = minor*0.394
        width = width*0.394
    }

    let averageLenght = Math.PI*Math.sqrt(2*((major+width/2)**2)+((minor+width/2)**2))
    
    let stripsWraps = (width + 3)/0.678
    let stripLength = stripsWraps * averageLenght * 1.2//mm
    let stripWeight = materialArr["density"] * 0.18 *  stripWidth(materialArr, thickness) * stripLength /1000
    let stripCost = stripWeight * stripPrice(materialArr, thickness)/1000

    let fillerWraps = stripsWraps - 6
    let fillerLength = fillerWraps * averageLenght * 1.2//mm
    let fillerWeight = fillerArr["density"] * fillerArr["thickness"] * fillersWidth(fillerArr, thickness) * fillerLength /1000
    let fillerCost = fillerWeight*fillerArr["priceKg"]/1000
    
    let weight = fillerWeight + stripWeight  
    let price = fillerCost + stripCost

    let labourArr = labour_Eff.filter(material => material["id"] == "labourD2")
    let labour = getLabour(width, labourArr[0])
    
    let partRes = {
        "width": width,
        "Num of filler wraps": Math.round(fillerWraps*10)/10,
        "Num of material wraps": Math.round(stripsWraps*10)/10,
        "Average length": Math.round(averageLenght*100)/100,
        "Filler length": Math.round(fillerLength*100)/100,
        "Filler weight": Math.round(fillerWeight*100)/100,
        "Filler price": Math.round(fillerCost*100)/100,
        "Material length": Math.round(stripLength*100)/100,
        "Material weight": Math.round(stripWeight*100)/100,
        "Material price": Math.round(stripCost*100)/100,
    }
    let stringRes = JSON.stringify(partRes).replace(/,/ig, ",<br>").replace(/:/ig, " = ")
    addResPoint("winding <br>" + stringRes + "<br>")

    return new mathResult(0, weight, price, labour)
}

function corrugatedCover(d1, d2, coversMaterial, thicknessCover) {
    let possibilities = getPossibilities()

    if(possibilities.sizeUnit == "inch") {
        d1 = d1*0.394
        d2 = d2*0.394
    }

    let area1 = Math.PI*((d1/2)**2) //mm2
    let area2 = Math.PI*((d2/2)**2) //mm2
    let volume = ((area2 - area1)*thicknessCover/1000)*2
    let weight = (volume*coversMaterial["density"])
    let price = weight*coversMaterial["priceKg"]/1000*getEFF(d2-d1)

    let labourArr = labour_Eff.filter(material => material["id"] == "corrugatedLabour")
    let labour = getLabour(d2-d1, labourArr[0])
    
    if (possibilities.weightUnit == "kilogram") {
        weight = weight / 1000 
    }
    if (possibilities.priceUnit == "dollar") {
        price = price * 1.13
    } else if (possibilities.priceUnit == "pound") {
        price = price * 0.84
    }

    let partRes = {
        "d1": d1,
        "d2": d2,
        "area1": Math.round(area1*100)/100,
        "area2": Math.round(area2*100)/100,
        "thickness": Math.round(thicknessCover*100)/100,
        "volume": Math.round(volume*100)/100,
        "weight": Math.round(weight*100)/100,
        "eff": getEFF(d2-d1),
        "price": Math.round(price*100)/100,
        "sheet price": metalSheetsPrice(coversMaterial, thicknessCover)
    }
    let stringRes = JSON.stringify(partRes).replace(/,/ig, ",<br>").replace(/:/ig, " = ")
    addResPoint("cover <br>" + stringRes + "<br>")

    return new mathResult(volume*2, weight*2, price*2, labour*2)
}
function corrugatedMid(d1, d2, cordMaterial, thicknessMetal) {
    let possibilities = getPossibilities()

    if(possibilities.sizeUnit == "inch") {
        d1 = d1*0.394
        d2 = d2*0.394
    }
    
    let area1 = Math.PI*((d1/2)**2) //mm2
    let area2 = Math.PI*((d2/2)**2) //mm2
    let volume = (area2 - area1)*thicknessMetal/1000
    let weight = (volume*cordMaterial["density"])
    let price = weight*stripPrice(cordMaterial, thicknessMetal)/1000
    
    let labourArr = labour_Eff.filter(material => material["id"] == "labourD2")
    let labour = getLabour(d2-d1, labourArr[0])
    
    if (possibilities.weightUnit == "kilogram") {
        weight = weight / 1000 
    }
    if (possibilities.priceUnit == "dollar") {
        price, labour = price * 1.13, labour * 1.13
    } else if (possibilities.priceUnit == "pound") {
        price, labour = price * 0.84, labour * 0.84
    }

    let partRes = {
        "d1": d1,
        "d2": d2,
        "area1": Math.round(area1*100)/100,
        "area2": Math.round(area2*100)/100,
        "thickness": Math.round(thicknessMetal*100)/100,
        "volume": Math.round(volume*100)/100,
        "weight": Math.round(weight*100)/100,
        "eff": getEFF(d2-d1),
        "sheet price": metalSheetsPrice(cordMaterial, thicknessMetal)
    }
    let stringRes = JSON.stringify(partRes).replace(/,/ig, ",<br>").replace(/:/ig, " = ")
    addResPoint("cord <br>" + stringRes + "<br>")

    return new mathResult(volume, weight, price, labour)
}

//total prices for SWG/CG and price including profit
function totalSWGPrice(innerRing, windingRing, outerRing, eLabour, overhead) {
    return innerRing["price"] + windingRing["price"] + outerRing["price"] + 
        innerRing["labour"] +  windingRing["labour"] + outerRing["labour"] + eLabour +
        (innerRing["labour"] +  windingRing["labour"] + outerRing["labour"])*overhead
}
function totalCGPrice(mid, cover, eLabour, overhead) {
    return mid["price"] + cover["price"] +
        mid["labour"] + cover["labour"] + eLabour +
        (mid.labour + cover.labour)*overhead
}
function getProfit(price, profit) {
    return price/(1-(profit/100))
}

//function to create table with result functions
function makeTableSWG(innerRing, windingRing, outerRing, overhead) {
    let possibilities = getPossibilities()
    let overheadVal = labour_Eff.filter(type => type.id === "overhead")
    let totalPrice = totalSWGPrice(innerRing, windingRing, outerRing, possibilities.labour, overheadVal[0][overhead])
    
    let increment = document.getElementById("shape-button").value
    console.log(increment)
    
    table.innerHTML = ""
    SWGtable["Material"] = Math.round((innerRing["price"] + windingRing["price"] + outerRing["price"])*100)/100 + " " + possibilities.priceUnit //Sum of all prices of materials
    SWGtable["Labour"] = Math.round((innerRing["labour"] +  windingRing["labour"] + outerRing["labour"])*100)/100 + possibilities.labour + " " + possibilities.priceUnit//Sum of all prices of labour
    SWGtable["Overhead"] = Math.round(((innerRing["labour"] +  windingRing["labour"] + outerRing["labour"])*overheadVal[0][overhead])*100)/100 + possibilities.labour + " " + possibilities.priceUnit
    SWGtable["SC"] = Math.round(totalPrice*100)/100 + " " + possibilities.priceUnit //total material + labour price
    SWGtable["1 pc"] = Math.round((getProfit(totalPrice, possibilities.profit)*1.3)*100)/100  + " " + possibilities.priceUnit// math
    SWGtable["2-5 pc"] = Math.round((getProfit(totalPrice, possibilities.profit)*1.15)*100)/100 + " " + possibilities.priceUnit// math
    SWGtable["6-20 pc"] =  Math.round(getProfit(totalPrice, possibilities.profit)*100)/100 + " " + possibilities.priceUnit// math
    SWGtable["21-50 pc"] = Math.round((getProfit(totalPrice, possibilities.profit)*0.95)*100)/100  + " " + possibilities.priceUnit// math
    SWGtable[">50 pc"] = Math.round((getProfit(totalPrice, possibilities.profit)*0.85)*100)/100  + " " + possibilities.priceUnit// math
    SWGtable["Inner ring"] = Math.round(innerRing["weight"]*100)/100 + " " + possibilities.weightUnit // weight of inner ring
    SWGtable["Winding"] = Math.round(windingRing["weight"]*100)/100 + " " + possibilities.weightUnit // weight of winding
    SWGtable["Outer ring"] = Math.round(outerRing["weight"]*100)/100 + " " + possibilities.weightUnit // weight of outer ring
    SWGtable["Total weight"] = Math.round((innerRing["weight"] + windingRing["weight"] + outerRing["weight"])*100)/100 + " " + possibilities.weightUnit //weight of all materials summed
    createTable(SWGtable)
}
function makeTableCG(mid, cover, overhead) {
    let possibilities = getPossibilities()
    let overheadVal = labour_Eff.filter(type => type.id === "overhead")
    let totalPrice = totalCGPrice(mid, cover, possibilities.labour, overheadVal[0][overhead])

    table.innerHTML = ""
    CGtable["Material"] = Math.round((mid.price + cover.price)*100)/100 + " " + possibilities.priceUnit //Sum of all prices of materials
    CGtable["Labour"] = Math.round((mid.labour + cover.labour)*100)/100 + possibilities.labour + " " + possibilities.priceUnit//Sum of all prices of labour
    CGtable["Overhead"] =  Math.round(((mid.labour + cover.labour)*overheadVal[0][overhead])*100)/100 + possibilities.labour + " " + possibilities.priceUnit
    CGtable["SC"] = Math.round(totalPrice*100)/100 + " " + possibilities.priceUnit//? not sure about this either
    CGtable["1 pc"] = Math.round(getProfit(totalPrice, possibilities.profit)*1.3*100)/100 + " " + possibilities.priceUnit // math
    CGtable["2-5 pc"] = Math.round(getProfit(totalPrice, possibilities.profit)*1.15*100)/100 + " " + possibilities.priceUnit // math
    CGtable["6-20 pc"] = Math.round(getProfit(totalPrice, possibilities.profit)*100)/100 + " " + possibilities.priceUnit// math
    CGtable["21-50 pc"] = Math.round(getProfit(totalPrice, possibilities.profit)*0.95*100)/100 + " " + possibilities.priceUnit // math
    CGtable[">50 pc"] = Math.round(getProfit(totalPrice, possibilities.profit)*0.85*100)/100 + " " + possibilities.priceUnit // math
    CGtable["Metal Cord"] = Math.round(mid.weight*100)/100 + " " + possibilities.weightUnit // weight of inner ring
    CGtable["Covers"] = Math.round(cover.weight*100)/100 + " " + possibilities.weightUnit // weight of winding
    CGtable["Total weight"] = Math.round((mid.weight + cover.weight)*100)/100 + " " + possibilities.weightUnit //weight of all materials summed
    createTable(CGtable)
}