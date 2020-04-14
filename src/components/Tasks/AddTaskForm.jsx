import React, { useState } from "react";
import axios from "axios";

import addtSvg from "../../assets/img/add.svg";
import InputField from "./InputField";

const AddTaskForm = ({ list, onAddTask }) => {
  const [visibleForm, setFormVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState("");
  const [error, setError] = useState(false);

  const toggleFormVisible = () => {
    setFormVisible(!visibleForm);
    setInputValue("");
    setError(false)
  };

  const addTask = (e) => {
    if (inputValue === "") {
      setError(true);
      return error;
    }

    const obj = {
      listId: list.id,
      text: inputValue,
      completed: false
    };
    setIsLoading(true);
    axios
      .post("http://localhost:3001/tasks", obj)
      .then(({ data }) => {
        onAddTask(list.id, data);
        toggleFormVisible();
      })
      .catch(() => {
        alert("Error");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="tasks__form">
      {!visibleForm ? (
        <div onClick={toggleFormVisible} className="tasks__form-new">
          <img src={addtSvg} alt="Add Icon" />
          <span>New Task</span>
        </div>
      ) : (
        <InputField
          toggleFormVisible={toggleFormVisible}
          inputValue={inputValue}
          setInputValue={setInputValue}
          addTask={addTask}
          isLoading={isLoading}
          placeholder="Task text"
          error={error}
          setError={setError}
        />
      )}
    </div>
  );
};

export default AddTaskForm;
