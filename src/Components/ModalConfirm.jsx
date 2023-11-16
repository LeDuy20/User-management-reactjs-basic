import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { deleteUserUser } from '../services/UserService'
import {toast} from "react-toastify";

const ModalConfirm = (props) => {
  const { show, handleClose, dataUserDelete, handleDeleteUserFormModal } = props;

  const confirmDelete = async () => {
    let res = await deleteUserUser(dataUserDelete.id);
    if (res && +res.statusCode === 204) {
      toast.success('Delete User Success!!')
      handleClose();
      handleDeleteUserFormModal(dataUserDelete);
    } else {
      toast.error('Error delete user !')
    }
    console.log(">> check res: ", res)
  };
  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete a User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="addNew">
            This actions can't be undone!!
            Do want to delete this user ? <br/><b> email={dataUserDelete.email} ?</b>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => confirmDelete()}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalConfirm;
