import { useState } from 'react'

const Logos = ( { data, teamData, xScale, yScale, xValue, yValue, handleTeamClick } ) => {

    // console.log(teamData[data[0].TeamID - 1])
    // console.log(data)

    let teams = [...teamData]
    // console.log(teams[0].PrimaryColor)

    // console.log('cx array: ', cxArray)
    // console.log('cy array: ', cyArray)
    let [index, setIndex] = useState(0)
    let count = 0

    return (
        <>
            {data.map((d) => {
                // let color = ''
                // teams.forEach((team) => {
                //     if (team.Key == d.Team) {
                //         color = team.PrimaryColor
                //     }
                //     console.log(color)
                // })
                let logoUrl = teams[count].WikipediaLogoUrl
                // console.log(color)
                count++
                return (
                    
                        // <image href='https://upload.wikimedia.org/wikipedia/en/7/77/Buffalo_Bills_logo.svg' />
                
                    <image 
                        // href='https://upload.wikimedia.org/wikipedia/en/7/77/Buffalo_Bills_logo.svg'
                        onClick={handleTeamClick}
                        href={logoUrl}
                        className='scatterplot-circles'
                        // className='mark'
                        transform={`translate(${-25} ${-20})`}
                        x={xScale(xValue(d))}
                        y={yScale(yValue(d))}
                        width={50}
                        id={d.Team}
                        // r={circleRadius}
                    >
                        <title>{d.Team}</title>
                    </image>
                
                )
            })}
        </>
    )
}


export default Logos