import React from "react";
import TempLinkBar from "../../components/Account/TempLinkBar";
import { Typography } from "@mui/material";
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles({
  root: {
    maxWidth: "960px",
    margin: "auto",
  },
});
function MyAccount() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <TempLinkBar />
      <Typography variant="h1">My Account</Typography>
    </div>
  );
}

export default MyAccount;
