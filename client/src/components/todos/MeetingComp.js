// Import package
import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import { Box, Text, Image } from "native-base";

// Import API
import { API } from "../../config/api";

// Import assets
import MeetingImg from "../../../assets/meeting.png";

export default function MeetingComp(props) {
  const { datas, navigateMeeting } = props;

  const [meetings, setMeetings] = useState([]);

  // Function get meeting datas
  const getMeetings = async () => {
    try {
      const response = await API.get("/todos/category/meeting");
      setMeetings(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMeetings();
  }, [datas]);

  return (
    <TouchableOpacity onPress={navigateMeeting}>
      <Box bg="lime.500" rounded="lg" shadow={9} w="150px" h="150px" p={3}>
        <Image w="40px" h="40px" source={MeetingImg} alt="..." />
        <Text fontSize={15} mb={1} mt={2}>
          Meeting
        </Text>
        <Text fontSize={10}>{meetings.length} Task</Text>
      </Box>
    </TouchableOpacity>
  );
}
