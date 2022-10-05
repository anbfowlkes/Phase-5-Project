import { Link, Routes, Route, BrowserRouter, useNavigate } from 'react-router-dom';
import ScatterPlot from '../ScatterPlot/ScatterPlot'
import BarChart from '../BarChart/BarChart'
import LineChart from '../LineChart/LineChart'
import Navbar from './Navbar'
import './ChooseGraph.css'
import grey from './grey.PNG'

let ChooseGraph = ({ setInHome }) => {

    let nav = useNavigate()


    let goScatterPlot = () => {
        nav('/scatterplot')
        // setInHome(prev => !prev)
    }

    let goBarChart = () => {
        nav('/barchart')
        // setInHome(prev => !prev)
    }

    let goLineChart = () => {
        nav('/linechart')
        // setInHome(prev => !prev)
    }


    return (
        <div className='choosegraph-outer'>
            <div className='cover'>
                <img src={grey} />
            </div>
            <div className='choosegraph-title'>
                <h1>Choose Your Graph Type</h1>
            </div>
            <div>
                <button onClick={goScatterPlot}>Scatterplot</button>
                <button onClick={goBarChart}>Bar Graph</button>
                <button onClick={goLineChart}>Line Graph</button>
            </div>
            <div>
                <h3>* All data is from the 2021 NFL season</h3>
            </div>

            
          
        </div> 
    )
}

export default ChooseGraph