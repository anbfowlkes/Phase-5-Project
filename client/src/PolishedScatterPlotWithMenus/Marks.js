const Marks = ( { data, xScale, yScale, xValue, yValue, tooltipFormat, circleRadius } ) => {
    
    let cxArray = []

    let cyArray = []

    data.map((d) => {
        // cxArray.push(xScale(xValue(d)))
        // cyArray.push(yScale(yValue(d)))
        cxArray.push((xValue(d)))
        cyArray.push((yValue(d)))
    })

    // console.log('cx array: ', cxArray)
    // console.log('cy array: ', cyArray)
    
    
    return (
        <>
            {data.map((d) => {
                return (
                <circle 
                    className='mark'
                    cx={xScale(xValue(d))} 
                    cy={yScale(yValue(d))} 
                    r={circleRadius}
                >
                    <title>{d.Team}</title>
                </circle>
                )
            })}
        </>
    )
}

export default Marks