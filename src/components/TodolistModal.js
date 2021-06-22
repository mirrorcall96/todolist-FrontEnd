import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import DatePicker from "react-date-picker";
import { useDispatch, useSelector } from "react-redux";
import { createTodolist, updateTodolist } from "../store/actions";

const TodolistModal = (props) => {
  const dispatch = useDispatch();
  const todolists = useSelector((state) => state.todolists);
  const { show, handleClose } = props;
  let myTodolist = {
    name: "",
    status: false,
    priority: "low",
    deadline: new Date(),
  };
  if (show !== true && show !== false)
    myTodolist = todolists.find((todolist) => todolist.id === show);
  const [input, setInput] = useState(myTodolist);
  const handelChange = (e) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  };
  const handelChangeDeadLine = (e) => {
    setInput({
      ...input,
      deadline: e,
    });
  };
  const handelSubmit = (e) => {
    e.preventDefault();
    if (show !== true && show !== false)
      dispatch(updateTodolist(input.id, input));
    else dispatch(createTodolist(input));
    handleClose();
  };
  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Modal title</Modal.Title>
        </Modal.Header>
        <form onSubmit={handelSubmit}>
          <Modal.Body>
            <input
              placeholder="Task Name"
              value={input.name}
              name="name"
              onChange={handelChange}
            />
            <select
              onChange={handelChange}
              name="priority"
              defaultValue={input.priority}
            >
              <option>low</option>
              <option>middle</option>
              <option>high</option>
            </select>
            <DatePicker
              name="deadline"
              onChange={handelChangeDeadLine}
              value={input.deadline}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button type="submit" variant="primary">
              {show !== true && show !== false ? "Update" : "Add"}
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </>
  );
};
export default TodolistModal;
