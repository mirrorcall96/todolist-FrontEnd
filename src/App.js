import "bootstrap/dist/css/bootstrap.min.css";
import TodolistList from "./components/TodolistList";
import TodolistModal from "./components/TodolistModal";
import { useState } from "react";

function App() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <div className="container">
      <TodolistList setShow={setShow} table="today" />
      <TodolistList setShow={setShow} table="future" />
      <TodolistList setShow={setShow} table="done" />
      <button type="button" className="btn btn-danger" onClick={handleShow}>
        Add
      </button>
      {show ? <TodolistModal show={show} handleClose={handleClose} /> : ""}
    </div>
  );
}

export default App;
