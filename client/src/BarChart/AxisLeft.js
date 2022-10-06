export const AxisLeft = ( {yScale, innerHeight, innerWidth, tickFormat} ) => {
    return(
        yScale.domain().map((tickValue) => {

            return (
                yScale.ticks().map((tickValue) => {
                    return (
                    <g className='tick' key={tickValue} >
                        <line y1={yScale(tickValue)} x2={innerWidth} y2={yScale(tickValue)} />
                        {parseInt(tickValue) == tickValue ? 
                        <text style={{textAnchor: 'middle'}} x={-40} y={yScale(tickValue)}>{parseInt(tickValue)}</text>
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

