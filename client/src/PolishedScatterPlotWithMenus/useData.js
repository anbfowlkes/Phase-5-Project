import { useState, useEffect } from 'react'
import { json } from 'd3'

export const useData = () => {

    let jsonUrl = 'http://localhost:2000/get'
    
    let [data, setData] = useState(null)

    let [columns, setColumns] = useState(null)

    let getColumns = (data) => {
        let colsArray = []
        for (let col in data[0]) {
            colsArray.push(col)
        }
        colsArray.sort((a,b) => {
            return (a < b ? -1 : 1)
        })
        return colsArray
    }

    useEffect(() => {
        let row = (d) => {
            // d.ScoreQuarter1 = parseFloat(d.ScoreQuarter1)
            // d.ScoreQuarter2 = parseFloat(d.ScoreQuarter2)
            // d.ScoreQuarter3 = parseFloat(d.ScoreQuarter3)
            // d.ScoreQuarter4 = parseFloat(d.ScoreQuarter4)

            // maybe need to convert TimeOfPossession and OpponentTimeOfPossession from time string format into a number
            return d
        }
        json(jsonUrl, row).then(data => {
            // console.log(data)
            setData(data)
            setColumns(getColumns(data))
            // console.log(data[0])
            // console.log(getColumns(data))
        })
    }, [])

    return {data: data, columns: columns}
}