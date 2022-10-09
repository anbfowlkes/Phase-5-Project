import { useState, useEffect } from 'react'
import { json } from 'd3'

export const useData = () => {

    // let jsonUrl = 'http://localhost:2000/get'
    let jsonUrl = 'https://gridiron-insight-and-analytics.herokuapp.com/get'

    let [data, setData] = useState(null)
    let [columns, setColumns] = useState(null)

    // let jsonUrl2 = 'http://localhost:2000/teams'
    let jsonUrl2 = 'https://gridiron-insight-and-analytics.herokuapp.com/teams'
    
    let [teamData, setTeamData] = useState(null)

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

    let timeToNum = (time) => {
        time = time.split('')
        let secs = parseFloat(time[3] + time[4])
        let mins = parseFloat(time[0] + time[1])
        return (((mins * 60) + secs) / 60).toFixed(2)
    }

    useEffect(() => {
        let row = (d) => {
            // d.ScoreQuarter1 = parseFloat(d.ScoreQuarter1)
            // d.ScoreQuarter2 = parseFloat(d.ScoreQuarter2)
            // d.ScoreQuarter3 = parseFloat(d.ScoreQuarter3)
            // d.ScoreQuarter4 = parseFloat(d.ScoreQuarter4)
            // d.TimeOfPossession = timeToNum(TimeOfPossession)
            // d.OpponentTimeOfPossession = timeToNum(OpponentTimeOfPossession)

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

    useEffect(() => {
        json(jsonUrl2).then(data => {
            setTeamData(data)
        })
    },[])

    return {data: data, columns: columns, teamData: teamData}
}