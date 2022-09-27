export const Marks = ( { sortedData, xScale, yScale, xValue, yValue, innerHeight } ) => {
    return (
        sortedData.map((d) => {
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