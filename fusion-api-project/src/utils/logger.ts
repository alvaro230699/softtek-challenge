export const logInfo = (message: string, data: any = {}, requestId?: string) => {
  console.log(JSON.stringify({
    level: 'INFO',
    timestamp: new Date().toISOString(),
    requestId,
    message,
    data
  }));
};

export const logError = (message: string, error: any, requestId?: string) => {
  console.error(JSON.stringify({
    level: 'ERROR',
    timestamp: new Date().toISOString(),
    requestId,
    message,
    error: {
      message: error.message,
      stack: error.stack
    }
  }));
};