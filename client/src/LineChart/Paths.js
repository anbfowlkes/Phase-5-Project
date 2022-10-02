import { useEffect, useState } from 'react'
import { line, curveNatural, curveLinear, curveStep, curveMonotoneX, curveMonotoneY } from 'd3'

let Paths = ( { data, teamData, selectedTeams, yAttribute, xScale, yScale, xValue, yValue } ) => {

    let teams = [...teamData]
    let count = 0

    console.log('teams: ', teams)
    
    let storageArray = []

    for (let i = 0; i < selectedTeams.length; i++) {
        storageArray.push([])
    }

    for (let i = 0; i < selectedTeams.length; i++) {
        data.forEach((item) => {
            if (item.team == selectedTeams[i]) {
                storageArray[i].push(item)
            }
        })
    }

    let myY = (d) => d.info[yAttribute]

    let colors = []

    useEffect(() => {
        for (let i = 0; i < storageArray.length; i++) {
            for (let k = 0; k < teams.length; k++) {
                if (storageArray[i] == teams[k].Key) {
                    colors.push(teams[k].PrimaryColor)
                }
            }
        }
    }, [storageArray])
    
    console.log('storageArray: ', storageArray)

    console.log('colors: ', colors)

    return(
        <>
             {storageArray.map((arr) => {
                let thisTeam = arr[0].team
                let teamColor
                console.log('thisTeam: ', thisTeam)
                teamData.forEach((teamInfo) => {
                    if (teamInfo.Key == thisTeam) {
                        teamColor = teamInfo.PrimaryColor
                    }
                })
                let color = teams[count].PrimaryColor
                console.log('color: ', color)
                count++
                return(
                    <path 
                        className='line-paths'
                        fill='none'
                        stroke={`#${teamColor}`}
                        d={line()
                            .x(d=>xScale(d.week))
                            .y(d=>yScale(myY(d)))
                            .curve(curveMonotoneX)(arr)} 
                    />
                )
            })}
        </>
    )
}
    



export default Paths
