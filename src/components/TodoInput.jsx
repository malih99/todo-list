import { useState } from "react";
import { toast } from "react-hot-toast";

export default function TodoInput({ setTodos }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("عمومی");
  const [reminder, setReminder] = useState("");

  const addTodo = () => {
    if (!text.trim()) {
      toast.error("لطفاً متن کار را وارد کنید!");
      return;
    }

    const newTodo = {
      id: Date.now(),
      text,
      category,
      completed: false,
      reminder: reminder ? new Date(reminder).getTime() : null,
    };

    setTodos((prev) => [...prev, newTodo]);
    setText("");
    setReminder("");

    toast.success("✅ کار با موفقیت اضافه شد!");
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="Write the task..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="p-2 rounded border dark:bg-gray-700 dark:text-gray-100"
      />

      {/* دسته‌بندی */}
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="p-2 rounded border dark:bg-gray-700 dark:text-gray-100"
      >
        <option value="عمومی">عمومی</option>
        <option value="کاری">کاری</option>
        <option value="دانشگاه">دانشگاه</option>
        <option value="خرید">خرید</option>
      </select>

      {/* انتخاب تاریخ و ساعت */}
      <input
        type="datetime-local"
        value={reminder}
        onChange={(e) => setReminder(e.target.value)}
        className="p-2 rounded border dark:bg-gray-700 dark:text-gray-100"
      />

      <button
        onClick={addTodo}
        className="w-full p-3 rounded-lg text-white font-bold transition-all 
             bg-gradient-to-r from-blue-500 to-indigo-500 
             hover:from-blue-600 hover:to-indigo-600 
             active:scale-95 shadow-md"
      >
        ➕ Add
      </button>
    </div>
  );
}
