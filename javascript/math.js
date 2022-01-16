var overheadSWG = 3.6
var overheadCM = 4
var overheadCG = 3.6

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
    : thickness == 1 ? arr["priceKg"] = arr["price4"]
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
    Object.keys(eff)
        .forEach(factor => {
            if (size <= parseFloat(factor)) {
                result.push(factor)
            }
        }
    )
    if (result.length == 0) {
        return 1.6
    } else {
        return eff[result[0]]
    }
}

function getLabour(size, arr) {
    let result = []
    Object.keys(arr)
    .forEach(check => {
        if (size < parseFloat(check)) {
            result.push(check)
        }
    })
    return arr[result[0]]/30.126*1.3
}

function massFunc(d1, d2, thickness, arr, labourArr) {
    let possibilities = getPossibilities()
    if(possibilities.sizeUnit == "inch") {
        d1 = d1*0.394
        d1 = d2*0.394
    }
    let area1 = Math.PI*((d1/2)**2) //mm2
    let area2 = Math.PI*((d2/2)**2) //mm2
    let volume = (area2 - area1)*thickness/1000 //cm3
    let weight = volume*arr["density"]
    let price = (weight/1000)*metalSheetsPrice(arr, thickness) * getEFF(d2-d1)
    let labour = getLabour(d2-d1, labourArr) //euro
    console.log(`
    area1 = ${area1} mm2
    area2 = ${area2} mm2
    thickness = ${thickness} mm
    volume = ${volume} cm3
    density = ${arr["density"]}
    weight = ${weight}
    eff = ${getEFF(d2-d1)}
    `)
    if (possibilities.weightUnit == "kilogram") {
        weight = weight / 1000
    }
    if (possibilities.priceUnit == "Dollar") {
        price = price * 1.13
    } else if (possibilities.priceUnit == "Pound") {
        price = price * 0.84
    }
    return new mathResult(volume, weight, price, labour) 
}

function windingFunc(d2, d3, thickness, materialArr, labourArr, fillerArr) {
    let possibilities = getPossibilities()
    if (possibilities.sizeUnit == "inch") {
        d2 = d2*0.394
        d3 = d3*0.394
    }
    let windingWidth = (d3+1-d2)/2 
    let wrapsFiller = (windingWidth-(6*0.178))/(fillerArr["thickness"]+0.178)
    let wrapsTotal = wrapsFiller + 6
    let averageLength = Math.PI*((d3+1)+d2)/2
    let lengthFiller = wrapsFiller * averageLength * 1.2
    let lengthMaterial = wrapsTotal * averageLength * 1.2
    let fillerWeight = fillerArr["density"] * fillerArr["thickness"] * fillersWidth(fillerArr, thickness) * lengthFiller / 1000
    let stripWeight = materialArr["density"] * 0.18  * stripWidth(materialArr, thickness) * lengthMaterial / 1000
    let fillerCost = fillerWeight*fillerArr["priceKg"]/1000
    let stripCost = stripWeight * stripPrice(materialArr, thickness)/1000
    let totalCostFiller = lengthFiller * fillerCost / 1000
    let totalMaterialCost = lengthMaterial * stripCost / 1000
    let weight = (fillerWeight + stripWeight)
    let price = (totalCostFiller + totalMaterialCost) * getEFF(d3-d2)
    let labour = getLabour(windingWidth, labourArr)
    if (possibilities.weightUnit == "kilogram") {
        weight = weight / 1000 
    }
    if (possibilities.priceUnit == "Dollar") {
        price = price * 1.13
        labour = labour * 1.13
    } else if (possibilities.priceUnit == "Pound") {
        price = price * 0.84
        labour = labour * 0.84
    }
    console.log(`
    windingWidth = ${windingWidth}
    wrapsFiller = ${wrapsFiller}
    wrapsTotal = ${wrapsTotal}
    averageLenght = ${averageLength}
    lengthFiller = ${lengthFiller}
    lengthMaterial = ${lengthMaterial}
    fillerWeight = ${fillerWeight}
    fillerCost = ${fillerCost}
    fillerCost = ${fillerCost}
    stripWeight = ${stripWeight}
    stripCost = ${stripCost}
    totalCostFiller =${totalCostFiller}
    totalMaterialCost = ${totalMaterialCost}`)
    return new mathResult(0, weight, price, labour)
}

function LG14Math(minor, major, width, thickness, materialArr, fillerArr) {
    let possibilities = getPossibilities()
    if (possibilities.sizeUnit == "inch") {
        major = major*0.394
        minor = minor*0.394
        width = width*0.394
    }
    let wrapsTotal = (width + 3)/0.678
    let wrapsFiller = wrapsTotal - 6
    let averageLenght = Math.PI*Math.sqrt(2*((major+width/2)**2)+((minor+width/2)**2))
    let lengthFiller = wrapsFiller * averageLenght * 1.2 //mm
    let lengthMaterial = wrapsTotal * averageLenght * 1.2 //mm
    let fillerWeight = fillerArr["density"] * fillerArr["thickness"] * fillersWidth(fillerArr, thickness) * lengthFiller /1000
    let stripWeight = materialArr["density"] * 0.18 *  stripWidth(materialArr, thickness) * lengthMaterial /1000

    let fillerCost = fillerWeight*fillerArr["priceKg"]/1000

    let stripCost = stripWeight * stripPrice(materialArr, thickness)/1000
    let totalCostFiller = lengthFiller * fillerCost / 1000
    let totalMaterialCost = lengthMaterial * stripCost / 1000
    let weight = (fillerWeight + stripWeight)
    let price = (totalCostFiller + totalMaterialCost) * getEFF(width)
    let labour = getLabour(width, labourD2)


    console.log(`
    sizeUnit = ${possibilities.sizeUnit}
    width = ${width}
    filler thic = ${fillerArr["thickness"]}
    wrapsFiller = ${wrapsFiller}
    wrapsTotal = ${wrapsTotal}
    averageLength = ${averageLenght}
    lengthFiller = ${lengthFiller}
    lengthMaterial = ${lengthMaterial}
    stripCost = ${stripPrice(materialArr, thickness)}
    totalMaterialCost = ${totalMaterialCost}
    weight = ${weight}
    price = ${price}`)


    return new mathResult(0, weight, price, labour)
}
function corrugatedCover(d1, d2, coversMaterial, thicknessCover) {
    console.log(d1, d2, coversMaterial, thicknessCover)
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
    let labour = getLabour(d2-d1, coversLabour)
    if (possibilities.weightUnit == "kilogram") {
        weight = weight / 1000 
    }
    if (possibilities.priceUnit == "Dollar") {
        price = price * 1.13
    } else if (possibilities.priceUnit == "Pound") {
        price = price * 0.84
    }
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
    let labour = getLabour(d2-d1, camprofileLabour)
    if (possibilities.weightUnit == "kilogram") {
        weight = weight / 1000 
    }
    if (possibilities.priceUnit == "Dollar") {
        price = price * 1.13
        labour = labour * 1.13
    } else if (possibilities.priceUnit == "Pound") {
        price = price * 0.84
        labour = labour * 1.13
    }
    return new mathResult(volume, weight, price, labour)
}

function totalSWGPrice(innerRing, windingRing, outerRing, profit, eLabour, overhead) {
    return innerRing["price"] + windingRing["price"] + outerRing["price"] + 
        innerRing["labour"] +  windingRing["labour"] + outerRing["labour"] + eLabour +
        (innerRing["labour"] +  windingRing["labour"] + outerRing["labour"])*overhead +
        (innerRing["price"] + windingRing["price"] + outerRing["price"] + innerRing["labour"] +  windingRing["labour"] + outerRing["labour"])*profit/100
}
function totalCGPrice(mid, cover, profit, eLabour, overhead) {
    return mid["price"] + cover["price"] +
        mid["labour"] + cover["labour"] + eLabour +
        (mid.labour + cover.labour)*overhead + 
        (mid["price"] + cover["price"])*profit/100
}
//function to create table with result functions
function makeTableSWG(innerRing, windingRing, outerRing, overhead) {
    let possibilities = getPossibilities()
    table.innerHTML = ""
    SWGtable["Material"] = Math.round((innerRing["price"] + windingRing["price"] + outerRing["price"])*100)/100 + " " + possibilities.priceUnit //Sum of all prices of materials
    SWGtable["Labour"] = Math.round((innerRing["labour"] +  windingRing["labour"] + outerRing["labour"])*100)/100 + possibilities.labour + " " + possibilities.priceUnit//Sum of all prices of labour
    SWGtable["Overhead"] = Math.round(((innerRing["labour"] +  windingRing["labour"] + outerRing["labour"])*overhead)*100)/100 + possibilities.labour + " " + possibilities.priceUnit
    SWGtable["SC"] = Math.round((totalSWGPrice(innerRing, windingRing, outerRing, possibilities.profit, possibilities.labour, overhead))*100)/100 + " " + possibilities.priceUnit //? not sure about this either
    SWGtable["1 pc"] = Math.round((totalSWGPrice(innerRing, windingRing, outerRing, possibilities.profit, possibilities.labour, overhead)*1.3)*100)/100  + " " + possibilities.priceUnit// math
    SWGtable["2-5 pc"] = Math.round((totalSWGPrice(innerRing, windingRing, outerRing, possibilities.profit, possibilities.labour, overhead)*1.15)*100)/100  + " " + possibilities.priceUnit// math
    SWGtable["6-20 pc"] =  Math.round((totalSWGPrice(innerRing, windingRing, outerRing, possibilities.profit, possibilities.labour, overhead))*100)/100 + " " + possibilities.priceUnit// math
    SWGtable["21-50 pc"] = Math.round((totalSWGPrice(innerRing, windingRing, outerRing, possibilities.profit, possibilities.labour, overhead)*0.95)*100)/100  + " " + possibilities.priceUnit// math
    SWGtable[">50 pc"] = Math.round((totalSWGPrice(innerRing, windingRing, outerRing, possibilities.profit, possibilities.labour, overhead)*0.85)*100)/100  + " " + possibilities.priceUnit// math
    SWGtable["Inner ring"] = Math.round(innerRing["weight"]*100)/100 + " " + possibilities.weightUnit // weight of inner ring
    SWGtable["Winding"] = Math.round(windingRing["weight"]*100)/100 + " " + possibilities.weightUnit // weight of winding
    SWGtable["Outer ring"] = Math.round(outerRing["weight"]*100)/100 + " " + possibilities.weightUnit // weight of outer ring
    SWGtable["Total weight"] = Math.round((innerRing["weight"] + windingRing["weight"] + outerRing["weight"])*100)/100 + " " + possibilities.weightUnit //weight of all materials summed
    createTable(SWGtable)
}
function makeTableCG(mid, cover, overhead) {
    let possibilities = getPossibilities()
    table.innerHTML = ""
    CGtable["Material"] = Math.round((mid.price + cover.price)*100)/100 + " " + possibilities.priceUnit //Sum of all prices of materials
    CGtable["Labour"] = Math.round((mid.labour + cover.labour)*100)/100 + possibilities.labour + " " + possibilities.priceUnit//Sum of all prices of labour
    CGtable["Overhead"] =  Math.round(((mid.labour + cover.labour)*overhead)*100)/100 + possibilities.labour + " " + possibilities.priceUnit
    CGtable["SC"] = Math.round(totalCGPrice(mid, cover, possibilities.profit, possibilities.labour, overhead)*100)/100 + " " + possibilities.priceUnit//? not sure about this either
    CGtable["1 pc"] = Math.round(totalCGPrice(mid, cover, possibilities.profit, possibilities.labour, overhead)*1.3*100)/100 + " " + possibilities.priceUnit // math
    CGtable["2-5 pc"] = Math.round(totalCGPrice(mid, cover, possibilities.profit, possibilities.labour, overhead)*1.15*100)/100 + " " + possibilities.priceUnit // math
    CGtable["6-20 pc"] = Math.round(totalCGPrice(mid, cover, possibilities.profit, possibilities.labour, overhead)*100)/100 + " " + possibilities.priceUnit// math
    CGtable["21-50 pc"] = Math.round(totalCGPrice(mid, cover, possibilities.profit, possibilities.labour, overhead)*0.95*100)/100 + " " + possibilities.priceUnit // math
    CGtable[">50 pc"] = Math.round(totalCGPrice(mid, cover, possibilities.profit, possibilities.labour, overhead)*0.85*100)/100 + " " + possibilities.priceUnit // math
    CGtable["Metal Cord"] = Math.round(mid.weight*100)/100 + " " + possibilities.weightUnit // weight of inner ring
    CGtable["Covers"] = Math.round(cover.weight*100)/100 + " " + possibilities.weightUnit // weight of winding
    CGtable["Total weight"] = Math.round((mid.weight + cover.weight)*100)/100 + " " + possibilities.weightUnit //weight of all materials summed
    createTable(CGtable)
}