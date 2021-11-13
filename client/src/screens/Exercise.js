// Import package
import React, { useState, useEffect, useContext } from "react";
import { TouchableOpacity } from "react-native";
import { Box, Text, FlatList, Divider, HStack, Spacer, Modal, Select, FormControl, Input, VStack, Button, Image } from "native-base";
import { AntDesign } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";

// Import components
import ModalConfirmDone from "../components/modals/ModalConfirmDone";
import ModalConfirmDelete from "../components/modals/ModalConfirmDelete";

// Import assets
import NoData from "../../assets/no-data.png";

// Import API
import { API } from "../config/api";

// Import user context
import { UserContext } from "../context/userContext";

export default function Exercise() {
  const [_, dispatch] = useContext(UserContext);
  const [exercises, setExercises] = useState([]);
  const [id, setId] = useState(null);
  const [showModalConfirmDone, setShowModalConfirmDone] = useState(false);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalConfirmDelete, setShowModalConfirmDelete] = useState(false);
  const [confirmDone, setConfirmDone] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [isEmpty, setIsEmpty] = useState(null);
  const [form, setForm] = useState({
    activity: "",
    category: "",
    status: "",
  });

  // Lifecycle did mount
  useEffect(() => {
    getExercies();
  }, []);

  // Function to get all exercise datas
  const getExercies = async () => {
    try {
      const response = await API.get("/todos/category/exercise");
      setExercises(response.data.data);
      if (response.data.data.length !== 0) {
        setIsEmpty(false);
      } else {
        setIsEmpty(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to get exercise data
  const getExercise = async (id) => {
    try {
      const response = await API.get(`/todo/${id}`);
      setForm(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  // Function handle press done
  const handlePressDone = (id) => {
    setId(id);
    setShowModalConfirmDone(true);
  };

  // Function handle done to update status
  const handleDone = async () => {
    try {
      // Configuration
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body to update data
      const dataBody = JSON.stringify({
        activity: form.activity,
        category: form.category,
        status: "done",
      });

      // Update data
      const response = await API.put(`/todo/${id}`, dataBody, config);

      // Update state
      dispatch({
        type: "DATA_UPDATED",
        payload: response.data.data,
      });

      // Render data
      getExercies();
    } catch (error) {
      console.log(error);
    }
  };

  // Lifecycle did update done
  useEffect(() => {
    if (confirmDone) {
      setShowModalConfirmDone(false);
      handleDone();
      setConfirmDone(null);
    }
  }, [confirmDone]);

  // Handle change text to update form
  const handleChangeText = (text) => {
    setForm({
      ...form,
      activity: text,
    });
  };

  // Function handle edit todo
  const handleEditToDo = async () => {
    try {
      // Configuration
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      // Data body to update data
      const dataBody = JSON.stringify({
        activity: form.activity,
        category: form.category,
        status: form.status,
      });

      // Update data
      const response = await API.put(`/todo/${id}`, dataBody, config);

      // Update state
      dispatch({
        type: "DATA_UPDATED",
        payload: response.data.data,
      });

      // Render data
      getExercies();

      // Close modal edit
      setShowModalEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  // Function handle press delete
  const handlePressDelete = (id) => {
    setId(id);
    setShowModalConfirmDelete(true);
  };

  // Function handle delete
  const handleDelete = async () => {
    try {
      // Delete data
      const response = await API.delete(`/todo/${id}`);

      // Update state
      dispatch({
        type: "DATA_UPDATED",
        payload: response.data.data,
      });

      // Render data
      getExercies();
    } catch (error) {
      console.log(error);
    }
  };

  // Lifecycle did update delete
  useEffect(() => {
    if (confirmDelete) {
      setShowModalConfirmDelete(false);
      handleDelete();
      setConfirmDelete(null);
    }
  }, [confirmDelete]);

  return (
    <>
      <Box px={3}>
        {isEmpty ? (
          <>
            <Box justifyContent="center" alignItems="center" h="100%">
              <Image source={NoData} w="300px" h="300px" alt="..." />
            </Box>
          </>
        ) : (
          <>
            <FlatList
              data={exercises}
              renderItem={({ item }) => (
                <>
                  {item.status == "done" ? (
                    <>
                      <HStack mt={2}>
                        <Text fontSize={18} color="green.800">
                          {item.activity}
                        </Text>
                        <Spacer />
                        <TouchableOpacity
                          onPress={() => {
                            handlePressDelete(item.id);
                            getExercise(item.id);
                          }}
                        >
                          <AntDesign name="delete" size={30} color="red" />
                        </TouchableOpacity>
                      </HStack>
                      <Divider mt={2} thickness="2" />
                    </>
                  ) : (
                    <>
                      <HStack mt={2}>
                        <Text fontSize={18} color="yellow.500">
                          {item.activity}
                        </Text>
                        <Spacer />
                        <TouchableOpacity
                          onPress={() => {
                            handlePressDone(item.id);
                            getExercise(item.id);
                          }}
                        >
                          <Ionicons name="checkbox" size={28} color="green" />
                        </TouchableOpacity>
                        <TouchableOpacity
                          onPress={() => {
                            setShowModalEdit(true);
                            getExercise(item.id);
                            setId(item.id);
                          }}
                        >
                          <Feather name="edit" size={28} color="green" />
                        </TouchableOpacity>
                      </HStack>
                      <Divider mt={2} thickness="2" />
                    </>
                  )}
                </>
              )}
            />
          </>
        )}
      </Box>

      <ModalConfirmDone isOpen={showModalConfirmDone} onClose={() => setShowModalConfirmDone(false)} setConfirmDone={setConfirmDone} />
      <ModalConfirmDelete isOpen={showModalConfirmDelete} onClose={() => setShowModalConfirmDelete(false)} setConfirmDelete={setConfirmDelete} />
      <Modal isOpen={showModalEdit} onClose={() => setShowModalEdit(false)}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header alignItems="center">Edit To Do</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>To Do Name</FormControl.Label>
              <Input type="text" onChangeText={(text) => handleChangeText(text)} name="activity" value={form.activity} />
            </FormControl>
            <VStack>
              <Select
                selectedValue={form.category}
                minWidth="200"
                accessibilityLabel="Choose Category"
                placeholder="Choose Category"
                mt={3}
                onValueChange={(itemValue) =>
                  setForm({
                    ...form,
                    category: itemValue,
                  })
                }
              >
                <Select.Item label="Daily Activities" value="Daily Activities" />
                <Select.Item label="Meeting" value="Meeting" />
                <Select.Item label="Exercise" value="Exercise" />
                <Select.Item label="Exam" value="Exam" />
              </Select>
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button colorScheme="gray" onPress={() => setShowModalEdit(false)}>
                Cancel
              </Button>
              <Button bgColor="green.700" onPress={handleEditToDo}>
                Save
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}
