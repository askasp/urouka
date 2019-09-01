import React from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Uromaker2} from "../Models";
import SimpleMenu from "./MenuView";

const Days = ['M', 'T', 'O', 'T', 'F']

type classNames =
  | "root"
  | "score"
  | "mainCard"
  | "topCard"
  | "titleText"
  | "headerRow"
  | "profileImage"
  | "valueText"
  | "labelText"
  | "titleStyle";
const useStyles = makeStyles<Theme, {}, classNames>(theme => ({
  root: {
    //    padding: theme.spacing(1),
    flexGrow: 1
  },
  valueText: {
    color: "white"
  },
  labelText: {
    color: "white",
    fontSize: "12px"
  },
  titleText: {
    color: "white"
  },
  profileImage: {
    width: "50px",
    margin: "0px",
    padding: "0px",
    //height: "50px",
    //    textAlign: "center",
    borderRadius: "50%"
  },
  score: {
    //color: theme.palette.text.secondary
  },
  headerRow: {
    display: 'flex',
    justifyContent: "space-between"
  },
  mainCard: {
    backgroundColor: "#535C6e",
    borderRadius: theme.shape.borderRadius * 1,
    margin: theme.spacing(),
    padding: theme.spacing(),

    //padding: theme.spacing(),
    //maxWidth:"600px",
    flexGrow: 1
  },
  topCard: {
    backgroundColor: "#9F0736",
    borderRadius: theme.shape.borderRadius * 1,
    margin: theme.spacing(),
    marginBottom: theme.spacing(2)
    //paddding: theme.spacing(0),
  },
  titleStyle: {
    fontFamily: "Roboto bold",
    fontSize: "11px"
  }

}));

export function OuraDataCard2({ uromakers }: { uromakers: Uromaker2[] }) {
  const classes = useStyles()

  let individualavg = uromakers.map(uromaker =>
    Math.round(uromaker.readiness_Score.reduce((previous, current) => current + previous, 0) / uromaker.readiness_Score.length))




  const totalAvg = individualavg.reduce((previous, current) => current + previous, 0) / uromakers.length

  const Goal = 85
  const DaysInWeek = 5

  let reqAvg = 0
  if (uromakers !== undefined && uromakers[0] !== undefined) {
    reqAvg = Goal * DaysInWeek - (totalAvg * uromakers[0].readiness_Score.length / DaysInWeek - uromakers[0].readiness_Score.length)
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
    const sum = urom.readiness_Score.slice(0, index + 1).reduce((previous, current) => current + previous, 0)
    const avg = sum / (index + 1)
    return (
      <div className="textContainer">
        <p className={classes}> {urom.readiness_Score[index]} </p>
      </div>

    )

  }

  const Column = ({ uro }: { uro: Uromaker2 }) =>
    <>

      <div className="textContainer">
        <img style={{ borderRadius: "50%", width: "50px", height: "50px" }} src={uro.img} />
      </div>
      {Days.map((day, index) =>
        <DailyValueAndAvg urom={uro} index={index} />
      )}
    </>

  const DayColumn = () =>
    <>
      <div className="textContainer">
        <div style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
      </div>
      {Days.map(day =>
        <div className="textContainer">
          <p className="dayText"> {day} </p>
        </div>
      )}
    </>


  return (
    <div style={{ flexGrow: 1 }}>

      <div className="top-card">
        <div>
          <p className="top-card-title"> UKAS UROMÅL</p>
          <p className="top-card-subtitle"> Readiness</p>
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <p className="uro-currentavg"> {totalAvg}</p>
          <p className="uro-maal"> /85</p>
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
              <p className="dayText"> </p>
            </div>
          </div>
          {
            individualavg.map((avg, index) => <div style={{}}>
              <>
                <div className="textContainer">
                  {index + 1 === individualavg.length ?
                    <p className="avgText noborder"> {avg} </p> : <p className="avgText"> {avg}</p>}
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
