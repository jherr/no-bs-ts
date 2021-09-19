type MyFlexibleDogInfo = {
  name: string;
  [key: string]: string | number;
};

const dog:MyFlexibleDogInfo = {
  name: "LG",
  breed: "Mutt",
  age: 2
}

interface DogInfo {
  name: string;
  age: number;
}

type OptionsFlag<Type> = {
  [Property in keyof Type]: null;
}

type DogInfoOptions = OptionsFlag<DogInfo>;

type Listeners<Type> = {
  [Property in keyof Type as `on${Capitalize<string & Property>}Change`]?: (
    newValue: Type[Property]
  ) => void;
} & {
  [Property in keyof Type as `on${Capitalize<string & Property>}Delete`]?: (
    newValue: Type[Property]
  ) => void;
}

function listenToObject<T>(obj: T, listeners: Listeners<T>): void {
  throw "Needs to be implemented";
}

const lg:DogInfo = {
  name: "LG",
  age: 13
}

type DogInfoListeners = Listeners<DogInfo>

listenToObject(lg, {
  onNameChange: (v: string) => {},
  onAgeChange: (v: number) => {},
  onAgeDelete: () => {}
})
