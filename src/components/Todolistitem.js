import { useDispatch } from "react-redux";
import { deleteTodolist, updateTodolist } from "../store/actions";

import { AiFillDelete, AiFillEdit, AiOutlineCheckCircle } from "react-icons/ai";
import { FcHighPriority, FcCheckmark } from "react-icons/fc";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
TimeAgo.addLocale(en);

const timeAgo = new TimeAgo("en-US");
const Todolistitem = (props) => {
  const dispatch = useDispatch();
  let { id, name, priority, deadline, status } = props.todolist;
  let disabled = false;
  if (props.future && deadline < new Date()) {
    disabled = true;
  }
  return (
    <tr style={{ color: disabled ? "grey" : "" }}>
      <td>
        {status ? <FcCheckmark /> : ""}
        {" " + name}
      </td>
      <td>
        {priority === "high" ? <FcHighPriority /> : ""}
        {status || disabled ? (
          priority
        ) : (
          <select
            style={{ "background-color": "rgba(0, 0, 0, 0)", border: "none" }}
            className="form-control-sm"
            value={priority}
            onChange={(e) => {
              if (!disabled)
                dispatch(
                  updateTodolist(id, {
                    ...props.todolist,
                    priority: e.target.value,
                  })
                );
            }}
          >
            <option>high</option>
            <option>middle</option>
            <option>low</option>
          </select>
        )}
      </td>
      <td>
        <span title={deadline.toDateString()}>
          {status ? deadline.toDateString() : timeAgo.format(deadline)}
        </span>
      </td>
      <td>
        <div className="btn-group btn-group-sm" role="group">
          <button
            type="button"
            className={"btn btn-primary " + (disabled ? "disabled" : "")}
            onClick={() => {
              if (!disabled) props.setShow(id);
            }}
          >
            <AiFillEdit />
          </button>
          <button
            type="button"
            className={"btn btn-danger " + (disabled ? "disabled" : "")}
            onClick={() => {
              if (!disabled) dispatch(deleteTodolist(id));
            }}
          >
            <AiFillDelete />
          </button>

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
              <AiOutlineCheckCircle />
            </button>
          ) : (
            ""
          )}
        </div>
      </td>
    </tr>
  );
};

export default Todolistitem;
