/* eslint-disable @typescript-eslint/no-explicit-any */
export class Registry {
    private dependencies: any = {}

    provide(name: string, value: any) {
        this.dependencies[name] = value
    }

    inject(name: string) {
        return this.dependencies[name]
    }
}
