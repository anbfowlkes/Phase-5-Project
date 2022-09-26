let Regression = ({ data, cxArray, cyArray }) => {

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

    let getCorrelation = (cxArray, cyArray) => {
        let xyResProd = 0
        let xResSquare = 0
        let yResSquare = 0
        for (let i = 0; i < cxArray.length; i++) {
            xyResProd = xyResProd + ((cxArray[i] - xMean)*(cyArray[i] - yMean))
            // console.log('cxArray[i] - xMean: ', cxArray[i] - xMean)
            // console.log('cyArray[i] - yMean: ', cyArray[i] - yMean)
            // console.log('xyResProd: ', xyResProd)
            xResSquare = xResSquare + ((cxArray[i] - xMean) ** 2)
            yResSquare = yResSquare + ((cyArray[i] - yMean) ** 2)
        }
        let cor = (-1) * ((xyResProd) / Math.sqrt((xResSquare) * (yResSquare)))
        if (1.0 - cor < .00001) {
            return 1
        }
        return cor
    }
    let correlation = getCorrelation(cxArray, cyArray)
    console.log('correlation: ', getCorrelation(cxArray, cyArray))


    return (
        <div>

        </div>
    )
}

export default Regression