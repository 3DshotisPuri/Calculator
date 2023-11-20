import { useState } from "react";
import Buttons from "../Buttons/Buttons";
import classes from "./Operations.module.css";
import Button from "../Ui/Button";
import MemoryButtons from "../Buttons/MemoryButtons";
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
  switchInput: false,
  resetNagate: true,
  switchTab: "",
};

const Operations = () => {
  const [dataHistory, setDataHistory] = useState([]);
  const [memoryHistory, setMemoryHistory] = useState([]);
  const [input, setInput] = useState(initialData);
  const [firstNumber, setFirstNumber] = useState();
  const [secondNumber, setSecondNumber] = useState(initialData);
  const [result, setResult] = useState(initialState);
  const [operator, setOperator] = useState();
  const [allMods, setAllMods] = useState(initialMod);
  const [memoryButtons, setMemoryButtons] = useState(false);
  const [handler, setHandler] = useState(true);

  const numberHandler = (number) => {
    if (input.length === 20) {
      alert("You can't type more then 20's digits");
      return;
    }

    if (result.submit === "=" || allMods.resetNagate === false) {
      setInput("");
      setResult(initialState);
      setFirstNumber();
      setSecondNumber();
      setOperator();
      setAllMods((prevState) => {
        return {
          ...prevState,
          resetNagate: true,
          switchInput: false,
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
      setSecondNumber((prevState) => {
        if (prevState === "0") {
          return number;
        } else if (prevState === firstNumber) {
          return +number;
        } else {
          return prevState + number;
        }
      });
    } else {
      if (input === number) {
        setInput(number);
        setSecondNumber(number);
        setAllMods((prevState) => {
          return { ...prevState, inputChange: true };
        });
      } else {
        setInput(number);
        setSecondNumber(number);
        setAllMods((prevState) => {
          return { ...prevState, inputChange: true };
        });
      }
    }
  };

  const calculateHandler = (o) => {
    switch (o) {
      case "MC":
        setMemoryHistory([]);
        setMemoryButtons(false);
        setInput(input);
        setAllMods((prevState) => {
          return {
            ...prevState,
            inputChange: false,
            resetNagate: true,
            switchInput: false,
            negate: true,
            deleteDigit: "",
            dataSwitch: { firstSwitch: true, secondSwitch: true },
          };
        });
        if (result.submit === "=") {
          setInput(input);
          setResult(initialState);
          setFirstNumber();
          setSecondNumber();
          setOperator();
          setAllMods((prevState) => {
            return {
              ...prevState,
              inputChange: false,
              resetNagate: true,
              switchInput: false,
              negate: true,
              deleteDigit: "",
              dataSwitch: { firstSwitch: true, secondSwitch: true },
            };
          });
        }
        break;
      case "MR":
        setInput(String(memoryHistory[0].memoryData));
        setAllMods((prevState) => {
          return {
            ...prevState,
            inputChange: false,
            resetNagate: true,
            switchInput: false,
            negate: true,
            deleteDigit: "",
            dataSwitch: { firstSwitch: true, secondSwitch: true },
          };
        });
        if (result.submit === "=") {
          setInput(String(memoryHistory[0].memoryData));
          setSecondNumber(String(memoryHistory[0].memoryData));
          setFirstNumber(String(memoryHistory[0].memoryData));
          setOperator();
          setResult(initialState);
          setAllMods((prevState) => {
            return {
              ...prevState,
              inputChange: false,
              resetNagate: true,
              switchInput: false,
              negate: true,
              deleteDigit: "",
              dataSwitch: { firstSwitch: true, secondSwitch: true },
            };
          });
        } else if (operator === undefined) {
          setInput(String(memoryHistory[0].memoryData));
          setResult(initialState);
          setAllMods((prevState) => {
            return {
              ...prevState,
              inputChange: false,
              resetNagate: true,
              switchInput: false,
              negate: true,
              deleteDigit: "",
              dataSwitch: { firstSwitch: true, secondSwitch: true },
            };
          });
        } else if (operator !== "") {
          setSecondNumber(String(memoryHistory[0].memoryData));
          setAllMods((prevState) => {
            return { ...prevState, inputChange: false };
          });
        }
        break;
      case "M+":
        setInput(input);
        if (memoryHistory.length === 0) {
          setMemoryHistory([{ memoryData: +input }]);
        } else if (memoryHistory.length === 1) {
          setMemoryHistory((prevState) => {
            return [{ memoryData: +input + +prevState[0].memoryData }];
          });
        }
        setMemoryButtons(true);
        setAllMods((prevState) => {
          return {
            ...prevState,
            inputChange: false,
            resetNagate: true,
            switchInput: false,
            negate: true,
            deleteDigit: "",
            dataSwitch: { firstSwitch: true, secondSwitch: true },
          };
        });
        if (result.submit === "=") {
          setInput(input);
          setResult(initialState);
          setFirstNumber();
          setSecondNumber();
          setOperator();
          setAllMods((prevState) => {
            return {
              ...prevState,
              inputChange: false,
              switchInput: false,
              negate: true,
              deleteDigit: "",
              dataSwitch: { firstSwitch: true, secondSwitch: true },
            };
          });
        }
        break;
      case "M-":
        setInput(input);
        if (memoryHistory.length === 0) {
          setMemoryHistory([{ memoryData: +input }]);
        } else if (memoryHistory.length === 1) {
          setMemoryHistory((prevState) => {
            return [{ memoryData: +prevState[0].memoryData - +input }];
          });
        }
        setMemoryButtons(true);
        setAllMods((prevState) => {
          return {
            ...prevState,
            inputChange: false,
            resetNagate: true,
            switchInput: false,
            negate: true,
            deleteDigit: "",
            dataSwitch: { firstSwitch: true, secondSwitch: true },
          };
        });
        if (result.submit === "=") {
          setInput(input);
          setResult(initialState);
          setFirstNumber();
          setSecondNumber();
          setOperator();
          setAllMods((prevState) => {
            return {
              ...prevState,
              inputChange: false,
              resetNagate: true,
              switchInput: false,
              negate: true,
              deleteDigit: "",
              dataSwitch: { firstSwitch: true, secondSwitch: true },
            };
          });
        }
        break;
      case "MS":
        setInput(input);
        setMemoryHistory([{ memoryData: input }]);
        setMemoryButtons(true);
        setAllMods((prevState) => {
          return {
            ...prevState,
            inputChange: false,
            resetNagate: true,
            switchInput: false,
            negate: true,
            deleteDigit: "",
            dataSwitch: { firstSwitch: true, secondSwitch: true },
          };
        });
        if (result.submit === "=") {
          setInput(input);
          setResult(initialState);
          setFirstNumber();
          setSecondNumber();
          setOperator();
          setAllMods((prevState) => {
            return {
              ...prevState,
              inputChange: false,
              resetNagate: true,
              switchInput: false,
              negate: true,
              deleteDigit: "",
              dataSwitch: { firstSwitch: true, secondSwitch: true },
            };
          });
        }
        break;
      case "M":
        setAllMods((prevState) => {
          return { ...prevState, historyTab: true, switchTab: false };
        });
        break;
      case "CE":
        if (result.submit === "=") {
          setResult(initialState);
          setFirstNumber();
          setSecondNumber(initialData);
          setOperator();
          setInput(initialData);
          setAllMods((prevState) => {
            return {
              ...prevState,
              switchInput: false,
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
          if (allMods.switchInput) {
            setSecondNumber(initialData);
          }
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
            setSecondNumber(initialData);
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
        setSecondNumber(initialData);
        setOperator();
        setResult(initialState);
        setInput(initialData);
        setAllMods((prevState) => {
          return {
            ...prevState,
            resetNagate: true,
            switchInput: false,
            negate: true,
            deleteDigit: "",
            dataSwitch: { firstSwitch: true, secondSwitch: true },
          };
        });
        break;
      case "%":
        if (result.submit === "=") {
          setInput(initialData);
          setFirstNumber();
          setSecondNumber(initialData);
          setOperator();
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

          setResult(initialState);
        } else if (operator === undefined) {
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
          if (operator === "-" || operator === "+") {
            setInput(String((firstNumber * secondNumber) / 100));
            setSecondNumber(String((firstNumber * secondNumber) / 100));
            setAllMods((prevState) => {
              return {
                ...prevState,
                inputChange: false,
                switchInput: true,
                deleteDigit: false,
                dataSwitch: {
                  firstSwitch: false,
                  secondSwitch: false,
                },
              };
            });

            setResult((prevState) => {
              return {
                ...prevState,
                secondNumber: (firstNumber * secondNumber) / 100,
              };
            });
          } else {
            setInput(String(input / 100));
            setSecondNumber(String(input / 100));
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
              return {
                ...prevState,
                secondNumber: input / 100,
              };
            });
          }
        }
        break;
      case "1/x":
        if (result.submit === "=") {
          if (input === "0") {
            alert("can't divide by zero");
            return;
          }
          setInput(String(1 / input));
          setFirstNumber(String(1 / input));
          setOperator();
          setAllMods((prevState) => {
            return {
              ...prevState,
              switchInput: false,
              inputChange: false,
              deleteDigit: true,
              dataSwitch: {
                firstSwitch: false,
                secondSwitch: true,
              },
            };
          });
          setResult({
            firstNumber: `1/(${input})`,
            secondNumber: "",
            operator: "",
            submit: "",
          });
        } else if (input === "0") {
          alert("can't divide by zero");
          return;
        } else if (operator === undefined) {
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
        if (result.submit === "=") {
          setInput(String(Math.pow(input, 2)));
          setFirstNumber(String(Math.pow(input, 2)));
          setOperator();
          setAllMods((prevState) => {
            return {
              ...prevState,
              switchInput: false,
              inputChange: false,
              deleteDigit: true,
              dataSwitch: {
                firstSwitch: false,
                secondSwitch: true,
              },
            };
          });
          setResult({
            firstNumber: `sqr(${input})`,
            secondNumber: "",
            operator: "",
            submit: "",
          });
        } else if (operator === undefined) {
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
        if (result.submit === "=") {
          setInput(String(Math.sqrt(input)));
          setFirstNumber(String(Math.sqrt(input)));
          setOperator();
          setResult({
            firstNumber: `√(${input})`,
            secondNumber: "",
            operator: "",
            submit: "",
          });
          setAllMods((prevState) => {
            return {
              ...prevState,
              switchInput: false,
              inputChange: false,
              deleteDigit: true,
              dataSwitch: {
                firstSwitch: false,
                secondSwitch: true,
              },
            };
          });
        } else if (operator === undefined) {
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
        if (handler === true) {
          submitHandler();
        }
        if (!allMods.switchInput) {
          setSecondNumber(+input);
          setAllMods((prevState) => {
            return { ...prevState, switchInput: true };
          });
        }
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
        if (handler === true) {
          submitHandler();
        }
        if (!allMods.switchInput) {
          setSecondNumber(+input);
          setAllMods((prevState) => {
            return { ...prevState, switchInput: true };
          });
        }
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
        if (handler === true) {
          submitHandler();
        }
        if (!allMods.switchInput) {
          setSecondNumber(+input);
          setAllMods((prevState) => {
            return { ...prevState, switchInput: true };
          });
        }
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
        if (handler === true) {
          submitHandler();
        }
        if (!allMods.switchInput) {
          setSecondNumber(+input);
          setAllMods((prevState) => {
            return { ...prevState, switchInput: true };
          });
        }
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
          return {
            ...prevState,
            deleteDigit: "",
            resetNagate: true,
            inputChange: false,
          };
        });
        break;
      case "=":
        if (operator === "÷") {
          if (secondNumber === "0") {
            alert("can't divide by zero");
            return;
          }
          if (result.submit === "=") {
            setInput((prevState) => String(prevState / secondNumber));
            setFirstNumber(input);
            setResult((prevState) => {
              return {
                firstNumber: input,
                secondNumber: prevState.secondNumber,
                operator: prevState.operator,
                submit: "=",
              };
            });
            setDataHistory((prevState) => [
              {
                firstNumber: firstNumber,
                operator: operator,
                secondNumber: secondNumber,
                submit: "=",
                result: firstNumber / secondNumber,
              },
              ...prevState,
            ]);
          } else {
            setInput(String(firstNumber / secondNumber));
            {
              allMods.dataSwitch.firstSwitch
                ? setResult((prevState) => {
                    return {
                      ...prevState,
                      secondNumber: secondNumber,
                      submit: "=",
                    };
                  })
                : setResult((prevState) => {
                    return {
                      ...prevState,
                      secondNumber: `${
                        allMods.dataSwitch.secondSwitch
                          ? secondNumber
                          : prevState.secondNumber
                      }`,
                      submit: "=",
                    };
                  });
            }
            setDataHistory((prevState) => [
              {
                firstNumber: `${
                  allMods.dataSwitch.firstSwitch
                    ? firstNumber
                    : result.firstNumber
                }`,
                operator: operator,
                secondNumber: `${
                  allMods.dataSwitch.secondSwitch
                    ? secondNumber
                    : result.secondNumber
                }`,
                submit: "=",
                result: firstNumber / +secondNumber,
              },
              ...prevState,
            ]);
          }
        } else if (operator === "×") {
          if (result.submit === "=") {
            setInput((prevState) => String(prevState * secondNumber));
            setFirstNumber(input);
            setResult((prevState) => {
              return {
                firstNumber: input,
                secondNumber: prevState.secondNumber,
                operator: prevState.operator,
                submit: "=",
              };
            });
            setDataHistory((prevState) => [
              {
                firstNumber: firstNumber,
                operator: operator,
                secondNumber: secondNumber,
                submit: "=",
                result: firstNumber * secondNumber,
              },
              ...prevState,
            ]);
          } else {
            setInput(String(firstNumber * secondNumber));
            {
              allMods.dataSwitch.firstSwitch
                ? setResult((prevState) => {
                    return {
                      ...prevState,
                      secondNumber: secondNumber,
                      submit: "=",
                    };
                  })
                : setResult((prevState) => {
                    return {
                      ...prevState,
                      secondNumber: `${
                        allMods.dataSwitch.secondSwitch
                          ? secondNumber
                          : prevState.secondNumber
                      }`,
                      submit: "=",
                    };
                  });
            }
            setDataHistory((prevState) => [
              {
                firstNumber: `${
                  allMods.dataSwitch.firstSwitch
                    ? firstNumber
                    : result.firstNumber
                }`,
                operator: operator,
                secondNumber: `${
                  allMods.dataSwitch.secondSwitch
                    ? secondNumber
                    : result.secondNumber
                }`,
                submit: "=",
                result: firstNumber * +secondNumber,
              },
              ...prevState,
            ]);
          }
        } else if (operator === "-") {
          if (result.submit === "=") {
            setInput((prevState) => String(+prevState - +secondNumber));
            setFirstNumber(input);
            setResult((prevState) => {
              return {
                firstNumber: input,
                secondNumber: prevState.secondNumber,
                operator: prevState.operator,
                submit: "=",
              };
            });
            setDataHistory((prevState) => [
              {
                firstNumber: firstNumber,
                operator: operator,
                secondNumber: secondNumber,
                submit: "=",
                result: +firstNumber - +secondNumber,
              },
              ...prevState,
            ]);
          } else {
            setInput(String(firstNumber - +secondNumber));
            {
              allMods.dataSwitch.firstSwitch
                ? setResult((prevState) => {
                    return {
                      ...prevState,
                      secondNumber: secondNumber,
                      submit: "=",
                    };
                  })
                : setResult((prevState) => {
                    return {
                      ...prevState,
                      secondNumber: `${
                        allMods.dataSwitch.secondSwitch
                          ? secondNumber
                          : prevState.secondNumber
                      }`,
                      submit: "=",
                    };
                  });
            }
            setDataHistory((prevState) => [
              {
                firstNumber: `${
                  allMods.dataSwitch.firstSwitch
                    ? firstNumber
                    : result.firstNumber
                }`,
                operator: operator,
                secondNumber: `${
                  allMods.dataSwitch.secondSwitch
                    ? secondNumber
                    : result.secondNumber
                }`,
                submit: "=",
                result: firstNumber - +secondNumber,
              },
              ...prevState,
            ]);
          }
        } else if (operator === "+") {
          if (result.submit === "=") {
            setInput((prevState) => String(+prevState + +secondNumber));
            setFirstNumber(input);
            setResult((prevState) => {
              return {
                firstNumber: input,
                secondNumber: prevState.secondNumber,
                operator: prevState.operator,
                submit: "=",
              };
            });
            setDataHistory((prevState) => [
              {
                firstNumber: firstNumber,
                operator: operator,
                secondNumber: secondNumber,
                submit: "=",
                result: +firstNumber + +secondNumber,
              },
              ...prevState,
            ]);
          } else {
            setInput(String(+firstNumber + +secondNumber));
            {
              allMods.dataSwitch.firstSwitch
                ? setResult((prevState) => {
                    return {
                      ...prevState,
                      secondNumber: secondNumber,
                      submit: "=",
                    };
                  })
                : setResult((prevState) => {
                    return {
                      ...prevState,
                      secondNumber: `${
                        allMods.dataSwitch.secondSwitch
                          ? secondNumber
                          : prevState.secondNumber
                      }`,
                      submit: "=",
                    };
                  });
            }
            setDataHistory((prevState) => [
              {
                firstNumber: `${
                  allMods.dataSwitch.firstSwitch
                    ? firstNumber
                    : result.firstNumber
                }`,
                operator: operator,
                secondNumber: `${
                  allMods.dataSwitch.secondSwitch
                    ? secondNumber
                    : result.secondNumber
                }`,
                submit: "=",
                result: +firstNumber + +secondNumber,
              },
              ...prevState,
            ]);
          }
        }
        break;
    }
  };
  const submitHandler = () => {
    if (firstNumber == input) {
      return;
    }
    if (operator === "+") {
      return (
        setAllMods((prevState) => {
          return {
            ...prevState,
            resetNagate: true,
            switchInput: false,
            negate: true,
            deleteDigit: "",
            dataSwitch: { firstSwitch: true, secondSwitch: true },
          };
        }),
        setInput(String(+firstNumber + +secondNumber)),
        setFirstNumber(String(+firstNumber + +secondNumber)),
        setSecondNumber(String(+firstNumber + +secondNumber)),
        setResult({ firstNumber: String(+firstNumber + +secondNumber) }),
        setDataHistory((prevState) => [
          {
            firstNumber: `${
              allMods.dataSwitch.firstSwitch ? firstNumber : result.firstNumber
            }`,
            operator: operator,
            secondNumber: `${
              allMods.dataSwitch.secondSwitch
                ? secondNumber
                : result.secondNumber
            }`,
            submit: "=",
            result: +firstNumber + +secondNumber,
          },
          ...prevState,
        ])
      );
    } else if (operator === "-") {
      return (
        setInput(String(+firstNumber - +secondNumber)),
        setFirstNumber(String(+firstNumber - +secondNumber)),
        setSecondNumber(String(+firstNumber - +secondNumber)),
        setAllMods((prevState) => {
          return {
            ...prevState,
            resetNagate: true,
            switchInput: false,
            negate: true,
            deleteDigit: "",
            dataSwitch: { firstSwitch: true, secondSwitch: true },
          };
        }),
        setResult({ firstNumber: String(+firstNumber - +secondNumber) }),
        setDataHistory((prevState) => [
          {
            firstNumber: `${
              allMods.dataSwitch.firstSwitch ? firstNumber : result.firstNumber
            }`,
            operator: operator,
            secondNumber: `${
              allMods.dataSwitch.secondSwitch
                ? secondNumber
                : result.secondNumber
            }`,
            submit: "=",
            result: +firstNumber - +secondNumber,
          },
          ...prevState,
        ])
      );
    } else if (operator === "×") {
      return (
        setInput(String(+firstNumber * +secondNumber)),
        setFirstNumber(String(+firstNumber * +secondNumber)),
        setSecondNumber(String(+firstNumber * +secondNumber)),
        setAllMods((prevState) => {
          return {
            ...prevState,
            resetNagate: true,
            switchInput: false,
            negate: true,
            deleteDigit: "",
            dataSwitch: { firstSwitch: true, secondSwitch: true },
          };
        }),
        setResult({ firstNumber: String(+firstNumber * +secondNumber) }),
        setDataHistory((prevState) => [
          {
            firstNumber: `${
              allMods.dataSwitch.firstSwitch ? firstNumber : result.firstNumber
            }`,
            operator: operator,
            secondNumber: `${
              allMods.dataSwitch.secondSwitch
                ? secondNumber
                : result.secondNumber
            }`,
            submit: "=",
            result: +firstNumber * +secondNumber,
          },
          ...prevState,
        ])
      );
    } else if (operator === "÷") {
      return (
        setInput(String(+firstNumber / +secondNumber)),
        setFirstNumber(String(+firstNumber / +secondNumber)),
        setSecondNumber(String(+firstNumber / +secondNumber)),
        setAllMods((prevState) => {
          return {
            ...prevState,
            resetNagate: true,
            switchInput: false,
            negate: true,
            deleteDigit: "",
            dataSwitch: { firstSwitch: true, secondSwitch: true },
          };
        }),
        setResult({ firstNumber: String(+firstNumber / +secondNumber) }),
        setDataHistory((prevState) => [
          {
            firstNumber: `${
              allMods.dataSwitch.firstSwitch ? firstNumber : result.firstNumber
            }`,
            operator: operator,
            secondNumber: `${
              allMods.dataSwitch.secondSwitch
                ? secondNumber
                : result.secondNumber
            }`,
            submit: "=",
            result: +firstNumber / +secondNumber,
          },
          ...prevState,
        ])
      );
    }
  };

  const negativeHandler = (t) => {
    setAllMods((prevState) => {
      return {
        ...prevState,
        negate: !prevState.negate,
      };
    });
    if (input === initialData || secondNumber === initialData) {
      return;
    }

    if (result.submit === "=") {
      setInput(input);
      setResult({
        firstNumber: `negate(${input})`,
        secondNumber: "",
        operator: "",
        submit: "",
      });
      setFirstNumber(input);
      setSecondNumber(initialData);
      setOperator();
      setAllMods((prevState) => {
        return {
          ...prevState,
          resetNagate: false,
          switchInput: false,
          deleteDigit: "",
          dataSwitch: { firstSwitch: true, secondSwitch: true },
        };
      });
    }

    if (allMods.negate === true) {
      setInput(String(-Math.abs(input)));
      setSecondNumber(String(-Math.abs(input)));
    } else {
      setInput(String(Math.abs(input)));
      setSecondNumber(String(Math.abs(input)));
    }
  };

  if (input.length === 0 || secondNumber.length === 0) {
    setInput("0");
    setSecondNumber("0");
  }
  const deleteHandler = () => {
    if (allMods.negate === false) {
      if (firstNumber === secondNumber) {
        return;
      } else if (input.length === 2 || secondNumber.length === 2) {
        setInput((prevState) => prevState.substring(0, prevState.length - 2));
        setAllMods((prevState) => {
          return { ...prevState, negate: true };
        });
      }
    }

    if (result.submit === "=") {
      return;
    }
    if (secondNumber === initialData || secondNumber === firstNumber) {
      return;
    }
    setInput((prevState) => prevState.substring(0, prevState.length - 1));
    setSecondNumber((prevState) =>
      prevState.substring(0, prevState.length - 1)
    );
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
      if (allMods.switchTab === true) {
        setResult(data);
        setInput(String(data.result));
      } else if (allMods.switchTab === false) {
        if (result.submit === "=") {
          setResult(initialState);
          setInput(String(data));
        } else {
          setInput(String(data));
          setSecondNumber(+data);
        }
      }
      setAllMods((prevState) => {
        return { ...prevState, historyTab: index };
      });
    }
  };

  const dotHandler = (dot) => {
    if (result.submit === "=") {
      setInput(initialData + dot);
      setResult(initialState);
      setFirstNumber();
      setSecondNumber(initialData);
      setOperator();
      setAllMods((prevState) => {
        return {
          ...prevState,
          resetNagate: true,
          inputChange: true,
          switchInput: false,
          negate: true,
          deleteDigit: "",
          dataSwitch: { firstSwitch: true, secondSwitch: true },
        };
      });
    } else if (
      !allMods.dataSwitch.firstSwitch &&
      allMods.dataSwitch.secondSwitch &&
      operator !== undefined
    ) {
      if (firstNumber === secondNumber) {
        setInput("0" + dot);
        setSecondNumber("0" + dot);
      } else {
        setInput(input + dot);
        setSecondNumber(input + dot);
      }
      setResult({
        firstNumber: result.firstNumber,
        secondNumber: "",
        operator: operator,
        submit: "",
      });
      setAllMods((prevState) => {
        return {
          ...prevState,
          resetNagate: true,
          inputChange: true,
          switchInput: false,
          negate: true,
          deleteDigit: "",
          dataSwitch: { firstSwitch: false, secondSwitch: true },
        };
      });
    } else if (
      !allMods.dataSwitch.firstSwitch &&
      allMods.dataSwitch.secondSwitch
    ) {
      setInput("0" + dot);
      setResult(initialState);
      setAllMods((prevState) => {
        return {
          ...prevState,
          resetNagate: true,
          inputChange: true,
          switchInput: false,
          negate: true,
          deleteDigit: "",
          dataSwitch: { firstSwitch: true, secondSwitch: true },
        };
      });
    } else if (
      !allMods.dataSwitch.firstSwitch &&
      !allMods.dataSwitch.secondSwitch
    ) {
      setSecondNumber("0" + dot);
      setInput("0" + dot);
      setResult({
        firstNumber: firstNumber,
        secondNumber: "",
        operator: operator,
        submit: "",
      });
      setAllMods((prevState) => {
        return {
          ...prevState,
          resetNagate: true,
          inputChange: true,
          switchInput: false,
          negate: true,
          deleteDigit: "",
          dataSwitch: { firstSwitch: true, secondSwitch: true },
        };
      });
    } else if (firstNumber === secondNumber) {
      setSecondNumber("0" + dot);
      setInput("0" + dot);
      setAllMods((prevState) => {
        return {
          ...prevState,
          negate: true,
          switchInput: true,
          inputChange: true,
        };
      });
    } else if (allMods.resetNagate === false) {
      setSecondNumber(initialData);
      setInput("0" + dot);
      setResult(initialState);
      setAllMods((prevState) => {
        return {
          ...prevState,
          resetNagate: true,
          negate: true,
          inputChange: true,
        };
      });
    } else {
      if (input.includes(dot) || secondNumber.includes(dot)) {
        return;
      }
      setInput(input + dot);
      setSecondNumber(input + dot);
      setAllMods((prevState) => {
        return {
          ...prevState,
          inputChange: true,
        };
      });
    }
  };

  const historyHandler = (e) => {
    e.preventDefault();
    setAllMods((prevState) => {
      return { ...prevState, historyTab: true, switchTab: true };
    });
  };

  let size = "";

  if (input.length <= 10) {
    size = "60px";
  } else {
    size = "30px";
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
        </div>
        <div className={classes.text}>
          <h1
            className={`${!allMods.darkMode && classes["h1-dark"]}`}
            style={{ fontSize: size }}
          >
            {input}
          </h1>
        </div>
      </div>
      <div className={classes["M-buttons"]}>
        <MemoryButtons
          memoryDarkMode={allMods.darkMode}
          memoryButtonHandler={calculateHandler}
          memoryHandler={memoryButtons}
        />
      </div>
      <div className={classes.box}>
        {allMods.historyTab ? (
          <History
            darkMode={allMods.darkMode}
            onSelect={resetHandler}
            onData={dataHistory}
            onDelete={allMods.switchTab ? setDataHistory : setMemoryHistory}
            onMemory={memoryHistory}
            switchTab={allMods.switchTab}
            onInput={input}
            turnOfMemory={setMemoryButtons}
          />
        ) : (
          <Buttons
            toggle={allMods.darkMode}
            onNumber={numberHandler}
            onCalculate={calculateHandler}
            onDelete={deleteHandler}
            onDot={dotHandler}
            onNegative={negativeHandler}
          />
        )}
      </div>
    </form>
  );
};

export default Operations;
