import './App.css';
import { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import ChartZero from './Components/ChartZero'
import FootballChart from './Components/FootballChart'
import DynamicChart from './Components/DynamicChart'
import PolishedScatterPlotWithMenus from './PolishedScatterPlotWithMenus/PolishedScatterPlotWithMenus'

function App() {

  // let callToRails = async () => {
  //   let req = await fetch('http://localhost:2000/get')
  //   let res = await req.json()
  //   console.log(res)
  // }

  // useEffect(() => {
  //   callToRails()
  // }, [])

  return (
    <div>
      {/* <ChartZero />
      <div id='gap'></div>
      <div id='chart'>
        <FootballChart />
      </div>
      <div id='gap'></div>
      <DynamicChart />
      <div id='space'></div> */}
      <PolishedScatterPlotWithMenus />
    </div>
  )
  
}

export default App;
