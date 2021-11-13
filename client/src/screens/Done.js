// Import package
import React, { useState, useEffect, useContext } from "react";
import { TouchableOpacity } from "react-native";
import { Box, Text, FlatList, Divider, HStack, Spacer, Image } from "native-base";
import { AntDesign } from "@expo/vector-icons";

// Import components
import ModalConfirmDelete from "../components/modals/ModalConfirmDelete";

// Import assets
import NoData from "../../assets/no-data.png";

// Import API
import { API } from "../config/api";

// Import user context
import { UserContext } from "../context/userContext";

export default function Done() {
  const [_, dispatch] = useContext(UserContext);
  const [dones, setDones] = useState([]);
  const [id, setId] = useState(null);
  const [showModalConfirmDelete, setShowModalConfirmDelete] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const [isEmpty, setIsEmpty] = useState(null);
  const [form, setForm] = useState({
    activity: "",
    category: "",
    status: "",
  });

  // Lifecycle did mount
  useEffect(() => {
    getDones();
  }, []);

  // Function to get all done datas
  const getDones = async () => {
    try {
      const response = await API.get("/todos/status/done");
      setDones(response.data.data);
      if (response.data.data.length !== 0) {
        setIsEmpty(false);
      } else {
        setIsEmpty(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to get done data
  const getDone = async (id) => {
    try {
      const response = await API.get(`/todo/${id}`);
      setForm(response.data.data);
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
      getDones();
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
          <Box justifyContent="center" alignItems="center" h="100%">
            <Image source={NoData} w="300px" h="300px" alt="..." />
          </Box>
        ) : (
          <>
            <FlatList
              data={dones}
              renderItem={({ item }) => (
                <>
                  <HStack mt={2}>
                    <Text fontSize={18} color="green.800">
                      {item.activity}
                    </Text>
                    <Spacer />
                    <TouchableOpacity
                      onPress={() => {
                        handlePressDelete(item.id);
                        getDone(item.id);
                      }}
                    >
                      <AntDesign name="delete" size={30} color="red" />
                    </TouchableOpacity>
                  </HStack>
                  <Divider mt={2} thickness="2" />
                </>
              )}
            />
          </>
        )}
      </Box>

      <ModalConfirmDelete isOpen={showModalConfirmDelete} onClose={() => setShowModalConfirmDelete(false)} setConfirmDelete={setConfirmDelete} />
    </>
  );
}
