import { useState } from "react";
import Button from "../Ui/Button";
import classes from "./Buttons.module.css";

const OperationButtons = (props) => {
  const submitHandler = () => {
    props.onSubmit();
  };

  const numberHandler = (n) => {
    props.onNumber(String(n));
  };

  const operatorHendler = (o) => {
    props.onCalculate(o);
  };

  const sliceHandler = () => {
    props.onDelete();
  };

  const negativeHandler = (t) => {
    props.onNegative(t);
  };

  return (
    <div className={classes["oper-btns"]}>
      <Button
        onClick={() => {
          operatorHendler("%");
        }}
        type="button"
        className={`${classes["oper-btn"]} ${
          !props.toggle && classes["oper-btn-dark"]
        }`}
      >
        %
      </Button>
      <Button
        onClick={() => {
          operatorHendler("CE");
        }}
        type="button"
        className={`${classes["oper-btn"]} ${
          !props.toggle && classes["oper-btn-dark"]
        }`}
      >
        CE
      </Button>
      <Button
        onClick={() => {
          operatorHendler("C");
        }}
        type="button"
        className={`${classes["oper-btn"]} ${
          !props.toggle && classes["oper-btn-dark"]
        }`}
      >
        C
      </Button>
      <Button
        onClick={sliceHandler}
        type="button"
        className={`${classes["oper-btn"]} ${
          !props.toggle && classes["oper-btn-dark"]
        }`}
      >
        ⌫
      </Button>
      <Button
        onClick={() => {
          operatorHendler("1/x");
        }}
        type="button"
        className={`${classes["oper-btn"]} ${
          !props.toggle && classes["oper-btn-dark"]
        }`}
      >
        1/x
      </Button>
      <Button
        onClick={() => {
          operatorHendler("x^2");
        }}
        type="button"
        className={`${classes["oper-btn"]} ${
          !props.toggle && classes["oper-btn-dark"]
        }`}
      >
        x²
      </Button>
      <Button
        onClick={() => {
          operatorHendler("√x");
        }}
        type="button"
        className={`${classes["oper-btn"]} ${
          !props.toggle && classes["oper-btn-dark"]
        }`}
      >
        √x
      </Button>
      <Button
        onClick={() => {
          operatorHendler("÷");
        }}
        type="button"
        className={`${classes["oper-btn"]} ${
          !props.toggle && classes["oper-btn-dark"]
        }`}
      >
        ÷
      </Button>
      <Button
        type="button"
        darkMod={props.toggle}
        onClick={() => numberHandler(7)}
      >
        7
      </Button>
      <Button
        type="button"
        darkMod={props.toggle}
        onClick={() => numberHandler(8)}
      >
        8
      </Button>
      <Button
        type="button"
        darkMod={props.toggle}
        onClick={() => numberHandler(9)}
      >
        9
      </Button>
      <Button
        onClick={() => {
          operatorHendler("×");
        }}
        type="button"
        className={`${classes["oper-btn"]} ${
          !props.toggle && classes["oper-btn-dark"]
        }`}
      >
        ×
      </Button>
      <Button
        type="button"
        darkMod={props.toggle}
        onClick={() => numberHandler(4)}
      >
        4
      </Button>
      <Button
        type="button"
        darkMod={props.toggle}
        onClick={() => numberHandler(5)}
      >
        5
      </Button>
      <Button
        type="button"
        darkMod={props.toggle}
        onClick={() => numberHandler(6)}
      >
        6
      </Button>
      <Button
        onClick={() => {
          operatorHendler("-");
        }}
        type="button"
        className={`${classes["oper-btn"]} ${
          !props.toggle && classes["oper-btn-dark"]
        }`}
      >
        -
      </Button>
      <Button
        type="button"
        darkMod={props.toggle}
        onClick={() => numberHandler(1)}
      >
        1
      </Button>
      <Button
        type="button"
        darkMod={props.toggle}
        onClick={() => numberHandler(2)}
      >
        2
      </Button>
      <Button
        type="button"
        darkMod={props.toggle}
        onClick={() => numberHandler(3)}
      >
        3
      </Button>
      <Button
        onClick={() => {
          operatorHendler("+");
        }}
        type="button"
        className={`${classes["oper-btn"]} ${
          !props.toggle && classes["oper-btn-dark"]
        }`}
      >
        +
      </Button>
      <Button
        onClick={() => {
          negativeHandler("-");
        }}
        type="button"
        darkMod={props.toggle}
      >
        +/-
      </Button>
      <Button
        type="button"
        darkMod={props.toggle}
        onClick={() => numberHandler(0)}
      >
        0
      </Button>
      <Button
        type="button"
        darkMod={props.toggle}
        onClick={() => {
          numberHandler(".");
        }}
      >
        .
      </Button>
      <Button
        onClick={submitHandler}
        type="button"
        className={`${classes["sub-btn"]} ${
          !props.toggle && classes["sub-btn-dark"]
        }`}
      >
        =
      </Button>
    </div>
  );
};
export default OperationButtons;
