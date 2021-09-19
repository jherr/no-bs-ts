import fs from "fs";

interface IFileReader {
  isJSONFile(filePath: string): boolean;
  readTextFile(filePath: string): string;
  readJSONFile(filePath: string): unknown;
}

const createDirScanner = (readerOverrides: Partial<IFileReader>) => {
  const reader = {
    isJSONFile: (filePath: string): boolean => filePath.endsWith(".json"),
    readTextFile: (filePath: string): string =>
      fs.readFileSync(filePath, "utf8").toString(),
    readJSONFile: (filePath: string): unknown =>
      JSON.parse(fs.readFileSync(filePath, "utf8").toString()),
    ...readerOverrides,
  };

  return (dirPath: string) =>
    fs.readdirSync(dirPath).reduce<Record<string, unknown>>((a, fileName) => {
      if (reader.isJSONFile(fileName)) {
        a[fileName] = reader.readJSONFile(`${dirPath}/${fileName}`);
      } else {
        a[fileName] = reader.readTextFile(`${dirPath}/${fileName}`);
      }
      return a;
    }, {});
};

const scanFiles = createDirScanner({
  isJSONFile: (filePath: string): boolean => false,
});

console.log(scanFiles("./data"));
