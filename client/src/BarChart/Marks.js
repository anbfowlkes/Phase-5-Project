import { useState } from 'react'
export const Marks = ( { sortedData, xScale, yScale, xValue, yValue, innerHeight, teamData } ) => {

    let count = 0
    let [tickValue, setTickValue] = useState(null)

    let teams = [...teamData]
    let c = 0


    return (
        sortedData.map((d) => {
            // let tickValue = xScale.domain()[count]
            // setTickValue(xScale.domain()[count])
            let color = teams[count].PrimaryColor

            count++
            
            return (
                <>
                    {/* <text 
                        key={tickValue}
                        style={{textAnchor: 'end', fontSize: '10px', width: '100px'}} 
                        // dy='.32em' 
                        x={xScale(tickValue) + xScale.bandwidth() / 2}
                        y={yScale(yValue(d)) - 10}
                        >
                            {tickValue}
                    </text> */}
                    <rect 
                        style={{fill: `#${color}`}}
                        className='mark'
                        key={xValue(d)}
                        x={xScale(xValue(d))} 
                        y={yScale(yValue(d))}
                        width={xScale.bandwidth() / 2}
                        height={innerHeight - yScale(yValue(d))}  
                        >
                            <title>{xValue(d)}</title>
                    </rect>
                </>
                )
        })
    )
}