const happyMoneyQuotes = [
  "Money is energy. If you give it with joy, it returns multiplied.",
  "Happy money flows when you are grateful for what you have.",
  "If you love money, it will love you back.",
  "Every payment you make is an opportunity to spread happiness.",
  "Grateful money always finds its way back to you.",
  "Every time you spend money with gratitude, you create abundance in your life.",
  "Money is like love: it needs to be given freely or it will lose its magic.",
];

/**
 * Returns a random "Happy Money" quote.
 */
export const getHappyMoneyQuote = (): string => {
  return happyMoneyQuotes[Math.floor(Math.random() * happyMoneyQuotes.length)];
};

/**
 * Generates a string of money emojis.
 * @param count Number of emojis to display
 */
export const getMoneyEmojis = (count: number = 5): string => {
  return "💰".repeat(count);
};
