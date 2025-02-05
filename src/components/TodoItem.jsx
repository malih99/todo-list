import { useState } from "react";
import { toast } from "react-hot-toast";

export default function TodoItem({ todo, setTodos }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(todo.text);

  const toggleComplete = () => {
    setTodos((prev) =>
      prev.map((item) =>
        item.id === todo.id ? { ...item, completed: !item.completed } : item
      )
    );
    if (!todo.completed) {
      toast.success("آفرین! کار انجام شد ✅");
    }
  };

  const deleteTask = () => {
    setTodos((prev) => prev.filter((item) => item.id !== todo.id));
    toast.error("تسک حذف شد 🗑️");
  };

  const saveEdit = () => {
    setTodos((prev) =>
      prev.map((item) =>
        item.id === todo.id ? { ...item, text: newText } : item
      )
    );
    setIsEditing(false);
    toast.success("ویرایش شد! ✏️");
  };

  return (
    <div className="flex items-center justify-between bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md mb-2 transition">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={toggleComplete}
          className="mr-2"
        />
        {isEditing ? (
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="border p-1 rounded bg-gray-100 dark:bg-gray-600"
          />
        ) : (
          <span
            className={`text-lg ${
              todo.completed
                ? "line-through text-gray-500 dark:text-gray-400"
                : "dark:text-white"
            }`}
          >
            {todo.text}
          </span>
        )}
      </div>
      <div className="text-sm text-gray-500 dark:text-gray-300">
        {todo.date}
      </div>
      <div className="flex space-x-2">
        {isEditing ? (
          <button
            onClick={saveEdit}
            className="text-green-500 dark:text-green-400"
          >
            ✔️
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-500 dark:text-blue-400"
          >
            ✏️
          </button>
        )}
        <button onClick={deleteTask} className="text-red-500 dark:text-red-400">
          🗑️
        </button>
      </div>
    </div>
  );
}
