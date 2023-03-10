import React, { useEffect, useState } from "react";
import Alert from "./components/Alert";
import List from "./components/List";

const getLocalStorage = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

const App = () => {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    truth: false,
    msg: "",
    className: "",
  });

  const alertFunction = (msg, className) => {
    setAlert({
      truth: true,
      msg,
      className,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    const newValue = {
      id: Math.random(),
      title: name,
    };

    if (!name) {
      alertFunction("please enter value", "danger");
    }

    if (isEditing && name) {
      setList(
        list.map((item) => {
          if (item.id === editID) {
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
    }

    if (name.trim().length > 30) {
      alertFunction("can not add more than 30 chars", "danger");
    }

    if (!isNaN(name) && name.trim() !== "") {
      alertFunction("can not add numbers", "danger");
    }

    if (
      name.trim() !== "" &&
      name.trim().length < 30 &&
      isNaN(name) &&
      !isEditing
    ) {
      setList([...list, newValue]);
      alertFunction(`${newValue.title} was added succesfully`, "success");
    }

    setName("");
  };

  const editName = (id) => {
    const edit = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(edit.title);
  };

  const removeItem = (id) => {
    const newItems = list.filter((item) => item.id !== id);
    const removedItem = list.find((item) => item.id === id);

    setList([...newItems]);
    alertFunction(`${removedItem.title} was removed succesfully`, "danger");
  };

  const removeAllItem = () => {
    setList([]);

    if (list.length === 0) {
      alertFunction("No  Items to remove", "danger");
    } else {
      alertFunction("All items removed", "danger");
    }
  };

  const removeAlert = () => {
    alertFunction("", "");
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list));
  }, [list]);

  return (
    <div className="main-center">
      {alert.truth && (
        <Alert
          alert={alert}
          removeAlert={removeAlert}
          list={list}
          submitHandler={submitHandler}
        />
      )}
      <h2 className="title">Grocery Items</h2>
      <form onSubmit={submitHandler} className="form-control">
        <input
          type="text"
          placeholder="e.g eggs"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button type="submit" className="submit-btn">
          {isEditing ? "edit" : "submit"}
        </button>
      </form>
      <List list={list} removeItem={removeItem} editName={editName} />
      <button className="clear-btn" onClick={removeAllItem}>
        Clear Items
      </button>
    </div>
  );
};

export default App;
