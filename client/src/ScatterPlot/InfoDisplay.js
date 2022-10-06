let InfoDisplay = ({ data, xAttribute, yAttribute, teamDisplayed, colDisplayer, teamData }) => {

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
            xVal = teamObject[xAttribute]
            yVal = teamObject[yAttribute]
        }
    })

    let sortedYData = [...data]
    
    sortedYData.sort((a,b) => {
        return (a[yAttribute] < b[yAttribute] ? -1 : 1)
    })
    console.log('sortedYData: ', sortedYData)

    let sortedXData = [...data]
    
    sortedXData.sort((a,b) => {
        return (a[xAttribute] < b[xAttribute] ? -1 : 1)
    })

    let xRank
    let yRank

    for (let i = 0; i < sortedXData.length; i++) {
        if(teamDisplayed == sortedXData[i].Team) {
            xRank = 32 - i
        }
        if (teamDisplayed == sortedYData[i].Team) {
            yRank = 32 - i
        }
    }
    // console.log('sortedXData: ', sortedXData)

    return(
        <div className='team-info'>
            <h2>Team Information:</h2>
            <p>{teamName}</p>
            <p className='bar-p'>{conference} {division}</p>
            <p>{colDisplayer(xAttribute)}: {xVal}</p>
            <p className='bar-p'>Rank: {xRank}</p>
            <p>{colDisplayer(yAttribute)}: {yVal}</p>
            <p>Rank: {yRank}</p>
            <img src={logo} />
        </div>
    )
}

export default InfoDisplay