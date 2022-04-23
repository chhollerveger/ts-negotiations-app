export function inspect() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      const value = originalMethod.apply(this, args);
      return value;
    }
    return descriptor;
  }
}