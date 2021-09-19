function simpleState<T>(initial: T): [() => T, (v: T) => void] {
  let val: T = initial;
  return [
    () => val,
    (v: T) => {
      val = v;
    },
  ];
}

const [st1getter, st1setter] = simpleState(10);
console.log(st1getter());
st1setter(62);
console.log(st1getter());

const [st2getter, st2setter] = simpleState<string | null>(null);
console.log(st2getter());
st2setter("str");
console.log(st2getter());

interface Rank<RankItem> {
  item: RankItem;
  rank: number;
}

function ranker<RankItem>(
  items: RankItem[],
  rank: (v: RankItem) => number
): RankItem[] {
  const ranks: Rank<RankItem>[] = items.map((item) => ({
    item,
    rank: rank(item),
  }));

  ranks.sort((a, b) => a.rank - b.rank);

  return ranks.map((rank) => rank.item);
}

interface Pokemon {
  name: string;
  hp: number;
}

const pokemon: Pokemon[] = [
  {
    name: "Bulbasaur",
    hp: 20,
  },
  {
    name: "Megaasaur",
    hp: 5,
  },
];

const ranks = ranker(pokemon, ({ hp }) => hp);
console.log(ranks);
