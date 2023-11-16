import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { putUpdateUser } from "../services/UserService";
import { toast } from "react-toastify";

const ModalEdit = (props) => {
  const { show, handleClose, dataUserEdit, handleEditUserFromModal } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleEditUser = async () => {
    let res = await putUpdateUser(name, job);
    if (res && res.updateAt) {
      // success
      handleEditUserFromModal({
        first_name: name,
        id: dataUserEdit.id,
      });
      handleClose();
      toast.success("Edit user success!!!");
    }
  };

  useEffect(() => {
    if (show) {
      setName(dataUserEdit.first_name);
    }
  }, [dataUserEdit]);

  return (
    <div>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="addNew">
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                placeholder="Enter Name"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Job</Form.Label>
              <Form.Control
                type="text"
                value={job}
                onChange={(e) => {
                  setJob(e.target.value);
                }}
                placeholder="Job"
              />
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleEditUser()}>
            Save Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalEdit;
