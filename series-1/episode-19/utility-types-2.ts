type Name = { first: string; last: string };

function addFullName(name: Name): Name & { fullName: string } {
  return {
    ...name,
    fullName: `${name.first} ${name.last}`,
  };
}

function permuteJSONRows<T extends (...args: any[]) => any>(
  iteratorFunc: T,
  data: Parameters<T>[0][]
): ReturnType<T>[] {
  return data.map((data: Parameters<T>[0]) => iteratorFunc(data));
}

const records = permuteJSONRows(addFullName, [
  { first: "Jack", last: "Herrington" },
  { first: "Mimi", last: "Herrington" },
]);

console.log(records);

function createObjects<T extends new (...args: any[]) => any>(
  ObjectType: T,
  data: ConstructorParameters<T>[0][]
): InstanceType<T>[] {
  return data.map((data: ConstructorParameters<T>[0]) => new ObjectType(data));
}

class PersonRecord {
  constructor(public name: { first: string; last: string }) {}
  get fullName() {
    return `${this.name.first} ${this.name.last}`;
  }
}

const objs = createObjects(PersonRecord, [
  { first: "Jack", last: "Herrington" },
  { first: "Mimi", last: "Herrington" },
]);

console.log(objs.map((o) => o.fullName));
