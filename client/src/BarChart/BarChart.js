import { useState, useCallback, useEffect } from 'react'
import { csv, scaleBand, scaleLinear, max, format } from 'd3'
import { useData } from './useData'
import { AxisBottom } from './AxisBottom'
import { AxisLeft } from './AxisLeft'
import { Marks } from './Marks'
import './BarChart.css'
import Dropdown from './Dropdown'
import InfoDisplay from './InfoDisplay'
import Switch from './Switch'
import ReactDropdown from 'react-dropdown'


// number 8
let BarChart = () => {

    let {data, columns, teamData} = useData()

    const initialYAttribute = 'AssistedTackles'
    let [yAttribute, setYAttribute] = useState(initialYAttribute)

    let [infoToggle, setInfoToggle] = useState(false)

    let [teamDisplayed, setTeamDisplayed] = useState(null)

    let width = (1.2) * 1200
    let height = (1.2) * 600
    let margin = { top: 40, right: 20, bottom: 80, left: 200 }
    let innerHeight = height - (margin.top + margin.bottom)
    let innerWidth = width - (margin.left + margin.right)


    if (!data || !columns || !teamData) {
        return <pre>'Loading...'</pre>
    }

    let colDisplayer = (col) => {
        col = col.split('')
        for (let i = col.length - 1; i > 0; i--) {
            if ((col[i]).toUpperCase() === col[i]) {
                col.splice(i, 0, ' ')
                i--
            }
        }
        let colString = ''
        col.forEach((letter) => {
            colString = colString + letter
        })
        return colString
    }

    let attributes = []

    columns.forEach((col) => {
        if (col != 'TeamSeasonID' && col != 'TeamID' && col != 'Season' && col != 'Team' && col != 'Games' && col != 'TimeOfPossession' && col != 'OpponentTimeOfPossession' && col != 'SeasonType') {
            attributes.push({ value: col, label: colDisplayer(col) })
        }
    })

    console.log('attributes: ', attributes)

    // the 'd' bellow represents one element (row) of the data
    //we're using a band scale which is useful for ordinal data

    const xValue = (d) => d.Team
    const yValue = (d) => d[yAttribute]

    // let xValArray = data.map(xValue)
    // xValArray = xValArray.sort()

    let sortedData = [...data]
    sortedData = sortedData.sort((a,b) => {
        return (a[yAttribute] < b[yAttribute] ? 1 : -1)
    })
    console.log(sortedData)

    let xScale = scaleBand()
        .domain(sortedData.map(xValue))
        .range([innerWidth, 0])
        .paddingInner(0.15)

    let yScale = scaleLinear()
        .domain([0, max(data, yValue)])
        .range([innerHeight, 0])
        // .nice()
    
    // console.log(xScale.ticks())
    console.log(yScale.domain())

    const numFormatter = n => format('.2s')(n).replace('G','B')

    let addToFavorites = async () => {
        let req = fetch('http://localhost:2000/profile-graphs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                charttype: 'barchart',
                xaxis: 'none',
                yaxis: yAttribute
            })
        })
        let res = await req.json()
        console.log(res)
        alert('added to favorites')
    }

    return (
        <>

            <div className='menus-container'>
                <div>
                    <span className='dropdown-label'>X:</span>
                    <ReactDropdown
                        options={attributes}
                        value={yAttribute}
                        onChange={({ value }) => setYAttribute(value)}
                    />
                </div>

            </div>

            <svg width={width} height={height} >

                <g transform={`translate(${margin.left},${margin.top})`}>

                    <AxisBottom 
                        yScale={yScale} 
                        yValue={yValue} 
                        xScale={xScale} 
                        innerHeight={innerHeight}
                        tickFormat={numFormatter}
                        sortedData={sortedData}
                        innerWidth={innerWidth}
                    />

                    <AxisLeft yScale={yScale} innerHeight={innerHeight} tickFormat={numFormatter} />

                    <text 
                    className='axis-label'
                    x={innerWidth/2} 
                    y={innerHeight+55} 
                    textAnchor='middle'
                    >X Axis Label</text>
                    
                    <Marks 
                        sortedData={sortedData} 
                        xScale={xScale} 
                        yScale={yScale} 
                        xValue={xValue} 
                        yValue={yValue} 
                        tooltipFormat={numFormatter}
                        innerHeight={innerHeight}
                        teamData={teamData}
                        setTeamDisplayed={setTeamDisplayed}
                    />

                </g>

            </svg>

            <div>
                <button onClick={addToFavorites}>Add To Favorites</button>
            </div>

            



            <div className='scatterplot-info-display'>
                <Switch toggle={infoToggle} setToggle={setInfoToggle} />
                {infoToggle ? 
                    <InfoDisplay 
                        yAttribute={yAttribute}
                        data={data}
                        teamDisplayed={teamDisplayed}
                        colDisplayer={colDisplayer}
                        teamData={teamData}
                    /> : null}
            </div>
            
        </>
    )
}

export default BarChart