import React, { useState, useEffect } from "react";

import List from "../List/List";
import Badge from "../Badge";
import { todoAPI } from "../../api/api";

import closeSvg from "../../assets/img/close.svg";

import "./AddList.scss";

const AddList = ({ colors, onAdd }) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [selectedColor, selectColor] = useState(3);
  const [isLoading, setIsLoading] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    if (Array.isArray(colors)) {
      selectColor(colors[0].id);
    }
  }, [colors]);

  const onClose = () => {
    setVisiblePopup(false);
    setInputValue("");
    selectColor(colors[0].id);
    setError(false);
  };

  const addList = () => {
    if (!inputValue) {
      setError(true);
      return error;
    }
    
    setIsLoading(true);
    todoAPI.addList(inputValue, selectedColor).then(data => {
      const color = colors.filter(c => c.id === selectedColor)[0];
      const listObj = { ...data, color, tasks: [] };
      onAdd(listObj);
      onClose();
    })
    .finally(() => {
      setIsLoading(false);
    });
  };

  const onChange = e => {
    setInputValue(e.target.value);
    setError(false);
  };

  const handleBlur = e => {
    const currentTarget = e.currentTarget;

    setTimeout(() => {
      if (!currentTarget.contains(document.activeElement)) {
        onClose();
      }
    }, 0);
  };

  return (
    <div className="add-list">
      <List
        onClick={() => setVisiblePopup(true)}
        items={[
          {
            className: "list__add-button",
            icon: (
              <svg
                width="10"
                height="10"
                viewBox="0 0 16 16"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8 1V15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M1 8H15"
                  stroke="black"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            ),
            name: "Add List"
          }
        ]}
      />
      {visiblePopup && (
        <div
          className="add-list__popup"
          tabIndex="1"
          onBlur={e => handleBlur(e)}
        >
          <img
            onClick={onClose}
            src={closeSvg}
            alt="Close button"
            className="add-list__popup-close-btn"
          ></img>
          <input
            value={inputValue}
            autoFocus
            onChange={onChange}
            className={error ? `${"field"} + ${"field__popError"}` : "field"}
            type="text"
            placeholder="List name"
            required
          />

          <div className="add-list__popup-colors">
            {colors.map(color => (
              <Badge
                onClick={() => selectColor(color.id)}
                key={color.id}
                color={color.name}
                className={selectedColor === color.id && "active"}
              />
            ))}
          </div>
          <button onClick={addList} className="button">
            {isLoading ? "Adding..." : "Add"}
          </button>
        </div>
      )}
    </div>
  );
};

export default AddList;
