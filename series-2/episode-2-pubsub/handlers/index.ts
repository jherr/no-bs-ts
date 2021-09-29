import fs from "fs";

export function createHandlerStack<MessageType>() {
  const subscribers: Set<(msg: MessageType) => undefined | unknown> = new Set();

  return {
    subscribe(cb: (msg: MessageType) => undefined | unknown): () => void {
      subscribers.add(cb);
      return () => {
        subscribers.delete(cb);
      };
    },

    publish(msg: MessageType): undefined | unknown {
      let data: unknown;
      for (const subscriber of Array.from(subscribers)) {
        data = subscriber(msg);
        if (data !== undefined) {
          break;
        }
      }
      return data;
    },
  };
}

const handlers = createHandlerStack<{
  name: string;
  contents: string;
}>();

handlers.subscribe(({ name, contents }) => {
  if (name.endsWith(".json")) {
    return JSON.parse(contents);
  }
});
handlers.subscribe(({ contents }) => contents);

for (const name of fs.readdirSync("./files")) {
  const contents = fs.readFileSync(`./files/${name}`, "utf8");
  const output = handlers.publish({ name, contents });
  console.log(`${name}: ${JSON.stringify(output)}`);
}
