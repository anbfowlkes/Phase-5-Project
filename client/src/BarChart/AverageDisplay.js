let AverageDisplay = ({ sortedData, yValue, teamData, yAttribute, colDisplayer }) => {

    let getMean = (cArray) => {
        let sum = 0.0
        cArray.forEach((val) => {
            sum = sum + val
        })
        return sum / cArray.length
    }

    // console.log('sortedData: ', sortedData)


    let attArr = sortedData.map((d) => yValue(d))
    let sortedTeams = sortedData.map((d) => d.Team)
    // console.log('attArr: ', attArr)

    let yMean = getMean(attArr)
    // console.log('yMean: ', yMean)

    let highest = sortedTeams[31]
    let lowest = sortedTeams[0]
    let highestName
    let lowestName

    teamData.forEach((teamObj) => {
        if (teamObj.Key == highest) {
            highestName = teamObj.FanDuelName
        }
        if (teamObj.Key == lowest) {
            lowestName = teamObj.FanDuelName
        }
    })



    return (
        <div className='barchart-avg-info'>
            <h2>General Information:</h2>
            <p>Highest: {highestName}</p>
            <p className='bar-p'>{attArr[31].toFixed(1)} {colDisplayer(yAttribute)}</p>
            <p>Lowest: {lowestName}</p>
            <p className='bar-p'>{attArr[0].toFixed(1)} {colDisplayer(yAttribute)}</p>
            <p>League Average:</p>
            <p>{yMean.toFixed(2)} {colDisplayer(yAttribute)}</p>
        </div>
    )
}

export default AverageDisplay