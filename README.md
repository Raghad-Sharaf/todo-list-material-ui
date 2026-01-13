# Todo List Application

A modern, feature-rich todo list application built with React. This project demonstrates advanced React patterns and state management techniques using Context API and the useReducer hook.

## Overview

This todo application allows users to create, update, delete, and filter tasks with persistent storage. It showcases a clean component architecture and efficient state management without external state management libraries like Redux.

## Technical Skills Demonstrated

### State Management
- **Context API + useReducer Pattern**: Implemented a Redux-like state management approach using React's built-in Context API and useReducer hook
- **Custom Hooks**: Created reusable custom hooks (`useTasks`, `useTasksDispatch`, `useToast`) for clean separation of concerns
- **Provider Pattern**: Utilized component composition with multiple context providers for organized state distribution
- **Immutable State Updates**: All state mutations follow immutable patterns to ensure predictable state changes

### React Hooks
- **useState**: Managing local component state (dialogs, input fields, UI controls)
- **useEffect**: Side effects handling, including localStorage data fetching on component mount
- **useMemo**: Performance optimization for filtering completed/incomplete tasks
- **useContext**: Accessing context values throughout the component tree
- **useReducer**: Centralized state management with action-based state updates

### UI/UX
- **Material-UI (MUI)**: Comprehensive UI component library with custom theme configuration
- **Custom Theme**: Fully customized Material-UI theme with custom color palette, typography, and component overrides
- **Dialog Components**: Confirmation dialogs for delete and update operations
- **Toast Notifications**: Custom toast notification system using Context API
- **Responsive Design**: Grid-based layout system for flexible, responsive UI
- **Progress Indicators**: Visual progress representation with gradient backgrounds and circular progress indicators

### Data Persistence
- **LocalStorage Integration**: All task data persists to browser's localStorage
- **JSON Serialization**: Proper data serialization/deserialization for storage
- **Error Handling**: Null-safe localStorage operations to prevent runtime errors

### Code Architecture
- **Reducer Pattern**: Centralized reducer function handling all state mutations (add, delete, update, toggle, get)
- **Action-Based Updates**: Clear action types and payload structure for state changes
- **Component Separation**: Logical separation between container components (TodoList) and presentational components (Task)
- **Custom Context Providers**: Separate contexts for tasks and toast notifications

### Additional Features
- **Task Filtering**: Dynamic filtering by completion status (all, complete, incomplete)
- **Form Validation**: Input validation and controlled components

## Technologies Used

- **React 19.1.0** - Latest React version
- **Material-UI (MUI) 7.2.0** - UI component library
- **UUID 11.1.0** - Unique identifier generation

## Key Implementation Details

The application uses a reducer pattern where all state changes go through a single reducer function. Each action type (add, delete, update, toggle, get) handles its specific logic and automatically syncs with localStorage. This ensures data consistency and provides a clear audit trail of state changes.

The Context API is split into separate contexts - one for tasks and one for toast notifications - following the single responsibility principle and preventing unnecessary re-renders.

Performance is optimized through the use of `useMemo` for expensive filtering operations, ensuring the filtered task lists are only recalculated when the tasks array changes.

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

---

*Built as a learning project to explore React patterns and state management techniques.*
