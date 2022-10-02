export const AxisLeft = ( {yScale, innerHeight, tickFormat} ) => {
    return(
        yScale.domain().map((tickValue) => {

            return (
                yScale.ticks().map((tickValue) => {
                    return (
                    <g className='tick' key={tickValue} >
                        {/* <line y2={innerHeight} /> */}
                        {parseInt(tickValue) == tickValue ? 
                        <text style={{textAnchor: 'middle'}} x={-40} y={yScale(tickValue)}>{parseInt(tickFormat(tickValue))}</text>
                        : null
                        }
                        
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

