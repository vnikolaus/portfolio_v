import './components/styles/style.css';
import changeLogo from './controller/change_logo';
import DTO from './controller/dto';
import Quotation from './models/Quotation';
import Graphics from './models/Graphics';
import Indicators from './models/Indicators';

const _DTO = new DTO();
const _GRAPHICS = new Graphics();
const _INDICATORS = new Indicators();

const selectStock = document.querySelector('.custom-select');
const selectGraphic = document.querySelector('.select-graphic');

selectStock.addEventListener('change', async e => {
    const symbol = e.target.value;
    const _DATA = await _DTO.data(symbol);

    const chartStatus = Chart.getChart("myChart");
    if (chartStatus != undefined) chartStatus.destroy();

    _GRAPHICS.price_graphic(_DATA, symbol);
    await changeLogo(symbol);
    await Quotation.quotation(symbol);
    if (symbol !== 'IBOV') _INDICATORS.setInputs(_DATA, symbol);

    if (symbol === 'IBOV') {
        const chartStatus = Chart.getChart("myChart");
        const fields = document.querySelectorAll('.form-control')
        if (chartStatus != undefined) chartStatus.destroy();

        for (let i of fields) {
            i.value = '';
        }

        await changeLogo(symbol);
        await Quotation.quotation(symbol);
        await _GRAPHICS.ibovespa_graphic(symbol);
        return;
    } 

    selectGraphic.value = 'price';
    selectGraphic.addEventListener('change', e => {
        const graphic = e.target.value;

        if (graphic === 'price') {
            const chartStatus = Chart.getChart("myChart");
            if (chartStatus != undefined) chartStatus.destroy();

            _GRAPHICS.price_graphic(_DATA, symbol);
        } 
        else if (graphic === 'dividend') {
            if (symbol === 'IBOV') return false;

            const chartStatus = Chart.getChart("myChart");
            if (chartStatus != undefined) chartStatus.destroy();

            _GRAPHICS.dividend_graphic(_DATA, symbol);
        } 
    });

});






