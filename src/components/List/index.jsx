import React from "react";
import classNames from "classnames";
import axios from "axios";

import removeSvg from "../../assets/img/remove.svg";

import Badge from "../Badge";

import "./List.scss";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const List = ({
  items,
  isRemovable,
  onClick,
  onRemove,
  onClickItem,
  activeItem
}) => {
  const [visiblePopup, setVisiblePopup] = useState(false);
  const [itemToDelete, setItemToDelete] = useState("");
  let history = useHistory();

  const removeList = item => {
    if (itemToDelete) {
      axios.delete("http://localhost:3001/lists/" + item.id).then(() => {
        onRemove(item.id);
        setVisiblePopup(false);
        history.push(`/`);
      });
    }
  };

  const onDelete = item => {
    setVisiblePopup(true);
    setItemToDelete(item);
  };

  return (
    <>
      <ul onClick={onClick} className="list">
        {items.map((item, index) => (
          <li
            key={index}
            className={classNames(item.className, {
              active: item.active
                ? item.active
                : activeItem && activeItem.id === item.id
            })}
            onClick={onClickItem ? () => onClickItem(item) : null}
          >
            <i>{item.icon ? item.icon : <Badge color={item.color.name} />}</i>
            <span>
              {item.name}
              {item.tasks && ` (${item.tasks.length})`}
            </span>
            {isRemovable && (
              <img
                className="list__remove-icon"
                src={removeSvg}
                alt="Remove icon"
                onClick={() => onDelete(item)}
              />
            )}
          </li>
        ))}
      </ul>
      {visiblePopup && (
        <div className="list__delete">
          <p>Are you sure you want to delete "{itemToDelete.name}"?</p>

          <button
            onClick={() => removeList(itemToDelete)}
            className="button button--red"
          >
            Delete
          </button>
          <button
            onClick={() => setVisiblePopup(false)}
            className="button button--grey"
          >
            Cancel
          </button>
        </div>
      )}
    </>
  );
};

export default List;
