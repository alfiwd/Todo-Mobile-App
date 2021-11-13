// Import package
import React, { useState, useEffect, useContext } from "react";
import { TouchableOpacity } from "react-native";
import { Box, Text, FlatList, Divider, HStack, Spacer, Image } from "native-base";
import { Ionicons } from "@expo/vector-icons";

// Import components
import ModalConfirmDone from "../components/modals/ModalConfirmDone";

// Import assets
import NoData from "../../assets/no-data.png";

// Import API
import { API } from "../config/api";

// Import user context
import { UserContext } from "../context/userContext";

export default function Pending() {
  const [_, dispatch] = useContext(UserContext);
  const [pendings, setPendings] = useState([]);
  const [id, setId] = useState(null);
  const [showModalConfirmDone, setShowModalConfirmDone] = useState(false);
  const [confirmDone, setConfirmDone] = useState(false);
  const [isEmpty, setIsEmpty] = useState(null);
  const [form, setForm] = useState({
    activity: "",
    category: "",
    status: "",
  });

  // Lifecycle did mount
  useEffect(() => {
    getPendings();
  }, []);

  // Function to get all pending datas
  const getPendings = async () => {
    try {
      const response = await API.get("/todos/status/pending");
      setPendings(response.data.data);
      if (response.data.data.length !== 0) {
        setIsEmpty(false);
      } else {
        setIsEmpty(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Function to get pending data
  const getPending = async (id) => {
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
      getPendings();
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
              data={pendings}
              renderItem={({ item }) => (
                <>
                  <HStack mt={2}>
                    <Text fontSize={18} color="yellow.500">
                      {item.activity}
                    </Text>
                    <Spacer />
                    <TouchableOpacity
                      onPress={() => {
                        handlePressDone(item.id);
                        getPending(item.id);
                      }}
                    >
                      <Ionicons name="checkbox" size={28} color="green" />
                    </TouchableOpacity>
                  </HStack>
                  <Divider mt={2} thickness="2" />
                </>
              )}
            />
          </>
        )}
      </Box>

      <ModalConfirmDone isOpen={showModalConfirmDone} onClose={() => setShowModalConfirmDone(false)} setConfirmDone={setConfirmDone} />
    </>
  );
}
