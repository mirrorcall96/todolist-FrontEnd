import { useDispatch } from "react-redux";
import { deleteTodolist, updateTodolist } from "../store/actions";

const Todolistitem = (props) => {
  const dispatch = useDispatch();
  let { id, name, priority, deadline, status } = props.todolist;
  let disabled = false;
  if (props.future && deadline < new Date()) {
    disabled = true;
  }
  deadline = deadline.toDateString();
  return (
    <tr>
      <td>{name}</td>
      <td>{priority}</td>
      <td>{deadline}</td>
      <td>
        <button
          type="button"
          class={"btn btn-primary " + (disabled ? "disabled" : "")}
          onClick={() => {
            if (!disabled) props.setShow(id);
          }}
        >
          Edit
        </button>
      </td>
      <td>
        <button
          type="button"
          className={"btn btn-danger " + (disabled ? "disabled" : "")}
          onClick={() => {
            if (!disabled) dispatch(deleteTodolist(id));
          }}
        >
          Delete
        </button>
      </td>
      <td>
        {!status ? (
          <button
            type="button"
            className={"btn btn-success " + (disabled ? "disabled" : "")}
            onClick={() => {
              if (!disabled)
                dispatch(
                  updateTodolist(id, { ...props.todolist, status: true })
                );
            }}
          >
            Done
          </button>
        ) : (
          ""
        )}
      </td>
    </tr>
  );
};

export default Todolistitem;
