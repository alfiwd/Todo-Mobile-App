// Import package
import React from "react";
import { Modal, Text } from "native-base";

export default function ModalAddToDoSuccess(props) {
  return (
    <>
      <Modal {...props}>
        <Modal.Content maxWidth="400px">
          <Modal.Body>
            <Text textAlign="center">Add to do success</Text>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </>
  );
}
