/**
 * @description aop
 * @eg.1
 * cosnt aop = Aop(before, after);
 * aop.invoke(fn, arguments);
 *
 * ```js
 * @eg.2
 * cosnt aop = Aop(before, after);
 * const invokeFactory = {
 *  // 加法
 *      calcAdd : function(a,b){
 *          console.log(a + "+" + b + "=" + (a + b));
 *           return a+b;
 *       },
 *     // 减法
 *       calcMinus : function (a,b){
 *           console.log(a + "-" + b + "=" + (a - b));
 *           return a-b;
 *       },
 *       // 计算幂
 *       power : function(a,b){
 *           console.log(a + "^" + b + "=" + Math.pow(a, b));
 *           return Math.pow(a, b);
 *       }
 * }
 * const factory = aop.add(invokeFactory);
 * factory.calcAdd(4, 5);
 * factory.calcMinus(4, 5);
 * factory.power(4, 5);
 * ```
 */

export interface IProxy {
  add: Function;
  before: Function;
  after: Function;
  getInvokeFactory: Function;
  invoke: Function;
}
export default function(before: Function, after: Function) {
  const _factory: any = {};
  // 构造方法，在原方法前后增加执行方法
  function constructor(originFun: Function) {
    function _class(...args: any[]) {
      const beforeResult = proxy.before(...args);
      let result = originFun(...args, beforeResult);
      proxy.after(...args, result);
      return result;
    }
    return _class;
  }

  const proxy: IProxy = {
    // 添加被代理方法，参数a为被代理方法，参数b为目标对象
    add: function(factory: Function | Function[]) {
      if (typeof factory == "function") {
        _factory[factory.name] = constructor(factory);
        return _factory[factory.name];
      }
      if (typeof factory == "object") {
        for (const key in factory) {
          if (Object.prototype.hasOwnProperty.call(factory, key)) {
            _factory[key] = constructor(factory[key]);
          }
        }
        return _factory;
      }
    },
    invoke(factory: Function, ...args: any[]) {
      return constructor(factory)(...args);
    },
    // 默认before为空方法
    before: function() {},
    // 默认after为空方法
    after: function() {},
    getInvokeFactory() {
      return _factory;
    },
  };

  // 注入特定的前后处理方法
  if (typeof before == "function") {
    proxy.before = before;
  }
  if (typeof after == "function") {
    proxy.after = after;
  }

  return proxy;
}
