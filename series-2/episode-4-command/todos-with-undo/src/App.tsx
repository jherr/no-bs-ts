import React, { useRef } from "react";
import { useStateWithUndo } from "./useStateWithUndo";

interface Todo {
  id: number;
  text: string;
  done: boolean;
}

function App() {
  const [todos, setTodos, undo] = useStateWithUndo<Todo[]>([]);

  const todoText = useRef<HTMLInputElement>(null);

  return (
    <div className="App">
      {todos.map((todo) => (
        <div key={todo.id}>
          <input
            type="checkbox"
            checked={todo.done}
            onChange={() =>
              setTodos(todos.map((todo) => ({ ...todo, done: !todo.done })))
            }
          />
          <label>{todo.text}</label>
        </div>
      ))}
      <div>
        <input type="text" ref={todoText} />
        <button
          onClick={() =>
            setTodos([
              ...todos,
              {
                id: todos.length + 1,
                text: todoText.current!.value,
                done: false,
              },
            ])
          }
        >
          Add
        </button>
      </div>
      <div>
        <button onClick={undo}>Undo</button>
      </div>
    </div>
  );
}

export default App;
