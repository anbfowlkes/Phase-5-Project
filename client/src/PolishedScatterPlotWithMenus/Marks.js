import Regression from './Regression'

const Marks = ( { data, xScale, yScale, xValue, yValue, tooltipFormat, circleRadius, innerHeight } ) => {
    
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
                    <title>{tooltipFormat(xValue(d))}</title>
                </circle>
                )
            })}
            <Regression 
                data={data} 
                cxArray={cxArray} 
                cyArray={cyArray} 
                innerHeight={innerHeight}
                xScale={xScale}
                yScale={yScale}
            />
        </>
    )
}

export default Marks