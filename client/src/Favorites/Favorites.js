import { useEffect, useState } from 'react'
import BarChart from './BarChart/BarChart'
import ScatterPlot from './ScatterPlot/ScatterPlot'
import './Favorites.css'

let Favorites = () => {

    let [info, setInfo] = useState([])
    
    let [count, setCount] = useState(1)
    let [xAxis, setXAxis] = useState(null)
    let [yAxis, setYAxis] = useState(null)
    // let [chartType, setChartType] = useState(null)
    // let xAxis
    // let yAxis
    // let type

    let getData = async () => {
        let req = await fetch('http://localhost:2000/profile-graphs')
        let res = await req.json()
        console.log(res)
        res = res.sort((a,b) => (a.created_at < b.created_at ? -1 : 1))
        setInfo(res)
        // setChartType(res[0].charttype)
        setXAxis(res[0].xaxis)
        setYAxis(res[0].yaxis)
        // xAxis = res[0].xaxis
        // yAxis = res[0].yaxis
        // type = res[0].charttype
        // console.log('axes: ', xAxis, yAxis, type)
    }


    useEffect(() => {
        getData()
    },[])


    let handleIncrease = () => {
        let len = info.length
        if (count < len) {
            console.log(count)
            console.log(info)
            setXAxis(info[count].xaxis)
            setYAxis(info[count].yaxis)
            // setChartType(info[count].charttype)
            // xAxis = info[count].xaxis
            // yAxis = info[count].yaxis
            // type = info[count].charttype
            // console.log('axes: ', xAxis, yAxis, type)
            setCount(prev => prev + 1)
        }
    }

    let handleDecrease = () => {
        if (count > 1) {
            setXAxis(info[count-2].xaxis)
            setYAxis(info[count-2].yaxis)
            // xAxis = info[count - 2].xaxis
            // yAxis = info[count - 2].yaxis
            // type = info[count - 2].charttype
            // console.log('axes: ', xAxis, yAxis, type)
            // setChartType(info[count-2])
            setCount(prev => prev - 1)
        }
    }

    // useEffect(() => {
    //     setXAxis(info[count - 1].xaxis)
    //     setYAxis(info[count - 1].yaxis)
    // },[count])

    let renderChart = (count) => {
        console.log('xAxis, yAxis: ', xAxis, yAxis)
        if (!(info[count-1])){
            return
        }
        if (info.length == 0) {
            return (
                <div></div>
            )
        }
        if (info[count-1].charttype == 'scatterplot') {
            return (
                <ScatterPlot 
                    xAxis={xAxis}
                    yAxis={yAxis}
                    />
                )
        } else if (info[count-1].charttype == 'barchart') {
            return (
                
                <BarChart 
                    yAxis={yAxis}
                />
                )
        }
    }

    let deleteFavorite = async () => {
        let item = info[count - 1]
        console.log('item: ', item)
        let req = await fetch(`http://localhost:2000/profile-graphs/${item.id}`, {method: 'DELETE'})
        let res = await req.json()
        console.log(res)
        if (count == info.length) {
            setCount(prev => prev - 1)
        }
        getData()
    }


    return (
        <div>
            <div className='scroller'>
                <button onClick={handleDecrease}>Previous</button>
                <p>{count}</p>
                <button onClick={handleIncrease}>Next</button>
            </div>
            <div>
                {renderChart(count)}
            </div>
            <div>
                <button onClick={deleteFavorite}>Delete From Favorites</button>
            </div>
        </div>
    )
}

export default Favorites