import { createContext, useContext, useState, useEffect } from 'react';
import { ITask } from '../shared/model'

export const TasksContext = createContext<any>({});

const baseUrl = 'http://localhost:3000'

type Props = {
  children: JSX.Element,
};
export function AppWrapper({ children }: Props) {
  const [ availableTaskList, setAvailableTaskList ] = useState([])
  const [ finishedTaskList, setFinishedTaskList ] = useState([])

  const getTasks = async () => {
    const res = await fetch(`${baseUrl}/api/tasks`)
    const tasks = await res.json()
  
    setAvailableTaskList(tasks.availableTasks)
    setFinishedTaskList(tasks.finishedTasks)
  }

  const addTask = async (task: string) => {
    const res = await fetch(`${baseUrl}/api/tasks`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: task })
    });
    const tasks = await res.json();
    setAvailableTaskList(tasks.availableTasks)
  }

  const updateTask = async (task: ITask | ITask[]) => {
    const res = await fetch(`${baseUrl}/api/tasks`, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const tasks = await res.json();
    setAvailableTaskList(tasks.availableTasks)
    setFinishedTaskList(tasks.finishedTasks)
  }

  const deleteTask = async (task: ITask) => {
    const res = await fetch(`${baseUrl}/api/tasks`, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const tasks = await res.json();
    setAvailableTaskList(tasks.availableTasks)
    setFinishedTaskList(tasks.finishedTasks)
  }

  useEffect( () => {
    getTasks();
  }, [])

  const state = {
    availableTaskList,
    setAvailableTaskList,
    finishedTaskList,
    addTask,
    updateTask,
    deleteTask
  }

  return (
    <TasksContext.Provider value={state}>
      {children}
    </TasksContext.Provider>
  );
}

export function useTasksContext() {
  return useContext(TasksContext);
}
