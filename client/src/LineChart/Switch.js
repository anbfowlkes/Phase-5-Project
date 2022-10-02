const Switch = ({ toggle, setToggle }) => {

    let sliderChange = (e) => {
        setToggle(!toggle)
        console.log('toggle: ', toggle)
    }

    return (
        <label className='switch'>
            <input onChange={sliderChange} type='checkbox' />
            <span className='slider' />
        </label>
    )
}

export default Switch