export function escape() {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            let value = originalMethod.apply(this, args);
            if (typeof value === 'string') {
                value = value.replace(/<script>[\s\S]*?<\/script>/, '');
            }
            return value;
        };
        return descriptor;
    };
}
//# sourceMappingURL=escape.js.map