import { useState, useEffect } from 'react'
import { json } from 'd3'





export const useData = () => {

    let jsonUrl = 'http://localhost:2000/teamgames'

    let jsonUrl2 = 'http://localhost:2000/teams'

    let jsonUrl3 = 'http://localhost:2000/get'
    
    let [data, setData] = useState(null)

    let [columns, setColumns] = useState(null)

    let [teamData, setTeamData] = useState(null)

    let [seasonData, setSeasonData] = useState(null)


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
            // d.OpponentTimeOfPossessionMinutes = d.OpponentTimeOfPossessionMinutes + d.OpponentTimeOfPossessionSeconds/60.0
            return d
        }
        json(jsonUrl, row).then(data => {
            // console.log(data)
            setData(data)
            setColumns(getColumns(data))
        })
    }, [])

    useEffect(() => {
        json(jsonUrl2).then(data => {
            setTeamData(data)
        })
    },[])

    useEffect(() => {
        json(jsonUrl3).then(data => {
            setSeasonData(data)
        })
    },[])

    return {data: data, columns: columns, teamData: teamData, seasonData: seasonData}
}