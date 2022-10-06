import { useEffect } from 'react'
import { json } from 'd3'

let SeasonInfo = ({ objClicked, seasonData, teamData, yAttribute, colDisplayer }) => {


    if (!objClicked) {
        return (
            <div></div>
        )
    }
    console.log('seasonData: ', seasonData)

    console.log('objClicked: ', objClicked)
    let team = objClicked.team
    let total
    let totalSum = 0
    seasonData.forEach((teamObj) => {
        totalSum = totalSum + teamObj[yAttribute]
        if (teamObj.Team == team) {
            total = teamObj[yAttribute]
        }
    })
    let teamName
    let logo
    teamData.forEach((teamObj) => {
        if (teamObj.Key == team) {
            teamName = teamObj.FanDuelName
            logo = teamObj.WikipediaLogoUrl
        }
    })
    let leagueAvg = ((totalSum * 1.0) / 32).toFixed(2)

    let sortedTeams = [...seasonData]
    sortedTeams.sort((a,b) => {
        return (a[yAttribute] < b[yAttribute] ? -1 : 1)
    })
    console.log('sortedTeams: ', sortedTeams)

    let rank
    for (let i = 0; i < sortedTeams.length; i++) {
        if (sortedTeams[i].Team == team) {
            rank = 32 - i
        }
    }
    return (
        <div className='show-season'>
            <h2>Season Information</h2>
            <p>{teamName}</p>
            <p>Total {colDisplayer(yAttribute)}: {total}</p>
            <p>League Average: {leagueAvg}</p>
            <p>Season Ranking: {rank}</p>
            <img src={logo} />
        </div>
    )
}
export default SeasonInfo