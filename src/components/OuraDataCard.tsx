import React from "react";
import { Uromaker2 } from "../Models";
import SimpleMenu from "./MenuView";

const Days = ['M', 'T', 'O', 'T', 'F']

export function OuraDataCard2({ uromakers }: { uromakers: Uromaker2[] }) {

  let individualavg = uromakers.map(uromaker =>
    Math.round(uromaker.readiness_Score.reduce((previous, current) => current + previous, 0) / uromaker.readiness_Score.length))

  const totalAvg = individualavg.reduce((previous, current) => current + previous, 0) / uromakers.length

  const Goal = 85
  const DaysInWeek = 5

  let reqAvg = 0

  if (uromakers !== undefined && uromakers[0] !== undefined) {
    reqAvg = Math.round((Goal * DaysInWeek - (totalAvg * uromakers[0].readiness_Score.length)) / (DaysInWeek - uromakers[0].readiness_Score.length))
  }

  const DailyValueAndAvg = ({ urom, index }: { urom: Uromaker2, index: number }) => {
    if (urom.readiness_Score === undefined) {
      return (<></>)
    }
    let classes = "scoreText"
    if (urom === uromakers[uromakers.length - 1]) {
      classes = classes.concat(" noborder")
    }

    if (urom.readiness_Score[index] === undefined) {
      return (
        <div className="textContainer">
          <p className={classes + " opacity50"}> 00 </p>
        </div>
      )
    }
    return (
      <div className="textContainer">
        <p className={classes}> {urom.readiness_Score[index]} </p>
      </div>
    )
  }

  const Column = ({ uro }: { uro: Uromaker2 }) =>
    <>

      <div className="textContainer">
        <img alt="" style={{ borderRadius: "50%", width: "10vw", height: "10vw" }} src={uro.img} />
      </div>
      {Days.map((day, index) =>
        <DailyValueAndAvg urom={uro} index={index} />
      )}
    </>

  const DayColumn = () =>
    <>
      <div className="textContainer">
        <div style={{ width: "10vw", height: "10vw", borderRadius: "50%" }} />
      </div>
      {Days.map(day =>
        <div className="textContainer">
          <h1>{day}</h1>
        </div>
      )}
    </>

  return (
    <div style={{ flexGrow: 1 }}>

      <div className="top-card">
        <div>
          <h1> UKAS UROMÅL </h1>
          <h2> Readiness</h2>
        </div>
        <div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <h1 >{totalAvg}</h1>
            <h1> /85</h1>
          </div>
          <h2> Req:{reqAvg}</h2>
        </div>

      </div>

      <div className="uroCardTop">
        <div id="container">
          <div>
            <DayColumn />
          </div>
          {uromakers.map((uromaker, index) => <div> <Column uro={uromaker} key={index} /> </div>)}
        </div>
      </div>

      <div className="uroCardBottom">
        <div id="container">
          <div >
            <div className="textContainer">
              <h1></h1>
            </div>
          </div>
          {
            individualavg.map((avg, index) => <div>
              <>
                <div className="textContainer">
                  {index + 1 === individualavg.length ?
                    <h2 style={{ borderRight: "0px" }}> {avg} </h2> : <h2>{avg} </h2>}
                </div>
              </>
            </div>
            )}
        </div>
      </div>
      <SimpleMenu />
    </div >
  )
}
