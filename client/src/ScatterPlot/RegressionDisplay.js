let RegressionDisplay = ({ regCor, regInt, regSlope, xAxisLabel, yAxisLabel, colDisplayer, data, cxArray, cyArray, xScale, yScale, setRegCor, setRegSlope, setRegInt}) => {

    let getMean = (cArray) => {
        let sum = 0.0
        cArray.forEach((val) => {
            sum = sum + val
        })
        return sum / cArray.length
    }


    // console.log('cxArray: ', cxArray)
    // console.log('cyArray: ', cyArray)
    let xMean = getMean(cxArray)
    let yMean = getMean(cyArray)
    // console.log('xMean: ', xMean)
    // console.log('yMean: ', yMean)

    let getRegression = (cxArray, cyArray) => {
        let xyResProdSum = 0
        let xResSquareSum = 0
        let yResSquareSum = 0
        for (let i = 0; i < cxArray.length; i++) {
            xyResProdSum = xyResProdSum + ((cxArray[i] - xMean)*(cyArray[i] - yMean))
            // console.log('cxArray[i] - xMean: ', cxArray[i] - xMean)
            // console.log('cyArray[i] - yMean: ', cyArray[i] - yMean)
            // console.log('xyResProd: ', xyResProd)
            xResSquareSum = xResSquareSum + ((cxArray[i] - xMean) ** 2)
            yResSquareSum = yResSquareSum + ((cyArray[i] - yMean) ** 2)
        }
        let correlation = ((xyResProdSum) / Math.sqrt((xResSquareSum) * (yResSquareSum)))
        if (1.0 - correlation < .00001) {
            correlation = 1
        }
        let standDevY = Math.sqrt((yResSquareSum / (cyArray.length - 1)))
        let standDevX = Math.sqrt((xResSquareSum) / (cxArray.length - 1))
        let slope = (correlation) * (standDevY / standDevX)
        let yInt = yMean - (slope * xMean)
        return [correlation, standDevY, standDevX, slope, yInt]
    }
    let [correlation, standDevY, standDevX, slope, yInt] = getRegression(cxArray, cyArray)
    console.log('correlation: ', correlation)
    console.log('standDevY: ', standDevY)
    console.log('standDevX: ', standDevX)
    console.log('slope: ', slope)
    console.log('yInt: ', yInt)

    let getMinMax = (cxArray) => {
        let min = 999999999999999
        let max = 0
        cxArray.forEach((val) => {
            if (val < min) {
                min = val
            }
            if (val > max) {
                max = val
            }
        })
        return [min, max]
    }

    let [min, max] = getMinMax(cxArray)

    let regFun = (x) => {
        return slope * x + yInt
    }

    let regFunInverse = (y) => {
        return (y - yInt) / slope
    }

    setRegSlope(slope)
    setRegInt(yInt)
    setRegCor(correlation)

    if (!regCor) {
        return(
            <></>
        )
    }
    regCor = regCor.toFixed(2)

    let strength = ''
    if (regCor < 0.2 && regCor > -0.2) {
        strength = 'very weak'
    } else if (regCor < 0.4 && regCor > -0.4) {
        strength = 'weak'
    } else if (regCor < 0.6 && regCor > -0.6) {
        strength = 'moderate'
    } else if (regCor < 0.8 && regCor > -0.8) {
        strength = 'strong'
    } else strength = 'very strong'

    let direction = null
    let incline = null

    if (regCor >= 0) {
        direction = 'positive'
        incline = 'increase'
    } else {
        direction = 'negative'
        incline = 'decrease'
    }

    let meaningful

    if (regCor < 0.4 && regCor > -0.4) {
        meaningful = false
    } else {
        meaningful = true
    } 

    return (
        <div className='reg-info'>
            <h2>{'Regression Analysis:'}</h2>
            <p>{`Correlation Coefficient: r = ${regCor}`}</p>
            <p>{`This is a ${strength}, ${direction} association between ${xAxisLabel.toLowerCase()} and ${yAxisLabel.toLowerCase()}.`}</p>
            <p>{'Line of Best Fit:'}</p>
            <p>{`y = ${regSlope.toFixed(2)}x + ${regInt.toFixed(2)}`}</p>
            {/* <p>{`(${yAxisLabel}) = (${regSlope})(${xAxisLabel}) + ${regInt}`}</p> */}
            {meaningful ? 
            <p>{`This means that as ${xAxisLabel.toLowerCase()} increase by one, we expect, on average, ${yAxisLabel.toLowerCase()} to ${incline} by ${regSlope.toFixed(2)}.`}</p>
            : `This means there is little to no relationship between ${xAxisLabel} and ${yAxisLabel}.`}
            
        </div>
    )
}

export default RegressionDisplay