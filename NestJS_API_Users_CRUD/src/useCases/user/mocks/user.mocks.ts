import {
    TEST_AGE,
    TEST_COMPANY,
    TEST_CPF,
    TEST_EMAIL,
    TEST_GENDER,
    TEST_NAME,
    TEST_SALARY,
    TEST_STATE,
} from '../../../constants/user.constants'
import { User } from '../../../domain/User'

export const userMock: User = {
    nome: TEST_NAME,
    email: TEST_EMAIL,
    salario: TEST_SALARY,
    estado: TEST_STATE,
    empresa: TEST_COMPANY,
    idade: TEST_AGE,
    sexo: TEST_GENDER,
    cpf: TEST_CPF,
}
