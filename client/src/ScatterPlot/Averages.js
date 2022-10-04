let Averages = ({ cxArray, cyArray, xScale, yScale, innerHeight, innerWidth }) => {


    let getMean = (cArray) => {
        let sum = 0.0
        cArray.forEach((val) => {
            sum = sum + val
        })
        return sum / cArray.length
    }

    let xMean = getMean(cxArray)
    let yMean = getMean(cyArray)



    return (
        <>
            <line 
                x1={xScale(xMean)} 
                y1={0} 
                x2={xScale(xMean)} 
                y2={innerHeight}
                stroke='#4e9fd9'
                stroke-width='4'
                />
            <line 
                x1={0} 
                y1={yScale(yMean)} 
                x2={innerWidth} 
                y2={yScale(yMean)}
                stroke='#4e9fd9'
                stroke-width='4'
                />
        </>
    )
}

export default Averages