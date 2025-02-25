import React, { useState, useEffect } from "react";
import { Loader } from "./Loader";
import { Task } from "./Task";
import { auth, db } from "./Firebase";
import {
  doc,
  setDoc,
  getDoc,
  getDocs,
  collection,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";

export const TodoList = () => {
  const [todoList, setTodoList] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editedTask, setEditedTask] = useState("");
  const [editedTaskID, setEditedTaskID] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchUserData = () => {
    auth.onAuthStateChanged(async (user) => {
      console.log(user);
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnapshot = await getDoc(userRef);
        if (userSnapshot.exists()) {
          const userData = userSnapshot.data();
          setUserDetails(userData);
          fetchTasks(user.uid);
        } else {
          alert("No such document!");
        }
      }
    });
  };

  const moveUp = async (index) => {
    if (index > 0) {
      const updatedTasks = [...todoList];
      const taskToMove = updatedTasks[index];
      const previousTask = updatedTasks[index - 1];

      // Swap tasks in the list
      updatedTasks[index] = previousTask;
      updatedTasks[index - 1] = taskToMove;

      // Swap order fields
      const tempOrder = taskToMove.order;
      taskToMove.order = previousTask.order;
      previousTask.order = tempOrder;

      setTodoList(updatedTasks);

      // Update order in database
      try {
        const user = auth.currentUser;
        await updateDoc(doc(db, `users/${user.uid}/tasks/${taskToMove.id}`), {
          order: taskToMove.order,
        });
        await updateDoc(doc(db, `users/${user.uid}/tasks/${previousTask.id}`), {
          order: previousTask.order,
        });
        console.log("Task order updated successfully");
      } catch (error) {
        console.error("Error updating task order: ", error);
      }
    }
  };

  const moveDown = async (index) => {
    if (index < todoList.length - 1) {
      const updatedTasks = [...todoList];
      const taskToMove = updatedTasks[index];
      const nextTask = updatedTasks[index + 1];

      // Swap tasks in the list
      updatedTasks[index] = nextTask;
      updatedTasks[index + 1] = taskToMove;

      // Swap order fields
      const tempOrder = taskToMove.order;
      taskToMove.order = nextTask.order;
      nextTask.order = tempOrder;

      setTodoList(updatedTasks);

      // Update order in database
      try {
        const user = auth.currentUser;
        await updateDoc(doc(db, `users/${user.uid}/tasks/${taskToMove.id}`), {
          order: taskToMove.order,
        });
        await updateDoc(doc(db, `users/${user.uid}/tasks/${nextTask.id}`), {
          order: nextTask.order,
        });
        console.log("Task order updated successfully");
      } catch (error) {
        console.error("Error updating task order: ", error);
      }
    }
  };

  const fetchTasks = async (userID) => {
    const tasksRef = collection(db, `users/${userID}/tasks`);
    const tasksSnapshot = await getDocs(tasksRef);
    const tasks = tasksSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })).sort((a, b) => a.order - b.order); // Sort by order
    setTodoList(tasks);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.location.href = "/Login";
      alert("Logged out!");
    } catch (e) {
      alert("Failed to log out!" + e.message);
    }
  }

  const handleChange = (event) => {
    setNewTask(event.target.value);
  };

  const handleUpdate = (event) => {
    setEditedTask(event.target.value);
  };

  const onEdit = (taskName, taskID) => {
    setIsEditing(true);
    setEditedTaskID(taskID);
    setEditedTask(taskName);
  };

  const saveEdit = async (taskID) => {
    if (editedTask === "") {
      alert("Task cannot be empty");
      return;
    } else {
      setTodoList(
        todoList.map((task) =>
          task.id === taskID ? { ...task, taskName: editedTask } : task
        )
      );

      try {
        const user = auth.currentUser;
        await updateDoc(doc(db, `users/${user.uid}/tasks/${taskID}`), {
          taskName: editedTask,
        });
        console.log("Task updated successfully");
      } catch (error) {
        console.error("Error updating task: ", error);
      }

      setIsEditing(false);
      setEditedTask("");
    }
  };

  const addtoList = async () => {
    if (newTask === "") {
      alert("Task cannot be empty");
      return;
    } else {
      const task = {
        id: todoList.length === 0 ? 1 : todoList[todoList.length - 1].id + 1,
        taskName: newTask,
        createdAt: new Date().toLocaleString(),
        completion: false,
        order: todoList.length, // Order field
      };
      setTodoList([...todoList, task]);

      const user = auth.currentUser;
      const tasksRef = collection(db, `users/${user.uid}/tasks`);
      const newTaskRef = doc(tasksRef);
      try {
        await setDoc(newTaskRef, {
          taskName: newTask,
          completion: false,
          createdAt: new Date().toLocaleString(),
          order: todoList.length, // Order field
        });
        console.log("Task added successfully");
        setNewTask("");
      } catch (error) {
        console.error("Error adding task: ", error);
      }
    }
  };

  const deleteFromList = async (taskID) => {
    setTodoList(todoList.filter((t) => t.id !== taskID));

    try {
      const user = auth.currentUser;
      await deleteDoc(doc(db, `users/${user.uid}/tasks`, taskID));
      console.log("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  };

  const onComplete = async (taskID) => {
    setTodoList(
      todoList.map((t) =>
        t.id === taskID ? { ...t, completion: !t.completion } : t
      )
    );

    try {
      const user = auth.currentUser;
      await updateDoc(doc(db, `users/${user.uid}/tasks/${taskID}`), {
        completion: true,
      });
      console.log("Task updated successfully");
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  if (isLoading) {
    return <Loader />;
  } else if (userDetails) {
    return (
      <div className="mainApp">
        <h2>
          Welcome to {userDetails ? userDetails.firstName : "Guest"}'s ToDoList
        </h2>
        <p>You can add, delete, complete, or edit tasks</p>
        <div className="addTask">
          <input
            type="text"
            placeholder="Add Task"
            value={newTask}
            onChange={handleChange}
          />
          <button onClick={addtoList}>Add</button>
        </div>
        <div className="taskList">
          {todoList.map((task, index) => (
            <Task
              key={task.id}
              taskName={task.taskName}
              id={task.id}
              completion={task.completion}
              createdAt={task.createdAt}
              isEditing={isEditing}
              editedTask={editedTask}
              editedTaskID={editedTaskID}
              index={index}
              moveUp={moveUp}
              moveDown={moveDown}
              handleUpdate={handleUpdate}
              deleteFromList={deleteFromList}
              onComplete={onComplete}
              onEdit={onEdit}
              saveEdit={saveEdit}
            />
          ))}
        </div>
        <button className="logout" onClick={handleLogout}>
          Sign Out
        </button>
      </div>
    );
  }
};
