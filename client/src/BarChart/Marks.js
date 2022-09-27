export const Marks = ( { data, xScale, yScale, xValue, yValue, tooltipFormat, innerHeight } ) => {
    return (
        data.map((d) => {
            return (
            <rect 
                className='mark'
                key={xValue(d)}
                x={xScale(xValue(d))} 
                y={yScale(yValue(d))}
                width={xScale.bandwidth() / 2}
                height={innerHeight - yScale(yValue(d))}  
                >
                    <title>{xValue(d)}</title>
                </rect>
                )
        })
    )
}