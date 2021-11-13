// Import package
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Box, Text, Image } from "native-base";

// Import API
import { API } from "../../config/api";

// Import assets
import Coding from "../../../assets/coding.png";

export default function ExerciseComp(props) {
  const { datas, navigateExercise } = props;

  const [exercises, setExercises] = useState([]);

  // Function get exercise datas
  const getExercises = async () => {
    try {
      const response = await API.get("/todos/category/exercise");
      setExercises(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getExercises();
  }, [datas]);

  return (
    <TouchableOpacity onPress={navigateExercise}>
      <Box bg="purple.400" rounded="lg" shadow={9} w="150px" h="150px" p={3}>
        <Image w="40px" h="40px" source={Coding} alt="..." />
        <Text fontSize={15} mb={1} mt={2}>
          Exercise
        </Text>
        <Text fontSize={10}>{exercises.length} Task</Text>
      </Box>
    </TouchableOpacity>
  );
}
