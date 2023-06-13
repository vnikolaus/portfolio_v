import ValidaCPF from "./ValidaCPF";

export default class GeraCPF {
    rand(min = 100000000, max = 999999999) {
        return String(Math.floor(Math.random() * (max - min) + min));
    }

    generate_new_cpf(value) {
        const _str = value.toString();
        const aCPF = ValidaCPF.ajust_cpf(_str);

        const secLastDigit = ValidaCPF.generate_digit(aCPF);
        const lastDigit = ValidaCPF.generate_digit(aCPF + secLastDigit);
        
        const new_cpf = aCPF + secLastDigit + lastDigit;

        return new_cpf;
    }

    show_result(v) {
        const _d = document.querySelector('.result');
        _d.innerHTML = v;
    }
}