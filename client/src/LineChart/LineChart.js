import { useState, useCallback, useEffect } from 'react'
import { csv, scaleLinear, scaleBand, max, extent } from 'd3'
import * as d3 from 'd3'
import { useData } from './useData'
import { AxisBottom } from './AxisBottom'
import { AxisLeft } from './AxisLeft'
import { Marks } from './Marks'
import Logos from './Logos'
import Paths from './Paths'
import Switch from './Switch'
import ShowGame from './ShowGame'
import SeasonInfo from './SeasonInfo'
import Footer from '../Components/Footer'
import './LineChart.css'
import ReactDropdown from 'react-dropdown'

// number 11
let LineChart = () => {

    let { data, columns, teamData, seasonData } = useData()

    let width = 1500
    let height = 600
    let margin = { top: 40, right: 20, bottom: 80, left: 300 }
    let innerHeight = height - (margin.top + margin.bottom)
    let innerWidth = width - (margin.left + margin.right)
    
    let [yAttribute, setYAttribute] = useState('AssistedTackles')

    let [selectedTeams, setSelectedTeams] = useState([])

    let [logoToggle, setLogoToggle] = useState(true)

    let [pathToggle, setPathToggle] = useState(true)

    let [markToggle, setMarkToggle] = useState(true)

    let [labelToggle, setLabelToggle] = useState(false)

    let [teamIndicated, setTeamIndicated] = useState(null)

    let [objClicked, setObjClicked] = useState(null)

    if (!data || !teamData || !columns || !seasonData) {
        return <pre>'Loading...'</pre>
    }

    console.log('seasonData: ', seasonData)

    // the 'd' bellow represents one element (row) of the data
    //we're using a band scale which is useful for ordinal data

    // const xValue = (d) => d.timestamp
    // const yValue = (d) => d.temperature

    let teamArray = []

    data.forEach((item) => {
        teamArray.push(item)
    })

    let yValArray = []



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
        if (col != 'TeamSeasonID'
            && col != 'TeamID' 
            && col != 'Season' 
            && col != 'Team' 
            && col != 'Games' 
            && col != 'TimeOfPossessionSeconds' 
            && col != 'OpponentTimeOfPossessionSeconds' 
            && col != 'SeasonType'
            && col != 'Date'
            && col != 'DayOfWeek'
            && col != 'Week'
            && col != 'GameKey'
            && col != 'TimeOfPossession'
            && col != 'Stadium'
            && col != 'ScoreID'
            && col != 'OpponentID'
            && col != 'Opponent'
            && col != 'HomeOrAway'
            && col != 'TeamGameID'
            ) {
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
        // .tickFormat(d3.format('.0f'))
        .nice()

    const xAxisLabel = 'Weeks'
    const yAxisLabel = colDisplayer(yAttribute)

    const xAxisLabelOffset = 65
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

    let indicatedTeamLogoUrl = (teamIndicated) => {
        let logo
        // if (teamIndicated) {
            teamData.forEach((teamObj) => {
                if (teamIndicated == teamObj.Key) {
                    logo = teamObj.WikipediaLogoUrl
                }
            })
        // }
        console.log(logo)
        return logo
    }


    return (

        <>

            <div className='linechart-shield'>
                <img className='linechart-nflshield' src='https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/National_Football_League_logo.svg/1200px-National_Football_League_logo.svg.png' />
            </div>
        
            <div className='linechart-menu-container'>
            
                <div className='lc-span'>
                    <span className='linechart-dropdown-label'>Y:</span>
                </div>
                <div>
                    <ReactDropdown
                        options={attributes}
                        value={yAttribute}
                        onChange={({ value }) => setYAttribute(value)}
                    />
                </div>
            </div>

            <div className='line-graph-and-controllers'>
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
                            className='linechart-axis-label'
                            x={innerWidth/2} 
                            y={innerHeight + xAxisLabelOffset} 
                            textAnchor='middle'
                        >
                            {xAxisLabel}
                        </text>

                        <text 
                            className='linechart-axis-label'
                            textAnchor='middle'
                            transform={`translate(${-yAxisLabelOffset}, ${innerHeight/2}) rotate(-90)`}     
                        >
                            {yAxisLabel}
                        </text>

                        {pathToggle ? 
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
                            setTeamIndicated={setTeamIndicated}
                            />
                        : null}
                        
                        {markToggle ? 
                        <>
                            {logoToggle ? 
                                <Marks 
                                data={data} 
                                xScale={xScale} 
                                yScale={yScale} 
                                xValue={xValue}
                                yValue={yValue}
                                teamArray={teamArray}
                                tooltipFormat={xAxisTickFormatter}
                                selectedTeams={selectedTeams}
                                yAttribute={yAttribute}
                                teamData={teamData}
                                setObjClicked={setObjClicked}
                            />
                            : 
                            <Logos 
                                data={data}
                                teamData={teamData}
                                xScale={xScale} 
                                yScale={yScale} 
                                xValue={xValue}
                                yValue={yValue} 
                                selectedTeams={selectedTeams}
                                setObjClicked={setObjClicked}
                                // handleTeamClick={handleTeamClick}
                            />
                            }
                            

                            
                        </>
                        : null}

                    </g>

                </svg>

                <div id='line-switches-div'>
                    <div className='controller'>
                        <h3>{'Show Logos'}</h3>
                        <Switch toggle={logoToggle} setToggle={setLogoToggle} />
                    </div>
                    <div className='controller'>
                        <h3>{'Line Only'}</h3>
                        <Switch toggle={markToggle} setToggle={setMarkToggle} />
                    </div>
                    <div className='controller'>
                        <h3>{'No Line'}</h3>
                        <Switch toggle={pathToggle} setToggle={setPathToggle} />
                    </div>


                    <div className='linechart-team-indicator'>
                        <p>{teamIndicated}</p>
                        <img src={indicatedTeamLogoUrl(teamIndicated)} />
                    </div>
                    {/* <div className='controller'>
                        <h3>{'Show Labels'}</h3>
                        <Switch toggle={labelToggle} setToggle={setLabelToggle} />
                    </div> */}
                    
                    <div className='linechart-disclaimer'>
                        * Weekly Totals
                    </div>
                </div>
            </div>

            <div id='checkbox-div'>
                <div className='division-div'>
                    <label>
                        <input type='checkbox' value={'BUF'} onChange={handleCheck} />
                        {'Buffalo Bills'}
                    </label>

                    <label>
                        <input type='checkbox' value={'NE'} onChange={handleCheck} />
                        {'New England Patriots'}
                    </label>

                    <label>
                        <input type='checkbox' value={'NYJ'} onChange={handleCheck} />
                        {'New York Jets'}
                    </label>

                    <label>
                        <input type='checkbox' value={'MIA'} onChange={handleCheck} />
                        {'Miami Dolphins'}
                    </label>
                </div>


                <div className='division-div'>
                    <label>
                        <input type='checkbox' value={'BAL'} onChange={handleCheck} />
                        {'Balitmore Ravens'}
                    </label>

                    <label>
                        <input type='checkbox' value={'CIN'} onChange={handleCheck} />
                        {'Cincinnati Bengals'}
                    </label>

                    <label>
                        <input type='checkbox' value={'CLE'} onChange={handleCheck} />
                        {'Cleveland Browns'}
                    </label>

                    <label>
                        <input type='checkbox' value={'PIT'} onChange={handleCheck} />
                        {'Pittsburg Steelers'}
                    </label>
                </div>





                <div className='division-div'>
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
                        <input type='checkbox' value={'JAX'} onChange={handleCheck} />
                        {'Jacksonville Jaguars'}
                    </label>
                    {/* ----------- */}
                    <label>
                        <input type='checkbox' value={'TEN'} onChange={handleCheck} />
                        {'Tennessee Titans'}
                    </label>
                </div>



                <div className='division-div'>

                    {/* ----------- */}
                    <label>
                        <input type='checkbox' value={'DEN'} onChange={handleCheck} />
                        {'Denver Broncos'}
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
                </div>



                <div className='division-div'>
                    <label>
                        <input type='checkbox' value={'DAL'} onChange={handleCheck} />
                        {'Dallas Cowboys'}
                    </label> 
                    {/* ----------- */}
                    <label>
                        <input type='checkbox' value={'NYG'} onChange={handleCheck} />
                        {'New York Giants'}
                    </label>
                    {/* ----------- */}
                    <label>
                        <input type='checkbox' value={'PHI'} onChange={handleCheck} />
                        {'Philadelphia Eagles'}
                    </label>
                    {/* ----------- */}
                    <label>
                        <input type='checkbox' value={'WAS'} onChange={handleCheck} />
                        {'Washington Commanders'}
                    </label>    
                </div>
                
                <div className='division-div'>

                
                    {/* ----------- */}
                    <label>
                        <input type='checkbox' value={'CHI'} onChange={handleCheck} />
                        {'Chicago Bears'}
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
                    <label>
                        <input type='checkbox' value={'MIN'} onChange={handleCheck} />
                        {'Minnesota Vikings'}
                    </label>
                </div>





                <div className='division-div'>
                    {/* ----------- */}
                    <label>
                        <input type='checkbox' value={'ATL'} onChange={handleCheck} />
                        {'Atlanta Falcons'}
                    </label>
                    {/* ----------- */}
                    <label>
                        <input type='checkbox' value={'CAR'} onChange={handleCheck} />
                        {'Carolina Panthers'}
                    </label>
                    {/* ----------- */}
                    <label>
                        <input type='checkbox' value={'NO'} onChange={handleCheck} />
                        {'New Orleans Saints'}
                    </label>
                    {/* ----------- */}
                    <label>
                        <input type='checkbox' value={'TB'} onChange={handleCheck} />
                        {'Tampa Bay Buccanneers'}
                    </label>
                </div>
                
                
                <div className='division-div'>
                    <label>
                        <input type='checkbox' value={'ARI'} onChange={handleCheck} />
                        {'Arizona Cardinals'}
                    </label>
                    {/* ----------- */}
                    <label>
                        <input type='checkbox' value={'LAR'} onChange={handleCheck} />
                        {'Los Angeles Rams'}
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
                </div>
            </div>

            <div className='linechart-info'>

                <div className='season-info'>
                    <SeasonInfo 
                        objClicked={objClicked}
                        seasonData={seasonData}
                        teamData={teamData}
                        yAttribute={yAttribute}
                        colDisplayer={colDisplayer}
                    />
                </div>

                <div className='game-info'>
                    <ShowGame 
                        objClicked={objClicked}
                        data={data}
                        teamData={teamData}
                        yAttribute={yAttribute}
                        colDisplayer={colDisplayer}
                    />
                </div>

            </div>
            <Footer />
        </>
    )
}

export default LineChart