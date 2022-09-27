export const AxisLeft = ( {yScale, innerHeight, tickFormat} ) => {
    return(
        yScale.domain().map((tickValue) => {

            return (
                yScale.ticks().map((tickValue) => {
                    return (
                    <g className='tick' key={tickValue} transform ={`translate(${yScale(tickValue)},0)`}>
                        {/* <line y2={innerHeight} /> */}
                        <text style={{textAnchor: 'middle'}} y={innerHeight + 15}>{tickFormat(tickValue)}</text>
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

