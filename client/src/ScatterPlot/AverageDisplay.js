let AverageDisplay = ({ xAvg, yAvg, xAttribute, yAttribute, colDisplayer, cxArray, cyArray, xScale, yScale, innerHeight, innerWidth, setXAvg, setYAvg }) => {

    let getMean = (cArray) => {
        let sum = 0.0
        cArray.forEach((val) => {
            sum = sum + val
        })
        return sum / cArray.length
    }

    let xMean = getMean(cxArray)
    let yMean = getMean(cyArray)

    return(
        <div className='avg-info'>
            <h2>Averages:</h2>
            <p style={{marginTop: '2.5em'}} className='bar-p'>Average {colDisplayer(xAttribute)}: {xMean.toFixed(2)}</p>
            <p>Average {colDisplayer(yAttribute)}: {yMean.toFixed(2)}</p>
        </div>
    )
}

export default AverageDisplay