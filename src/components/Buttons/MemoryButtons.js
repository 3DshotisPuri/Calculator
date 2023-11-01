import classes from "./MemoryButtons.module.css";
import Button from "../Ui/Button";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

const MemoryButtons = (props) => {
  return (
    <div className={classes["m-buttons"]}>
      <Button className={classes["m-btn"]}>MC</Button>
      <Button className={classes["m-btn"]}>MR</Button>
      <Button className={classes["m-btn"]}>M+</Button>
      <Button className={classes["m-btn"]}>M-</Button>
      <Button className={classes["m-btn"]}>MS</Button>
      <Button className={classes["m-btn"]}>
        <span className={classes.span}>
          M <KeyboardArrowDownIcon fontSize="small"/>
        </span>
      </Button>
    </div>
  );
};

export default MemoryButtons;
