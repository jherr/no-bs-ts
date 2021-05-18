function myForEach<T>(values: T[], forEachFunc: (val: T) => void): void {
  values.reduce((_, v) => {
    forEachFunc(v);
    return undefined;
  }, undefined);
}

myForEach(["a", "b", "c"], (v) => console.log(`forEach ${v}`));

function myMap<T, K>(values: T[], mapFunc: (val: T) => K): K[] {
  return values.reduce((a, v) => [...a, mapFunc(v)], [] as K[]);
}

const preMapped = [1, 2, 3];
const mapped = myMap(preMapped, (v) => (v * 10).toString());

console.log(mapped);

function myFilter<T>(values: T[], filterFunc: (val: T) => boolean): T[] {
  return values.reduce((a, v) => (filterFunc(v) ? [...a, v] : a), [] as T[]);
}

const preFiltered = [1, 2, 3, 4, 5, 6, 7, 8];
const filtered = myFilter(preFiltered, (v) => v % 2 === 0);

console.log(filtered);
