// Import package
import React from "react";
import { HStack, VStack, Box, Button, Text } from "native-base";

export default function Buttons(props) {
  // Inisiate property of props
  const { firstNumber, setFirstNumber, operator, setOperator, secondNumber, setSecondNumber, result, setResult, setDisplayFirstNumber, setDisplayOperator, setDisplaySecondNumber } = props;

  // Function to set number
  const setNumber = (number) => {
    if ((firstNumber === "" && result !== "") || (firstNumber === "" && result === 0)) {
      setDisplayOperator(null);
      setDisplaySecondNumber(null);
      setResult("");
    }

    if (operator === "") {
      setFirstNumber(firstNumber + number);
      setDisplayFirstNumber(firstNumber + number);
    } else {
      setSecondNumber(secondNumber + number);
      setDisplaySecondNumber(secondNumber + number);
    }
  };

  // Function to get operator
  const getOperator = (operator) => {
    if (firstNumber === "" && secondNumber === "") {
      setDisplayFirstNumber(null);
      setDisplayOperator(null);
      setDisplaySecondNumber(null);
      setResult("");
    } else {
      setDisplayOperator(operator);
      setOperator(operator);
    }
  };

  // Function to reset data
  const reset = () => {
    if (result === 0) {
      console.log(result);
      setFirstNumber("");
      setOperator("");
      setSecondNumber("");
    }
    setFirstNumber("");
    setOperator("");
    setSecondNumber("");
  };

  // Function to count result
  const count = (firstNumber, secondNumber, operator) => {
    if (firstNumber === "" && secondNumber === "") {
      setDisplayFirstNumber(null);
      setDisplayOperator(null);
      setDisplaySecondNumber(null);
      setResult("");
    } else if (firstNumber !== "" && operator === "") {
      return;
    } else if (firstNumber !== "" && operator !== "" && secondNumber === "") {
      return;
    } else {
      if (operator === "-") {
        setResult(parseInt(firstNumber) - parseInt(secondNumber));
        reset();
      } else if (operator === "+") {
        setResult(parseInt(firstNumber) + parseInt(secondNumber));
        reset();
      } else if (operator === "/") {
        setResult(parseInt(firstNumber) / parseInt(secondNumber));
        reset();
      } else if (operator === "*") {
        setResult(parseInt(firstNumber) * parseInt(secondNumber));
        reset();
      } else {
        setResult(parseInt(firstNumber) % parseInt(secondNumber));
        reset();
      }
    }
  };

  return (
    <Box bg="#292D36" borderRadius={10} p={5}>
      <VStack mb={11}>
        <HStack>
          <Button bg="#272B33" mr={18} w={60} h={60} borderRadius={10} onPress={() => setNumber(1)}>
            <Text fontFamily="body" fontWeight={600} color="#fff" fontSize={30}>
              1
            </Text>
          </Button>
          <Button bg="#272B33" mr={18} w={60} h={60} borderRadius={10} onPress={() => setNumber(2)}>
            <Text fontFamily="body" fontWeight={600} color="#fff" fontSize={30}>
              2
            </Text>
          </Button>
          <Button bg="#272B33" mr={18} w={60} h={60} borderRadius={10} onPress={() => getOperator("-")}>
            <Text fontFamily="body" fontWeight={600} color="#D76061" fontSize={30}>
              -
            </Text>
          </Button>
          <Button bg="#272B33" w={60} h={60} borderRadius={10} onPress={() => getOperator("+")}>
            <Text fontFamily="body" fontWeight={600} color="#D76061" fontSize={30}>
              +
            </Text>
          </Button>
        </HStack>
      </VStack>
      <VStack mb={11}>
        <HStack>
          <Button bg="#272B33" mr={18} w={60} h={60} borderRadius={10} onPress={() => setNumber(3)}>
            <Text fontFamily="body" fontWeight={600} color="#fff" fontSize={30}>
              3
            </Text>
          </Button>
          <Button bg="#272B33" mr={18} w={60} h={60} borderRadius={10} onPress={() => setNumber(4)}>
            <Text fontFamily="body" fontWeight={600} color="#fff" fontSize={30}>
              4
            </Text>
          </Button>
          <Button bg="#272B33" mr={18} w={60} h={60} borderRadius={10} onPress={() => getOperator("/")}>
            <Text fontFamily="body" fontWeight={600} color="#D76061" fontSize={30}>
              /
            </Text>
          </Button>
          <Button bg="#272B33" w={60} h={60} borderRadius={10} onPress={() => getOperator("*")}>
            <Text fontFamily="body" fontWeight={600} color="#D76061" fontSize={30}>
              *
            </Text>
          </Button>
        </HStack>
      </VStack>
      <VStack mb={11}>
        <HStack>
          <Button bg="#272B33" mr={18} w={60} h={60} borderRadius={10} onPress={() => setNumber(5)}>
            <Text fontFamily="body" fontWeight={600} color="#fff" fontSize={30}>
              5
            </Text>
          </Button>
          <Button bg="#272B33" mr={18} w={60} h={60} borderRadius={10} onPress={() => setNumber(6)}>
            <Text fontFamily="body" fontWeight={600} color="#fff" fontSize={30}>
              6
            </Text>
          </Button>
          <Button bg="#272B33" mr={18} w={60} h={60} borderRadius={10} onPress={() => getOperator("%")}>
            <Text fontFamily="body" fontWeight={600} color="#D76061" fontSize={30}>
              %
            </Text>
          </Button>
          <Button bg="#272B33" w={60} h={60} borderRadius={10} onPress={() => count(firstNumber, secondNumber, operator)}>
            <Text fontFamily="body" fontWeight={600} color="#D76061" fontSize={30}>
              =
            </Text>
          </Button>
        </HStack>
      </VStack>
      <VStack>
        <HStack>
          <Button bg="#272B33" mr={18} w={60} h={60} borderRadius={10} onPress={() => setNumber(7)}>
            <Text fontFamily="body" fontWeight={600} color="#fff" fontSize={30}>
              7
            </Text>
          </Button>
          <Button bg="#272B33" mr={18} w={60} h={60} borderRadius={10} onPress={() => setNumber(8)}>
            <Text fontFamily="body" fontWeight={600} color="#fff" fontSize={30}>
              8
            </Text>
          </Button>
          <Button bg="#272B33" mr={18} w={60} h={60} borderRadius={10} onPress={() => setNumber(9)}>
            <Text fontFamily="body" fontWeight={600} color="#fff" fontSize={30}>
              9
            </Text>
          </Button>
          <Button bg="#272B33" w={60} h={60} borderRadius={10} onPress={() => setNumber(0)}>
            <Text fontFamily="body" fontWeight={600} color="#fff" fontSize={30}>
              0
            </Text>
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
}
