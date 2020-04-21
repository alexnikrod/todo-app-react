import React from "react";
import classNames from "classnames";
import { useState } from "react";
import { useHistory } from "react-router-dom";

import removeSvg from "../../assets/img/remove.svg";
import Badge from "../Badge";
import { todoAPI } from "../../api/api";

import "./List.scss";

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
      todoAPI.removeList(item.id).then(() => {
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

  const showHideOverlay = visiblePopup
    ? "overlay display-block"
    : "overlay display-none";

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
        <div className={showHideOverlay}>
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
        </div>
      )}
    </>
  );
};

export default List;
