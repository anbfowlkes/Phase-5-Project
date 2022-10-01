import { useState, useEffect } from 'react'
import { json } from 'd3'





export const useData = () => {

    let jsonUrl = 'http://localhost:2000/teamgames'

    let jsonUrl2 = 'http://localhost:2000/teams'
    
    let [data, setData] = useState(null)

    let [columns, setColumns] = useState(null)

    let [teamData, setTeamData] = useState(null)


    let getColumns = (data) => {
        let colsArray = []
        for (let col in data[0].info) {
            colsArray.push(col)
        }
        colsArray.sort((a,b) => {
            return (a < b ? -1 : 1)
        })
        return colsArray
    }
    
    useEffect(() => {
        let row = (d) => {
            // d.temperature = parseFloat(d.temperature)
            // d.timestamp = new Date(d.timestamp)
            // this parses the data into a new format, '2015-03-20T21:00:00.000Z' becomes : 'Fri Mar 20 2015 17:00:00 GMT-0400 (Eastern Daylight Time)'
            return d
        }
        json(jsonUrl, row).then(data => {
            console.log(data)
            setData(data)
            setColumns(getColumns(data))
        })
    }, [])

    useEffect(() => {
        json(jsonUrl2).then(data => {
            setTeamData(data)
        })
    },[])

    return {data: data, columns: columns, teamData: teamData}
}