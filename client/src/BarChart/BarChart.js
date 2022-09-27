import { useState, useCallback, useEffect } from 'react'
import { csv, scaleBand, scaleLinear, max, format } from 'd3'
import { useData } from './useData'
import { AxisBottom } from './AxisBottom'
import { AxisLeft } from './AxisLeft'
import { Marks } from './Marks'
import './BarChart.css'

// number 8
let BarChart = () => {

    let data = useData()

    let width = 960
    let height = 600
    let margin = { top: 40, right: 20, bottom: 80, left: 200 }
    let innerHeight = height - (margin.top + margin.bottom)
    let innerWidth = width - (margin.left + margin.right)

    if (!data) {
        return <pre>'Loading...'</pre>
    }

    // the 'd' bellow represents one element (row) of the data
    //we're using a band scale which is useful for ordinal data

    const xValue = (d) => d.Country
    const yValue = (d) => d.Population

    let xScale = scaleBand()
        .domain(data.map(yValue))
        .range([0, innerWidth])
        .paddingInner(0.15)

    let yScale = scaleLinear()
        .domain([0, max(data, yValue)])
        .range([0, innerHeight])
    
    // console.log(xScale.ticks())
    console.log(yScale.domain())

    const numFormatter = n => format('.2s')(n).replace('G','B')

    return (
        <svg width={width} height={height} >

            <g transform={`translate(${margin.left},${margin.top})`}>

                <AxisBottom xScale={xScale} innerHeight={innerHeight} tickFormat={numFormatter} />

                <AxisLeft yScale={yScale} innerHeight={innerHeight} tickFormat={numFormatter} />

                <text 
                className='axis-label'
                x={innerWidth/2} 
                y={innerHeight+55} 
                textAnchor='middle'
                >X Axis Label</text>
                
                <Marks 
                    data={data} 
                    xScale={xScale} 
                    yScale={yScale} 
                    xValue={xValue} 
                    yValue={yValue} 
                    tooltipFormat={numFormatter}
                />

            </g>

        </svg>
    )
}

export default BarChart