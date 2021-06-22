import { useState } from "react";
import { Modal, Button } from "react-bootstrap";
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
    e = new Date(e.target.value);
    console.log(e, e.toISOString().slice(0, 19));
    //const today = new Date();
    setInput({
      ...input,
      //deadline: e > today ? e : today,
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
          <Modal.Title>
            {show !== true && show !== false ? "Update" : "Add"} Task
          </Modal.Title>
        </Modal.Header>
        <form onSubmit={handelSubmit}>
          <Modal.Body>
            <div className="form-group">
              <input
                placeholder="Task Name"
                value={input.name}
                name="name"
                onChange={handelChange}
                className="form-control"
              />
            </div>
            <div className="form-group">
              <select
                className="form-control"
                onChange={handelChange}
                name="priority"
                defaultValue={input.priority}
              >
                <option value="low">Low</option>
                <option value="middle">Middle</option>
                <option value="high">High</option>
              </select>
            </div>
            <div className="form-group">
              <input
                className="form-control"
                type="datetime-local"
                onChange={handelChangeDeadLine}
                value={input.deadline.toISOString().slice(0, 19)}
              />
            </div>
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
