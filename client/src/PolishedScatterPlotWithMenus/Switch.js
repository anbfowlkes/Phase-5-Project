const Switch = ({ regToggle, setRegToggle }) => {

    let sliderChange = (e) => {
        setRegToggle(!regToggle)
        console.log(regToggle)
    }

    return (
        <label className='switch'>
            <input onChange={sliderChange} type='checkbox' />
            <span className='slider' />
        </label>
    )
}

export default Switch