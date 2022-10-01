import { useState } from 'react'

const Logos = ( { data, teamData, xScale, yScale, xValue, yValue, circleRadius } ) => {
    
    let cxArray = []

    let cyArray = []

    // console.log(teamData[data[0].TeamID - 1])
    // console.log(data)

    let teams = [...teamData]
    // console.log(teams[0].PrimaryColor)

    data.map((d) => {
        // cxArray.push(xScale(xValue(d)))
        // cyArray.push(yScale(yValue(d)))
        cxArray.push((xValue(d)))
        cyArray.push((yValue(d)))
    })

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
                let color = teams[count].PrimaryColor
                let logoUrl = teams[count].WikipediaLogoUrl
                // console.log(color)
                count++
                return (
                    
                        // <image href='https://upload.wikimedia.org/wikipedia/en/7/77/Buffalo_Bills_logo.svg' />
                
                    <image 
                        // href='https://upload.wikimedia.org/wikipedia/en/7/77/Buffalo_Bills_logo.svg'
                        href={logoUrl}
                        // className='mark'
                        transform={`translate(${-15} ${-10})`}
                        x={xScale(xValue(d))}
                        y={yScale(yValue(d))}
                        width={30}
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