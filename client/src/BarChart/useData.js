import { useState, useEffect } from 'react'
import { csv, json } from 'd3'

export const useData = () => {

    let jsonUrl = 'http://localhost:2000/get'
    
    let [data, setData] = useState(null)
    let [columns, setColumns] = useState(null)

    let jsonUrl2 = 'http://localhost:2000/teams'
    let [teamData, setTeamData] = useState(null)

    let getColumns = (data) => {
        let colsArray = []
        for (let col in data[0]) {
            colsArray.push(col)
        }
        colsArray.sort((a, b) => {
            return (a < b ? -1 : 1)
        })
        return colsArray
    }

    useEffect(() => {
        let row = (d) => {
            // d.Population = parseFloat(d['2020']) * 1000
            return d
        }
        json(jsonUrl, row).then(data => {
            // console.log(data)
            setData(data)
            setColumns(getColumns(data))
            // setData(data.slice(0,10))
        })
    }, [])

    useEffect(() => {
        json(jsonUrl2).then(data => {
            setTeamData(data)
        })
    },[])

    return {data: data, columns: columns, teamData: teamData}
}