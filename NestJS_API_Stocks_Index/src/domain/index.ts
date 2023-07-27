import { IndexDTO } from 'src/application/dtos/indexDTO'
import { Entity } from '../core/domain/Entity'

export class Index extends Entity<IndexDTO> {
    private constructor(props: IndexDTO, id?: string) {
        super(props, id)
    }

    static instance(props: IndexDTO, id?: string) {
        const index = new Index(props, id)
        return index
    }
}
