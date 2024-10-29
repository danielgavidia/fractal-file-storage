export const withLogging = <T>(operationName: string, fn: (...args: any[]) => Promise<T>) => {
  return async (...args: any[]): Promise<T> => {
    const requestId = Math.floor(Math.random() * 100);
    console.log("------------");
    console.log(`${requestId} | ${new Date().toISOString()} | STARTED: ${operationName}`);
    console.log("------------");
    try {
      const result = await fn(...args);
      console.log("------------");
      console.log(
        `${requestId} | ${new Date().toISOString()} | ===> SUCCESS: ${operationName}`,
        JSON.stringify(result, null, 2)
      );
      console.log("------------");
      return result;
    } catch (error) {
      console.log("------------");
      console.log(
        `${requestId} | ${new Date().toISOString()} | ===> ERROR: ${operationName}`,
        error
      );
      console.log("------------");
      throw error;
    }
  };
};
