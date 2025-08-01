export const devLog = (...args: any[]) => {
  if (process.env.ENV === "DEV" || process.env.ENV === "TEST") {
    console.log(...args);
  }
};
