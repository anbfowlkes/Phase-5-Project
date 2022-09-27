export const AxisBottom = ( { sortedData, xScale, yValue, yScale } ) => {

    console.log(yScale(yValue))
    let count = 0

    return (
        xScale.domain().map((tickValue => {
            let labelHeight = sortedData[count][yValue]
            console.log(labelHeight)
            return (
                <g className='tick'>
                    <text 
                        key={tickValue}
                        style={{textAnchor: 'end', fontSize: '10px', width: '100px'}} 
                        // dy='.32em' 
                        x={xScale(tickValue) + xScale.bandwidth() / 2}
                        y={500}
                        >
                            {tickValue}
                    </text>
                </g>
                )
        
        }))
    )
    



    // return (
    //     xScale.ticks().map((tickValue) => {
    //         return (
    //         <g className='tick' key={tickValue} transform ={`translate(${xScale(tickValue)},0)`}>
    //             <line y2={innerHeight} />
    //             <text style={{textAnchor: 'middle'}} y={innerHeight + 15}>{tickFormat(tickValue)}</text>
    //         </g>
    //         )
    // })
    // )
    
}

