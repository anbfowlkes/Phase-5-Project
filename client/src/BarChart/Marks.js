export const Marks = ( { data, xScale, yScale, xValue, yValue, tooltipFormat } ) => {
    return (
        data.map((d) => {
            return (
            <rect 
                className='mark'
                key={xValue(d)}
                x={xScale(xValue(d))} 
                y={0}
                width={xScale.bandwidth()}
                height={yScale(yValue(d))}  
                >
                    <title>{tooltipFormat(xValue(d))}</title>
                </rect>
                )
        })
    )
}