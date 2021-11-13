// Import package
import React, { useEffect, useState } from "react";
import { Button, Modal, FormControl, Input, Select, CheckIcon, VStack } from "native-base";

// Import API
import { API } from "../../config/api";

export default function ModalAddToDoSuccess(props) {
  const { isOpen, onClose, data, id } = props;
  console.log(data);
  const [category, setCategory] = useState("");
  const [contoh, setContoh] = useState("");
  const [form, setForm] = useState({
    activity: "",
    category: "",
    status: "",
  });

  console.log(form);

  const handleChangeText = (text) => {
    setForm({
      ...form,
      activity: text,
    });
  };

  const updateForm = () => {
    try {
      setForm(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    updateForm();
  }, []);

  const getTodo = async () => {
    try {
      const response = await API.get(`/todo/${id}`);
      console.log(response);
      setForm(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  //   useEffect(() => {
  //     getTodo();
  //   }, []);

  const handleEditToDo = async () => {
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
        status: form.status,
      });

      console.log(dataBody);

      //   const response = await API.put(`/todo/${id}`, dataBody, config);

      getTodo();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header textAlign="center">Edit To Do</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>To Do Name</FormControl.Label>
              <Input type="text" onChangeText={(text) => handleChangeText(text)} name="activity" value={form.activity} />
            </FormControl>
            <VStack>
              <Select selectedValue={form.category} minWidth="200" accessibilityLabel="Choose Category" placeholder="Choose Category" mt={3} onValueChange={(itemValue) => setCategory(itemValue)}>
                <Select.Item label="Daily Activities" value="Daily Activities" />
                <Select.Item label="Meeting" value="Meeting" />
                <Select.Item label="Exercise" value="Exercise" />
                <Select.Item label="Exam" value="Exam" />
              </Select>
            </VStack>
          </Modal.Body>
          <Modal.Footer>
            <Button.Group space={2}>
              <Button variant="ghost" colorScheme="blueGray" onPress={onClose}>
                Cancel
              </Button>
              <Button onPress={handleEditToDo}>Save</Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
    </>
  );
}
