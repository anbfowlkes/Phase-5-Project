import { NavLink, useNavigate } from 'react-router-dom'
import './Home.css'

let Home = ({ setInHome }) => {


    // let navigate = useNavigate()
    let enterSite = () => {
        setInHome(prev => !prev)
        // navigate('/scatterplot')
    }

    

    return (
        <div className='home-page'>

            <div className='header-div'>
                <h1>{'Welcome'}</h1>
                <h2>To Football Analysis and Insight</h2>
            </div>
            <div className='home-button'>
                <button onClick={enterSite}>{'Enter Site'}</button>
            </div>
            <div className='home-div' >
                <img src='https://images.pexels.com/photos/7154759/pexels-photo-7154759.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1' />
            </div>
            <div className='under-text'>
                <h2>{'Over 4 trillion NFL graphs, at your fingertips.'}</h2>
            </div>
        </div>
    )
}

export default Home