type CommandFunction<State> = (state: State) => State;

function createCommandStack<State>(state: State) {
  const stack: string[] = [JSON.stringify(state)];

  return {
    execute(command: CommandFunction<State>) {
      const currentState = JSON.parse(stack[stack.length - 1]);
      const newState = command(currentState);
      stack.push(JSON.stringify(newState));
      return newState;
    },
    undo() {
      if (stack.length > 1) {
        stack.pop();
      }
      return JSON.parse(stack[stack.length - 1]);
    },
  };
}

const addOne: CommandFunction<number> = (state) => state + 1;
const subtractOne: CommandFunction<number> = (state) => state - 1;
const createSetValue = (value: number): CommandFunction<number> => {
  return () => value;
};

const cStack = createCommandStack(0);
console.log(cStack.execute(addOne));
console.log(cStack.undo());
console.log(cStack.execute(subtractOne));
console.log(cStack.undo());

const setTo42 = createSetValue(42);
console.log(cStack.execute(setTo42));
console.log(cStack.undo());
