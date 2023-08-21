import { FAKE_CPF } from '../../../constants/user.constants'

export function validCPF(cpf: string): boolean {
    cpf = cpf.replace(/\D/g, '');
    let validation = false;
    [9, 10].forEach((index: number) => {
        if (cpf === FAKE_CPF) return

        let i = 10, sum = 0
        cpf.split('').slice(0, index).forEach((value) => sum += +value * i-- )
        i++

        let newDigits = 11 - (sum % 11)
        newDigits = newDigits > 9 ? 0 : newDigits

        if (newDigits === +cpf.substring(index, index + 1)) validation = true
    })
    return validation
}
