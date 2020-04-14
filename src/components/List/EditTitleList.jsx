import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import editSvg from "../../assets/img/edit.svg";
import InputField from "../Tasks/InputField";

const EditTitleList = ({ list, onEditTitle }) => {
  const [visibleForm, setFormVisible] = useState(false);
  const [inputValue, setInputValue] = useState(list.name);
  const [isLoading, setIsLoading] = useState("");
  const [error, setError] = useState(false);

  const toggleFormVisible = () => {
    setFormVisible(!visibleForm);
    setInputValue(list.name);
    setError(false)
  };

  const editItem = () => {
    if (inputValue === "") {
      setError(true);
      return error;
    }

    setIsLoading(true);

    if (inputValue) {
      onEditTitle(list.id, inputValue);
      axios
        .patch("http://localhost:3001/lists/" + list.id, {
          name: inputValue
        })
        .catch(() => {
          alert("Cant reload list");
        })
        .finally(() => {
          toggleFormVisible();
          setIsLoading(false);
        });
    }
  };

  return (
    <div className="tasks__form">
      {!visibleForm ? (
        <Link to={`/lists/${list.id}`}>
          <h2 style={{ color: list.color.hex }} className="tasks__title">
            {list.name}
            <img onClick={toggleFormVisible} src={editSvg} alt="Edit icon" />
          </h2>
        </Link>
      ) : (
        <InputField
          toggleFormVisible={toggleFormVisible}
          inputValue={inputValue}
          setInputValue={setInputValue}
          editItem={editItem}
          isLoading={isLoading}
          error={error}
          setError={setError}
        />
      )}
    </div>
  );
};

export default EditTitleList;
