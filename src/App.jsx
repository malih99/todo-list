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

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const totalTasks = todos.length;
  const remainingTasks = todos.filter((todo) => !todo.completed).length;

  useEffect(() => {
    if (todos.length > 0) {
      toast.success(`تعداد کارهای باقی‌مانده: ${remainingTasks}`);
    }
  }, [remainingTasks]);

  return (
    <div
      className="min-h-screen min-w-screen flex flex-col items-center justify-center
                 bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100 transition-all"
      dir="rtl"
      lang="fa"
    >
      <Toaster />

      {/* سوییچر تم: pointer-events روی ظرف بیرونی قطع تا روی فرم نیفتد */}
      <div className="fixed top-4 right-4 md:top-6 md:right-6 pointer-events-none z-50">
        <div className="inline-block pointer-events-auto">
          <DarkModeToggle />
        </div>
      </div>

      <div className="w-full max-w-3xl px-4 sm:px-8">
        {/* کارت فرم: relative تا z-index بچه‌ها کار کند */}
        <div className="relative bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white text-center">
            📝 To-Do List
          </h1>

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
