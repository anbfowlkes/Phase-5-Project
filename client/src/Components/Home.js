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
            </div>
            <div>
                <button onClick={enterSite}>{'Enter Site'}</button>
            </div>
            <div className='home-div' >

            </div>
        </div>
    )
}

export default Home