import { createMachine, assign } from "xstate";
import { useCallback, useEffect } from "react";
import { useMachine } from "@xstate/react";

interface Todo {
  id: number;
  done: boolean;
  text: string;
}

const todoMachine = createMachine<
  {
    todos: Todo[];
  },
  | { type: "END_WORKING" }
  | { type: "START_WORKING" }
  | { type: "SET_TODOS"; todos: Todo[] }
  | { type: "ADD_TODO"; text: string }
  | { type: "REMOVE_TODO"; id: number }
>(
  {
    id: "todoMachine",
    initial: "editing",
    context: {
      todos: [],
    },
    states: {
      editing: {
        on: {
          START_WORKING: {
            target: "working",
            cond: "haveUndoneTodos",
          },
          ADD_TODO: {
            actions: assign({
              todos: ({ todos }, { text }) => [
                ...todos,
                {
                  id: todos.length,
                  text,
                  done: false,
                },
              ],
            }),
          },
          REMOVE_TODO: {
            actions: assign({
              todos: ({ todos }, { id: removeId }) =>
                todos.filter(({ id }) => id !== removeId),
            }),
          },
          SET_TODOS: {
            actions: assign({
              todos: (_, { todos }) => todos,
            }),
          },
        },
      },
      working: {
        exit: assign({
          todos: ({ todos }) => {
            const newTodos = [...todos];
            const undoneTodo = newTodos.find(({ done }) => !done);
            if (undoneTodo) {
              undoneTodo.done = true;
            }
            return newTodos;
          },
        }),
        on: {
          END_WORKING: {
            target: "editing",
          },
        },
      },
    },
  },
  {
    guards: {
      haveUndoneTodos: ({ todos }) => todos.some(({ done }) => !done),
    },
  }
);

export function useTodos(initialTodos: Todo[]): {
  isEditing: boolean;
  todos: Todo[];
  addTodo: (text: string) => void;
  removeTodo: (id: number) => void;
  startWorking: () => void;
  endWorking: () => void;
} {
  const [state, send] = useMachine(todoMachine);

  useEffect(() => {
    send({ type: "SET_TODOS", todos: initialTodos });
  }, [send, initialTodos]);

  const addTodo = useCallback(
    (text: string) => {
      send({
        type: "ADD_TODO",
        text,
      });
    },
    [send]
  );

  const removeTodo = useCallback(
    (id: number) => {
      send({
        type: "REMOVE_TODO",
        id,
      });
    },
    [send]
  );

  const startWorking = useCallback(() => {
    send("START_WORKING");
  }, [send]);
  const endWorking = useCallback(() => {
    send("END_WORKING");
  }, [send]);

  return {
    isEditing: state.matches("editing"),
    todos: state.context.todos,
    addTodo,
    removeTodo,
    startWorking,
    endWorking,
  };
}
