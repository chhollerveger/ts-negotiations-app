export function logRuntime(inSeconds = false) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
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
            value;
        };
        return descriptor;
    };
}
//# sourceMappingURL=log-runtime.js.map