export function logRuntime(inSeconds: boolean = false) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      let divider = 1;
      let unity = 'milliseconds';
      if (inSeconds) {
        divider = 1000;
        unity = 'seconds';
      }
      const t1 = performance.now();
      const value = originalMethod.apply(this, args);
      const t2 = performance.now();
      console.log(`${propertyKey}, runtime: ${(t2 - t1) / divider} ${unity}`);
      value
    };
    return descriptor;
  }
}