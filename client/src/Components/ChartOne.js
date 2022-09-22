// import { useEffect, useRef } from 'react'
// import * as d3 from 'd3'
// import '../ChartOne.css'

// const ChartOne = () => {

//     const d3Chart = useRef()

//     const parseDate = d3.timeParse('%Y-%m-%d')

//     let CountsByDate = []


//     let getData = async () => {
//         let req = await fetch('https://data.cityofnewyork.us/resource/tg4x-b46p.json')
//         let data = await req.json()
//         console.log(data)
//         const permits = data.filter(event => {
//             return event.eventtype == 'Shooting Permit'
//         })
//         // get all the dates in an array
//         const dates = [...new Set(permits.map(each => each.enteredon.slice(0,10)))]
//         dates.map(time => {
//             let date = time
//             let count = 0
//             permits.map(each => {
//                 let timestamp = each.enteredon.slice(0,10)
//                 if (timestamp == date) {count+=1}
//             })
//             const counts = {date:parseDate(data), count:count}
//             CountsByDate.push(counts)
//         })
//         console.log("CountsByDate: ", CountsByDate)
//     }

//     useEffect(() => {
//         fetch('https://data.cityofnewyork.us/resource/tg4x-b46p.json')
//         .then(res => res.json())
//         .then(data => {

//             console.log(data)
//             const permits = data.filter(event => {
//                 return event.eventtype == 'Shooting Permit'
//             })
//             // get all the dates in an array
//             const dates = [...new Set(permits.map(each => each.enteredon.slice(0, 10)))]
            
//             let CountsByDate = []
            
//             dates.map(time => {
//                 let date = time
//                 let count = 0
//                 permits.map(each => {
//                     let timestamp = each.enteredon.slice(0, 10)
//                     if (timestamp == date) { count += 1 }
//                 })
//                 const counts = { date: parseDate(data), count: count }
//                 CountsByDate.push(counts)
//             })
//             console.log("CountsByDate: ", CountsByDate)
            
//             const margin = {top: 50, right: 30, bottom: 30, left: 30}
//             const width = parseInt(d3.select('#d3demo').style('width'))
//             const height = parseInt(d3.select('#d3demo').style('height'))
            
//         // Set up chart
//         const svg = d3.select(d3Chart.current)
//         .attr('width', width)
//         .attr('height', height)
//         .style('background-color', 'yellow')
//         .append('g')
//         .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
        
//         const x = d3.scaleTime()
//         .domain(d3.extent(CountsByDate, function(d){return d.date}))
//         .range([0, width])
        
//         svg.append('g')
//         .attr('transform', 'translate(0,' + height + ')')
//         .call(d3.axisBottom(x))
        
//         const max = d3.max(CountsByDate, function(d){return d.count})
        
//         const y = d3.scaleLinear()
//         .domain([0, max])
//         .range([height, 0])
        
//         svg.append('g')
//         .call(d3.axisLeft(y))
        
//         svg.append('path')
//         .datum(CountsByDate)
//         .attr('fill', 'none')
//         .attr('stroke', 'white')
//         .attr('stroke-width', 3)
//         .attr('d', d3.line()
//         .x(function(d){return x(d.date)})
//         .y(function(d){return y(d.count)}))
        
//     }
//         )
//     }, [])
    
//     return (
//         <div id='d3demo'>
//             <svg ref={d3Chart}></svg>
//         </div>
//     )
// }

// export default ChartOne