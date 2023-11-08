export class Registry {
    private dependencies: { [key: string]: unknown } = {}

    provide(name: string, value: unknown) {
        this.dependencies[name] = value
    }

    inject(name: string) {
        return this.dependencies[name]
    }
}
