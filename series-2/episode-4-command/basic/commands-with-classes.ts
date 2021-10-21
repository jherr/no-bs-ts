abstract class Command<State> {
  abstract execute(state: State): State;
  abstract undo(state: State): State;
}

class CommandStack<State> {
  private stack: Command<State>[] = [];

  constructor(private _state: State) {}

  get state() {
    return this._state;
  }

  execute(command: Command<State>) {
    this._state = command.execute(this._state);
    this.stack.push(command);
  }

  undo() {
    const command = this.stack.pop();
    if (command) {
      this._state = command.undo(this._state);
    }
  }
}

class AddOne extends Command<number> {
  execute(state: number) {
    return state + 1;
  }
  undo(state: number) {
    return state - 1;
  }
}

class SubtractOne extends Command<number> {
  execute(state: number) {
    return state - 1;
  }
  undo(state: number) {
    return state + 1;
  }
}

class SetValue extends Command<number> {
  private _originalValue?: number;
  constructor(private value: number) {
    super();
  }
  execute(state: number) {
    this._originalValue = state;
    return this.value;
  }
  undo(state: number) {
    return this._originalValue!;
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
