// Import package
import React, { useState } from "react";
import { Box } from "native-base";

// Import components
import Display from "../components/Display";
import Buttons from "../components/Buttons";

export default function Calculator() {
  const [firstNumber, setFirstNumber] = useState("");
  const [operator, setOperator] = useState("");
  const [secondNumber, setSecondNumber] = useState("");
  const [result, setResult] = useState("");
  const [displayFirstNumber, setDisplayFirstNumber] = useState(null);
  const [displayOperator, setDisplayOperator] = useState(null);
  const [displaySecondNumber, setDisplaySecondNumber] = useState(null);

  return (
    <Box bg="#22252D" flex={1} justifyContent="center" alignItems="center">
      <Box>
        <Display firstNumber={displayFirstNumber} operator={displayOperator} secondNumber={displaySecondNumber} result={result} />
        <Buttons
          firstNumber={firstNumber}
          setFirstNumber={setFirstNumber}
          operator={operator}
          setOperator={setOperator}
          secondNumber={secondNumber}
          setSecondNumber={setSecondNumber}
          result={result}
          setResult={setResult}
          setDisplayFirstNumber={setDisplayFirstNumber}
          setDisplayOperator={setDisplayOperator}
          setDisplaySecondNumber={setDisplaySecondNumber}
        />
      </Box>
    </Box>
  );
}
