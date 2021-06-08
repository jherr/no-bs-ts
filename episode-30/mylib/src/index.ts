export const introduceMyself = (first: string, last: string) =>
  `Hello ${first} ${last}`;

export const borgName = (): string => {
  const members = Math.round(5 + Math.random() * 5) + 1;
  const member = Math.floor(Math.random() * members) + 1;

  return `Your Borg name is ${member} of ${members}`;
};
