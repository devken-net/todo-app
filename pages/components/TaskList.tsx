import React, { useEffect, memo } from 'react'
import { ITask } from '../../shared/model'

import {
  DragDropContext,
  Droppable,
  DropResult,
  resetServerContext
} from 'react-beautiful-dnd';
import TaskItem from './TaskItem';

import { useTasksContext } from '../../context/TasksProvider'

import styles from '../../styles/TaskList.module.css'

const reorder = (
  list: ITask[],
  startIndex: number,
  endIndex: number
): ITask[] => {
  const result = [ ...list ];
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

const updatePriorities = (list: ITask[]): ITask[] => {
  return list.map((item, i) => {
    item.priority = i
    return item
  })
}

const TaskList = () => {
  const { availableTaskList, setAvailableTaskList, updateTask } = useTasksContext()
  const onDragEnd = ({ destination, source }: DropResult) => {
    if (destination) {
      const updatedTasksList = updatePriorities(reorder( availableTaskList, source.index, destination.index))
      
      setAvailableTaskList(updatedTasksList)
      updateTask(updatedTasksList)
    }
  }

  useEffect(() => {
    resetServerContext()
  }, [availableTaskList])

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable-list">
        {(provided: any) => (
          <div className={styles.root} ref={provided.innerRef} {...provided.droppableProps}>
            {availableTaskList.map((item: any, index: number) => (
              <TaskItem item={item} index={index} key={item.id} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default memo(TaskList);
