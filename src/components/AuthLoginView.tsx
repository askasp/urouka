import React from "react";
import Button from "@material-ui/core/Button";
import { Uromaker } from "../Models";

const loginBtn = {
  margin: "0 auto",
  height: '40px',
  backgroundColor: "#091630",
  color: "white",
  top:"10px"
};

export const AuthLoginView = (uromaker: Uromaker) => {
  //const classes = useStyles();
  return (
    <div style={{height:"60px"}}>
    <Button
      color="primary"
      style={loginBtn}
      variant="contained"
      onClick={() =>
        (window.location.href =
          "https://cloud.ouraring.com/oauth/authorize?response_type=token&client_id=VLIHHNEVF4PZ2ADJ&state=" +
          uromaker.img)
      }
    >
      Join{" "}
    </Button>
    </div>
  );
};
