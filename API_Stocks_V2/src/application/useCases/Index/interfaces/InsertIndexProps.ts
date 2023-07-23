import { Index } from 'src/domain'

export interface InsertIndexProps {
    insertIndex(index: Index): Promise<void>
}
