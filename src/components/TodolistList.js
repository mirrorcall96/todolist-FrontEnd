import { useSelector } from "react-redux";
import Todolistitem from "./Todolistitem";
const TodolistList = (props) => {
  const todolists = useSelector((state) => state.todolists);
  const { table, setShow } = props;
  let myTable = todolists.sort((a, b) => {
    console.log(a.deadline);
    return a.deadline - b.deadline;
  });
  const today = new Date();
  if (table === "today")
    myTable = myTable
      .filter((todolist) => {
        todolist.deadline = new Date(todolist.deadline);
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
    myTable = myTable
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
    myTable = myTable
      .filter((todolist) => {
        return todolist.status;
      })
      .map((todolist) => (
        <Todolistitem setShow={setShow} key={todolist.id} todolist={todolist} />
      ));
  }

  return (
    <>
      <h3>
        {table === "today" ? "Today" : table === "future" ? "Other" : "Done"}{" "}
        Tasks <small class="text-muted">{myTable.length}</small>
      </h3>
      <table className="table">
        <tbody>{myTable.length > 0 ? myTable : <small>No Tasks</small>}</tbody>
      </table>
    </>
  );
};

export default TodolistList;
