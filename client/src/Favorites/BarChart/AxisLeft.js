export const AxisLeft = ( {yScale, innerHeight, tickFormat} ) => {
    return(
        yScale.domain().map((tickValue) => {

            return (
                yScale.ticks().map((tickValue) => {
                    return (
                    <g className='tick' key={tickValue} >
                        {/* <line y2={innerHeight} /> */}
                        <text style={{textAnchor: 'middle'}} x={-40} y={yScale(tickValue)}>{tickFormat(tickValue)}</text>
                    </g>
                    )
                }
                ))
            }
        )
    )
}




            // return (
            //     <g className='tick'>
            //         <text 
            //             key={tickValue}
            //             style={{textAnchor: 'end'}} 
            //             dy='.32em' 
            //             x={-5} 
            //             y={yScale(tickValue) + yScale.bandwidth() / 2}>
            //                 {tickValue}
            //         </text>
            //     </g>
            //     )
            // })
    // )

