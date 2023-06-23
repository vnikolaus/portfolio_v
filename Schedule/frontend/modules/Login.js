export default class Login {
    constructor(form){
        this.form = document.querySelector(form);
    }

    start() {
        this.events();
    }

    events() {
        if (!this.form) return;
        this.form.addEventListener('submit', e => {
            e.preventDefault();
            this.validate(e);
        })
    }

    validate(e) {
        const el = e.target;
        const pwd_input = el.querySelector('input[name="password"]');
        const email_input = el.querySelector('input[name="email"]');

        alert("test");
    }
}