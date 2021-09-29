export class Subscribable<MessageType> {
  private subscribers: Set<(msg: MessageType) => void> = new Set();

  constructor() {}

  subscribe(cb: (msg: MessageType) => void): () => void {
    this.subscribers.add(cb);
    return () => {
      this.subscribers.delete(cb);
    };
  }

  publish(msg: MessageType): void {
    this.subscribers.forEach((cb) => cb(msg));
  }
}
