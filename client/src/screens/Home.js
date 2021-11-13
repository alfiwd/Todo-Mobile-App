// Import package
import React, { useState, useEffect, useContext } from "react";
import { TouchableOpacity, ScrollView } from "react-native";
import { Box, Text, HStack, VStack, View } from "native-base";
import { Ionicons } from "@expo/vector-icons";

// Import components
import ModalAddToDoSuccess from "../components/modals/ModalAddToDoSuccess";
import ModalAddToDo from "../components/modals/ModalAddToDo";
import DailyActivitiesComp from "../components/todos/DailyActivitiesComp";
import MeetingComp from "../components/todos/MeetingComp";
import ExerciseComp from "../components/todos/ExerciseComp";
import ExamComp from "../components/todos/ExamComp";
import PendingComp from "../components/todos/PendingComp";
import DoneComp from "../components/todos/DoneComp";

// Import API
import { API } from "../config/api";
import { UserContext } from "../context/userContext";

export default function Home({ navigation }) {
  const [state] = useContext(UserContext);
  const [showModal, setShowModal] = useState(false);
  const [showModalAddToDoSuccess, setShowModalAddToDoSuccess] = useState(false);
  const [newToDo, setNewToDo] = useState(null);
  const [dailyActivites, setDailyActivities] = useState([]);
  const [meetings, setMeetings] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [exams, setExams] = useState([]);
  const [pendings, setPendings] = useState([]);
  const [dones, setDones] = useState([]);

  // Lifecycle did update to render all data
  useEffect(() => {
    getDailyActivites();
    getMeetings();
    getExercises();
    getExams();
    getPendings();
    getDones();
    setNewToDo(null);
  }, [state, newToDo]);

  // Function get daily activities datas
  const getDailyActivites = async () => {
    try {
      const response = await API.get("/todos/category/daily activities");
      setDailyActivities(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Function get meeting datas
  const getMeetings = async () => {
    try {
      const response = await API.get("/todos/category/meeting");
      setMeetings(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Function get exercise datas
  const getExercises = async () => {
    try {
      const response = await API.get("/todos/category/exercise");
      setExercises(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Function get exam datas
  const getExams = async () => {
    try {
      const response = await API.get("/todos/category/exam");
      setExams(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Function get pending datas
  const getPendings = async () => {
    try {
      const response = await API.get("/todos/status/pending");
      setPendings(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Function get done datas
  const getDones = async () => {
    try {
      const response = await API.get("/todos/status/done");
      setDones(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Function navigate to daily activities
  const navigateDailyActivities = () => {
    navigation.navigate("Daily Activities");
  };

  // Function navigate to Meeting
  const navigateMeeting = () => {
    navigation.navigate("Meeting");
  };

  // Function navigate to Exercise
  const navigateExercise = () => {
    navigation.navigate("Exercise");
  };

  // Function navigate to Exam
  const navigateExam = () => {
    navigation.navigate("Exam");
  };

  // Function navigate to Pending
  const navigatePending = () => {
    navigation.navigate("Pending");
  };

  // Function navigate to Done
  const navigateDone = () => {
    navigation.navigate("Done");
  };

  return (
    <>
      <View>
        <ScrollView>
          <VStack mt={10} mb={5}>
            <Text fontFamily="body" fontWeight={600} fontSize={25} mb={8} textAlign="center">
              My Task
            </Text>
            <HStack space={5} justifyContent="center" mb={5}>
              <DailyActivitiesComp datas={dailyActivites} navigateDailyActivities={navigateDailyActivities} />
              <MeetingComp datas={meetings} navigateMeeting={navigateMeeting} />
            </HStack>
            <HStack space={5} justifyContent="center" mb={5}>
              <ExerciseComp datas={exercises} navigateExercise={navigateExercise} />
              <ExamComp datas={exams} navigateExam={navigateExam} />
            </HStack>
            <HStack space={5} justifyContent="center">
              <PendingComp datas={pendings} navigatePending={navigatePending} />
              <DoneComp datas={dones} navigateDone={navigateDone} />
            </HStack>
          </VStack>
          <Box justifyContent="center" alignItems="center" mb={5}>
            <TouchableOpacity
              onPress={() => {
                setShowModal(true);
              }}
            >
              <Ionicons name="add-circle" size={70} color="grey" />
            </TouchableOpacity>
          </Box>
        </ScrollView>
      </View>

      <ModalAddToDo isOpen={showModal} onClose={() => setShowModal(false)} setShowModal={setShowModal} setShowModalAddToDoSuccess={setShowModalAddToDoSuccess} setNewToDo={setNewToDo} />
      <ModalAddToDoSuccess isOpen={showModalAddToDoSuccess} onClose={() => setShowModalAddToDoSuccess(false)} />
    </>
  );
}
