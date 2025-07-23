export const devLog = (...args: any[]) => {
  if (process.env.ENV === "DEV") {
    console.log(...args);
  }
};
