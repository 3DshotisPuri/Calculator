import Button from "../Ui/Button";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import classes from "./History.module.css";
import { dark } from "@mui/material/styles/createPalette";

const History = (props) => {
  const [historyData, setHistoryData] = useState(props.onData);
  const [memoryData, setMemoryData] = useState(props.onMemory);
  const [mouseOver, setMouseOver] = useState(false);

  const deleteHandler = (e) => {
    e.preventDefault();
    {
      props.switchTab ? setHistoryData([]) : setMemoryData([]);
    }
    {
      !props.switchTab && props.turnOfMemory(false);
    }
    props.onDelete([]);
  };
  const selectHandler = (e, data) => {
    props.onSelect(e, false, data);
  };

  const addDataHandler = (e) => {
    setMemoryData((prevState) => [
      { memoryData: +props.onInput + +prevState[0].memoryData },
    ]);
    e.preventDefault();
    console.log(props.onInput);
  };
  const subtractDataHandler = (e) => {
    setMemoryData((prevState) => [
      { memoryData: +(+prevState[0].memoryData) - +props.onInput },
    ]);
    e.preventDefault();
  };

  if (props.switchTab === true) {
    if (historyData.length === 0) {
      return (
        <div
          className={classes.conteiner}
          style={{
            background: !props.darkMode && "rgba(255, 255, 255, 0.150)",
          }}
        >
          <h5 style={{ color: !props.darkMode && "white" }}>
            There's no history yet
          </h5>
        </div>
      );
    }
  } else if (props.switchTab === false) {
    if (memoryData.length === 0) {
      return (
        <div
          className={classes.conteiner}
          style={{
            background: !props.darkMode && "rgba(255, 255, 255, 0.150)",
          }}
        >
          <h5 style={{ color: !props.darkMode && "white" }}>
            there's nothing saved in memory
          </h5>
        </div>
      );
    }
  }

  const mouseEnterHandler = () => {
    setMouseOver(true);
  };
  const mouseLeaveHandler = () => {
    setMouseOver(false);
  };
  return (
    <div
      className={classes.conteiner}
      style={{ background: !props.darkMode && "rgba(255, 255, 255, 0.150)" }}
    >
      {props.switchTab ? (
        <div className={classes.tab}>
          {historyData.map((data, index) => {
            return (
              <ul
                key={index}
                style={{ color: !props.darkMode && "white" }}
                onClick={(e) => {
                  selectHandler(e, data);
                }}
              >
                <li className={classes.result}>
                  {data.firstNumber}
                  {data.operator}
                  {data.secondNumber}
                  {data.submit}
                  <br />
                  <span>{data.result}</span>
                </li>
              </ul>
            );
          })}
        </div>
      ) : (
        <div className={classes.tab}>
          {" "}
          {memoryData.map((data, index) => {
            return (
              <div
                className={classes["memory-div"]}
                onMouseEnter={mouseEnterHandler}
                onMouseLeave={mouseLeaveHandler}
                key={index}
                style={{ color: !props.darkMode && "white" }}
              >
                <div className={classes.result2}>
                  <span
                    onClick={(e) => {
                      selectHandler(e, data.memoryData);
                    }}
                    className={classes.data}
                  >
                    {data.memoryData}{" "}
                  </span>
                  {mouseOver && (
                    <div className={classes["button-pos"]}>
                      <Button
                        onClick={deleteHandler}
                        className={
                          props.darkMode
                            ? classes["m-btn"]
                            : classes["m-btn-dark"]
                        }
                      >
                        MC
                      </Button>
                      <Button
                        onClick={addDataHandler}
                        className={
                          props.darkMode
                            ? classes["m-btn"]
                            : classes["m-btn-dark"]
                        }
                      >
                        M+
                      </Button>
                      <Button
                        onClick={subtractDataHandler}
                        className={
                          props.darkMode
                            ? classes["m-btn"]
                            : classes["m-btn-dark"]
                        }
                      >
                        M-
                      </Button>
                    </div>
                  )}{" "}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div>
        <Button className={classes.button} onClick={deleteHandler}>
          <DeleteIcon
            fontSize="small"
            sx={{ color: !props.darkMode ? "white" : "black" }}
          />
        </Button>
      </div>
    </div>
  );
};

export default History;
