const era = {
    "2021": {
        "weeklyHours": 35,
        "eraTable": {         
            "eg1": 2398.00,
            "eg2": 2463.00,
            "eg3": 2592.50,
            "eg4": 2722.00,
            "eg5": 2884.00,
            "eg6": 3046.00,
            "eg7": 3240.50,
            "eg8": 3467.50,
            "eg9": 3694.50,
            "eg10": 3937.50,
            "eg11": 4196.50,
            "eg12": 4488.00,
            "eg13": 4780.00,
            "eg14": 5071.50,
            "eg15": 5363.00,
            "eg16": 5719.50,
            "eg17": 6043.50
        },
        "benefitFunctions": {
            "Urlaubsgeld (Juni)": m => m * 0.3,
            "T-Zug (Juli)": m => m * 0.3,
            "Corona (Juli)": m => 500,
            "Weihnachtsgeld (Nov)": m => m * 0.3
        }
    }
}




function calculate(year, group, hours, bonusFactor){
    result = {}
    result.desc = `${group} in ${year}, working ${hours} with bonus factor of ${bonusFactor}`
    result.monthlyBase = round2(era[year].eraTable[group] / era[year].weeklyHours * hours)
    result.monthlyBonus = round2(result.monthlyBase * bonusFactor)
    result.monthlyTotal = round2(result.monthlyBase + result.monthlyBonus)
    result.yearlyBase = round2(result.monthlyTotal * 12)
    
    let benefits = [];
    let sum = .0;
    for(fun in era[year].benefitFunctions){
        let amount = era[year].benefitFunctions[fun](result.monthlyBase);
        benefits.push({
            "name": fun,
            "amount": amount
        })
        sum += amount
    }

    result.benefits = benefits
    result.benefitSum = sum
    result.yearlyTotal = result.yearlyBase + sum 

    return result;
}

  

function round2(val){
    return Math.round(val * 100) / 100
}


module.exports = calculate