export function escape() {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    descriptor.value = function (...args: any[]) {
      let value = originalMethod.apply(this, args);
      if (typeof value === 'string') {
        value = value.replace(/<script>[\s\S]*?<\/script>/, '');
      }
      return value;
    }
    return descriptor;
  }
}