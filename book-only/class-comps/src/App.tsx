import React from "react";
import "./App.css";

interface ButtonProps
  extends React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  title?: string;
}

class Button extends React.Component<ButtonProps> {
  render() {
    return (
      <button
        style={{
          background: "red",
          color: "white",
          fontSize: "1.5em",
          padding: 10,
          borderRadius: 5,
          border: "none",
        }}
        {...this.props}
      >
        {this.props.title ?? this.props.children}
      </button>
    );
  }
}

interface TimerProps {
  duration: number;
}

class Timer extends React.Component<
  TimerProps,
  {
    currentTime: number;
    timer: NodeJS.Timeout | null;
  }
> {
  static defaultProps = {
    duration: 120,
  };

  startTime: number = 0;

  constructor(props: TimerProps) {
    super(props);
    this.state = {
      currentTime: 0,
      timer: null,
    };

    this.onTick = this.onTick.bind(this);
    this.onStop = this.onStop.bind(this);
    this.onRestart = this.onRestart.bind(this);
  }

  componentDidMount() {
    this.onRestart();
  }

  componentWillUnmount() {
    if (this.state.timer) {
      clearInterval(this.state.timer);
    }
  }

  onTick() {
    this.setState({
      currentTime: Math.max(
        Math.floor(this.props.duration - (Date.now() - this.startTime) / 1000),
        0
      ),
    });
  }

  onRestart() {
    this.startTime = Date.now();
    this.setState({
      timer: setInterval(this.onTick, 200),
    });
  }

  onStop() {
    if (this.state.timer) {
      clearInterval(this.state.timer);
    }
    this.setState({
      timer: null,
    });
  }

  render() {
    return (
      <>
        <p>Current time: {this.state.currentTime}</p>
        <p>Duration: {this.props.duration}</p>
        {this.state.timer ? (
          <Button onClick={this.onStop}>Stop</Button>
        ) : (
          <Button onClick={this.onRestart}>Restart</Button>
        )}
      </>
    );
  }
}

function App() {
  return (
    <div className="App">
      <Timer />
    </div>
  );
}

export default App;
