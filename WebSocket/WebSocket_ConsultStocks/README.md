# Projeto - Calcular preço teto de ações listadas na B3.

Tela responsável por calcular o preço teto de ações listadas na bolsa, com base no pagamento de seus dividendos ou fórmulas já conhecidas do mercado financeiro.

### 📋 Dependências

#### Backend:

- NodeJS
- SocketIO
- Express
- Dotenv

#### Frontend:

- Bootstrap
- ChartJS


## 💻 Sistema

Backend:
```
1 - Cria um novo servidor HTTP;
2 - Cria um novo servidor Socket IO;
3 - Estabelece uma conexão com o frontend e recebe os eventos transmitidos;
4 - Realiza comunicação com API's financeiras para obter os dados necessários;
5 - Emite novos eventos com as informações solicitadas pelo frontend;
```

Frontend:
```
1 - Estabelece uma conexão com o servidor IO (backend);
2 - Emite eventos solicitando dados para o backend;
3 - Recebe novos eventos do backend com os dados solicitados anteriormente;
4 - Formata os dados deixando-os padronizados para visualização;
5 - Exibe as informações;
```

## 📈 Gráficos

#### Biblioteca utilizada: ChartJS

```
Gráfico - Preço Histórico 
{
    tipo: linha,
    filtro: {
        1 dia,
        5 dias,
        1 mês,
        6 meses,
        1 ano,
        5 anos
    }
}
```

```
Gráfico - Dividendos 
{
    tipo: barra,
    filtro: {
        1 ano,
        3 anos,
        5 anos,
        10 anos,
        max
    }
}
```

## 🖩 Calculos

Fórmula Graham:
```
raiz quadrada de 22.5 * ( VPA da ação * LPA da ação )
```

Fórmula Bazin:
```
0.06 -> Yield de 6% ao ano


Soma anual dos dividendos / 0.06
```


## 🖵 Layout

### Exemplos da Consulta:
Itau Unibanco - [ITUB4](./img/itub4.png) <br>
Vale do Rio Doce - [VALE3](./img/vale3.png) <br>
B3 - [B3SA3](./img/b3sa3.png) <br>

*As imagens apresentadas não se tratam de recomendações de investimento.*
*São apenas demonstrações visuais do funcionamento da aplicação.*

## 🛠️ Construído com

* [JavaScript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
* [NodeJS](https://nodejs.org/en)
* [ExpressJS](https://expressjs.com/pt-br/)
* [Bootstrap](https://getbootstrap.com/)
* [ChartJS](https://www.chartjs.org/)

## 📌 Versão

V1.0.0

*Projeto pessoal sem fins lucrativos*

## ✒️ Autores

* **Desenvolvedor** - *Trabalho & Documentação* - [Victor Nikolaus](https://github.com/vnikolaus)