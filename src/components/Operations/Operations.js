import { useState } from "react";
import Buttons from "../Buttons/Buttons";
import classes from "./Operations.module.css";
import Button from "../Ui/Button";
import Calculator from "../../calculator.png";
import NightlightRoundIcon from "@mui/icons-material/NightlightRound";
import HistoryIcon from "@mui/icons-material/History";
import History from "../History/History";

const initialData = "0";
const initialState = {
  firstNumber: "",
  secondNumber: "",
  operator: "",
  submit: "",
};

const initialMod = {
  darkMode: true,
  historyTab: false,
  inputChange: true,
  dataSwitch: { firstSwitch: true, secondSwitch: true },
  deleteDigit: "",
  negate: true,
};
const formatter = new Intl.NumberFormat({
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const Operations = () => {
  const [dataHistory, setDataHistory] = useState([]);
  const [input, setInput] = useState(initialData);
  const [firstNumber, setFirstNumber] = useState();
  const [secondNumber, setSecondNumber] = useState();
  const [result, setResult] = useState(initialState);
  const [operator, setOperator] = useState();
  const [allMods, setAllMods] = useState(initialMod);

  console.log(allMods.negate);

  const numberHandler = (number) => {
    if (input.length === 14) {
      alert("You can't type more then 17's digits");
      return;
    }

    if (result.submit === "=") {
      setInput("");
      setResult(initialState);
      setFirstNumber();
      setSecondNumber();
      setOperator();
      setAllMods((prevState) => {
        return {
          ...prevState,
          negate: true,
          deleteDigit: "",
          dataSwitch: { firstSwitch: true, secondSwitch: true },
        };
      });
    }

    if (allMods.deleteDigit === true) {
      setInput();
      setFirstNumber();
      setResult(initialState);
      setAllMods((prevState) => {
        return {
          ...prevState,
          dataSwitch: { firstSwitch: true, secondSwitch: true },
          deleteDigit: "",
        };
      });
    } else if (allMods.deleteDigit === false) {
      setInput();
      setSecondNumber();
      setResult((prevState) => {
        return { ...prevState, secondNumber: "" };
      });
      setAllMods((prevState) => {
        return {
          ...prevState,
          deleteDigit: "",
          dataSwitch: {
            firstSwitch: prevState.dataSwitch.firstSwitch,
            secondSwitch: true,
          },
        };
      });
    }

    if (allMods.inputChange) {
      setInput((prevNum) => {
        if (prevNum === "0") {
          return number;
        } else {
          return prevNum + number;
        }
      });
    } else {
      if (input === number) {
        setInput(number);
        setAllMods((prevState) => {
          return { ...prevState, negate: true, inputChange: true };
        });
      } else {
        setInput(number);
        setAllMods((prevState) => {
          return { ...prevState, negate: true, inputChange: true };
        });
      }
    }
  };
  const calculateHandler = (o) => {
    switch (o) {
      case "CE":
        if (result.submit === "=") {
          setResult(initialState);
          setFirstNumber();
          setSecondNumber();
          setOperator();
          setInput(initialData);
          setAllMods((prevState) => {
            return {
              ...prevState,
              negate: true,
              deleteDigit: "",
              dataSwitch: { firstSwitch: true, secondSwitch: true },
            };
          });
        } else {
          setInput(initialData);
          setAllMods((prevState) => {
            return { ...prevState, negate: true };
          });
          if (allMods.deleteDigit === true) {
            setInput(initialData);
            setFirstNumber();
            setResult(initialState);
            setAllMods((prevState) => {
              return {
                ...prevState,
                negate: true,
                deleteDigit: "",
                dataSwitch: { firstSwitch: true, secondSwitch: true },
              };
            });
          } else if (allMods.deleteDigit === false) {
            setInput(initialData);
            setSecondNumber();
            setResult((prevState) => {
              return { ...prevState, secondNumber: "" };
            });
            setAllMods((prevState) => {
              return {
                ...prevState,
                deleteDigit: "",
                negate: true,
                dataSwitch: {
                  firstSwitch: prevState.dataSwitch.firstSwitch,
                  secondSwitch: true,
                },
              };
            });
          }
        }

        break;
      case "C":
        setFirstNumber();
        setSecondNumber();
        setOperator();
        setResult(initialState);
        setInput(initialData);
        setAllMods((prevState) => {
          return {
            ...prevState,
            negate: true,
            deleteDigit: "",
            dataSwitch: { firstSwitch: true, secondSwitch: true },
          };
        });
        break;
      case "%":
        if (operator === undefined) {
          setInput("0");
          setFirstNumber(input);
          setAllMods((prevState) => {
            return {
              ...prevState,
              inputChange: false,
              deleteDigit: true,
              dataSwitch: {
                firstSwitch: false,
                secondSwitch: true,
              },
            };
          });
          setResult((prevState) => {
            return { ...prevState, firstNumber: "0" };
          });
        } else {
          setInput(String((firstNumber * input) / 100));
          setSecondNumber(String((firstNumber * input) / 100));
          setAllMods((prevState) => {
            return {
              ...prevState,
              inputChange: false,
              deleteDigit: false,
              dataSwitch: {
                firstSwitch: false,
                secondSwitch: false,
              },
            };
          });
          setResult((prevState) => {
            return { ...prevState, secondNumber: (firstNumber * input) / 100 };
          });
        }
        break;
      case "1/x":
        if (operator === undefined) {
          setInput(String(1 / input));
          setFirstNumber(String(1 / input));
          setAllMods((prevState) => {
            return {
              ...prevState,
              inputChange: false,
              deleteDigit: true,
              dataSwitch: {
                firstSwitch: false,
                secondSwitch: true,
              },
            };
          });
          setResult((prevState) => {
            return { ...prevState, firstNumber: `1/(${input})` };
          });
        } else {
          setInput(String(1 / input));
          setSecondNumber(String(1 / input));
          setAllMods((prevState) => {
            return {
              ...prevState,
              inputChange: false,
              deleteDigit: false,
              dataSwitch: {
                firstSwitch: false,
                secondSwitch: false,
              },
            };
          });
          setResult((prevState) => {
            return { ...prevState, secondNumber: `1/(${input})` };
          });
        }
        break;
      case "x^2":
        if (operator === undefined) {
          setInput(String(Math.pow(input, 2)));
          setFirstNumber(String(Math.pow(input, 2)));
          setAllMods((prevState) => {
            return {
              ...prevState,
              inputChange: false,
              deleteDigit: true,
              dataSwitch: {
                firstSwitch: false,
                secondSwitch: true,
              },
            };
          });
          setResult((prevState) => {
            return { ...prevState, firstNumber: `sqr(${input})` };
          });
        } else {
          setInput(String(Math.pow(input, 2)));
          setSecondNumber(String(Math.pow(input, 2)));
          setAllMods((prevState) => {
            return {
              ...prevState,
              inputChange: false,
              deleteDigit: false,
              dataSwitch: {
                firstSwitch: false,
                secondSwitch: false,
              },
            };
          });
          setResult((prevState) => {
            return { ...prevState, secondNumber: `sqr(${input})` };
          });
        }
        break;
      case "√x":
        if (operator === undefined) {
          setInput(String(Math.sqrt(input)));
          setFirstNumber(String(Math.sqrt(input)));
          setResult((prevState) => {
            return { ...prevState, firstNumber: `√(${input})` };
          });
          setAllMods((prevState) => {
            return {
              ...prevState,
              inputChange: false,
              deleteDigit: true,
              dataSwitch: {
                firstSwitch: false,
                secondSwitch: true,
              },
            };
          });
        } else {
          setInput(String(Math.sqrt(input)));
          setSecondNumber(String(Math.sqrt(input)));
          setResult((prevState) => {
            return { ...prevState, secondNumber: `√(${input})` };
          });
          setAllMods((prevState) => {
            return {
              ...prevState,
              inputChange: false,
              deleteDigit: false,
              dataSwitch: {
                firstSwitch: false,
                secondSwitch: false,
              },
            };
          });
        }
        break;
      case "÷":
        setFirstNumber(+input);
        if (result.firstNumber === "") {
          setResult((prevState) => {
            return { ...prevState, firstNumber: input, operator: o };
          });
        } else {
          setResult((prevState) => {
            return { ...prevState, operator: o };
          });
        }
        setOperator(o);
        setAllMods((prevState) => {
          return { ...prevState, deleteDigit: "", inputChange: false };
        });

        break;
      case "×":
        setFirstNumber(+input);
        if (result.firstNumber === "") {
          setResult((prevState) => {
            return { ...prevState, firstNumber: input, operator: o };
          });
        } else {
          setResult((prevState) => {
            return { ...prevState, operator: o };
          });
        }
        setOperator(o);
        setAllMods((prevState) => {
          return { ...prevState, deleteDigit: "", inputChange: false };
        });

        break;
      case "-":
        setFirstNumber(+input);
        if (result.firstNumber === "") {
          setResult((prevState) => {
            return { ...prevState, firstNumber: input, operator: o };
          });
        } else {
          setResult((prevState) => {
            return { ...prevState, operator: o };
          });
        }
        setOperator(o);
        setAllMods((prevState) => {
          return { ...prevState, deleteDigit: "", inputChange: false };
        });

        break;
      case "+":
        setFirstNumber(+input);
        if (result.firstNumber === "") {
          setResult((prevState) => {
            return { ...prevState, firstNumber: input, operator: o };
          });
        } else {
          setResult((prevState) => {
            return { ...prevState, operator: o };
          });
        }
        setOperator(o);
        setAllMods((prevState) => {
          return { ...prevState, deleteDigit: "", inputChange: false };
        });

        break;
      case "=":
        break;
    }
  };

  const submitHandler = () => {
    if (operator === "÷") {
      setInput(String(firstNumber / input));
      {
        allMods.dataSwitch.firstSwitch
          ? setResult((prevState) => {
              return { ...prevState, secondNumber: input, submit: "=" };
            })
          : setResult((prevState) => {
              return {
                ...prevState,
                secondNumber: `${
                  allMods.dataSwitch.secondSwitch
                    ? input
                    : prevState.secondNumber
                }`,
                submit: "=",
              };
            });
      }
      setDataHistory((prevState) => [
        {
          firstNumber: `${
            allMods.dataSwitch.firstSwitch ? firstNumber : result.firstNumber
          }`,
          operator: operator,
          secondNumber: `${
            allMods.dataSwitch.secondSwitch ? input : result.secondNumber
          }`,
          submit: "=",
          result: firstNumber / +input,
        },
        ...prevState,
      ]);
    } else if (operator === "×") {
      setInput(String(firstNumber * input));
      {
        allMods.dataSwitch.firstSwitch
          ? setResult((prevState) => {
              return { ...prevState, secondNumber: input, submit: "=" };
            })
          : setResult((prevState) => {
              return {
                ...prevState,
                secondNumber: `${
                  allMods.dataSwitch.secondSwitch
                    ? input
                    : prevState.secondNumber
                }`,
                submit: "=",
              };
            });
      }
      setDataHistory((prevState) => [
        {
          firstNumber: `${
            allMods.dataSwitch.firstSwitch ? firstNumber : result.firstNumber
          }`,
          operator: operator,
          secondNumber: `${
            allMods.dataSwitch.secondSwitch ? input : result.secondNumber
          }`,
          submit: "=",
          result: firstNumber * +input,
        },
        ...prevState,
      ]);
    } else if (operator === "-") {
      setInput(String(firstNumber - +input));
      {
        allMods.dataSwitch.firstSwitch
          ? setResult((prevState) => {
              return { ...prevState, secondNumber: input, submit: "=" };
            })
          : setResult((prevState) => {
              return {
                ...prevState,
                secondNumber: `${
                  allMods.dataSwitch.secondSwitch
                    ? input
                    : prevState.secondNumber
                }`,
                submit: "=",
              };
            });
      }
      setDataHistory((prevState) => [
        {
          firstNumber: `${
            allMods.dataSwitch.firstSwitch ? firstNumber : result.firstNumber
          }`,
          operator: operator,
          secondNumber: `${
            allMods.dataSwitch.secondSwitch ? input : result.secondNumber
          }`,
          submit: "=",
          result: firstNumber - +input,
        },
        ...prevState,
      ]);
    } else if (operator === "+") {
      setInput(String(firstNumber + +input));
      {
        allMods.dataSwitch.firstSwitch
          ? setResult((prevState) => {
              return { ...prevState, secondNumber: input, submit: "=" };
            })
          : setResult((prevState) => {
              return {
                ...prevState,
                secondNumber: `${
                  allMods.dataSwitch.secondSwitch
                    ? input
                    : prevState.secondNumber
                }`,
                submit: "=",
              };
            });
      }
      setDataHistory((prevState) => [
        {
          firstNumber: `${
            allMods.dataSwitch.firstSwitch ? firstNumber : result.firstNumber
          }`,
          operator: operator,
          secondNumber: `${
            allMods.dataSwitch.secondSwitch ? input : result.secondNumber
          }`,
          submit: "=",
          result: firstNumber + +input,
        },
        ...prevState,
      ]);
    }
  };

  const negativeHandler = (t) => {
    if (input === "0") {
      return;
    }
    setAllMods((prevState) => {
      return { ...prevState, negate: !prevState.negate };
    });
    if (allMods.negate === true) {
      setInput(String(-Math.abs(input)));
    } else {
      setInput(String(Math.abs(input)));
    }
  };
  const deleteHandler = () => {
    if (allMods.negate === false) {
      if (input.length === 2) {
        setInput((prevState) => prevState.substring(0, prevState.length - 2));
        setAllMods((prevState) => {
          return { ...prevState, negate: true };
        });
      }
    }
    if (result.submit === "=") {
      return;
    } else if (allMods.deleteDigit === true || allMods.deleteDigit === false) {
      return;
    }
    setInput((prevState) => prevState.substring(0, prevState.length - 1));
  };

  const darkModeHandler = (e) => {
    e.preventDefault();
    setAllMods((prevState) => {
      return { ...prevState, darkMode: !prevState.darkMode };
    });
  };

  const resetHandler = (e, index, data) => {
    e.preventDefault();
    if (index === undefined) {
      setAllMods((prevState) => {
        return { ...prevState, historyTab: false };
      });
    } else if (index === false) {
      setResult(data);
      setInput(String(data.result));
      setAllMods((prevState) => {
        return { ...prevState, historyTab: index };
      });
    }
  };

  if (input.length === 0) {
    setInput("0");
  }

  const historyHandler = (e) => {
    e.preventDefault();
    setAllMods((prevState) => {
      return { ...prevState, historyTab: true };
    });
  };

  let size = "";

  if (input.length <= 10) {
    size = "45px";
  } else {
    size = "35px";
  }

  return (
    <form
      style={{
        background: !allMods.darkMode ? "rgba(0, 0, 0, 0.650)" : "#dbdbdb",
      }}
    >
      <div>
        {allMods.historyTab && (
          <div className={classes.backdrop} onClick={resetHandler} />
        )}
        <div
          className={classes.title}
          style={{ color: !allMods.darkMode ? "white" : "black" }}
        >
          <img src={Calculator} alt="calculator logo" />
          Calculator
        </div>
        <div className={classes["button-flex"]}>
          <Button className={classes.button} onClick={darkModeHandler}>
            <NightlightRoundIcon
              fontSize="small"
              sx={{ color: !allMods.darkMode ? "white" : "black" }}
            />
          </Button>
          <Button className={classes.button} onClick={historyHandler}>
            <HistoryIcon
              fontSize="small"
              sx={{ color: !allMods.darkMode ? "white" : "black" }}
            />
          </Button>
        </div>
        <div className={classes.text}>
          <h3 className={`${!allMods.darkMode && classes["h3-dark"]}`}>
            {result.firstNumber} {result.operator} {result.secondNumber}{" "}
            {result.submit}
          </h3>
          <h1
            className={`${!allMods.darkMode && classes["h1-dark"]}`}
            style={{ fontSize: size }}
          >
            {formatter.format(input)}
          </h1>
        </div>
      </div>
      <div className={classes.box}>
        {allMods.historyTab ? (
          <History
            darkMode={allMods.darkMode}
            onSelect={resetHandler}
            onData={dataHistory}
            onDelete={setDataHistory}
          />
        ) : (
          <Buttons
            toggle={allMods.darkMode}
            onNumber={numberHandler}
            onCalculate={calculateHandler}
            onDelete={deleteHandler}
            onNegative={negativeHandler}
            onSubmit={submitHandler}
          />
        )}
      </div>
    </form>
  );
};

export default Operations;
