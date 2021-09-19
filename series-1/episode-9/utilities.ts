interface Dog {
  name: string;
  age: number;
  breed: string;
  dietary?: string;
}

type AnyDog = Partial<Dog>;
type RequiredDog = Required<Dog>;
type ReadonlyDog = Readonly<Dog>;

type NoAge = Omit<Dog, "age">;
type NameAndAge = Pick<Dog, "name" | "age">;

type NoStrings = Exclude<string | number | undefined, string>;
type JustStrings = Extract<string | number | undefined, string>;
type NoNull = NonNullable<string | Dog | undefined>;

function groupByID<T, K extends keyof T>(
  items: T[],
  key: K
): Record<string, Omit<T, K>> {
  return items.reduce((a, item) => {
    const newObj = { ...item };
    delete newObj[key];
    return {
      ...a,
      [(item[key] as unknown) as string]: newObj,
    };
  }, {});
}

console.log(
  groupByID(
    [
      { id: 1, foo: 1 },
      { id: 2, foo: 2 },
    ],
    "id"
  )
);
