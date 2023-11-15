import classes from "./MemoryButtons.module.css";
import Button from "../Ui/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { useState } from "react";

const MemoryButtons = (props) => {
  const memoryButtonHandler = (e, index) => {
    props.memoryButtonHandler(index);
    e.preventDefault();
  };
  return (
    <div className={classes["m-buttons"]}>
      {props.memoryHandler ? (
        <Button
          className={`${classes["m-btn"]} ${
            !props.memoryDarkMode && classes["m-btn-dark"]
          }`}
          onClick={(e) => memoryButtonHandler(e, "MC")}
        >
          MC
        </Button>
      ) : (
        <div
          className={`${classes["m-btn2"]} ${
            !props.memoryDarkMode && classes["m-btn2-dark"]
          }`}
        >
          MC
        </div>
      )}

      {props.memoryHandler ? (
        <Button
          className={`${classes["m-btn"]} ${
            !props.memoryDarkMode && classes["m-btn-dark"]
          }`}
          onClick={(e) => memoryButtonHandler(e, "MR")}
        >
          MR
        </Button>
      ) : (
        <div
          className={`${classes["m-btn2"]} ${
            !props.memoryDarkMode && classes["m-btn2-dark"]
          }`}
        >
          MR
        </div>
      )}
      <Button
        className={`${classes["m-btn"]} ${
          !props.memoryDarkMode && classes["m-btn-dark"]
        }`}
        onClick={(e) => memoryButtonHandler(e, "M+")}
      >
        M+
      </Button>
      <Button
        className={`${classes["m-btn"]} ${
          !props.memoryDarkMode && classes["m-btn-dark"]
        }`}
        onClick={(e) => memoryButtonHandler(e, "M-")}
      >
        M-
      </Button>
      <Button
        className={`${classes["m-btn"]} ${
          !props.memoryDarkMode && classes["m-btn-dark"]
        }`}
        onClick={(e) => memoryButtonHandler(e, "MS")}
      >
        MS
      </Button>
      {props.memoryHandler ? (
        <Button
          className={`${classes["m-btn"]} ${
            !props.memoryDarkMode && classes["m-btn-dark"]
          }`}
          onClick={(e) => memoryButtonHandler(e, "M")}
        >
          <span className={classes.span}>
            M <KeyboardArrowDownIcon fontSize="small" />
          </span>
        </Button>
      ) : (
        <div
          className={`${classes["m-btn2"]} ${
            !props.memoryDarkMode && classes["m-btn2-dark"]
          }`}
        >
          <span className={classes.span}>
            M <KeyboardArrowDownIcon fontSize="small" />
          </span>
        </div>
      )}
    </div>
  );
};

export default MemoryButtons;
