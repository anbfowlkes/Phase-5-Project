let RegressionDisplay = ({ regCor, regInt, regSlope, xAxisLabel, yAxisLabel, colDisplayer}) => {

    if (!regCor) {
        return(
            <></>
        )
    }
    regCor = regCor.toFixed(2)

    let strength = ''
    if (regCor < 0.2 && regCor > -0.2) {
        strength = 'very weak'
    } else if (regCor < 0.4 && regCor > -0.4) {
        strength = 'weak'
    } else if (regCor < 0.6 && regCor > -0.6) {
        strength = 'moderate'
    } else if (regCor < 0.8 && regCor > -0.8) {
        strength = 'strong'
    } else strength = 'very strong'

    let direction = null
    let incline = null

    if (regCor >= 0) {
        direction = 'positive'
        incline = 'increase'
    } else {
        direction = 'negative'
        incline = 'decrease'
    }

    return (
        <div className='reg-info'>
            <h2>{'Regression Analysis:'}</h2>
            <p>{`Correlation Coefficient: r = ${regCor}`}</p>
            <p>{`This is a ${strength}, ${direction} association between ${xAxisLabel.toLowerCase()} and ${yAxisLabel.toLowerCase()}.`}</p>
            <p>{'Line of Best Fit:'}</p>
            <p>{`y = ${regSlope.toFixed(4)}x + ${regInt.toFixed(2)}`}</p>
            {/* <p>{`(${yAxisLabel}) = (${regSlope})(${xAxisLabel}) + ${regInt}`}</p> */}
            <p>{`This means that as ${xAxisLabel.toLowerCase()} increase by one, we expect, on average, ${yAxisLabel.toLowerCase()} to ${incline} by ${regSlope.toFixed(2)}.`}</p>
        </div>
    )
}

export default RegressionDisplay