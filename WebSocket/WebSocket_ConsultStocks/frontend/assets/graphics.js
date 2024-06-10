class Graphic {
    /**
     * @param {string} id
     * @returns {void}
     */
    static refreshGraphic(id) {
        const chartAlreadyExists = Chart.getChart(id);
        if (chartAlreadyExists) chartAlreadyExists.destroy();
    }

    /**
     * @param {Array<string>} dates 
     * @param {Array<number>} prices 
     * @returns {void}
     */
    static historicalPrice(dates, prices) {
        this.refreshGraphic('historicalPriceGraphic')
        const historicalPriceGraphic = document.querySelector('#historicalPriceGraphic');
        const config = {
            type: 'line',
            data: {
                labels: dates,
                datasets: [{
                    label: 'Preço Histórico',
                    data: prices,
                    fill: false,
                    borderColor: 'rgb(75, 192, 192)',
                    tension: 0.1
                }]
            },
            options: {
                elements: {
                    point: {
                        pointStyle: false
                    }
                }
            }
        };
        Chart.defaults.color = '#FFF';
        new Chart(historicalPriceGraphic, config);
    }

    /**
     * @param {Array<number>} dates 
     * @param {Array<number>} prices 
     * @returns {void}
     */
    static historicalDividends(years, payments) {
        this.refreshGraphic('dividendsGraphic')
        const dividendsGraphic = document.querySelector('#dividendsGraphic');
        const config = {
            type: 'bar',
            data: {
            labels: years,
            datasets: [{
                label: 'Dividendos',
                data: payments,
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                ],
                borderColor: [
                    'rgb(75, 192, 192)',
                ],
                borderWidth: 1
            }]
            },
            options: {
                elements: {
                    point: {
                        pointStyle: 'cross'
                    }
                }
            }
        };
        Chart.defaults.color = '#FFF';
        new Chart(dividendsGraphic, config);
    }
}