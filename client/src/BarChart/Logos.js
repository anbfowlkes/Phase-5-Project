let Logos = ( { teamData, sortedData, xScale, yValue, yScale } ) => {
    
    let logos = []

    console.log('yValue: ', yValue)

    for (let i = 0; i < sortedData.length; i++) {
        for (let k = 0; k < teamData.length; k++) {
            if (sortedData[i].Team == teamData[k].Key) {
                logos.push(teamData[k].WikipediaLogoUrl)
            }
        }
    }

    let count = 0

    return (

        sortedData.map((d) => {            
            let tickValue = xScale.domain()[count]
            count = count + 1
            return (
                    <image 
                        href={logos[count]}
                        transform={`translate(${-65} ${-75})`}
                        x={xScale(tickValue) + xScale.bandwidth() / 2}
                        y={yScale(yValue(d))}
                        width={30}
                        height={30}
                        id={d.Team}
                    ></image>
                
                )
            }
            )
    )

}

export default Logos