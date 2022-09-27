export const AxisBottom = ( { xScale } ) => {
    return (
        xScale.domain().map((tickValue => {
            return (
                <g className='tick'>
                    <text 
                        key={tickValue}
                        style={{textAnchor: 'end'}} 
                        dy='.32em' 
                        x={xScale(tickValue) + xScale.bandwidth() / 2}
                        y={-5}
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

