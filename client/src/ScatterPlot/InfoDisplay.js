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


    return(
        <div className='scatterplot-inner-display' style={{backgroundColor: `#${color}`}}>
            <p>{teamName}</p>
            <p>{xVal}</p>
            <p>{yVal}</p>
        </div>
    )
}

export default InfoDisplay