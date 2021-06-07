import create from "zustand";

interface Todo {
  id: number;
  done: boolean;
  text: string;
}

const useTodos = create<{
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (removeId: number) => void;
}>((set) => ({
  todos: [{ id: 0, text: "Hey there", done: false }],
  addTodo: (text: string) =>
    set((state) => ({
      ...state,
      todos: [
        ...state.todos,
        {
          id: state.todos.length,
          text,
          done: false,
        },
      ],
    })),
  removeTodo: (removeId: number) =>
    set((state) => ({
      ...state,
      todos: state.todos.filter(({ id }) => id !== removeId),
    })),
}));

export default useTodos;
