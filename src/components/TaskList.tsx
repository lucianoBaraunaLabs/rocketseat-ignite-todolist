import { Check, Circle, Trash } from "phosphor-react";
import styles from './TaskList.module.css'

import { Todo } from '../App'
import { EmptyState } from '../components/EmptyState'
import { Task } from '../components/Task'

interface TaskListProps {
  todosList: Todo[],
  onDeleteTask: (todoId: string) => void,
  onCheckTask: (todoId: string) => void
}

export function TaskList({ todosList, onDeleteTask, onCheckTask } : TaskListProps) {
  const isEmptyTask = todosList.length <= 0;
  const countTasks = todosList.reduce((previousValue, todoCurrent) => {
    if(todoCurrent.isChecked) {
      return {
        ...previousValue,
        completed: ++previousValue.completed,
      }
    }

    return {
      ...previousValue,
      created: todosList.length,
    }

  },{created: 0, completed: 0})

  function handleDeleteTask(todoId: string) {
    onDeleteTask(todoId)
  }

  function handleCheckTask(todoId:string) {
    onCheckTask(todoId)
  }

  return (
    <section className={styles.wrap}>

      <header className={styles.header}>
        <p className={styles.taskCreated}>
          Tarefas criadas
          <span className={styles.count}>{countTasks.created}</span>
        </p>
        <p className={styles.taskCompleted}>
          Concluídas
          <span className={styles.count}>{countTasks.completed} de {countTasks.created}</span>
        </p>
      </header>

      {isEmptyTask && <EmptyState />}

      {!isEmptyTask && (
        <ul className={styles.list}>
          {todosList.map((todo) => {
            return (
              <li key={todo.id}>
                <Task
                  todo={todo}
                  onDeleteTask={handleDeleteTask}
                  onCheckTask={handleCheckTask}
                />
              </li>
            )
          })}
        </ul>
      )}

    </section>
  )
}