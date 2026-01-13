import { v4 as uuidv4 } from "uuid";

export default function reducer(currentTasks, action) {
  switch (action.type) {
    case "add": {
      const newTask = {
        id: uuidv4(),
        title: action.payload.title,
        details: "",
        isCompleted: false,
      };

      const updatedTasks = [...currentTasks, newTask];

      // Save tasks to local storage
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      return updatedTasks;
    }
    case "delete": {
      const updatedTasks = currentTasks.filter((t) => {
        return t.id !== action.payload.id;
      });

      // Save tasks to local storage
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      return updatedTasks;
    }
    case "update": {
      const updatedTasks = currentTasks.map((t) => {
        if (t.id === action.payload.id) {
          return {
            ...t,
            title: action.payload.title,
            details: action.payload.details,
          };
        } else {
          return t;
        }
      });

      // Save tasks to local storage
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      return updatedTasks;
    }
    case "get": {
      // Get tasks from local storage
      const storageTasks = JSON.parse(localStorage.getItem("tasks"));
      //   setTasks(storageTasks || []);
      return storageTasks || [];
    }
    case "toggleCheckBtn": {
      const updatedTasks = currentTasks.map((t) => {
        if (t.id === action.payload.id) {
          //t.isCompleted = !t.isCompleted; //mutation, not allowed!
          const updatedTask = { ...t, isCompleted: !t.isCompleted };
          return updatedTask;
        }
        return t;
      });

      // Save tasks to local storage
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));

      return updatedTasks;
    }
    default: {
      throw Error("Unknown Action" + action.type);
    }
  }
}
