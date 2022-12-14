import { useEffect, useState } from 'react'
import { line, curveNatural } from 'd3'
export const Marks = ( { data, selectedTeams, yAttribute, xScale, yScale, xValue, yValue, teamData, setObjClicked } ) => {
    


    let storageArray = []

    for (let i = 0; i < selectedTeams.length; i++) {
        storageArray.push([])
    }

    for (let i = 0; i < selectedTeams.length; i++) {
        data.forEach((item) => {
            if (item.team == selectedTeams[i]) {
                storageArray[i].push(item)
            }
        })
    }




    
    let [teamsInfo, setTeamsInfo] = useState([])

    let getTeamsInfo = () => {
        data.forEach((item) => {
            let arr = []
            if (selectedTeams.includes(item.team)) {
                arr.push(item)
            }
            setTeamsInfo(arr)
        })
    }
    
    useEffect(() => {
        getTeamsInfo()
        console.log()
    }, [selectedTeams])

    // let teamArray = []

    // data.forEach((item) => {
    //     if (item.team == 'ATL') {
    //         teamArray.push(item)
    //     }
    // })

    let myY = (d) => d.info[yAttribute]
    
    let circleClick = (e) => {
        console.log(e.target)
        // console.log(d)
    }
    
    return (
        <>
            <g className='marks'>
                {storageArray.map((arr) => {
                    // console.log('arr: ', arr)
                    let color
                    teamData.forEach((teamObj) => {
                        if (teamObj.Key == arr[0].team) {
                            color = teamObj.SecondaryColor
                        }
                    })
                    
                    // console.log('color: ', color)
                    // console.log('teamData: ', teamData)
                    return (

                        // <path 
                        //     fill='black'
                        //     stroke='black'
                        //     d={line()
                        //         .x(d=>xScale(d.week))
                        //         .y(d=>yScale(myY(d)))
                        //         .curve(curveNatural)(teamArray)} 
                        //     />
                    
                        arr.map((d) => {
                            // console.log('d: ', d)
                            // console.log('yAttribute: ', yAttribute)
                            // console.log('myY(d): ', myY(d))
                            // <path 
                            //     fill='none'
                            //     stroke='black'
                            //     d={line()
                            //         .x(d=>xScale(xValue(d)))
                            //         .y(d=>yScale(yValue(d)))
                            //         .curve(curveNatural)(teamArray)} 
                            // />
                            
                                return (
                                    <>

                                    
                                        {/* <path 
                                            fill='black'
                                            stroke='black'
                                            d={line()
                                                .x(d=>xScale(d.week))
                                                .y(d=>yScale(myY(d)))
                                                .curve(curveNatural)(arr)} 
                                            /> */}
                                        <circle
                                            onClick={() => setObjClicked(d)}
                                            style={{fill: `#${color}`, zIndex: '-2'}}
                                            cx={xScale(d.week)}
                                            cy={yScale(myY(d))} 
                                            r={8}
                                        >
                                            {/* <title>{xValue(d)}</title> */}
                                        </circle>
                                    </>
                                )
                        
                    }))
                })}





                {/* <path 
                fill='none'
                stroke='black'
                d={line()
                    .x(d=>xScale(xValue(d)))
                    .y(d=>yScale(yValue(d)))
                    .curve(curveNatural)(teamArray)} 
                />
                {teamArray.map((d) => {
                    return (
                        <circle
                            cx={xScale(xValue(d))}
                            cy={yScale(yValue(d))} 
                            r={circleRadius}
                        >
                            <title>{xValue(d)}</title>
                        </circle>
                    )
                })} */}
            </g>
        </>
    ) // don't do a div, it doesn't work, do a fragment instead
}