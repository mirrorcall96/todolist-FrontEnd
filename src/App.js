import "bootstrap/dist/css/bootstrap.min.css";
import TodolistList from "./components/TodolistList";
import TodolistModal from "./components/TodolistModal";
import { useState } from "react";

function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      Today Tasks
      <TodolistList setShow={setShow} table="today" />
      Other Tasks
      <TodolistList setShow={setShow} table="future" />
      Done Tasks
      <TodolistList setShow={setShow} table="done" />
      <button type="button" class="btn btn-danger" onClick={handleShow}>
        Add
      </button>
      {show ? <TodolistModal show={show} handleClose={handleClose} /> : ""}
    </>
  );
}

export default App;
