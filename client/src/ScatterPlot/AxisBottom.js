export const AxisBottom = ( { xScale, innerHeight, tickOffset = 3 } ) => {
    return (
        xScale.ticks().map((tickValue) => {
            return (
            <g className='tick' key={tickValue} transform ={`translate(${xScale(tickValue)},0)`}>
                <line y2={innerHeight} />
                {parseInt(tickValue) == tickValue ? 
                <text style={{textAnchor: 'middle'}} y={innerHeight + tickOffset}>{parseInt(tickValue)}</text>
                : null            
                }
                
            </g>
            )
    })
    )
    
}

