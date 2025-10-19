import { useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { toast } from "react-hot-toast";

function supportsDateTimeLocal() {
  const i = document.createElement("input");
  i.setAttribute("type", "datetime-local");
  return i.type === "datetime-local";
}

export default function TodoInput({ setTodos }) {
  const [text, setText] = useState("");
  const [category, setCategory] = useState("عمومی");

  const [reminder, setReminder] = useState("");

  const [datePart, setDatePart] = useState("");
  const [timePart, setTimePart] = useState("");

  const dtSupported = useMemo(supportsDateTimeLocal, []);
  const dtRef = useRef(null);
  const dateRef = useRef(null);
  const timeRef = useRef(null);

  useEffect(() => {
    if (!dtSupported) {
      if (datePart && timePart) setReminder(`${datePart}T${timePart}`);
      else setReminder("");
    }
  }, [dtSupported, datePart, timePart]);

  const addTodo = () => {
    if (!text.trim()) {
      toast.error("لطفاً متن کار را وارد کنید!");
      return;
    }
    const ts = reminder ? new Date(reminder).getTime() : null;
    const newTodo = {
      id: Date.now(),
      text,
      category,
      completed: false,
      reminder: ts,
    };
    setTodos((prev) => [...prev, newTodo]);

    setText("");
    setCategory("عمومی");
    setReminder("");
    setDatePart("");
    setTimePart("");
    toast.success("✅ کار با موفقیت اضافه شد!");
  };

  const setNow = () => {
    const now = new Date();
    const yyyy = now.getFullYear();
    const mm = String(now.getMonth() + 1).padStart(2, "0");
    const dd = String(now.getDate()).padStart(2, "0");
    const HH = String(now.getHours()).padStart(2, "0");
    const MM = String(now.getMinutes()).padStart(2, "0");
    const iso = `${yyyy}-${mm}-${dd}T${HH}:${MM}`;

    if (dtSupported) {
      setReminder(iso);
      if (dtRef.current) {
        dtRef.current.value = iso;
        dtRef.current.blur();
      }
    } else {
      setDatePart(`${yyyy}-${mm}-${dd}`);
      setTimePart(`${HH}:${MM}`);
      dateRef.current?.blur();
      timeRef.current?.blur();
    }
  };

  const handleDateTimeKey = (e) => {
    if (
      (e.altKey && (e.key === "n" || e.key === "N")) ||
      (e.ctrlKey && e.key === "Enter")
    ) {
      e.preventDefault();
      setNow();
    }
  };

  const baseField =
    "h-11 w-full rounded-xl border border-gray-300 bg-white text-gray-900 " +
    "dark:bg-gray-700 dark:text-gray-100 dark:border-gray-600 " +
    "placeholder:text-gray-400 text-sm " +
    "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent " +
    "transition";

  return (
    <div className="flex flex-col gap-3">
      <input
        type="text"
        placeholder="...Write the task"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className={baseField}
      />

      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className={baseField}
      >
        <option value="عمومی">عمومی</option>
        <option value="کاری">کاری</option>
        <option value="دانشگاه">دانشگاه</option>
        <option value="خرید">خرید</option>
      </select>

      {dtSupported ? (
        <input
          ref={dtRef}
          type="datetime-local"
          dir="ltr"
          step="60"
          value={reminder}
          onChange={(e) => {
            setReminder(e.target.value);
            setTimeout(() => dtRef.current?.blur(), 0);
          }}
          onDoubleClick={setNow}
          onKeyDown={handleDateTimeKey}
          title="دابل‌کلیک یا Alt+N / Ctrl+Enter = تنظیم روی الان"
          className={baseField}
        />
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <input
            ref={dateRef}
            type="date"
            dir="ltr"
            value={datePart}
            onChange={(e) => {
              setDatePart(e.target.value);
              e.currentTarget.blur();
            }}
            onDoubleClick={setNow}
            onKeyDown={handleDateTimeKey}
            title="دابل‌کلیک یا Alt+N / Ctrl+Enter = تنظیم روی الان"
            className={baseField}
          />
          <input
            ref={timeRef}
            type="time"
            dir="ltr"
            step="60"
            value={timePart}
            onChange={(e) => {
              setTimePart(e.target.value);
              e.currentTarget.blur();
            }}
            onDoubleClick={setNow}
            onKeyDown={handleDateTimeKey}
            title="دابل‌کلیک یا Alt+N / Ctrl+Enter = تنظیم روی الان"
            className={baseField}
          />
        </div>
      )}

      <button
        onClick={addTodo}
        className="w-full h-11 rounded-xl text-white font-bold transition 
                   bg-gradient-to-r from-blue-500 to-indigo-500
                   hover:from-blue-600 hover:to-indigo-600 active:scale-95 shadow-md"
      >
        ➕ Add
      </button>
    </div>
  );
}

TodoInput.propTypes = {
  setTodos: PropTypes.func.isRequired,
};
