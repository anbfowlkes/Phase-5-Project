import { useState, useCallback, useEffect } from 'react'
import { csv, scaleBand, scaleLinear, max, format } from 'd3'
import { useData } from './useData'
import { AxisBottom } from './AxisBottom'
import { AxisLeft } from './AxisLeft'
import { Marks } from './Marks'
import Averages from './Averages'
import Logos from './Logos'
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

    let [logoToggle, setLogoToggle] = useState(false)

    let width = (1.25) * 1200
    let height = (1.25) * 600
    let margin = { top: 60, right: 20, bottom: 80, left: 200 }
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

    // console.log('attributes: ', attributes)

    // the 'd' bellow represents one element (row) of the data
    //we're using a band scale which is useful for ordinal data

    const xValue = (d) => d.Team
    const yValue = (d) => d[yAttribute]

    // let xValArray = data.map(xValue)
    // xValArray = xValArray.sort()

    let sortedData = [...data]
    sortedData = sortedData.sort((a,b) => {
        return (a[yAttribute] < b[yAttribute] ? -1 : 1)
    })
    // console.log(sortedData)

    let xScale = scaleBand()
        .domain(sortedData.map(xValue))
        .range([innerWidth, 0])
        .paddingInner(0.15)

    let yScale = scaleLinear()
        .domain([0, max(data, yValue)])
        .range([innerHeight, 0])
        .nice()
    
    // console.log(xScale.ticks())
    // console.log(yScale.domain())

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
        // console.log(res)
        alert('added to favorites')
    }

    return (
        <>

            <div className='barchart-menus-container'>
                <div className='single-menu'>
                    <div>
                        <span className='barchart-dropdown-label'>Y:</span>
                    </div>
                    <div>
                        <ReactDropdown
                            options={attributes}
                            value={yAttribute}
                            onChange={({ value }) => setYAttribute(value)}
                        />
                    </div>
                </div>

            </div>

            <svg className='barchart-svg' width={width} height={height} >

                <g transform={`translate(${margin.left},${margin.top})`}>


                    {logoToggle ? 
                    <Logos 
                        yScale={yScale} 
                        yValue={yValue} 
                        xScale={xScale} 
                        innerHeight={innerHeight}
                        sortedData={sortedData}
                        innerWidth={innerWidth}
                        teamData={teamData}
                    />
                    :
                    <AxisBottom 
                        yScale={yScale} 
                        yValue={yValue} 
                        xScale={xScale} 
                        innerHeight={innerHeight}
                        sortedData={sortedData}
                        innerWidth={innerWidth}
                    />
                    }

                    <AxisLeft 
                    yScale={yScale} 
                    innerHeight={innerHeight} 
                    tickFormat={numFormatter} 
                    innerWidth={innerWidth}
                    />

                    <text 
                        className='barchart-axis-label'
                        x={innerWidth/2} 
                        y={innerHeight+55} 
                        textAnchor='middle'
                    >Teams</text>

                    <text 
                        className='scatterplot-axis-label-left'
                        textAnchor='middle'
                        transform={`translate(${-90}, ${innerHeight/2}) rotate(-90)`}     
                    >
                        {colDisplayer(yAttribute)}
                    </text>

                    <Averages
                        sortedData={sortedData}
                        xScale={xScale} 
                        yScale={yScale} 
                        xValue={xValue} 
                        yValue={yValue}
                        innerHeight={innerHeight}
                    />
                    
                    <Marks 
                        sortedData={sortedData} 
                        xScale={xScale} 
                        yScale={yScale} 
                        xValue={xValue} 
                        yValue={yValue}
                        innerHeight={innerHeight}
                        teamData={teamData}
                        setTeamDisplayed={setTeamDisplayed}
                    />

                </g>

            </svg>

            {/* <Switch toggle={logoToggle} setToggle={setLogoToggle} /> */}
            



            <div className='scatterplot-info-display'>
                
                
                <InfoDisplay 
                    yAttribute={yAttribute}
                    data={data}
                    teamDisplayed={teamDisplayed}
                    colDisplayer={colDisplayer}
                    teamData={teamData}
                />
            </div>
            
        </>
    )
}

export default BarChart