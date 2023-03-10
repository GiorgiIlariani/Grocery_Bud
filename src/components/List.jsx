import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

const List = ({ list, removeItem, editName }) => {
  return (
    <div className="article-container">
      {list.map((item) => {
        const { title, id } = item;
        return (
          <article className="each-item" key={id}>
            <h4 className="added-item">{title}</h4>
            <div className="btn-container">
              <button className="edit-btn" onClick={() => editName(id)}>
                <FaEdit />
              </button>
              <button className="delete-btn" onClick={() => removeItem(id)}>
                <FaTrash />
              </button>
            </div>
          </article>
        );
      })}
    </div>
  );
};

export default List;
