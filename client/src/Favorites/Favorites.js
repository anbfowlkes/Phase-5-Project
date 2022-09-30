import { useEffect, useState } from 'react'
import BarChart from './BarChart/BarChart'
import ScatterPlot from './ScatterPlot/ScatterPlot'
import './Favorites.css'

let Favorites = () => {

    let [info, setInfo] = useState([])
    
    let [count, setCount] = useState(1)
    let [xAxis, setXAxis] = useState(null)
    let [yAxis, setYAxis] = useState(null)
    let [chartType, setChartType] = useState(null)

    let getData = async () => {
        let req = await fetch('http://localhost:2000/profile-graphs')
        let res = await req.json()
        console.log(res)
        res = res.sort((a,b) => (a.created_at < b.created_at ? -1 : 1))
        setInfo(res)
        setChartType(res[0].charttype)
        setXAxis(res[0].xaxis)
        setYAxis(res[0].yaxis)
    }


    useEffect(() => {
        getData()
    },[])


    let handleIncrease = () => {
        let len = info.length
        if (count < len) {
            setXAxis(info[count].xaxis)
            setYAxis(info[count].yaxis)
            // setChartType(info[count].charttype)
            setCount(prev => prev + 1)
        }
    }

    let handleDecrease = () => {
        if (count > 1) {
            setXAxis(info[count-2].xaxis)
            setYAxis(info[count-2].yaxis)
            // setChartType(info[count-2])
            setCount(prev => prev - 1)
        }
    }

    let display = (count) => {
        if (!(info[count-1])){
            return
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


    return (
        <div>
            <div className='scroller'>
                <button onClick={handleDecrease}>Previous</button>
                <p>{count}</p>
                <button onClick={handleIncrease}>Next</button>
            </div>
            {/* <p>{info[count-1].charttype}</p>
            <p>{info[count-1].xaxis}</p>
            <p>{info[count-1].yaxis}</p> */}
            <div>
                {display(count)}
            </div>
        </div>
    )
}

export default Favorites