export const lowercase = ['abcdefghijklmnopqrstuvwxyz'];
export const uppercase = ['ABCDEFGHIJKLMNOPQRSTUVWXYZ'];
export const numbers = ['0123456789'];
export const symbols = ['@#$%&*/{[^|'];

export default class GeraSenha {
    constructor() {
        this.div = document.querySelector('.pwdGenerated');
        this.form = document.querySelector('.form');
        this.length = document.querySelector('.length');
        this.uppercase = document.querySelector('.chkUC');
        this.lowercase = document.querySelector('.chkLC');
        this.numbers = document.querySelector('.chkNum');
        this.symbols = document.querySelector('.chkSym');
        this.preferences = []; 
        this.events();
    }

    events() {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();

            const pwd = this.generate_password();
            this.show_password(pwd);
        });
    }

    confirm_preferences() {
        this.check_uppercase();
        this.check_lowercase();
        this.check_numbers();
        this.check_symbols();
    }
    
    generate_password() {
        this.confirm_preferences();

        const pref = this.preferences;
        const len = this.length.value;
        const full_string = pref.toString().replace(',','');
        let new_pwd = '';

        let i = 0;
        while (i <= len) {
            let shuffled = full_string.split('').sort(() => {return (0.5 - Math.random())}).join('').replace(/,/g,''); 
            new_pwd += shuffled;
            i++;
        };

        new_pwd = new_pwd.slice(0, len)
        this.preferences = [];
        return new_pwd;
    }

    show_password(pwd) {
        const div = this.div;
        div.innerHTML = `${pwd}`;
    }

    check_uppercase() {
        const up = this.uppercase;
        if (up.checked) {
            this.preferences.push(...uppercase);
        }
    }

    check_lowercase() {
        const lc = this.lowercase;
        if (lc.checked) {
            this.preferences.push(...lowercase);
        }
    }

    check_numbers() {
        const num = this.numbers;
        if (num.checked) {
            this.preferences.push(...numbers);
        }
    }

    check_symbols () {
        const sym = this.symbols;
        if (sym.checked) {
            this.preferences.push(...symbols);
        }
    }
}





