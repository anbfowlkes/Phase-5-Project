let ShowGame = ({ data, teamData, objClicked, colDisplayer, yAttribute }) => {

    if (!objClicked) {
        return (
            <div></div>
        )
    }

    console.log('objClicked: ', objClicked)
    let opponent = objClicked.info.Opponent
    let team = objClicked.info.Team
    let week = objClicked.info.Week
    let teamScore = objClicked.info.Score
    let oppScore = objClicked.info.OpponentScore
    let homeAway = objClicked.info.HomeOrAway

    let winLoss
    
    if (teamScore < oppScore) {
        winLoss = 'Loss'
    } else if (oppScore < teamScore) {
        winLoss = 'Win'
    } else {
        winLoss = 'Tie'
    }

    let teamName
    let oppName
    teamData.forEach((teamObj) => {
        if (teamObj.Key == team) {
            teamName = teamObj.FanDuelName
        }
        if (teamObj.Key == opponent){
            oppName = teamObj.FanDuelName
        }
    })

    let homeTeam
    let awayTeam
    if (homeAway == 'Home') {
        homeTeam = teamName
        awayTeam = oppName
    } else {
        homeTeam = oppName
        awayTeam = teamName
    }
        
    

    return (
        <div className='showgame-div'>
            <h2>Game Information:</h2>
            <p>{teamName} vs {oppName}</p>
            <p>Week {week}</p>
            <p>Home Team: {homeTeam}</p>
            <p className='bar-p'>Score: {team} {teamScore}, {opponent} {oppScore}</p>
            <p>{teamName} {colDisplayer(yAttribute)}:</p>
            <p>{objClicked.info[yAttribute]}</p>
        </div>
    )
}
export default ShowGame