export interface Queue {
    connect(): Promise<void>
    on(queueName: string, callback: FunctionConstructor): Promise<void>
    publish(queueName: string, data: unknown): Promise<void>
}
