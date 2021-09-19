type FilterFunction<T> = (data: T[keyof T]) => boolean;
type Filters<T> = Record<keyof T, FilterFunction<T>[]>;
type MapFunction<T> = (data: T[keyof T]) => T[keyof T];
type Maps<T> = Record<keyof T, MapFunction<T>[]>;
type ProcessedEvent<T> = {
  eventName: keyof T;
  data: T[keyof T];
};

class EventProcessor<T extends {}> {
  private filters: Filters<T> = <Filters<T>>{};
  private maps: Maps<T> = <Maps<T>>{};
  private processed: ProcessedEvent<T>[] = [];

  handleEvent<K extends keyof T>(eventName: K, data: T[K]): void {
    let allowEvent = true;
    for (const filter of this.filters[eventName] ?? []) {
      if (!filter(data)) {
        allowEvent = false;
        break;
      }
    }
    if (allowEvent) {
      let mappedData = { ...data };
      for (const map of this.maps[eventName] ?? []) {
        mappedData = <T[K]>map(mappedData);
      }
      this.processed.push({
        eventName,
        data: mappedData,
      });
    }
  }

  addFilter<K extends keyof T>(
    eventName: K,
    filter: (data: T[K]) => boolean
  ): void {
    this.filters[<keyof T>eventName] ||= [];
    this.filters[<keyof T>eventName].push(filter as FilterFunction<T>);
  }

  addMap<K extends keyof T>(eventName: K, map: (data: T[K]) => T[K]): void {
    this.maps[<keyof T>eventName] ||= [];
    this.maps[<keyof T>eventName].push(map as unknown as MapFunction<T>);
  }

  getProcessedEvents() {
    return this.processed;
  }
}

interface EventMap {
  login: { user?: string; name?: string; hasSession?: boolean };
  logout: { user?: string };
}

class UserEventProcessor extends EventProcessor<EventMap> {}

const uep = new UserEventProcessor();

uep.addFilter("login", ({ user }) => Boolean(user));

uep.addMap("login", (data) => ({
  ...data,
  hasSession: Boolean(data.user && data.name),
}));

uep.handleEvent("login", {
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

/*
Result:
[
  {
    eventName: 'login',
    data: { user: 'tom', name: 'tomas', hasSession: true }
  },
  { eventName: 'logout', data: { user: 'tom' } }
]
*/
