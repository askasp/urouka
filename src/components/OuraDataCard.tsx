import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles, Theme } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Uromaker } from "../Models";
import { AuthLoginView } from "./AuthLoginView";

type classNames =
  | "root"
  | "card"
  | "titleText"
  | "profileImage"
  | "valueText"
  | "labelText";
const useStyles = makeStyles<Theme, {}, classNames>(theme => ({
  root: {
    padding: theme.spacing(2),
    flexGrow: 1
  },
  valueText: {
    color: "white"
  },
  labelText: {
    color: "white",
    fontSize:"12px"
  },
  titleText: {
    color: "white"
  },
  profileImage: {
    width: "60px",
    height: "60px",
    borderRadius: "50%"
  },
  card: {
    borderRadius: theme.shape.borderRadius * 1,
    margin: theme.spacing(),
    padding: theme.spacing(),
    maxWidth:"300px",
    flexGrow: 1
  }
}));

export function OuraDataCard(
  title: string,
  bgcolor: string,
  uromakers: Uromaker[],
  type:string
) {

  const classes = useStyles();
  const dataRowView = (uromaker: Uromaker,type:string) => {
    const loggedInView = () => {

      let field1value = 0
      let field2value= 0
      let field3value= 0
      let field1label = ""
      let field2label= ""
      let field3label= ""
      if (type==="sleep"){
        field1label="Dyp";
        field1value = Math.round((uromaker.sleep[uromaker.sleep.length-1].deep*10)/3600)/10
        field2label="Total";
        field2value = Math.round((uromaker.sleep[uromaker.sleep.length-1].total*10)/3600)/10
        field3label="Score";
        field3value = uromaker.sleep[uromaker.sleep.length-1].score
      }
      if (type==="activity"){
        field1label="Steps";
        field1value = uromaker.activity[uromaker.activity.length-1].steps
        field2label="kCal";
        field2value = uromaker.activity[uromaker.activity.length-1].cal_total
        field3label="Score";
        field3value = uromaker.activity[uromaker.activity.length-1].score
      }
      if (type==="readiness"){
        field1label="Activity Balance";
        field1value = uromaker.readiness[uromaker.readiness.length-1].score_activity_balance
        field2label="Sleep Balance";
        field2value = uromaker.readiness[uromaker.readiness.length-1].score_sleep_balance
        field3label="Score";
        field3value = uromaker.readiness[uromaker.readiness.length-1].score
      }


      return (
        <Grid container spacing={8}>
          <Grid item xs={3}>
            <img alt="" className={classes.profileImage} src={uromaker.img} />
          </Grid>
          {dataAndLabelView(
            field1label,
            field1value
          )}
          {dataAndLabelView(
            field2label,
            field2value
          )}
          {dataAndLabelView(
            field3label,
            field3value
          )}
        </Grid>
      );
    };
    const notLoggedInView = () => {
      return (
        <Grid container spacing={8}>
          <Grid item xs={3}>
            <img alt="" className={classes.profileImage} src={uromaker.img} />
          </Grid>
          <Grid item xs={8}>
            {AuthLoginView(uromaker)}
          </Grid>
        </Grid>
      );
    };
    return uromaker.sleep.length > 0 && uromaker.activity.length>0 && uromaker.readiness.length>0 ? loggedInView() : notLoggedInView();
  };

  const dataAndLabelView = (label: string, value: number) => (
    <Grid item xs={2}>
      <Typography className={classes.valueText} variant="h6">
        {value.toString()}
      </Typography>
      <Typography className={classes.labelText} variant="body2">
        {label}
      </Typography>
    </Grid>
  );

  return (
    <Grid item xs={12} md={4} lg={3} xl={2}>
      <Card className={classes.card} style={{ backgroundColor: bgcolor }}>
        <Typography variant="subtitle2" className={classes.titleText}>
          {" "}
          {title}{" "}
        </Typography>
        <CardContent>{uromakers.map(item => dataRowView(item,type))}</CardContent>
      </Card>
    </Grid>
  );
}
