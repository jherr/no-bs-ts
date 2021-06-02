import { useCallback, useEffect } from "react";
import { createGlobalState } from "react-use";

interface Todo {
  id: number;
  done: boolean;
  text: string;
}

const useGlobalTodos = createGlobalState<Todo[]>([]);

export function useTodos(initialTodos: Todo[]): {
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
} {
  const [todos, setTodos] = useGlobalTodos();

  useEffect(() => {
    setTodos(initialTodos);
  }, [initialTodos, setTodos]);

  const addTodo = useCallback(
    (text: string) => {
      setTodos([
        ...todos,
        {
          id: todos.length,
          text: text,
          done: false,
        },
      ]);
    },
    [todos, setTodos]
  );

  const removeTodo = useCallback(
    (removeId: number) => {
      setTodos(todos.filter(({ id }) => id !== removeId));
    },
    [todos, setTodos]
  );

  return { todos, addTodo, removeTodo };
}
