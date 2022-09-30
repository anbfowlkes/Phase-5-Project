export const AxisLeft = ( { yScale, innerWidth, tickOffset = 3 } ) => {
    let c = 0
    return(
        yScale.ticks().map((tickValue) => {
            return (
                <g key={c++} className='tick' transform={`translate(0,${yScale(tickValue)})`}>
                    {/* this is instead of setting  y1={yScale(tickValue)} y2={yScale(tickValue)} in the line and y={yScale(tickValue)} in the text*/}
                    <line x2={innerWidth}  />
                    <text 
                        key={tickValue}
                        style={{textAnchor: 'end'}} 
                        dy='.32em' 
                        x={-tickOffset} 
                        >
                            {tickValue}
                    </text>
                </g>
                )
            })
    )
}

