function SimpleMemoryDatabase<T>() {
  return class SimpleMemoryDatabase {
    private db: Record<string, T> = {};

    set(id: string, value: T): void {
      this.db[id] = value;
    }

    get(id: string): T {
      return this.db[id];
    }

    getObject(): Record<string, T> {
      return this.db;
    }
  };
}

const StringDatabase = SimpleMemoryDatabase<string>();

const sdb1 = new StringDatabase();
sdb1.set("name", "Jack");
console.log(sdb1.get("name"));

type Constructor<T> = new (...args: any[]) => T;

function Dumpable<
  T extends Constructor<{
    getObject(): object;
  }>
>(Base: T) {
  return class Dumpable extends Base {
    dump() {
      console.log(this.getObject());
    }
  };
}

const DumpableStringDatabase = Dumpable(StringDatabase);
const sdb2 = new DumpableStringDatabase();
sdb2.set("name", "Jack");
sdb2.dump();
