import GeraCPF from "./modules/GeraCPF";
import ValidaCPF from "./modules/ValidaCPF";
import './assets/css/style.css';

(function() {
    const g = new GeraCPF();
    let rand = g.rand();
    const new_cpf = g.generate_new_cpf(rand);
    const chk_cpf = ValidaCPF.valid(new_cpf);

    if (chk_cpf) {
        g.show_result(`CPF Válido ${new_cpf.bold()}`)
    } 
})();

