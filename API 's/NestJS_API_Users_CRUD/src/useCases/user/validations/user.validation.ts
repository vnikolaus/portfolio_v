import { z } from 'zod'

export const userSchema = z.object({
    nome: z.string().nonempty('Param cannot be empty.').min(3),
    email: z.string().email('This is not a valid email.').nonempty('Param cannot be empty.'),
    salario: z.number().nonnegative('Param cannot be negative.'),
    estado: z.string().length(2),
    empresa: z.string().optional(),
    idade: z.number().int().nonnegative('Param cannot be negative.'),
    sexo: z.string().optional(),
    cpf: z.string().nonempty('Param cannot be empty.').length(11),
})
