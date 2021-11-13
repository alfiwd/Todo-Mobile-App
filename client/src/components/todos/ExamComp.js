// Import package
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Box, Text, Image } from "native-base";

// Import API
import { API } from "../../config/api";

// Import assets
import ExamImg from "../../../assets/exam.png";

export default function ExamComp(props) {
  const { datas, navigateExam } = props;

  const [exams, setExams] = useState([]);

  // Function get exam datas
  const getExams = async () => {
    try {
      const response = await API.get("/todos/category/exam");
      setExams(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getExams();
  }, [datas]);

  return (
    <TouchableOpacity onPress={navigateExam}>
      <Box bg="primary.400" rounded="lg" shadow={9} w="150px" h="150px" p={3}>
        <Image w="40px" h="40px" source={ExamImg} alt="..." />
        <Text fontSize={15} mb={1} mt={2}>
          Exam
        </Text>
        <Text fontSize={10}>{exams.length} Task</Text>
      </Box>
    </TouchableOpacity>
  );
}
