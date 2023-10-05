export interface Queue {
    connect(): never
    on(queueName: string, callback: FunctionConstructor): never
    publish(queueName: string, data: unknown): never
}
