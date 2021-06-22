import { useSelector } from "react-redux";
import Todolistitem from "./Todolistitem";
const TodolistList = (props) => {
  const todolists = useSelector((state) => state.todolists);
  const { table, setShow } = props;
  let myTable;
  const today = new Date();
  if (table === "today")
    myTable = todolists
      .filter((todolist) => {
        todolist.deadline = new Date(todolist.deadline);
        console.log(todolist.deadline);
        return (
          todolist.status === false &&
          today.getFullYear() === todolist.deadline.getFullYear() &&
          today.getMonth() === todolist.deadline.getMonth() &&
          today.getDate() === todolist.deadline.getDate()
        );
      })
      .map((todolist) => (
        <Todolistitem setShow={setShow} key={todolist.id} todolist={todolist} />
      ));
  else if (table === "future") {
    myTable = todolists
      .filter((todolist) => {
        todolist.deadline = new Date(todolist.deadline);
        return (
          !todolist.status &&
          !(
            today.getFullYear() === todolist.deadline.getFullYear() &&
            today.getMonth() === todolist.deadline.getMonth() &&
            today.getDate() === todolist.deadline.getDate()
          )
        );
      })
      .map((todolist) => (
        <Todolistitem
          setShow={setShow}
          key={todolist.id}
          todolist={todolist}
          future={true}
        />
      ));
  } else if (table === "done") {
    myTable = todolists
      .filter((todolist) => {
        return todolist.status;
      })
      .map((todolist) => (
        <Todolistitem setShow={setShow} key={todolist.id} todolist={todolist} />
      ));
  }
  console.log(myTable);
  return (
    <table className="table">
      <tbody>{myTable}</tbody>
    </table>
  );
};

export default TodolistList;
