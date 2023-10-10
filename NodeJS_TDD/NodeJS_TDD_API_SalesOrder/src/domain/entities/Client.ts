import { generateCode } from '../../application/helpers/generateCode'
import { Entity } from '../core/Entity'
import { z, ZodError } from 'zod'

export type ClientType = {
    code: string
    name: string
    cnpj: string
    active: boolean
}

export class Client extends Entity<ClientType> {
    private constructor(readonly client: ClientType) {
        if (!client.active) throw new ZodError('Client is not active')

        const newClient = {
            code: generateCode(0, 6),
            ...client,
        }

        const zod = z.object({
            code: z.string().nonempty('Param cannot be empty.').length(6),
            name: z.string().nonempty('Param cannot be empty.').min(3),
            cnpj: z
                .string()
                .length(18)
                .regex(/(\d){2}.(\d){3}.(\d){3}\/(\d){4}-(\d){2}/),
            active: z.boolean(),
        })

        zod.parse(newClient)
        super(newClient)
    }
}
