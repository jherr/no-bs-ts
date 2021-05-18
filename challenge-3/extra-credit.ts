type Handlers<T> = {
  [Prop in keyof T as `filter${Capitalize<string & Prop>}`]?: (
    data: T[Prop]
  ) => boolean;
} &
  {
    [Prop in keyof T as `map${Capitalize<string & Prop>}`]?: (
      data: T[Prop]
    ) => T[Prop];
  };
type ProcessedEvent<T> = { eventName: keyof T; data: T[keyof T] };

class EventProcessor<T extends {}> {
  private handlers: Handlers<T>[] = [];
  private processed: ProcessedEvent<T>[] = [];

  handleEvent<K extends keyof T>(eventName: K, data: T[K]): void {
    let allowEvent = true;

    const capitalize = (s) => `${s.charAt(0).toUpperCase()}${s.slice(1)}`;

    for (const handler of this.handlers) {
      const filter = handler[`filter${capitalize(eventName)}`];
      if (filter && !filter(data)) {
        allowEvent = false;
        break;
      }
    }

    if (allowEvent) {
      let mappedData = { ...data };

      for (const handler of this.handlers) {
        const map = handler[`map${capitalize(eventName)}`];
        if (map) {
          mappedData = map(mappedData);
        }
      }

      this.processed.push({
        eventName,
        data: mappedData,
      });
    }
  }

  addHandler(handler: Handlers<T>) {
    this.handlers.push(handler);
  }

  getProcessedEvents(): ProcessedEvent<T>[] {
    return this.processed;
  }
}

interface EventMap {
  login: { user?: string; name?: string; hasSession?: boolean };
  logout: { user?: string };
}

class UserEventProcessor extends EventProcessor<EventMap> {}

const uep = new UserEventProcessor();
uep.addHandler({
  filterLogin: ({ user }) => Boolean(user),
  mapLogin: (data) => ({
    ...data,
    hasSession: Boolean(data.user && data.name),
  }),
});

uep.handleEvent("login", {
  user: null,
  name: "jack",
});
uep.handleEvent("login", {
  user: "tom",
  name: "tomas",
});
uep.handleEvent("logout", {
  user: "tom",
});

console.log(uep.getProcessedEvents());
