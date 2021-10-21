abstract class Command<State> {
  abstract execute(state: State): State;
}

class CommandStack<State> {
  private stack: string[] = [];

  constructor(private _state: State) {
    this.stack.push(JSON.stringify(_state));
  }

  get state() {
    return JSON.parse(this.stack[this.stack.length - 1]);
  }

  execute(command: Command<State>) {
    const stringState = JSON.stringify(command.execute(this.state));
    this.stack.push(stringState);
  }

  undo() {
    if (this.stack.length > 1) {
      this.stack.pop();
    }
  }
}

class AddOne extends Command<number> {
  execute(state: number) {
    return state + 1;
  }
}

class SubtractOne extends Command<number> {
  execute(state: number) {
    return state - 1;
  }
}

class SetValue extends Command<number> {
  constructor(private value: number) {
    super();
  }
  execute(state: number) {
    return this.value;
  }
}

const cs = new CommandStack<number>(0);
console.log(cs.state);
cs.execute(new AddOne());
console.log(cs.state);
cs.undo();
console.log(cs.state);
cs.execute(new SubtractOne());
console.log(cs.state);
cs.undo();
console.log(cs.state);
cs.execute(new SetValue(42));
console.log(cs.state);
cs.undo();
console.log(cs.state);
