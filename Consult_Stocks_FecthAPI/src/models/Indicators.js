import FormatData from "../controller/format_data";

class Indicators {

    constructor() {
        this.ceilingPrice = document.getElementById('ceiling-price');
        this.graham = document.getElementById('graham');
        this.inputs = document.querySelectorAll('.form-control-md');
    }

    setInputs(data, symbol) {
        const dataVO = FormatData.formatArrayIndicators(data);
        const graham = FormatData.calculateGraham(data);
        const ceilingPrice = FormatData.calculateCeilingPrice(data, symbol);
        const regEx = /[0-9]/;

        for (let i in this.inputs) {
            if (regEx.test(i)) {
                if (dataVO[i][process.env.VALUE] === 0) {
                    this.inputs[i].value = '--';
                    continue;
                } 

                this.inputs[i].value = dataVO[i];
                continue;
            }
        }

        if(!ceilingPrice) return this.ceilingPrice.value = '--';

        this.graham.value = `RS ${graham}`;
        this.ceilingPrice.value = `RS ${ceilingPrice}`;
    }
}

export default Indicators;