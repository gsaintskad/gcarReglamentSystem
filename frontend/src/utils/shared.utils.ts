export function convertCyrillicToLatinLicensePlate(
  cyrillicPlate: string,
): string {
  const cyrillicToLatinMap: { [key: string]: string } = {
    А: "A",
    В: "B",
    Е: "E",
    К: "K",
    М: "M",
    Н: "H",
    О: "O",
    Р: "P",
    С: "C",
    Т: "T",
    У: "Y",
    Х: "X",
    а: "a",
    в: "b",
    е: "e",
    к: "k",
    м: "m",
    н: "h",
    о: "o",
    р: "p",
    с: "c",
    т: "t",
    у: "y",
    х: "x",
  };

  let latinPlate: string[] = [];
  for (const char of cyrillicPlate) {
    latinPlate.push(cyrillicToLatinMap[char] || char);
  }

  return latinPlate.join("");
}
