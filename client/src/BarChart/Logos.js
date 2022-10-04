let Logos = ( { teamData, sortedData, xScale, yValue, yScale } ) => {

    console.log(yScale(yValue))
    let count = -1
    let logos = []

    console.log('teamData: ', teamData)
    console.log('sortedData: ', sortedData)

    for (let i = 0; i < sortedData.length; i++) {
        for (let k = 0; k < teamData.length; k++) {
            if (sortedData[i].Team == teamData[k].Key) {
                logos.push(teamData[k].WikipediaLogoUrl)
            }
        }
    }

    console.log('logos: ', logos)

    return (

        sortedData.map((d) => {
            
            let tickValue = xScale.domain()[count]
            count = count + 1

            // console.log('tickValue: ', tickValue)
            // console.log('xScale(tickValue)', xScale(tickValue))
            // console.log('xScale.bandwidth(): ', xScale.bandwidth())

            // console.log('xCalculation: ', xScale(tickValue) + xScale.bandwidth() / 2)

            let xCalculation = xScale(tickValue) + xScale.bandwidth() / 2

            return (
            
                    // <text 
                    //     style={{textAnchor: 'end', fontSize: '10px', width: '100px'}} 
                    //     dy='.32em' 
                    //     x={xScale(tickValue) + xScale.bandwidth() / 2}
                    //     y={yScale(yValue(d)) - 10}
                    //     >
                            
                    // </text>
                    <image 
                        // href='https://upload.wikimedia.org/wikipedia/en/7/77/Buffalo_Bills_logo.svg'
                        href={logos[count]}
                        // className='mark'
                        // transform={`translate(${-65} ${-25})`}
                        x={xScale(tickValue) + xScale.bandwidth() / 2 - 65}
                        y={yScale(yValue(d)) - 10 - 25}
                        width={30}
                        id={d.Team}
                        // r={circleRadius}
                    ></image>
                
                )
            }
            )
    )

}

export default Logos