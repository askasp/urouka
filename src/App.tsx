import React, { useState, useEffect } from "react";
import "./App.css";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import { GetOuraData, GetAuth0UserData } from "./OuraApi";
import { UpdateUserData } from "./OuraApi";
import { OuraDataCard2 } from "./components/OuraDataCard";
import { Uromaker2 } from "./Models";
import { useAuth0 } from "./react-auth0-wrapper";
import { AuthLoginView } from "./components/AuthLoginView";

type classNames = "root" | "titleImageDiv" | "titleImage";
const useStyles = makeStyles<Theme, {}, classNames>(theme => ({
  root: {
    background: theme.palette.background.default,
    height: "100vh",
    flexGrow: 1,
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing(1),
    overflow: "auto"
  },
  titleImageDiv: {
    width: "100wv",
    display: "flex",
    margin: theme.spacing(),
    justifyContent: "center"
  },
  titleImage: {
    width: "150px"
  }
}));

const App: React.FC = () => {
  const [token, setToken] = useState("");
  const [haveFetched, setHaveFetched] = useState(false)
  const {
    isAuthenticated,
    loading,
    getTokenSilently,
    user,
    loginWithRedirect,
    logout
  } = useAuth0();

  const [uromakers2, setUromakers2] = useState([
    {
      img: "./jacob.png",
      readiness_Score: [0, 0] as number[],
      token: ""
    },
    {
      img: "./christer.png",
      readiness_Score: [0, 0] as number[],
      token: ""
    },
    {
      img: "./agnes.png",
      readiness_Score: [0, 0] as number[],
      token: ""
    },
    {
      img: "./andreas.png",
      readiness_Score: [0, 0] as number[],
      token: ""
    }
  ] as Uromaker2[]);

  function setOuraToken() {
    let a = window.location.href.split("=");
    const state = a[a.length - 1];
    const token = a[1].split("&")[0];
    const newuro = uromakers2.map(uromaker => {
      if (uromaker.img === state) {
        uromaker.token = token;
        console.log("new item is", uromaker)
      }
      return uromaker;
    });

    return newuro
  }

  async function fetchAndUpdateUromakers(uromakers: Uromaker2[]) {
    const promises = uromakers.map(async item => {
      const tmpreadiness = await GetOuraData(item.token, "readiness");
      item.readiness_Score = tmpreadiness;
      return item;
    });
    const newUro = await Promise.all(promises);
    setUromakers2(newUro);
    const a = await UpdateUserData(newUro, token, user.sub);
    console.log("new updated is ", a)
  }

  useEffect(() => {
    async function getToken() {
      const token = await getTokenSilently();
      setToken(token);
    }
    if (isAuthenticated) {
      getToken();
    }
  }, [isAuthenticated, getTokenSilently]);

  useEffect(() => {
    async function getUromakers() {
      const tmp = await GetAuth0UserData(token, user.sub);
      if (haveFetched === false) {
        if (tmp["user_metadata"] == undefined) {
          const a = await UpdateUserData(uromakers2, token, user.sub);
          setHaveFetched(true)
        }
        else {
          console.log("hei")
          await fetchAndUpdateUromakers(tmp["user_metadata"]["uromakers2"])
          setHaveFetched(true)
        }
      }
    }
    async function handleNewOuraToken() {
      let newUro = setOuraToken()
      console.log("uro fafter ser oura token", newUro)
      const a = await fetchAndUpdateUromakers(newUro)
      return a
    }

    if (user) {
      getUromakers();
      if (window.location.href.includes("access_token=") && haveFetched) {
        handleNewOuraToken()
      }

    }
  }, [token, haveFetched]);


  const classes = useStyles();
  return (
    <div className={classes.root}>
      {!isAuthenticated && !loading ? (
        <AuthLoginView loginWithRedirect={loginWithRedirect} />
      ) : (
          <>
            <div className={classes.titleImageDiv}>
              <img alt="" className={classes.titleImage} src="./URO_logo.svg" />
            </div>
            {user && console.log({ user })}
            <OuraDataCard2 uromakers={uromakers2} />
          </>
        )}
    </div>
  );
};
export default App;
