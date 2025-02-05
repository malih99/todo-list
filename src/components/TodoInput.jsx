import { useState } from "react";
import { toast } from "react-hot-toast";

export default function TodoInput({ setTodos }) {
  const [task, setTask] = useState("");

  const addTask = () => {
    if (!task.trim()) return;

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
      date: new Date().toLocaleString(),
    };

    setTodos((prev) => [...prev, newTask]);
    setTask("");
    toast.success("✅ تسک با موفقیت اضافه شد!");
  };

  return (
    <div className="flex items-center space-x-3">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Write the new task ..."
        className="flex-1 p-3 border rounded-lg focus:outline-none dark:bg-gray-700 dark:text-white bg-gray-100"
      />
      <button
        onClick={addTask}
        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-5 py-2 rounded-lg shadow-lg font-semibold transition-all transform hover:scale-105 hover:shadow-xl active:scale-95"
      >
        ➕ Add
      </button>
    </div>
  );
}
