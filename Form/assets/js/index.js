import ValidaCPF from './ValidaCPF.js';
const regEx = /[^a-z0-9]/;

class Formulario {
    constructor() {
        this.formulario = document.querySelector('.formulario');
        this.user = document.querySelector('.usuario');
        this.password = document.querySelector('.senha');
        this.secondPassword = document.querySelector('.repetir_senha');
        this.cpf = document.querySelector('.cpf');
        this.events();
    }

    events() {
        this.formulario.addEventListener('submit', (e) => {
            this.handleSubmit(e);
        });
    }

    handleSubmit(e) { 
        e.preventDefault(); 
        
        this.checkEmptyField();
        this.checkUser();
        this.checkPassword();
        this.checkCPF();
    }

    checkEmptyField() {
        this.removeError();

        for (let i = 0; i < this.formulario.length -1; i++) {
            if (!this.formulario[i].value) {
                this.showError(this.formulario[i], "Campo em branco");
            }
        }
    }

    checkUser() {
        const el = this.user;
        const len = el.value.length;

        if (!el.value) return;

        if (regEx.test(el.value)) {
            this.showError(el, "Somente letras ou numeros.");
        }

        if (len < 3 || len > 12) {
            this.showError(el, "Usuario deve conter entre 3 e 12 caracteres.");
        };
    }
    
    checkPassword() {
        const el = this.password;
        const len = el.value.length;

        if (!el.value) return;

        if (len < 6 || len > 12) {
            this.showError(el, "Senha deve conter entre 6 e 12 caracteres.");
        };

        this.checkSecondPassword();
    }

    checkSecondPassword() {
        const el = this.secondPassword;
        const pwd = this.password;

        if (!el.value) return;

        if (el.value !== pwd.value) {
            this.showError(el, "Senhas não conferem.");
        }
    }

    checkCPF() {
        const el = this.cpf;
        const _c = new ValidaCPF();
        const check_cpf = _c.valid(el.value);

        if (!el.value) return;

        if (!check_cpf) {
            this.showError(el, "CPF Inválido.");
        }
    }

    showError(field, msg) {
        const p = document.createElement('p'); 
        p.classList = "error-text"; 
        p.innerText = msg; 

        field.insertAdjacentElement('afterend', p); 
    }

    removeError() {
        for (let error of this.formulario.querySelectorAll('.error-text')) {
            error.remove();
        }
    }
}

const f1 = new Formulario();