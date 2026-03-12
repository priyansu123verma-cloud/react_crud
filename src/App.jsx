import { useState, useEffect } from "react";
import Form from "./components/form";
import Items from "./components/items";
import { groceryItems } from "./data/groceryItems";
import "./App.css";

const getLocalData = () => {
  const stored = localStorage.getItem("groceries");

  if (stored) {
    return JSON.parse(stored);
  }

  return groceryItems;
};

const App = () => {
  const [items, setItems] = useState(getLocalData());

  const [editId, setEditId] = useState(null);
  const [editName, setEditName] = useState("");

  useEffect(() => {
    localStorage.setItem("groceries", JSON.stringify(items));
  }, [items]);

  const addItem = (name) => {
    const newItem = {
      id: Date.now(),
      name,
      completed: false,
    };

    setItems([...items, newItem]);
  };

  const editCompleted = (id) => {
    setItems(
      items.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item,
      ),
    );
  };

  const deleteItem = (id) => {
    if (!confirm("Delete this item?")) return;
    setItems(items.filter((item) => item.id !== id));
  };

  const startEdit = (item) => {
    setEditId(item.id);
    setEditName(item.name);
  };

  const updateItem = (name) => {
    setItems(
      items.map((item) => (item.id === editId ? { ...item, name } : item)),
    );

    setEditId(null);
    setEditName("");
  };

  return (
    <section className="section-center">
      <h2 className="title">Grocery List</h2>

      <Form
        addItem={addItem}
        updateItem={updateItem}
        editId={editId}
        editName={editName}
        setEditName={setEditName}
      />

      <Items
        items={items}
        editCompleted={editCompleted}
        deleteItem={deleteItem}
        startEdit={startEdit}
      />
    </section>
  );
};

export default App;
