let Dropdown = ({ options, id, selectedValue, onSelectedValueChange }) => {

    return (
        <select id={id} onChange={e => onSelectedValueChange(e.target.value)}>
            {/* doing some destructuring below on options, which is an array of objects */}
            {options.map(({ value, label }) => {
                return (
                <option 
                selected={value == selectedValue} 
                value={value}
                >
                    {label}
                </option>
                )
            })}
        </select>
    )
}
// the selected={value == selectedValue} line sets the starting, initial value to Hamster

export default Dropdown