let InfoDisplay = ({ data, yAttribute, teamDisplayed, colDisplayer, teamData, sortedData }) => {

    console.log(data)
    console.log(teamData)
    
    
    let teamName
    let conference
    let division
    let color
    let logo
    let xVal
    let yVal
    

    teamData.forEach((teamObject) => {
        if (teamObject.Key == teamDisplayed) {
            teamName = teamObject.FanDuelName
            conference = teamObject.Conference
            division = teamObject.Division
            color = teamObject.PrimaryColor
            logo = teamObject.WikipediaLogoUrl
        }
    })
    data.forEach((teamObject) => {
        if (teamObject.Team == teamDisplayed) {
            yVal = teamObject[yAttribute]
        }
    })

    let rank
    for (let i = 0; i < sortedData.length; i++) {
        if (teamDisplayed == sortedData[i].Team) {
            rank = 32 - i
        }
    }


    return(
        <div className='barchart-team-display'>
            <h2>Team Information</h2>
            <p>{teamName}</p>
            <p className='bar-p'>{conference} {division}</p>
            <p>{yVal} {colDisplayer(yAttribute)}</p>
            <p>Rank: {rank}</p>
            <img src={logo} />
        </div>
    )
}

export default InfoDisplay