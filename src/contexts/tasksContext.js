import { createContext, useReducer, useContext } from "react";
import tasksReducer from "../reducers/tasksReducer";

export const TasksContext = createContext([]);
export const DispatchContext = createContext(null);

const TasksProvider = ({ children }) => {
  const [tasks, dispatch] = useReducer(tasksReducer, []);
  return (
    <TasksContext.Provider value={tasks}>
      <DispatchContext.Provider value={dispatch}>
        {children}
      </DispatchContext.Provider>
    </TasksContext.Provider>
  );
};

// Define custom Hook to use Tasks context
export const useTasks = () => {
  return useContext(TasksContext);
};

// Define custom Hook to use Dispatch context
export const useTasksDispatch = () => {
  return useContext(DispatchContext);
};

export default TasksProvider;
