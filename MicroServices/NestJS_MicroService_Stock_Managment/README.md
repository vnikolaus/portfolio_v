# Microservice - Stock Managment

## Bibliotecas / Ferramentas:
#### **Framework**: - NestJS
- Typescript
- Jest
- ElephantSQL - *PostgresDB (Cloud)*
- Pg-promise
- Amqplib - *RabbitMQ*
- Dotenv
- Docker

#### Serviços rodando em containers exclusivos: <br>
![image](https://github.com/vnikolaus/portifolio_v/assets/111655667/a8b71c57-2c11-40cb-85c4-86223819127a)


## Validações - Movimentation:
#### Code:
- formato: *string*
- length: 6

#### Name:
- formato: *string*

#### Qty:
- formato: *number*


## Processo:
#### Microservice - Movimentation:
1. Recebe uma nova requisição de peça;
2. Gera uma nova movimentação (status '*processing*');
3. Envia a nova movimentação para a fila (*RabbitMQ*);
4. Retorna o id da movimentação criada, junto ao status "*processing*".

#### Microservice - Processment:
1. Recebe a nova movimentação do RabbitMQ;
2. Valida o codigo, produto e endereço
3. Aprova ou rejeita a movimentação


#### ms/v1/item/insert - *Gera uma nova movimentação*
**@Method**: POST <br>
**@Body**: { code: string; name: string; qty: number } <br>

![image](https://github.com/vnikolaus/portifolio_v/assets/111655667/42a268f7-9e30-4f5e-bb5d-9f69de186c27)<br>

#### ms/v1/movimentation/:id - *Verifica o status da movimentação, de acordo com o ID*
**@Method**: GET <br>
**@Returns**: {movimentation} <br>

![image](https://github.com/vnikolaus/portifolio_v/assets/111655667/e2b47ad4-f4b6-4e63-9176-91acb35e4cdf)<br>
-- *Exemplo movimentação aprovada*

### Exemplo movimentação rejeitada:
1. Requisição com o codigo do produto errado: <br>
![image](https://github.com/vnikolaus/portifolio_v/assets/111655667/69ece8ff-b0e7-42a2-87a4-8e203afcd7a6)

2. Movimentação rejeitada: <br>
![image](https://github.com/vnikolaus/portifolio_v/assets/111655667/75b093c7-a0c6-4c3f-97a2-15285e72d3de)

### CloudAMQP - *RabbitMQ*:

- Payload inserido na fila:
![image](https://github.com/vnikolaus/portifolio_v/assets/111655667/6cf312bb-ca4a-4c8e-a1b8-0058e5b0012f)





