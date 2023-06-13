export default class ValidaCPF {
    
    valid(cpf) {
        const _strCPF = this.ajust_cpf(cpf);
        
        const _clrCPF = String(cpf).replace(/\D+/g, '');

        const secondLastDigit = this.generate_digit(_strCPF);
        const lastDigit = this.generate_digit(_strCPF + secondLastDigit);

        const verificationCpf = _strCPF + secondLastDigit + lastDigit;

        return Number(_clrCPF === verificationCpf) ? true : false;
    }

    ajust_cpf(value) {
        const _str = String(value);
        const _clr = _str.replace(/\D+/g, '');

        if (_clr.length === 9) return _clr;

        const adjusted_cpf = _clr.substring(0, _clr.length - 2);
        return adjusted_cpf;
    }

    generate_digit(val) {
        let l = val.length + 1;
        let sum = 0;

        for (let num in val) {
            sum += l * (val[num]);
            l--;
        }
    
        let newDigit = (11 - (sum % 11));
            newDigit > 9 ? newDigit = 0 : newDigit;
            
        return newDigit;
    }
}