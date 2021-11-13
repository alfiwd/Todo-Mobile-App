// Import package
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Box, Text, Image } from "native-base";

// Import API
import { API } from "../../config/api";

// Import assets
import PendingImg from "../../../assets/pending.png";

export default function PendingComp(props) {
  const { datas, navigatePending } = props;

  const [pendings, setPendings] = useState([]);

  // Function get pending datas
  const getPendings = async () => {
    try {
      const response = await API.get("/todos/status/pending");
      setPendings(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPendings();
  }, [datas]);
  return (
    <TouchableOpacity onPress={navigatePending}>
      <Box bg="warning.400" rounded="lg" shadow={9} w="150px" h="150px" p={3}>
        <Image w="40px" h="40px" source={PendingImg} alt="..." />
        <Text fontSize={15} mb={1} mt={2}>
          Pending
        </Text>
        <Text fontSize={10}>{pendings.length} Task</Text>
      </Box>
    </TouchableOpacity>
  );
}
