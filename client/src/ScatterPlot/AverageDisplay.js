let AverageDisplay = ({ xAvg, yAvg, xAttribute, yAttribute, colDisplayer }) => {

    return(
        <div className='avg-info'>
            <h2>Averages:</h2>
            <p>X Axis - {colDisplayer(xAttribute)}: {xAvg}</p>
            <p>Y Axis: - {colDisplayer(yAttribute)}: {yAvg}</p>
        </div>
    )
}

export default AverageDisplay