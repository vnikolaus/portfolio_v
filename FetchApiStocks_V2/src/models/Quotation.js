import FetchAPI from "../controller/fetch_api";

class Quotation {

    static async quotation(symbol) {
        try {
            const quotationField = document.getElementById('quotation');
            const variationField = document.getElementById('variation');
            const data = await FetchAPI.fetchQuotation(symbol);    
            const quotation = data.Trad[process.env.QUOTATION].scty.SctyQtn.curPrc;
            const variation = data.Trad[process.env.QUOTATION].scty.SctyQtn.prcFlcn;
            const initialIndex = 0.00;

            if (variation < initialIndex) {
                variationField.style.color = "red";
                variationField.value = `${variation.toFixed(2)}%`;
            } else {
                variationField.style.color = "green";
                variationField.value = `+ ${variation.toFixed(2)}%`;
            }
            
            symbol === 'IBOV' ? quotationField.value = `${quotation.toFixed(2)} pts` : quotationField.value = `RS ${quotation.toFixed(2)}`;
        } catch (err) {
            console.log(err);
        }
    }
}


export default Quotation;