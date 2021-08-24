// import fs from 'fs'
// import path from 'path'
import { ITask } from '../../../shared/model'
import { tasksJSON } from './data' // TODO: use database 

export let tasksData: ITask[] = [ ...tasksJSON ]; // mock data file

const addTask = (newTask: string) => {
  const taskList = loadTasks()

  taskList.push({
    id: taskList.length + 1,
    isDone: false,
    name: newTask,
    priority: taskList.length
  })
  saveTasks(taskList)
  console.log('New task added!')
}

const updateTask = (newTask: ITask) => {
  const taskList = loadTasks()
  const newTasks = taskList.map((task: ITask) => {
      if (task.id === newTask.id) {
        return newTask
      }
      return task
  })

  saveTasks(newTasks)
  console.log('Task updated!')
}

const reorderTasks = (newTasks: ITask[]) => {
  const finishedTasks = getAllDoneTasks();
  const newTaskList = [ ...newTasks, ...finishedTasks ];

  saveTasks(newTaskList)
  console.log('Tasks reordered!')
}

const getAllAvailableTasks = () => {
  const taskList = loadTasks()
  return taskList.filter((task: ITask) => {
    return task.isDone === false
  }).sort((a:ITask, b:ITask) => a.priority - b.priority)
}

const getAllDoneTasks = () => {
  const taskList = loadTasks()
  return taskList.filter((task: ITask) => {
    return task.isDone === true
  }).sort((a:ITask, b:ITask) => a.priority - b.priority)
}

export const saveTasks = (tasks: ITask[]) => {
  // TODO: make file writing works
  // const dataJSON = JSON.stringify(tasks)
  // fs.writeFileSync('tasks.json', dataJSON)
  tasksData = [ ...tasks ];
}

export const loadTasks = () => {
  try {
      // TODO: make file reading works
      // const filePath = path.join(__dirname, "./tasks.json");
      // const tasksJSON = fs.readFileSync(filePath, 'utf8')
      // return JSON.parse(JSON.stringify(dataJSON))
      return [ ...tasksData ]
  } catch (e) {
      return []
  }
}

const removeTask = (id: number) => {
  try {
      const tasks = loadTasks();
      const newTasks = tasks.filter((task: ITask) => {
          return task.id !== id;
      })
      saveTasks(newTasks);
      console.log(id + " has been removed.");
  } catch (e) {
      return []
  }
}

export const generateResponse = () => {
  const availableTasks = getAllAvailableTasks();
  const finishedTasks = getAllDoneTasks();
  const tasks = loadTasks();

  return {
    availableTasks,
    finishedTasks
  }
}

export default function handler(req: any, res: any) {
  const tasks = loadTasks();

  // Add a new task
  if (req.method === 'POST') {
    const { name } = req.body
    addTask(name)
    return res.status(200).json(generateResponse())
  }
  // Update task
  if (req.method === 'PUT') {
    const payload = req.body
    if (Array.isArray(payload)) {
      reorderTasks(payload)
    } else {
      updateTask(payload)
    }
    return res.status(200).json(generateResponse())
  }
  // Delete task
  if (req.method === 'DELETE') {
    const { id } = req.body
    removeTask(id)
    return res.status(200).json(generateResponse())
  }
  
  return res.status(200).json(generateResponse())
}
