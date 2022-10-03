import { useState } from 'react'

const Logos = ( { data, selectedTeams, teamData, xScale, yScale, xValue, yValue } ) => {

    let logoUrls = []

    // console.log(teamData[data[0].TeamID - 1])
    // console.log(data)

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

    let teams = [...teamData]

    selectedTeams.map((teamKey) => {
        teamData.map((teamObj) => {
            if (teamKey == teamObj.Key) {
                logoUrls.push(teamObj.WikipediaLogoUrl)
            } 
        })
    })

    console.log('logoUrls: ', logoUrls)

    let count = 0

    return (
        <>
            {storageArray.map((arr) => {
                // let color = ''
                // teams.forEach((team) => {
                //     if (team.Key == d.Team) {
                //         color = team.PrimaryColor
                //     }
                //     console.log(color)
                // })
                // let color = teams[count].PrimaryColor
                // let logoUrl = teams[count].WikipediaLogoUrl
                // console.log(color)
                let logoUrl = logoUrls[count]
                console.log('logoUrl: ', logoUrl)

                count++
                return (

                
                    arr.map((d) => {

                        return (
                            
                                // <image href='https://upload.wikimedia.org/wikipedia/en/7/77/Buffalo_Bills_logo.svg' />
                        
                            <image 
                                className='line-logos'
                                // href='https://upload.wikimedia.org/wikipedia/en/7/77/Buffalo_Bills_logo.svg'
                                // onClick={handleTeamClick}
                                href={logoUrl}
                                // className='mark'
                                transform={`translate(${-10} ${-7})`}
                                x={xScale(xValue(d))}
                                y={yScale(yValue(d))}
                                width={20}
                                id={d.Team}
                                // r={circleRadius}
                            >
                            </image>
                    
                    )
                }))
            })}
        </>
    )
}


export default Logos