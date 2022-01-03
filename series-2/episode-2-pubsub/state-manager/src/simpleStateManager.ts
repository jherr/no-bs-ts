import { useState, useEffect } from "react";

function createSubscribable<MessageType>() {
  const subscribers: Set<(msg: MessageType) => void> = new Set();

  return {
    subscribe(cb: (msg: MessageType) => void): () => void {
      subscribers.add(cb);
      return () => {
        subscribers.delete(cb);
      };
    },

    publish(msg: MessageType): void {
      subscribers.forEach((cb) => cb(msg));
    },
  };
}

export function createStateHook<DataType>(
  initialValue: DataType
): () => [DataType, (value: DataType) => void] {
  const subscribers = createSubscribable<DataType>();
  return () => {
    const [value, setValue] = useState<DataType>(initialValue);

    useEffect(() => subscribers.subscribe(setValue), []);

    return [
      value,
      (v: DataType) => {
        subscribers.publish(v);
      },
    ];
  };
}
