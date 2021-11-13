// Import package
import React, { useState } from "react";
import { Button, Modal, FormControl, Input, Select, VStack } from "native-base";

// Import API
import { API } from "../../config/api";

export default function ModalAddToDo(props) {
  const { isOpen, onClose, setShowModal, setShowModalAddToDoSuccess, setNewToDo } = props;

  const [category, setCategory] = useState("");
  const [form, setForm] = useState({
    activity: "",
  });

  const handleChangeText = (text) => {
    setForm({
      activity: text,
    });
  };

  const handleSubmit = async () => {
    try {
      // Configuration
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const dataBody = JSON.stringify({
        activity: form.activity,
        category,
        status: "pending",
      });

      await API.post("/todo", dataBody, config);

      setShowModal(false);
      setShowModalAddToDoSuccess(true);
      setNewToDo(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header alignItems="center">Add To Do</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>To Do Name</FormControl.Label>
              <Input type="text" onChangeText={(text) => handleChangeText(text)} name="activity" />
            </FormControl>
            <VStack>
              <Select selectedValue={category} minWidth="200" accessibilityLabel="Choose Category" placeholder="Choose Category" mt={3} onValueChange={(itemValue) => setCategory(itemValue)}>
                <Select.Item label="Daily Activities" value="Daily Activities" />
                <Select.Item label="Meeting" value="Meeting" />
                <Select.Item label="Exercise" value="Exercise" />
                <Select.Item label="Exam" value="Exam" />
              </Select>
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                colorScheme="gray"
                onPress={() => {
                  setShowModal(false);
                }}
              >
                Cancel
              </Button>
              <Button onPress={handleSubmit} bgColor="info.500">
                Add
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}
