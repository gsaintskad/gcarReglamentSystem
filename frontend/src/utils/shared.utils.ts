export function convertCyrillicToLatinLicensePlate(
  cyrillicPlate: string
): string {
  // Define the mapping from uppercase Cyrillic to Latin characters commonly used in license plates.
  // Only characters that have a direct visual or phonetic equivalent used in
  // license plates are included.
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
    У: "Y", // 'У' often maps to 'Y' or 'U', 'Y' is common in this context
    Х: "X",
    // Note: Lowercase Cyrillic characters are explicitly excluded based on your request.
    // License plates typically use uppercase characters.
  };

  let latinPlate: string[] = [];
  for (const char of cyrillicPlate) {
    // If the character is in our mapping, use the Latin equivalent.
    // Otherwise, keep the original character (e.g., numbers, or any non-mapped symbols).
    latinPlate.push(cyrillicToLatinMap[char] || char);
  }

  return latinPlate.join("");
}
