import React, { useState, useEffect } from "react";
import "./App.css";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import { GetOuraData } from "./OuraApi";
import { OuraDataCard } from "./components/OuraDataCard";
import { Uromaker, SleepData, ActivityData, ReadinessData } from "./Models";
import Grid from "@material-ui/core/Grid";

type classNames = "root" | "titleImageDiv" | "titleImage";
const useStyles = makeStyles<Theme, {}, classNames>(theme => ({
  root: {
    background: theme.palette.background.default,
    height: "100vh",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    padding:theme.spacing(3),
    overflow: "auto"
  },
  titleImageDiv: {
    width: "100wv",
    display:"flex",
    margin:theme.spacing(),
    justifyContent:'center'
  },
  titleImage:{
    width:"150px"
  }
  

}));

const App: React.FC = () => {
  const [uromakers, setUromakers] = useLocalStorage("uromakers", [
    {
      img: "./jacob.png",
      sleep: [] as SleepData[],
      activity: [] as ActivityData[],
      readiness: [] as ReadinessData[],
      token: ""
    },
    {
      img: "./christer.png",
      sleep: [] as SleepData[],
      activity: [] as ActivityData[],
      readiness: [] as ReadinessData[],
      token: ""
    },
    {
      img: "./agnes.png",
      sleep: [] as SleepData[],
      activity: [] as ActivityData[],
      readiness: [] as ReadinessData[],
      token: ""
    },
    {
      img: "./andreas.png",
      sleep: [] as SleepData[],
      activity: [] as ActivityData[],
      readiness: [] as ReadinessData[],
      token: ""
    }
  ] as Uromaker[]);
  const classes = useStyles();

  useEffect(() => {
    if (window.location.href.includes("access_token=")) {
      console.log(window.location.href);
      let a = window.location.href.split("=");
      const state = a[a.length - 1];
      const token = a[1].split("&")[0];
      console.log("init uro = ", uromakers);
      const newuro = uromakers.map((item: any) => {
        if (item.img === state) {
          item.token = token;
        }
        return item;
      });
      fetchData(newuro);
    }
    async function fetchData(uromakers: Uromaker[]) {
      const promises = uromakers.map(async item => {
        if (item.token !== "") {
          console.log("fetching")
          const tmpsleep = await GetOuraData(item.token, "sleep");
          const tmpactivity = await GetOuraData(item.token, "activity");
          const tmpreadiness = await GetOuraData(item.token, "readiness");
          item.sleep = tmpsleep.sleep;
          item.activity = tmpactivity.activity
          item.readiness = tmpreadiness.readiness;
        }
        return item;
      });
      const newUro = await Promise.all(promises);
      if (newUro !== uromakers){
        setUromakers(newUro);
      }
    }
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.titleImageDiv}>
        <img alt="" className={classes.titleImage} src="./URO_logo.svg" />
      </div>

      <Grid container spacing={1} justify="center" >
        {OuraDataCard("URO-KLAR", "#C19825", uromakers,"readiness")}
        {OuraDataCard("URO-PULS", "#9f0736", uromakers,"activity")}
        {OuraDataCard("URO-SNORK", "#535C6E", uromakers,"sleep")}
      </Grid>
    </div>
  );
};
export default App;

function useLocalStorage(key: any, initialValue: any) {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState(() => {
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key);
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // If error also return initialValue
      console.log(error);
      return initialValue;
    }
  });

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: any) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      // Save state
      setStoredValue(valueToStore);
      // Save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };

  return [storedValue, setValue];
}
