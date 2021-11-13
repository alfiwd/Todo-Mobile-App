// Import package
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Box, Text, Image } from "native-base";

// Import API
import { API } from "../../config/api";

// Import assets
import DoneImg from "../../../assets/done.png";

export default function DoneComp({ datas, navigateDone }) {
  const [dones, setDones] = useState([]);

  // Function get done datas
  const getDones = async () => {
    try {
      const response = await API.get("/todos/status/done");
      setDones(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDones();
  }, [datas]);
  return (
    <TouchableOpacity onPress={navigateDone}>
      <Box bg="green.400" rounded="lg" shadow={9} w="150px" h="150px" p={3}>
        <Image w="40px" h="40px" source={DoneImg} alt="..." />
        <Text fontSize={15} mb={1} mt={2}>
          Done
        </Text>
        <Text fontSize={10}>{dones.length} Task</Text>
      </Box>
    </TouchableOpacity>
  );
}
