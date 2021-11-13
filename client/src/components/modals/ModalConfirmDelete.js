// Import package
import React from "react";
import { Modal, Text, Button } from "native-base";

export default function ModalConfirmDelete(props) {
  const { isOpen, onClose, setConfirmDelete } = props;

  const handleConfirmDelete = () => {
    setConfirmDelete(true);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Content maxWidth="400px">
          <Modal.Body>
            <Text textAlign="center" mb={3}>
              Are you sure you want to delete this to do?
            </Text>
            <Button.Group space={3} justifyContent="center">
              <Button onPress={handleConfirmDelete} colorScheme="danger">
                Yes
              </Button>
              <Button onPress={onClose} colorScheme={"gray"}>
                No
              </Button>
            </Button.Group>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
}
