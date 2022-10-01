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
import ReactDropdown from 'react-dropdown'
import Switch from './Switch'
// import ToggleButton from 'react-toggle-button'


// number 9
let ScatterPlot = () => {

    // let allData = useData()

    let {data, columns, teamData} = useData()

    const initialXAttribute = 'AssistedTackles'
    const [xAttribute, setXAttribute] = useState(initialXAttribute)
    const initialYAttribute = 'AssistedTackles'
    const [yAttribute, setYAttribute] = useState(initialYAttribute)

    let [regCor, setRegCor] = useState(null)
    let [regSlope, setRegSlope] = useState(null)
    let [regInt, setRegInt] = useState(null)

    let [regToggle, setRegToggle] = useState(false)

    if (!data || !teamData) {
        return <pre>'Loading...'</pre>
    }

    let width = 960
    let menuHeight = 60
    let height = 600 - 60
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
    
    let xScale = scaleLinear()
        .domain(extent(data, xValue))
        .range([0, innerWidth])
        .nice()
        // .domain([min(data, xValue), max(data, xValue)]) instead of doing this, extent does the same thing
        
    let yScale = scaleLinear()
        .domain(extent(data, yValue))
        .range([innerHeight, 0])

    const xAxisLabelOffset = 55
    const yAxisLabelOffset = 50

    // console.log('ticks console.log: ', xScale.ticks())
    // console.log('yScale domain console.log: ', yScale.domain())

    const xAxisTickFormatter = n => format('.2s')(n).replace('G','B')

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


    return (
        <>
            <div className='scatterPlotDiv'>
                <div className='menuAndScatterPlot'>

                    <div className='menus-container'>
                        <div>
                            <span className='dropdown-label'>X:</span>
                            <ReactDropdown 
                                options={attributes}
                                value={xAttribute}
                                onChange={({ value }) => setXAttribute(value)}
                            />
                        </div>
                        
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
                                teamData={teamData}
                                xScale={xScale} 
                                yScale={yScale} 
                                xValue={xValue}
                                yValue={yValue} 
                                tooltipFormat={xAxisTickFormatter}
                                circleRadius={7}
                                innerHeight={innerHeight}
                            />

                            <Logos 
                                data={data}
                                teamData={teamData}
                                xScale={xScale} 
                                yScale={yScale} 
                                xValue={xValue}
                                yValue={yValue} 
                                tooltipFormat={xAxisTickFormatter}
                                circleRadius={7}
                                innerHeight={innerHeight}
                            />

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

                <div className='regressionBox'>
                    <div className='regHead'>
                        <h3>{'View Regression Analysis'}</h3>
                        <Switch regToggle={regToggle} setRegToggle={setRegToggle} />
                    </div>
                    <div className='regDispDiv'>
                        {regToggle ? 
                            <RegressionDisplay 
                            regCor={regCor} 
                            regSlope={regSlope} 
                            regInt={regInt} 
                            xAxisLabel={xAxisLabel}
                            yAxisLabel={yAxisLabel}
                            colDisplayer={colDisplayer}
                        /> : null}
                    </div>
                </div>
            </div>

            <div>
                <button onClick={addToFavorites}>Add To Favorites</button>
            </div>

            
        </>
    )
}

export default ScatterPlot