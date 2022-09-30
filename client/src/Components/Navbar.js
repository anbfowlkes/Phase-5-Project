import { Link } from 'react-router-dom'
// import '../Styles/Navbar.css'

const Navbar = () => {
    return (
        <div className="navbar">
            <ul className='nav-links'>
                {/* <li className='nav-item' id="nav-company-name">
                    Football Site
                </li> */}
                {/* <li className='nav-item'>
                    <Link to="/">Home</Link>
                </li> */}
                <li className='nav-item'>
                    <Link to="/scatterplot">Scatterplot</Link>
                </li>
                <li className='nav-item'>
                    <Link to='/barchart'>Bar Chart</Link>
                </li>
                <li className='nav-item'>
                    <Link to='/favorites'>Favorites</Link>
                </li>
            </ul>
        </div>
    )
}

export default Navbar