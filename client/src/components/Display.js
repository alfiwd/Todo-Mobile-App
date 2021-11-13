// Import package
import React from "react";
import { Box, Text, VStack } from "native-base";

export default function Display(props) {
  // Inisiate property of props
  const { firstNumber, secondNumber, operator, result } = props;

  return (
    <Box marginBottom="30px">
      <VStack>
        <Text fontFamily="body" fontWeight={600} color="#fff" fontSize={24} marginBottom="10px" textAlign="center">
          Display
        </Text>
        <Box bg="#ECECEC" borderRadius={10} h={90} display="flex" justifyContent="center" alignItems="center">
          <Text fontFamily="body" fontWeight={600} fontSize={20}>
            {firstNumber}
            <Text fontFamily="body" fontWeight={600} fontSize={20} color="#D76061">
              {" "}
              {operator}{" "}
            </Text>
            {secondNumber}
          </Text>
          <Text fontFamily="body" fontWeight={600} fontSize={40}>
            {result}
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}
