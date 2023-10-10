export type TokensProps = {
    message?: string
    error?: string
}

export interface StoreTokensProps {
    store(id: number, key: string): Promise<TokensProps>
    valid(token: string): Promise<TokensProps>
    update(token: string, key: string): Promise<void>
}