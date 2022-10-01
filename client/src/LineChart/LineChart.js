import { useState, useCallback, useEffect } from 'react'
import { csv, scaleLinear, scaleBand, max, extent } from 'd3'
import { useData } from './useData'
import { AxisBottom } from './AxisBottom'
import { AxisLeft } from './AxisLeft'
import { Marks } from './Marks'
import Paths from './Paths'
import './LineChart.css'
import ReactDropdown from 'react-dropdown'

// number 11
let LineChart = () => {

    let { data, columns, teamData } = useData()

    let width = 960
    let height = 600
    let margin = { top: 40, right: 20, bottom: 80, left: 300 }
    let innerHeight = height - (margin.top + margin.bottom)
    let innerWidth = width - (margin.left + margin.right)
    
    let [yAttribute, setYAttribute] = useState('AssistedTackles')

    let [selectedTeams, setSelectedTeams] = useState([])

    if (!data || !teamData || !columns) {
        return <pre>'Loading...'</pre>
    }

    // the 'd' bellow represents one element (row) of the data
    //we're using a band scale which is useful for ordinal data

    // const xValue = (d) => d.timestamp
    // const yValue = (d) => d.temperature

    let teamArray = []

    data.forEach((item) => {
        if (item.team == 'ATL') {
            teamArray.push(item)
        }
    })

    console.log('teamArray: ', teamArray)

    const xValue = (d) => d.week
    const yValue = (d) => d.info[yAttribute]


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

    //xValue is a function that takes in a row of the data and sends it to the sepal_length, then what happens below is we say we want to go from the min of these values to the max for our xScale domain on our scatterchart. The xValue function is an accessor which tells the computer what we're basing the min and max off of in the data
    
    let xScale = scaleLinear()
        .domain(extent(teamArray, xValue))
        .range([0, innerWidth])
        .nice()
        // .domain([min(data, xValue), max(data, xValue)]) instead of doing this, extent does the same thing
        
    let yScale = scaleLinear()
        .domain(extent(teamArray, yValue))
        .range([innerHeight, 0])
        .nice()

    const xAxisLabel = 'Weeks'
    const yAxisLabel = colDisplayer(yAttribute)

    const xAxisLabelOffset = 55
    const yAxisLabelOffset = 50

    console.log('ticks console.log: ', xScale.ticks())
    console.log('yScale domain console.log: ', yScale.domain())

   
    const xAxisTickFormatter = () => {}

    let handleCheck = (e) => {
        console.log(e.target.value)
        let val = e.target.value
        if (selectedTeams.includes(val)) {
            let arr = [...selectedTeams]
            for (let i = 0; i < arr.length; i++) {
                if (arr[i] == val) {
                    arr.splice(i,1)
                }
            } 
            setSelectedTeams(arr)
        } else {
            let arr = [...selectedTeams, val]
            setSelectedTeams(arr)
        }
        // console.log('selectedTeams: ', selectedTeams)
    }


    return (

        <>
            
            <div className='menus-container'>
                <div>
                    <span className='dropdown-label'>Y:</span>
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
                        xScale={xScale} 
                        innerHeight={innerHeight} 
                        tickFormat={xAxisTickFormatter} 
                        tickOffset={20} 
                    />

                    <AxisLeft 
                        yScale={yScale} 
                        innerWidth={innerWidth} 
                        tickOffset={7} 
                    />

                    <text 
                        className='axis-label'
                        x={innerWidth/2} 
                        y={innerHeight + xAxisLabelOffset} 
                        textAnchor='middle'
                    >
                        {xAxisLabel}
                    </text>

                    <text 
                        className='axis-label'
                        textAnchor='middle'
                        transform={`translate(${-yAxisLabelOffset}, ${innerHeight/2}) rotate(-90)`}     
                    >
                        {yAxisLabel}
                    </text>
                    
                    <Marks 
                        data={data} 
                        xScale={xScale} 
                        yScale={yScale} 
                        xValue={xValue}
                        yValue={yValue}
                        teamArray={teamArray}
                        tooltipFormat={xAxisTickFormatter}
                        circleRadius={4}
                        selectedTeams={selectedTeams}
                        yAttribute={yAttribute}
                    />

                    <Paths
                        data={data} 
                        xScale={xScale} 
                        yScale={yScale} 
                        xValue={xValue}
                        yValue={yValue}
                        teamArray={teamArray}
                        tooltipFormat={xAxisTickFormatter}
                        circleRadius={4}
                        selectedTeams={selectedTeams}
                        yAttribute={yAttribute}
                        teamData={teamData}
                    />

                </g>

            </svg>

            <div id='checkbox-div'>
                <label>
                    <input type='checkbox' value={'ARI'} onChange={handleCheck} />
                    {'Arizona Cardinals'}
                </label>
                {/* ----------- */}
                <label>
                    <input type='checkbox' value={'ATL'} onChange={handleCheck} />
                    {'Atlanta Falcons'}
                </label>
                {/* ----------- */}
                <label>
                    <input type='checkbox' value={'BUF'} onChange={handleCheck} />
                    {'Buffalo Bills'}
                </label>
                {/* ----------- */}
                <label>
                    <input type='checkbox' value={'BAL'} onChange={handleCheck} />
                    {'Balitmore Ravens'}
                </label>
                {/* ----------- */}
                <label>
                    <input type='checkbox' value={'CAR'} onChange={handleCheck} />
                    {'Carolina Panthers'}
                </label>
                {/* ----------- */}
                <label>
                    <input type='checkbox' value={'CIN'} onChange={handleCheck} />
                    {'Cincinnati Bengals'}
                </label>
                {/* ----------- */}
                <label>
                    <input type='checkbox' value={'CLE'} onChange={handleCheck} />
                    {'Cleveland Browns'}
                </label>
                {/* ----------- */}
                <label>
                    <input type='checkbox' value={'CHI'} onChange={handleCheck} />
                    {'Chicago Bears'}
                </label>
                {/* ----------- */}
                <label>
                    <input type='checkbox' value={'DAL'} onChange={handleCheck} />
                    {'Dallas Cowboys'}
                </label>
                {/* ----------- */}
                <label>
                    <input type='checkbox' value={'DEN'} onChange={handleCheck} />
                    {'Denver Broncos'}
                </label>
                {/* ----------- */}
                <label>
                    <input type='checkbox' value={'DET'} onChange={handleCheck} />
                    {'Detroit Lions'}
                </label>
                {/* ----------- */}
                <label>
                    <input type='checkbox' value={'GB'} onChange={handleCheck} />
                    {'Green Bay Packers'}
                </label>
                {/* ----------- */}
                <label>
                    <input type='checkbox' value={'HOU'} onChange={handleCheck} />
                    {'Houston Texans'}
                </label>
                {/* ----------- */}
                <label>
                    <input type='checkbox' value={'IND'} onChange={handleCheck} />
                    {'Indianapolis Colts'}
                </label>
                {/* ----------- */}
                <label>
                    <input type='checkbox' value={'KC'} onChange={handleCheck} />
                    {'Kansas City Chiefs'}
                </label>
                {/* ----------- */}
                <label>
                    <input type='checkbox' value={'LV'} onChange={handleCheck} />
                    {'Las Vegas Raiders'}
                </label>
                {/* ----------- */}
                <label>
                    <input type='checkbox' value={'LAC'} onChange={handleCheck} />
                    {'Los Angeles Chargers'}
                </label>
                {/* ----------- */}
                <label>
                    <input type='checkbox' value={'LAR'} onChange={handleCheck} />
                    {'Los Angeles Rams'}
                </label>
                {/* ----------- */}
                <label>
                    <input type='checkbox' value={'JAX'} onChange={handleCheck} />
                    {'Jacksonville Jaguars'}
                </label>
                {/* ----------- */}
                <label>
                    <input type='checkbox' value={'MIA'} onChange={handleCheck} />
                    {'Miami Dolphins'}
                </label>
                {/* ----------- */}
                <label>
                    <input type='checkbox' value={'MIN'} onChange={handleCheck} />
                    {'Minnesota Vikings'}
                </label>
                {/* ----------- */}
                <label>
                    <input type='checkbox' value={'NE'} onChange={handleCheck} />
                    {'New England Patriots'}
                </label>
                {/* ----------- */}
                <label>
                    <input type='checkbox' value={'NO'} onChange={handleCheck} />
                    {'New Orleans Saints'}
                </label>
                {/* ----------- */}
                <label>
                    <input type='checkbox' value={'NYG'} onChange={handleCheck} />
                    {'New York Giants'}
                </label>
                {/* ----------- */}
                <label>
                    <input type='checkbox' value={'NYJ'} onChange={handleCheck} />
                    {'New York Jets'}
                </label>
                {/* ----------- */}
                <label>
                    <input type='checkbox' value={'PHI'} onChange={handleCheck} />
                    {'Philadelphia Eagles'}
                </label>
                {/* ----------- */}
                <label>
                    <input type='checkbox' value={'SF'} onChange={handleCheck} />
                    {'San Francisco 49ers'}
                </label>
                {/* ----------- */}
                <label>
                    <input type='checkbox' value={'SEA'} onChange={handleCheck} />
                    {'Seattle Seahawks'}
                </label>
                {/* ----------- */}
                <label>
                    <input type='checkbox' value={'PIT'} onChange={handleCheck} />
                    {'Pittsburg Steelers'}
                </label>
                {/* ----------- */}
                <label>
                    <input type='checkbox' value={'TB'} onChange={handleCheck} />
                    {'Tampa Bay Buccanneers'}
                </label>
                {/* ----------- */}
                <label>
                    <input type='checkbox' value={'TEN'} onChange={handleCheck} />
                    {'Tennessee Titans'}
                </label>
                {/* ----------- */}
                <label>
                    <input type='checkbox' value={'WAS'} onChange={handleCheck} />
                    {'Washington Redskins'}
                </label>
                {/* ----------- */}
            </div>
        </>
    )
}

export default LineChart