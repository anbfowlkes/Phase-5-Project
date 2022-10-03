import './App.css';
import { useState, useEffect, useRef } from 'react'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import * as d3 from 'd3'
import Navbar from './Components/Navbar'
import ChartZero from './Components/ChartZero'
import FootballChart from './Components/FootballChart'
import DynamicChart from './Components/DynamicChart'
import ScatterPlot from './ScatterPlot/ScatterPlot'
import BarChart from './BarChart/BarChart'
import LineChart from './LineChart/LineChart'
import Favorites from './Favorites/Favorites'


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
      <BrowserRouter>
            <Navbar  />
            <Routes > 
              {/* <Route path="/" element={ <LandingPage user={user}/>} /> */}
              <Route path='/scatterplot' element={<ScatterPlot inFavorites={false} />} />
              <Route path='/barchart' element={<BarChart inFavorites={false} />} />
              <Route path='/linechart' element={<LineChart inFavorites={false} />} />
              <Route path='/favorites' element={<Favorites />} />

              {/* <Route path='/contact_profile/:id' element={<ContactCard />}/>
              <Route path='/deal_profile/:id' element={<DealCard />}/> */}
              
              {/* <Route path='login' element={<Login setUser={setUser} setIsLoggedIn={setIsLoggedIn}/>} /> */}
              {/* <Route path='*' element={<ErrorPage/>} /> */}



            </Routes > 
          </BrowserRouter>
      {/* <ChartZero />
      <div id='gap'></div>
      <div id='chart'>
        <FootballChart />
      </div>
      <div id='gap'></div>
      <DynamicChart />
      <div id='space'></div> */}
      {/* <ScatterPlot /> */}
      {/* <BarChart /> */}
    </div>
  )
  
}

export default App;
