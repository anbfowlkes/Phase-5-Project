let Average = ({ sortedData, yScale, yValue, innerWidth }) => {

    let getMean = (cArray) => {
        let sum = 0.0
        cArray.forEach((val) => {
            sum = sum + val
        })
        return sum / cArray.length
    }

    // console.log('sortedData: ', sortedData)


    let attArr = sortedData.map((d) => yValue(d))
    // console.log('attArr: ', attArr)

    let yMean = getMean(attArr)
    // console.log('yMean: ', yMean)

    return (
        <>
            <line 
                x1={0} 
                y1={yScale(yMean)} 
                x2={innerWidth} 
                y2={yScale(yMean)}
                stroke='#101010'
                stroke-width='4'
            />
        </>
    )
}

export default Average