import { useState, useCallback, useEffect } from 'react'
import { csv, scaleLinear, max, format, extent } from 'd3'
import { useData } from './useData'
import { AxisBottom } from './AxisBottom'
import { AxisLeft } from './AxisLeft'
import Marks from './Marks'
import Logos from './Logos'
import './ScatterPlot.css'
import Dropdown from './Dropdown'
import Regression from './Regression'
import RegressionDisplay from './RegressionDisplay'
import InfoDisplay from './InfoDisplay'
import Averages from './Averages'
import ReactDropdown from 'react-dropdown'
import Switch from './Switch'
import nflshield from './nflshield.PNG'
// import ToggleButton from 'react-toggle-button'


// number 9
let ScatterPlot = ({ inFavorites, xAxisFav, yAxisFav }) => {

    // let allData = useData()

    let {data, columns, teamData} = useData()

    let initialXAttribute
    if (xAxisFav) {
        initialXAttribute = xAxisFav
    } else {
        initialXAttribute = 'AssistedTackles'
    }
    let initialYAttribute
    if (yAxisFav) {
        initialYAttribute = yAxisFav
    } else {
        initialYAttribute = 'AssistedTackles'
    }
    const [xAttribute, setXAttribute] = useState(initialXAttribute)
    const [yAttribute, setYAttribute] = useState(initialYAttribute)

    let [regCor, setRegCor] = useState(null)
    let [regSlope, setRegSlope] = useState(null)
    let [regInt, setRegInt] = useState(null)

    let [regToggle, setRegToggle] = useState(false)

    let [logoToggle, setLogoToggle] = useState(true)

    let [infoToggle, setInfoToggle] = useState(false)

    let [averagesToggle, setAveragesToggle] = useState(false)

    let [teamDisplayed, setTeamDisplayed] = useState(null)

    if (!data || !teamData) {
        return <pre>'Loading...'</pre>
    }

    let width = (1.4) * 960
    let menuHeight = 60
    let height = (1.4) * (600 - 60)
    let margin = { top: 40, right: 20, bottom: 80, left: 300 }
    let innerHeight = height - (margin.top + margin.bottom)
    let innerWidth = width - (margin.left + margin.right)

    // const attributes = [
    //     {value: 'AssistedTackles', label: 'AssistedTackles'}, 
    //     {value: 'CompletionPercentage', label: 'CompletionPercentage'},
    //     {value: 'ExtraPointKickingAttempts', label: 'ExtraPointKickingAttempts'}, 
    //     {value: 'ExtraPointKickingConversions', label: 'ExtraPointKickingConversions'}, 
    //     {value: 'ExtraPointPassingAttempts', label: 'ExtraPointPassingAttempts'}
    // ]
    
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
            attributes.push({value: col, label: colDisplayer(col)})
        }
    })

    console.log('attributes: ', attributes)


    const getLabel = (value) => {
        for (let i = 0; i < attributes.length; i++) {
            if (attributes[i].value == value) {
                return attributes[i].label
            }
        }
    }

    // the 'd' bellow represents one element (row) of the data
    //we're using a band scale which is useful for ordinal data

    // const initialXAttribute = 'AssistedTackles'
    // const [xAttribute, setXAttribute] = useState(initialXAttribute)
    const xValue = (d) => d[xAttribute]
    const xAxisLabel = getLabel(xAttribute)

    // const initialYAttribute = 'CompletionPercentage'
    // const [yAttribute, setYAttribute] = useState(initialYAttribute)
    const yValue = (d) => d[yAttribute]
    const yAxisLabel = getLabel(yAttribute)

    //xValue is a function that takes in a row of the data and sends it to the sepal_length, then what happens below is we say we want to go from the min of these values to the max for our xScale domain on our scatterchart. The xValue function is an accessor which tells the computer what we're basing the min and max off of in the data

    // if (!data) {
    //     return <pre>'Loading...'</pre>
    // }

    // console.log(columns)
    // console.log(data)

    console.log(extent(data, xValue))

    let xpercentExtension = 0.01
    let ypercentExtension = 0.03

    let xDomainSetter = () => {
        let arr = extent(data, xValue)
        arr[0] = arr[0] - (xpercentExtension)*arr[0]
        arr[1] = arr[1] + (xpercentExtension)*arr[1]
        // console.log(arr)
        return(arr)
    }
    
    let yDomainSetter = () => {
        let arr = extent(data, yValue)
        arr[0] = arr[0] - (ypercentExtension)*arr[0]
        arr[1] = arr[1] + (ypercentExtension)*arr[1]
        // console.log(arr)
        return(arr)
    }

    let xScale = scaleLinear()
        .domain(xDomainSetter())
        .range([0, innerWidth])
        .nice()
        // .domain([min(data, xValue), max(data, xValue)]) instead of doing this, extent does the same thing
        
    let yScale = scaleLinear()
        .domain(yDomainSetter())
        .range([innerHeight, 0])
        .nice()

    const xAxisLabelOffset = 55
    const yAxisLabelOffset = 50

    // console.log('ticks console.log: ', xScale.ticks())
    // console.log('yScale domain console.log: ', yScale.domain())

    // console.log(data.columns) // this console.logs all the columns of the data, which is what we want as the attributes in our menu dropdown

    let cxArray = []

    let cyArray = []

    data.map((d) => {
        // cxArray.push(xScale(xValue(d)))
        // cyArray.push(yScale(yValue(d)))
        cxArray.push((xValue(d)))
        cyArray.push((yValue(d)))
    })

    let addToFavorites = async () => {
        let req = fetch('http://localhost:2000/profile-graphs', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({
                charttype: 'scatterplot',
                xaxis: xAttribute,
                yaxis: yAttribute
            })
        })
        let res = await req.json()
        console.log(res)
    }

    let handleTeamClick = (e) => {
        // console.log(e)
        // console.log(e.target.href.animVal)
        console.log(e.target)
        console.log(e.target.id)
        setTeamDisplayed(e.target.id)
    }


    return (
        <>
            <div classname='scatterplot-shield'>
                <img className='scatterplot-nflshield' src='https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/National_Football_League_logo.svg/1200px-National_Football_League_logo.svg.png' />
            </div>
            <div className='scatterPlotDiv'>
                
                <div className='menuAndScatterPlot'>


                    {inFavorites ? 
                    null :
                    <div className='scatterplot-menus-container'>
                        <div className='single-menu'>
                            <div>
                                <span className='scatterplot-dropdown-label'>X:</span>
                            </div>
                            <div>
                                <ReactDropdown 
                                    options={attributes}
                                    value={xAttribute}
                                    onChange={({ value }) => setXAttribute(value)}
                                />
                            </div>
                        </div>
                        
                        <div className='single-menu'>
                            <div>
                                <span className='scatterplot-dropdown-label'>Y:</span>
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
                    }
                    

                    <svg className='scatterplot-g' width={width} height={height} >

                        <g transform={`translate(${margin.left},${margin.top})`}>

                            <AxisBottom 
                                xScale={xScale} 
                                innerHeight={innerHeight} 
                                tickOffset={20} 
                            />

                            <AxisLeft 
                                yScale={yScale} 
                                innerWidth={innerWidth} 
                                tickOffset={7} 
                            />

                            {averagesToggle ? 
                            <Averages 
                                cxArray={cxArray} 
                                cyArray={cyArray} 
                                xScale={xScale}
                                yScale={yScale}
                                innerHeight={innerHeight}
                                innerWidth={innerWidth}
                            />  
                            : null}

                            <text 
                                className='scatterplot-axis-label-bottom'
                                x={innerWidth/2} 
                                y={innerHeight + xAxisLabelOffset + 20} 
                                textAnchor='middle'
                            >
                                {xAxisLabel}
                            </text>

                            <text 
                                className='scatterplot-axis-label-left'
                                textAnchor='middle'
                                transform={`translate(${-yAxisLabelOffset - 10}, ${innerHeight/2}) rotate(-90)`}     
                            >
                                {yAxisLabel}
                            </text>
                            
                            {logoToggle ? <Marks 
                                data={data}
                                teamData={teamData}
                                xScale={xScale} 
                                yScale={yScale} 
                                xValue={xValue}
                                yValue={yValue} 
                                innerHeight={innerHeight}
                                handleTeamClick={handleTeamClick}
                            /> : <Logos 
                                    data={data}
                                    teamData={teamData}
                                    xScale={xScale} 
                                    yScale={yScale} 
                                    xValue={xValue}
                                    yValue={yValue} 
                                    circleRadius={7}
                                    innerHeight={innerHeight}
                                    handleTeamClick={handleTeamClick}
                            />}

                            {regToggle ? 
                                <Regression 
                                    data={data} 
                                    cxArray={cxArray} 
                                    cyArray={cyArray} 
                                    xScale={xScale}
                                    yScale={yScale}
                                    setRegCor={setRegCor}
                                    setRegSlope={setRegSlope}
                                    setRegInt={setRegInt}
                                /> : null
                            }

                        </g>

                    </svg>


                </div>

                <div className='scatterplot-control-panel'>
                    <div className='scatterplot-panel'>
                        <h3>Logos</h3>
                        <Switch toggle={logoToggle} setToggle={setLogoToggle} />
                    </div>

                    <div className='scatterplot-panel'>
                        <h3>Averages</h3>
                        <Switch toggle={averagesToggle} setToggle={setAveragesToggle} />
                    </div>

                    <div className='scatterplot-panel'>
                        <h3>Regression</h3>
                        <Switch toggle={regToggle} setToggle={setRegToggle} />
                    </div>
                </div>

            </div>

            <div className='scatterplot-info-switch'>
                <Switch toggle={infoToggle} setToggle={setInfoToggle} />
            </div>
            
            {infoToggle? 
            <div className='scatterplot-info-display-outer'>
                
                
                
                <div className='regressionBox'>
                    <div className='regHead'>
                        <h3>{'Regression Analysis:'}</h3>
                        {/* <Switch toggle={regToggle} setToggle={setRegToggle} /> */}
                    </div>
                    <div className='regDispDiv'>
                        
                        <RegressionDisplay 
                            regCor={regCor} 
                            regSlope={regSlope} 
                            regInt={regInt} 
                            xAxisLabel={xAxisLabel}
                            yAxisLabel={yAxisLabel}
                            colDisplayer={colDisplayer}
                        />
                    </div>
                </div>

                <div className='scatterplot-averages'>

                </div>

                {/* <div>
                    <button onClick={addToFavorites}>Add To Favorites</button>
                </div> */}

                <div className='scatterplot-info-display'>
                     
                    <InfoDisplay 
                        xAttribute={xAttribute}
                        yAttribute={yAttribute}
                        data={data}
                        teamDisplayed={teamDisplayed}
                        colDisplayer={colDisplayer}
                        teamData={teamData}
                    />
                </div>
                
            </div>
            : null}
            <div className='scatterplot-bottom'>

            </div>
        </>
    )
}

export default ScatterPlot