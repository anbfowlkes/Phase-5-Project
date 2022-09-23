import { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'


const DynamicChart = () => {

    let x = 0

    let [teamData, setTeamData] = useState([])

    let [stats, setStats] = useState([])

    let [data, setData] = useState([])

    let [xAxisStat, setXAxisStat] = useState('')

    let [yAxisStat, setYAxisStat] = useState('')

    let [xRegion, setXRegion] = useState([null,null])

    let [yRegion, setYRegion] = useState([null, null])

    let getFootballData = async () => {
        let req = await fetch('http://localhost:2000/get')
        let res = await req.json()
        console.log(res)
        setTeamData(res)
        
        let optionsArray = []
        for (let item in res[0]) {
            optionsArray.push(item)
        }
        optionsArray.sort((a,b) => {
            return (a < b ? -1 : 1)
        })
        // console.log(array)
        setStats(optionsArray)

        // console.log('Look here: ', res[0].FieldGoalsMade)
        // console.log('Look here again: ', res[0].PassingYards)
        let arr = []
        let xArr = []
        let yArr = []
        for (let i = 0; i < res.length; i++) {
            // arr.push([res[i].FieldGoalsMade, res[i].PassingYards])
            arr.push([res[i][xAxisStat], res[i][yAxisStat]])
            xArr.push(res[i][xAxisStat])
            yArr.push(res[i][yAxisStat])
        }
        // console.log(arr)
        setData(arr)
        setXRegion([Math.min(...xArr),Math.max(...xArr)])
        setYRegion([Math.min(...yArr),Math.max(...yArr)])

    }

    useEffect(() => {
        getFootballData()
    }, [xAxisStat, yAxisStat])

    const svgRef = useRef()

    useEffect(() => {
        // console.log('running')
        const w = 400
        const h = 300
        const svg = d3.select(svgRef.current)
            .attr('width', w)
            .attr('height', h)
            .style('overflow', 'visible')
            .style('margin-top', '100px');

        const xScale = d3.scaleLinear()
            .domain([xRegion[0]-20, xRegion[1]+20])
            .range([0, w]);
            // .domain([15, 50])
            // .range([0, w]);

        // scaleLinear maps [0, 100] to [0, w], so 0 -> 0, 100 -> w, etc
        const yScale = d3.scaleLinear()
            .domain([yRegion[0]-20, yRegion[1]+20])
            .range([h, 0]);
            // .domain([3000, 6000])
            // .range([h, 0]);
        // 0 -> h, 200 -> 0

        const xAxis = d3.axisBottom(xScale).ticks(10)
        const yAxis = d3.axisLeft(yScale).ticks(10)

        // const regression = d3.regressionLinear()
        //   .x(d => d.x)
        //   .y(d => d.y)
        //   .domain([0, 100])

        svg.append('g')
            .call(xAxis)
            .attr('transform', `translate(0, ${h})`);
        svg.append('g')
            .call(yAxis);

        svg.append('text')
            .attr('x', w / 2)
            .attr('y', h + 50)
            .text('Horizontal Axis')
        svg.append('text')
            .attr('y', h / 2)
            .attr('x', -140)
            .text('Vertical Axis');

        svg.selectAll()
            .data(data)
            .enter()
            .append('circle')
            .attr('cx', d => xScale(d[0]))
            .attr('cy', d => yScale(d[1]))
            .attr('r', 2)

    }, [data, xAxisStat, yAxisStat])

    let handleSelection = (e) => {
        e.preventDefault()
        console.log(e.target[0].value)
        console.log(e.target[1].value)
        setXAxisStat(e.target[0].value)
        setYAxisStat(e.target[1].value)
    }

    return (
        <div className="App">
            <div>
              <svg ref={svgRef}></svg>
            </div>
            <div id='gap'></div>
            <div>
              <form onSubmit={handleSelection}>
                <label>X Axis:
                  <select>
                    <option value={'nothing selected'}>{'Choose One:'}</option>
                    {stats.map((item) => {
                        return <option value={item} key={x++} >{item}</option>
                    })}
                  </select>
                </label>
                <label>Y Axis:
                  <select>
                    <option value={'nothing selected'}>{'Choose One:'}</option>
                    {stats.map((item) => {
                        return <option value={item} key={x++} >{item}</option>
                    })}
                  </select>
                </label>
                <input type='submit' />
              </form>
            </div>
        </div>
    );
}

export default DynamicChart