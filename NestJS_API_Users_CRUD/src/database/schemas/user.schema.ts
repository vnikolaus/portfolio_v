import * as mongoose from 'mongoose'

export const UserSchema = new mongoose.Schema({
    nome: String,
    email: String,
    salario: Number,
    estado: String,
    empresa: String,
    idade: Number,
    sexo: String,
    cpf: String,
})
