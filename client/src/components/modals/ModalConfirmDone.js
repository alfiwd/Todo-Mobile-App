// Import package
import React from "react";
import { Modal, Text, Button } from "native-base";

export default function ModalConfirmDone(props) {
  const { isOpen, onClose, setConfirmDone } = props;

  const handleConfirmDone = () => {
    setConfirmDone(true);
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Modal.Content maxWidth="400px">
          <Modal.Body>
            <Text textAlign="center" mb={3}>
              Are you sure you want to complete this to do?
            </Text>
            <Button.Group space={3} justifyContent="center">
              <Button onPress={handleConfirmDone} bgColor="green.700">
                Yes
              </Button>
              <Button onPress={onClose} colorScheme="gray">
                No
              </Button>
            </Button.Group>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
}
