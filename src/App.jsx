import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import DarkModeToggle from "./components/DarkModeToggle";
import { Toaster } from "react-hot-toast";

export default function App() {
  // مقدار اولیه از localStorage گرفته می‌شود
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // 📌 هر بار که todos تغییر کند، در localStorage ذخیره کن
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
  }, [todos]);

  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 transition-all">
      <Toaster />

      {/* دکمه دارک مود */}
      <div className="absolute top-2 right-10">
        <DarkModeToggle />
      </div>

      {/* باکس To-Do List */}
      <div className="w-full max-w-3xl px-4 sm:px-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white text-center flex items-center justify-center">
            📝 To-Do List
          </h1>
          <TodoInput setTodos={setTodos} />
          <TodoList todos={todos} setTodos={setTodos} />
        </div>
      </div>
    </div>
  );
}
