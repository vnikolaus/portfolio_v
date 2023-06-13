const calculator = {
    display: document.querySelector('.display'),

    start() {
        console.log("OK- Iniciado");
        this.click_buttons();
        this.enter_press();
    },

    click_buttons() {
        document.addEventListener('click', (e) => {
            const el = e.target;

            if (el.classList.contains('btn-num')) {
                this.display_numbers(el.innerText);
            } else if (el.classList.contains('btn-clear')) {
                this.clear_display();
            } else if (el.classList.contains('btn-del')) {
                this.delete_num();
            } else if (el.classList.contains('btn-eq')) {
                this.do_operation();
            }
        })
    },

    enter_press() {
        this.display.addEventListener('keyup', (e) => {
            if (e.keyCode === 13) {
                this.do_operation();
            }
        })
            
    },

    display_numbers(value) {
        if (value) this.display.value += value;
    },

    clear_display() {
        this.display.value = '';
    },

    delete_num() {
        this.display.value = this.display.value.slice(0, - 1);
    },

    do_operation() {

        try {
            let total = eval(this.display.value);
            
            this.display.value = total;

        } catch (error) {
            alert("Conta não permitida");
            console.log(error);
            return;
        }
    }

}