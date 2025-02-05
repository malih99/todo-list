import { motion, AnimatePresence } from "framer-motion";
import TodoItem from "./TodoItem";

export default function TodoList({ todos, setTodos }) {
  return (
    <div className="mt-4 w-full space-y-3">
      <AnimatePresence>
        {todos.map((todo) => (
          <motion.div
            key={todo.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
          >
            <TodoItem todo={todo} setTodos={setTodos} />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
