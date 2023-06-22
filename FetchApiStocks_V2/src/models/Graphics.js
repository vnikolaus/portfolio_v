import FormatData from "../controller/format_data";
import FetchAPI from "../controller/fetch_api";

class Graphics {
    constructor() {
        this.ctx = document.getElementById('myChart');
        this.chart = null;
        this.config = null;
        this.data = null;
    }

    price_graphic(arr, symbol) {
        if (!arr) return "Array not found - price_gr";

        try {
          const date = arr[process.env.STOCK][process.env.DATE];
          const price = arr[process.env.STOCK][process.env.PRICE];
  
          this.data = {
            labels: [
              date[0], date[1], date[2], date[3], date[4], date[5], date[6], date[7], date[8], date[9], date[10],
              date[11], date[12], date[13], date[14], date[15], date[16], date[17], date[18], date[19], date[20],
              date[21], date[22], date[23], date[24], date[25], date[26], date[27], date[28], date[29], date[30],
              date[31], date[32], date[33], date[34], date[35], date[36], date[37], date[38], date[39], date[40],
              date[41], date[42], date[45], date[44], date[45],date[46], date[47], date[48], date[49], date[50],
              date[51], date[52], date[53], date[54], date[55],date[56], date[57], date[58], date[59], date[60]
              ],
              datasets: [
                {
                  label: [`${symbol}`],
                  data:[
                        price[0], price[1], price[2], price[3], price[4], price[5], price[6], price[7], price[8], price[9], price[10],
                        price[11], price[12], price[13], price[14], price[15], price[16], price[17], price[18], price[19], price[20],
                        price[21], price[22], price[23], price[24], price[25], price[26], price[27], price[28], price[29], price[30],
                        price[31], price[32], price[33], price[34], price[35], price[36], price[37], price[38], price[39], price[40],
                        price[41], price[42], price[43], price[44], price[45],price[46], price[47], price[48], price[49], price[50],
                        price[51], price[52], price[53], price[54], price[55],price[56], price[57], price[58], price[59], price[60]
                  ],
                  borderWidth: 4,
                  pointBorderColor: 'black',
                  borderColor: '#0E9F9F',
                  backgroundColor: '#0FB9B9',
                  fill: true,
                  pointRadius: 1,
                }
              ]
          };
      
          this.config = {
            type: 'line',
            data: this.data,
          };
  
          this.chart = new Chart(this.ctx, this.config);
        } catch (err) {
          console.log(err);
        }
      }

      dividend_graphic(arr, symbol) {
        if (!arr) return "Array not found - dividend_gr";

        try {
          const dividendsPerYear = FormatData.formatArrayDividends(arr[process.env.DIVIDENDS], symbol);

          symbol === 'TRPL4' ? dividendsPerYear[process.env.Y2022] = 1.23 : dividendsPerYear[process.env.Y2022];
  
          this.data = {
            labels: ['2012','2013','2014','2015','2016','2017', '2018', '2019', '2020', '2021', '2022', '2023'],
            datasets: [
              {
                label: [`${symbol}`],
                data: [
                      dividendsPerYear[process.env.Y2012],
                      dividendsPerYear[process.env.Y2013],
                      dividendsPerYear[process.env.Y2014],
                      dividendsPerYear[process.env.Y2015],
                      dividendsPerYear[process.env.Y2016],
                      dividendsPerYear[process.env.Y2017],
                      dividendsPerYear[process.env.Y2018],
                      dividendsPerYear[process.env.Y2019],
                      dividendsPerYear[process.env.Y2020],
                      dividendsPerYear[process.env.Y2021],
                      dividendsPerYear[process.env.Y2022],
                      dividendsPerYear[process.env.Y2023]
                ],
                borderWidth: 2,
                pointBorderColor: 'white',
                borderColor: '#000',
                backgroundColor: '#0FB9B9',
                pointRadius: 2,
              }
            ]
          };
    
          this.config = {
            type: 'bar',
            data: this.data,
          };
  
          this.chart = new Chart(this.ctx, this.config);
        } catch (err) {
          console.log(err);
        }
      }

      async ibovespa_graphic(symbol) {
        try {
          // const api_url = [process.env.API_URL_IBOV];
          // const response = await fetch(api_url);
          // const data = await response.json();
          const data = await FetchAPI.fetchDataIBOV();
          const dataVO = FormatData.formatArrayIBOV(data);
          if (!dataVO) throw new Error('Data not found to create graphic.')
          const _Date = dataVO[process.env.DATE].slice(dataVO.length - (dataVO.length - 30));
          const _Price = dataVO[process.env.PRICE].slice(dataVO.length - (dataVO.length - 30));
  
          this.data = {
            labels: 
              [
                _Date[0], _Date[1], _Date[2], _Date[3], _Date[4], _Date[5], _Date[6], _Date[7], _Date[8], _Date[9], _Date[10],
                _Date[11], _Date[12], _Date[13], _Date[14], _Date[15], _Date[16], _Date[17], _Date[18], _Date[19], _Date[20],
                _Date[21], _Date[22], _Date[23], _Date[24], _Date[25], _Date[26], _Date[27], _Date[28], _Date[29], _Date[30],
                _Date[31], _Date[32], _Date[33], _Date[34], _Date[35], _Date[36], _Date[37], _Date[38], _Date[39], _Date[40],
                _Date[41], _Date[42], _Date[45], _Date[44], _Date[45],_Date[46], _Date[47], _Date[48], _Date[49], _Date[50],
                _Date[51], _Date[52], _Date[53], _Date[54], _Date[55],_Date[56], _Date[57], _Date[58], _Date[59], _Date[60],
                _Date[61], _Date[62], _Date[63], _Date[64], _Date[65],_Date[66], _Date[67], _Date[68], _Date[69], _Date[70]
              ],
            datasets: [
              {
                  label: [`${symbol}`],
                  data: 
                  [
                    _Price[0], _Price[1], _Price[2], _Price[3], _Price[4], _Price[5], _Price[6], _Price[7], _Price[8], _Price[9], _Price[10],
                    _Price[11], _Price[12], _Price[13], _Price[14], _Price[15], _Price[16], _Price[17], _Price[18], _Price[19], _Price[20],
                    _Price[21], _Price[22], _Price[23], _Price[24], _Price[25], _Price[26], _Price[27], _Price[28], _Price[29], _Price[30],
                    _Price[31], _Price[32], _Price[33], _Price[34], _Price[35], _Price[36], _Price[37], _Price[38], _Price[39], _Price[40],
                    _Price[41], _Price[42], _Price[43], _Price[44], _Price[45],_Price[46], _Price[47], _Price[48], _Price[49], _Price[50],
                    _Price[51], _Price[52], _Price[53], _Price[54], _Price[55],_Price[56], _Price[57], _Price[58], _Price[59], _Price[60],
                    _Price[61], _Price[62], _Price[63], _Price[64], _Price[65],_Price[66], _Price[67], _Price[68], _Price[69], _Price[70]
                  ],
                  borderWidth: 2,
                  pointBorderColor: 'white',
                  borderColor: '#0E9F9F',
                  backgroundColor: '#0FB9B9',
                  fill: true,
                  pointRadius: 1,
              }
            ]
          };
  
          this.config = {
            type: 'line',
            data: this.data
          };
  
          this.chart = new Chart(this.ctx, this.config);
        } catch (err) {
          console.log(err);
        }
      }
}

export default Graphics;