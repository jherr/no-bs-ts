class Dogyy {
  constructor(public readonly name: string, public readonly age: number) {
  }
}

const lgg = new Dogyy("LG", 13);
// lgg.name = "Foo";
console.log(lgg.name);

class DogList {
  private doggies: Dogyy[] = [];

  static instance: DogList = new DogList();

  private constructor() {
  }

  static addDog(dog: Dogyy) {
    DogList.instance.doggies.push(dog);
  }

  getDogs() {
    return this.doggies;
  }
}

DogList.addDog(lgg);
console.log(DogList.instance.getDogs());
