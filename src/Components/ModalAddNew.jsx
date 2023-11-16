import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import { postCreateUser } from "../services/UserService";
import { toast } from "react-toastify";

const ModalAddNew = (props) => {
  const { show, handleClose, handleUpdateTable } = props;
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleSaveUser = async () => {
    let res = await postCreateUser(name, job);
    console.log(" check res: ", res);

    if (res && res.id) {
      //success
      handleClose();
      setName("");
      setJob("");
      toast.success("A User is created succeed");
      handleUpdateTable({ first_name: name, id: res.id });
    } else {
      // error
      toast.error("You have failed to add the user");
    }
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
          <Modal.Title>Add new User</Modal.Title>
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
          <Button variant="primary" onClick={() => handleSaveUser()}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ModalAddNew;
