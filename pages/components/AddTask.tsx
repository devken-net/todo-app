import { FormEvent, useState } from 'react'

import TextField from '@material-ui/core/TextField'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'

import styles from '../../styles/Home.module.css'
import { useTasksContext } from '../../context/TasksProvider'


const AddTask = () => {
  const { addTask } = useTasksContext()
  const [ newTask, setNewTask ] = useState('')

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    addTask(newTask)
    setNewTask('')
}

  return (
    <form className={styles.root} noValidate autoComplete="off" onSubmit={onSubmit}>
      <TextField id="outlined-basic" value={newTask} onChange={(e) => setNewTask(e.target.value) } placeholder="Add task" variant="outlined" />
      <IconButton color="primary" aria-label="upload picture" component="span">
        <Icon style={{ fontSize: 30 }} color="primary">add_circle</Icon>
      </IconButton>
  </form>
  )
}

export default AddTask
