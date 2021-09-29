import { Subscribable } from "./Subscribable-class";

const sub = new Subscribable<string>();
const unsub = sub.subscribe(console.log);
sub.publish("Hello");
sub.publish("Whatever");
unsub();
sub.publish("Goodbye");

class DataClass extends Subscribable<number> {
  constructor(public value: number) {
    super();
  }

  setValue(v: number) {
    this.value = v;
    this.publish(v);
  }
}

const dc = new DataClass(0);
const dcUnsub = dc.subscribe((v: number) => console.log(`DC: ${v}`));
const dcUnsub2 = dc.subscribe((v: number) => console.log(`DC2: ${v}`));
dc.setValue(42);
dcUnsub();
dcUnsub2();
