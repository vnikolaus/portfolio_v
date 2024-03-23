export interface FetchDataProps {
    fetchRawData(symbol: string): Promise<unknown>
}
