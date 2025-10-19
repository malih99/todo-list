import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function TodoList({ todos, setTodos }) {
  const [remainingTasks, setRemainingTasks] = useState(0);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    const count = todos.filter((todo) => !todo.completed).length;
    setRemainingTasks(count);
  }, [todos]);

  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );

    const task = todos.find((todo) => todo.id === id);
    if (!task.completed) {
      toast.success(`✅ کار "${task.text}" انجام شد!`);
    }
  };

  const handleEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const saveEdit = (id) => {
    setTodos((prev) =>
      prev.map((todo) => (todo.id === id ? { ...todo, text: editText } : todo))
    );
    setEditingId(null);
    toast.success("✅ تغییرات ذخیره شد!");
  };

  const deleteTask = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
    toast.error("❌ کار حذف شد!");
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <ul className="space-y-3 my-3">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex justify-between items-center p-4 rounded-lg transition-all ${
              todo.completed
                ? "bg-gray-300 dark:bg-gray-800 opacity-70"
                : "bg-white dark:bg-gray-700"
            }`}
          >
            <div className="flex items-center gap-3">
              {/* چک‌باکس سفارشی‌شده */}
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
                className="w-6 h-6 cursor-pointer accent-blue-500"
              />

              {editingId === todo.id ? (
                <input
                  type="text"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  className="p-2 rounded border dark:bg-gray-600 text-gray-900 dark:text-white"
                />
              ) : (
                <span
                  className={`${
                    todo.completed
                      ? "line-through text-gray-500 dark:text-gray-400"
                      : "text-gray-900 dark:text-white"
                  }`}
                >
                  {todo.text}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3">
              {/* تاریخ تسک */}
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {new Date(todo.id).toLocaleString()}
              </span>

              {/* دسته‌بندی با استایل بهتر */}
              <span
                className={`px-3 py-1 text-xs rounded-lg font-semibold ${getCategoryColor(
                  todo.category
                )}`}
              >
                {todo.category}
              </span>

              {/* دکمه‌های ویرایش و حذف */}
              {editingId === todo.id ? (
                <button
                  onClick={() => saveEdit(todo.id)}
                  className="px-3 py-1 bg-green-500 text-white rounded-md"
                >
                  ذخیره
                </button>
              ) : (
                <button
                  onClick={() => handleEdit(todo.id, todo.text)}
                  className="px-3 py-1 bg-blue-500 text-white rounded-md"
                >
                  ✏️
                </button>
              )}
              <button
                onClick={() => deleteTask(todo.id)}
                className="px-3 py-1 bg-red-500 text-white rounded-md"
              >
                🗑️
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// رنگ‌بندی دسته‌بندی‌ها
const getCategoryColor = (category) => {
  switch (category) {
    case "کاری":
      return "bg-blue-500 text-white";
    case "دانشگاه":
      return "bg-purple-500 text-white";
    case "خرید":
      return "bg-green-500 text-white";
    default:
      return "bg-gray-500 text-white";
  }
};
