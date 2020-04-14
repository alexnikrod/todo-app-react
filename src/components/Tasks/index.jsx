import React from "react";

import EditTitleList from "../List/EditTitleList";
import AddTaskForm from "./AddTaskForm";
import Task from "./Task";

import "./Tasks.scss";

const Tasks = ({
  list,
  onEditTitle,
  onAddTask,
  onRemoveTask,
  onEditTask,
  onCompleteTask,
  withoutEmpty
}) => {
  return (
    <div className="tasks">
      <EditTitleList list={list} onEditTitle={onEditTitle} />
      <div className="tasks__items">
        {!withoutEmpty && list.tasks && !list.tasks.length && <h2>No Tasks</h2>}
        {list.tasks &&
          list.tasks.map(task => (
            <Task
              key={task.id}
              list={list}
              onEdit={onEditTask}
              onRemove={onRemoveTask}
              onComplete={onCompleteTask}
              {...task}
            />
          ))}
        <AddTaskForm key={list.id} list={list} onAddTask={onAddTask} />
      </div>
    </div>
  );
};

export default Tasks;
