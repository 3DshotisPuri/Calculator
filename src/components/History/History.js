import Button from "../Ui/Button";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import classes from "./History.module.css";

const History = (props) => {
  const [historyData, setHistoryData] = useState(props.onData);
  const deleteHandler = (e) => {
    e.preventDefault();
    setHistoryData([]);
    props.onDelete([]);
  };
  const selectHandler = (e, data) => {
    props.onSelect(e, false, data);
  };

  if (historyData.length === 0) {
    return (
      <div
        className={classes.conteiner}
        style={{ background: !props.darkMode && "rgba(255, 255, 255, 0.150)" }}
      >
        <h5 style={{ color: !props.darkMode && "white" }}>
          There's no history yet
        </h5>
      </div>
    );
  }
  return (
    <div
      className={classes.conteiner}
      style={{ background: !props.darkMode && "rgba(255, 255, 255, 0.150)"}}
    >
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
      <div className={classes["button-pos"]}>
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
