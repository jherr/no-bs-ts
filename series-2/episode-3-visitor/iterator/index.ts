import fetch from "node-fetch";

async function* iterateResults<DataType>(url: string) {
  let nextUrl: string | undefined = url;
  do {
    const response = await fetch(nextUrl);
    const json: {
      next?: string;
      results: DataType[];
    } = await response.json();

    yield* json.results;

    nextUrl = json.next;
  } while (nextUrl);
}

interface Pokemon {
  name: string;
  url: string;
}

(async function () {
  for await (const result of iterateResults<Pokemon>(
    "https://pokeapi.co/api/v2/pokemon/"
  )) {
    console.log(result);
    if (result.name === "pikachu") {
      break;
    }
  }
})();
