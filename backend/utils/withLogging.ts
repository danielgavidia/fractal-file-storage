const separator = "-------------------------------";

export const withLogging = <TReturn, TArgs extends any[]>(
  operationName: string,
  logRes: boolean,
  fn: (...args: TArgs) => Promise<TReturn>
) => {
  const colors = {
    lightBlue: "\x1b[36m",
    violet: "\u001b[38;5;127m",
    lightViolet: "\u001b[38;5;139m",
    red: "\x1b[31m",
    reset: "\x1b[0m",
  };

  return async (...args: TArgs): Promise<TReturn> => {
    const requestId = String(Math.floor(Math.random() * 100)).padStart(2, "0");
    // Started operation
    console.log(`${colors.lightViolet}${separator}${colors.reset}`);
    console.log(
      `${
        colors.lightViolet
      }FN | ${new Date().toISOString()} | ${operationName} | ${requestId} | STARTED ===>${
        colors.reset
      }`
    );
    console.log(`${colors.lightViolet}${separator}${colors.reset}`);
    try {
      const result = await fn(...args);
      console.log(`${colors.violet}${separator}${colors.reset}`);
      if (logRes) {
        console.log(
          `${
            colors.violet
          }FN | ${new Date().toISOString()} | ${operationName} | ${requestId} | SUCCESS ===>${
            colors.reset
          }`
        );
        console.log(`${colors.lightBlue}${JSON.stringify(result, null, 2)}${colors.reset}`);
      } else {
        console.log(
          `${
            colors.violet
          }FN | ${new Date().toISOString()} | ${operationName} | ${requestId} | SUCCESS ===>${
            colors.reset
          }`
        );
      }
      console.log(`${colors.violet}${separator}${colors.reset}`);

      return result;
    } catch (error) {
      console.log(separator);
      console.log(
        `${
          colors.red
        }FN | ${new Date().toISOString()} | ${operationName} | ${requestId} | ERROR ===>${
          colors.reset
        }`,
        error
      );
      console.log(separator);
      throw error;
    }
  };
};
