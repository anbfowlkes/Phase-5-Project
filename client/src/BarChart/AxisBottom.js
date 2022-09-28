export const AxisBottom = ( { innerWidth, sortedData, xScale, yValue, yScale } ) => {

    console.log(yScale(yValue))
    let count = 0

    return (

        sortedData.map((d) => {
            
            let tickValue = xScale.domain()[count]
            count = count + 1

            return (
                    <text 
                        style={{textAnchor: 'end', fontSize: '10px', width: '100px'}} 
                        // dy='.32em' 
                        x={xScale(tickValue) + xScale.bandwidth() / 2}
                        y={yScale(yValue(d)) - 10}
                        >
                            {d.Team}
                    </text>
                )
            }
            )
    )

}

