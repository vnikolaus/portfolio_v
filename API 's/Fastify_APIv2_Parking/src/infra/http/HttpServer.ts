export interface HttpServer {
    connect(): never
    on(method: string, url: string, options: { [key: string]: any }, callback: Function): never
}