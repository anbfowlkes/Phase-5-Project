import { Link } from 'react-router-dom'
import './Navbar.css'
// import '../Styles/Navbar.css'

const Navbar = () => {
    return (
        <div className="navbar">
            {/* <ul className='nav-links'> */}
                {/* <li className='nav-item' id="nav-company-name">
                    Football Site
                </li> */}
                {/* <li className='nav-item'>
                    <Link to="/">Home</Link>
                </li> */}
                <div className='nav-item-div'>
                    <li className='nav-item'>
                        <Link to="/home">Home</Link>
                    </li>
                </div>
                <div className='nav-item-div'>
                    <li className='nav-item'>
                        <Link to="/mustafalogin">Mustafa Login</Link>
                    </li>
                </div>
                <div className='nav-item-div'>
                    <li className='nav-item'>
                        <Link to="/scatterplot">Scatterplot</Link>
                    </li>
                </div>
                <div className='nav-item-div'>
                    <li className='nav-item'>
                        <Link to='/barchart'>Bar Chart</Link>
                    </li>
                </div>
                <div className='nav-item-div'>
                <li className='nav-item'>
                    <Link to='/linechart'>Line Chart</Link>
                </li>    
                </div>
                <div className='nav-item-div'>
                    <li className='nav-item'>
                        <Link to='/favorites'>Favorites</Link>
                    </li>
                </div>
                    
            {/* </ul> */}
        </div>
    )
}

export default Navbar