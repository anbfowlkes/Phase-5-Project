import { useState } from 'react'

const Marks = ( { data, teamData, xScale, yScale, xValue, yValue, circleRadius } ) => {
    
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
                console.log(color)
                count++
                return (
                <circle 
                    style={{fill: `#${color}`}}
                    className='mark'
                    cx={xScale(xValue(d))}
                    cy={yScale(yValue(d))}
                    r={circleRadius}
                >
                    <title>{d.Team}</title>
                </circle>
                // <image src='https://i.cnnturk.com/i/cnnturk/75/740x416/61f1cb63c8c3730168cab237.jpg' />
                )
            })}
        </>
    )
}

export default Marks