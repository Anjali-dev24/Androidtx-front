export const diceImages = {
  1: require("../../../Assets/dies/Sqaure_dies/1.png"),
  2: require("../../../Assets/dies/Sqaure_dies/2.png"),
  3: require("../../../Assets/dies/Sqaure_dies/3.png"),
  4: require("../../../Assets/dies/Sqaure_dies/4.png"),
  5: require("../../../Assets/dies/Sqaure_dies/5.png"),
  6: require("../../../Assets/dies/Sqaure_dies/6.png"),
};

export const gameHistory_data = [
  {
    period: 20240802011055,
    number: 5,
    bigSmall: "big",
    color: "purple",
  },
  { period: 20240802011054, number: 7, bigSmall: "big", color: "green" },
  {
    period: 20240802011053,
    number: 8,
    bigSmall: "big",
    color: "red",
  },
  {
    period: 20240802011052,
    number: 9,
    bigSmall: "big",
    color: "green",
  },
  {
    period: 20240802017052,
    number: 9,
    bigSmall: "big",
    color: "green",
  },
  { period: 20240802011051, number: 2, bigSmall: "small", color: "red" },
  { period: 20240802011051, number: 3, bigSmall: "small", color: "red" },
  { period: 20240802011051, number: 10, bigSmall: "small", color: "red" },
  { period: 20240802011051, number: 9, bigSmall: "small", color: "red" },
  { period: 20240802011051, number: 7, bigSmall: "small", color: "red" },
  { period: 20240802011051, number: 6, bigSmall: "small", color: "red" },
  { period: 20240802011051, number: 3, bigSmall: "small", color: "red" },
  // Add more data as needed
];

// Function to break number into digits and map to dice
export const getDiceImages = (number) => {
  let digits = number.toString().split("").map(Number);

  while (digits.length < 3) {
    digits.unshift(0); // Add leading zeros to pad the number
  }

  if (digits.length > 3) {
    digits = digits.slice(0, 3); // Only take the first three digits if more than 3
  }
  const dice = digits.map(
    (digit) => diceImages[Math.min(digit, 6)] || diceImages[1]
  );

  return dice;
};
