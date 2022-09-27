let Regression = ({ data, cxArray, cyArray, xScale, yScale, setRegCor, setRegSlope, setRegInt }) => {

    console.log('regression data: ', data)

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

    console.log(yScale.ticks()[0])
    let minX = xScale.ticks()[0]
    let minY = yScale.ticks()[0]
    
    // let x1 = null
    // let x2 = null
    
    // if (correlation >= 0) {
    //     if (yScale(regFun(min)) < yScale(minY)) {
    //         x1 = regFunInverse(minY)
    //     } else {
    //         x1 = min
    //     }
    // }
    // if (correlation < 0) {
    //     if(yScale(regFun(min)) > yScale(minY)) {
    //         x1 = regFunInverse(minY)
    //     } else {
    //         x1 = min
    //     }
    // }

    return (
        <line 
            className='regressionLine' 
            x1={xScale(min)} 
            y1={yScale(regFun(min))} 
            // x1={xScale(x1)}
            // y1={yScale(regFun(x1))}
            x2={xScale(max)} 
            y2={yScale(regFun(max))} 
        />
    )
}

export default Regression