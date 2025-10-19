import { useState, useEffect } from "react";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";
import DarkModeToggle from "./components/DarkModeToggle";
import { Toaster, toast } from "react-hot-toast";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  // ذخیره در localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // محاسبه تعداد کل و تعداد باقی‌مانده
  const totalTasks = todos.length;
  const remainingTasks = todos.filter((todo) => !todo.completed).length;

  // نمایش نوتیف هنگام اتمام کارها
  useEffect(() => {
    if (todos.length > 0) {
      toast.success(`تعداد کارهای باقی‌مانده: ${remainingTasks}`);
    }
  }, [remainingTasks]);

  return (
    <div className="min-h-screen min-w-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 transition-all">
      <Toaster />

      {/* دکمه دارک مود */}
      <div className="absolute top-13 right-110">
        <DarkModeToggle />
      </div>

      {/* باکس To-Do List */}
      <div className="w-full max-w-3xl px-4 sm:px-8">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white text-center flex items-center justify-center">
            📝 To-Do List
          </h1>

          {/* نمایش تعداد کارها */}
          <div className="flex justify-between items-center text-gray-700 dark:text-gray-300 mb-4">
            <span className="text-lg">📋 All task number: {totalTasks}</span>
            <span className="text-lg">⏳ Remaining Task: {remainingTasks}</span>
          </div>

          <TodoInput setTodos={setTodos} />
          <TodoList todos={todos} setTodos={setTodos} />
        </div>
      </div>
    </div>
  );
}
