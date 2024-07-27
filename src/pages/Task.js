import React from "react";

export const Task = (props) => {
  return (
    <div className="taskList-main">
      <div className="task-main">
        {props.isEditing && props.id === props.editedTaskID ? (
          <div>
            <input
              type="text"
              value={props.editedTask}
              onChange={props.handleUpdate}
            />
            <button onClick={() => props.saveEdit(props.id)}>Save</button>
          </div>
        ) : (
          <div className="mainDisplay">
            <h2 style={{ color: props.completion ? "green" : "black" }}>
              {props.taskName}
            </h2>
            <div>
              <p>Created At: {new Date(props.createdAt).toLocaleString()}</p>
            </div>
            <div>
              <button
                className="upANDdown"
                onClick={() => props.moveUp(props.index)}
              >
                👆
              </button>
              <button
                className="upANDdown"
                onClick={() => props.moveDown(props.index)}
              >
                👇
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="task-actions">
        <button onClick={() => props.deleteFromList(props.id)}>
          <i id="Delete-icon" className="fa-regular fa-trash-can"></i>
        </button>
        <button onClick={() => props.onComplete(props.id)}>
          <i id="Delete-icon" className="fa-solid fa-check"></i>
        </button>
        <button onClick={() => props.onEdit(props.taskName, props.id)}>
          <i id="Delete-icon" className="fa-regular fa-pen-to-square"></i>
        </button>
      </div>
    </div>
  );
};
