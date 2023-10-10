export interface HttpServer {
    on(method: string, url: string, callback: FunctionConstructor): never
    listen(port: number | string): never
    use(param: unknown): never
}
