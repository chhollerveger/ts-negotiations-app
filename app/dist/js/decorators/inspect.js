export function inspect() {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            const value = originalMethod.apply(this, args);
            return value;
        };
        return descriptor;
    };
}
//# sourceMappingURL=inspect.js.map