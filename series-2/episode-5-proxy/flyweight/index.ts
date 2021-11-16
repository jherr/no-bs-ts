import fetch from "node-fetch";

interface Pokemon {
  species: {
    name: string;
    url: string;
  };
}

interface PokemonList {
  count: number;
  next: string;
  previous?: any;
  results: {
    name: string;
    url: string;
  }[];
}

function makeURLFlyweights<ReturnType>(urls: Record<string, string>) {
  const myObject: Record<string, Promise<ReturnType>> = {};

  return new Proxy(myObject, {
    get: (target, name: string) => {
      console.log(`Fetching ${name} ${urls[name]}`);
      if (!target[name]) {
        target[name] = fetch(urls[name]).then((res) => res.json());
      }
      return target[name];
    },
  });
}

(async () => {
  const pokemon = (await (
    await fetch("https://pokeapi.co/api/v2/pokemon/")
  ).json()) as PokemonList;

  const urls = pokemon.results.reduce(
    (acc, { name, url }) => ({
      ...acc,
      [name]: url,
    }),
    {}
  );

  const lookup = makeURLFlyweights<Pokemon>(urls);
  const data = await lookup.bulbasaur;
  console.log(data.species);

  const data2 = await lookup.venusaur;
  console.log(data2.species);
})();
