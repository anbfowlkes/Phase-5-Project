export const AxisLeft = ( { yScale, innerWidth, tickOffset = 3 } ) => {
    return(
        yScale.ticks().map((tickValue) => {
            return (
                <g className='tick' transform={`translate(0,${yScale(tickValue)})`}>
                    {/* this is instead of setting  y1={yScale(tickValue)} y2={yScale(tickValue)} in the line and y={yScale(tickValue)} in the text*/}
                    <line x2={innerWidth}  />
                    {parseInt(tickValue) == tickValue ? 
                        <text 
                        key={tickValue}
                        style={{textAnchor: 'end'}} 
                        dy='.32em' 
                        x={-tickOffset} 
                        >
                            {tickValue}
                        </text>
                    :
                    null
                    }
                </g>
                )
            })
    )
}

