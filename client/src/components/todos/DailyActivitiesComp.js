// Import package
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Box, Text, Image } from "native-base";

// Import API
import { API } from "../../config/api";

// Import assets
import DailyTask from "../../../assets/daily-tasks.png";

export default function DailyActivitiesComp({ datas, navigateDailyActivities }) {
  const [dailyActivities, setDailyActivities] = useState([]);

  // Function get daily activities datas
  const getDailyActivities = async () => {
    try {
      const response = await API.get("/todos/category/daily activities");
      setDailyActivities(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getDailyActivities();
  }, [datas]);

  return (
    <TouchableOpacity onPress={navigateDailyActivities}>
      <Box bg="secondary.400" rounded="lg" shadow={9} w="150px" h="150px" p={3}>
        <Image w="40px" h="40px" source={DailyTask} alt="..." />
        <Text fontSize={15} mb={1} mt={2}>
          Daily Activities
        </Text>
        <Text fontSize={10}>{dailyActivities.length} Task</Text>
      </Box>
    </TouchableOpacity>
  );
}
