function pluck<DataType, KeyType extends keyof DataType>(
  items: DataType[],
  key: KeyType
): DataType[KeyType][] {
  return items.map((item) => item[key]);
}

const dogs = [
  { name: "Mimi", age: 12 },
  { name: "LG", age: 13 },
];

console.log(pluck(dogs, "age"));
console.log(pluck(dogs, "name"));

interface BaseEvent {
  time: number;
  user: string;
}
interface EventMap {
  addToCart: BaseEvent & { quantity: number; productID: string };
  checkout: BaseEvent;
}

function sendMyEvent<Name extends keyof EventMap>(
  name: Name,
  data: EventMap[Name]
): void {
  console.log([name, data]);
}

sendMyEvent("addToCart", {
  productID: "foo",
  user: "baz",
  quantity: 1,
  time: 10,
});
sendMyEvent("checkout", { time: 20, user: "bob" });
