import React from "react";
import Button from "@material-ui/core/Button";
import { makeStyles, Theme } from "@material-ui/core/styles";

type classNames = "loginBtn" | "wrapper";
const useStyles = makeStyles<Theme, {}, classNames>(theme => ({
  loginBtn: {
    margin: "0 auto",
    height: 50,
    backgroundColor: theme.palette.primary.main,
    color: "white",
  },
  wrapper: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
  },
}));

export const AuthLoginView = ({
  loginWithRedirect,
}: {
  loginWithRedirect: () => void;
}) => {
  const classes = useStyles();

  return (
    <div className={classes.wrapper}>
      <Button
        color="primary"
        variant="outlined"
        className={classes.loginBtn}
        onClick={() => loginWithRedirect()}
      >
        Sign in
      </Button>
    </div>
  );
};
