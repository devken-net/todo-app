import { Draggable } from 'react-beautiful-dnd';

import makeStyles from '@material-ui/core/styles/makeStyles';
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Checkbox from '@material-ui/core/Checkbox'
import IconButton from '@material-ui/core/IconButton'
import Icon from '@material-ui/core/Icon'

import { useTasksContext } from '../../context/TasksProvider'
import { ITask } from '../../shared/model'

const useStyles = makeStyles({
  draggingListItem: {
    background: 'rgb(235,235,235)'
  }
});

export type TaskItemProps = {
  item: ITask;
  index: number;
};

const TaskItem = ({ item, index }: TaskItemProps) => {
  const { availableTaskList, setAvailableTaskList, updateTask, deleteTask } = useTasksContext()
  const classes = useStyles();
  const labelId = `checkbox-list-label-${index}`

  const handleCheckToggle = (index: number) => () => {
    const tasks = [ ...availableTaskList ]
    tasks[index].isDone = !tasks[index].isDone

    setAvailableTaskList([ ...tasks ])
    updateTask(tasks[index])
  }

  const handleDelete = (index: number) => () => {
    const tasks = [ ...availableTaskList ]
    deleteTask(tasks[index])
  }
  
  return (
    <Draggable draggableId={`item-${item.id}`} index={index}>
      {(provided: any, snapshot: any) => (
        <ListItem
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={snapshot.isDragging ? classes.draggingListItem : 'MuiListItem-root'}
        >
          <ListItemIcon onClick={handleCheckToggle(index)}>
            <Checkbox
              edge="start"
              color="primary"
              checked={item.isDone}
              disableRipple
              inputProps={{ 'aria-labelledby': labelId }}
            />
          </ListItemIcon>
          <ListItemText primary={item.name} />
          <ListItemIcon onClick={handleDelete(index)}>
            <IconButton edge="end" aria-label="comments">
              <Icon color="primary">delete</Icon>
            </IconButton>
          </ListItemIcon>
        </ListItem>
      )}
    </Draggable>
  );
};


export default TaskItem;