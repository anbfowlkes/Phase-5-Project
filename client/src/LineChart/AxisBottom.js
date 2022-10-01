export const AxisBottom = ( { xScale, innerHeight, tickOffset = 3 } ) => {
    return (
        xScale.ticks().map((tickValue) => {
            return (
            <g className='tick' key={tickValue} transform ={`translate(${xScale(tickValue)},0)`}>
                <line y2={innerHeight} />
                <text style={{textAnchor: 'middle'}} y={innerHeight + tickOffset}>{tickValue}</text>
            </g>
            )
    })
    )
    
}

// adding dy='.71em' to the text attributes moves the tick labels down a bit