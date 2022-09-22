import './App.css';
import { useState, useEffect, useRef } from 'react'
import * as d3 from 'd3'
import ChartZero from './Components/ChartZero'
import FootballChart from './Components/FootballChart'
import DynamicChart from './Components/DynamicChart'

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
      <ChartZero />
      <div id='gap'></div>
      {/* <ChartOne /> */}
      <div id='chart'>
        <FootballChart />
      </div>
      <div id='gap'></div>
      <DynamicChart />
      <div id='space'></div>
    </div>
  )
  
}

export default App;
