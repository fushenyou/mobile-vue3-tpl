/**
 * async await 处理方法，处理数据（异常）后，返回对象；避免使用try catch；
 * @param PromiseFn: Promise<any>;
 * @returns  Promise<{data, error}>
 */
export function awaitTo<R>(promise: Promise<any>): Promise<{ error?: any; data?: R }> {
  return promise.then((data) => ({ data })).catch((error) => ({ error }));
}
