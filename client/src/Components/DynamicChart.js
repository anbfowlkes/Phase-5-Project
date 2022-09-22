import { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'


const DynamicChart = () => {

    let x = 0

    let [teamData, setTeamData] = useState([])

    let [stats, setStats] = useState([])

    let [data, setData] = useState([])

    let [xAxisStat, setXAxisStat] = useState('')

    let [yAxisStat, setYAxisStat] = useState('')

    let getFootballData = async () => {
        let req = await fetch('http://localhost:2000/get')
        let res = await req.json()
        console.log(res)
        setTeamData(res)
        
        let array = []
        for (let item in res[0]) {
            array.push(item)
        }
        array.sort((a,b) => {
            return (a < b ? -1 : 1)
        })
        // console.log(array)
        setStats(array)

        // console.log('Look here: ', res[0].FieldGoalsMade)
        // console.log('Look here again: ', res[0].PassingYards)
        let arr = []
        for (let i = 0; i < res.length; i++) {
            arr.push([res[i].FieldGoalsMade, res[i].PassingYards])
            // arr.push([res[i][xAxisStat], res[i][yAxisStat]])
        }
        // console.log(arr)
        setData(arr)
    }

    useEffect(() => {
        getFootballData()
    }, [xAxisStat, yAxisStat])


    // let [data, setData] = useState([
    //     [90, 20],
    //     [20, 100],
    //     [66, 44],
    //     [53, 80],
    //     [24, 182],
    //     [80, 72],
    //     [10, 76],
    //     [33, 150],
    //     [100, 15]
    // ])

    const svgRef = useRef()

    // plan is to set up a container, then set up the scaling, then set up axis,
    // then set up axis labeling, then set up svg data

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
            .domain([15, 50])
            .range([0, w]);
        // scaleLinear maps [0, 100] to [0, w], so 0 -> 0, 100 -> w, etc
        const yScale = d3.scaleLinear()
            .domain([3000, 6000])
            .range([h, 0]);
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