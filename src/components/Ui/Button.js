import classes from "./Button.module.css";
const Button = (props) => {
  return (
    <button
      className={`${classes["btn"]} ${!props.darkMod && classes["btn-dark"]} ${props.className}`}
      onClick={props.onClick}
      type={props.type}
    >
      {props.children}
    </button>
  );
};

export default Button;
