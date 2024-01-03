# API - Parking

## Metodologias Desenvolvimento:
- TDD ( Test Driven Development )
- SOLID
- Clean Architecture

## Bibliotecas / Ferramentas:
#### **Framework**: - Fastify
- Typescript
- Vitest
- Postgres - *ElephantSQL*
- TSX
- Dotenv


## API Info:
#### Preços utilizados:
- Diária: 180
- Primeira hora: 15
- Demais horas: 10

## Endpoints:

#### URL/{id}
**@Method**: GET <br>

![image](https://github.com/vnikolaus/portifolio_v/assets/111655667/991c46c2-1759-48e5-8e56-cac07348d91c)



#### URL/checkin
**@Method**: POST <br>
**@Body**: { plate: string } <br>
**@Returns**: { id: number; plate: string; checkin: Date; checkout: null; total: null; } <br>

![image](https://github.com/vnikolaus/portifolio_v/assets/111655667/5c744361-282b-4d90-92dd-be53aadd3933)



#### URL/checkout/{id}
**@Method**: POST <br>
**@Returns**: { id: number; plate: string; checkin: Date; checkout: Date; total: number; } <br>

![image](https://github.com/vnikolaus/portifolio_v/assets/111655667/8903b8ab-9f6e-43c3-9732-77c9c13eeb2c)


## Validações:

#### Carro já feito o checkout: <br>
![image](https://github.com/vnikolaus/portifolio_v/assets/111655667/120ef5ec-eec4-4f02-8580-f7230d5f209f) <br>

#### Carro ainda estacionado, não realiza o checkin novamente: <br>
![image](https://github.com/vnikolaus/portifolio_v/assets/111655667/62c7cd14-957b-4ca4-aaa5-6d353aabb9b1) <br>
![image](https://github.com/vnikolaus/portifolio_v/assets/111655667/a6c2a2d9-a1d3-43e4-8fc3-a9b3551f0a35)



## Testes:

#### com E2E:
![image](https://github.com/vnikolaus/portifolio_v/assets/111655667/df0abdc8-fd49-4ae9-b7fb-a2fab2f9d4d1)<br>

#### sem E2E ( requisições ao banco de dados mockadas ):
![image](https://github.com/vnikolaus/portifolio_v/assets/111655667/90610934-15f8-470a-9dac-390a8b1641dd)<br>

#### Test useCase - CalculeTotal:
- 28 test's unitarios para calculo de permanencia <br>

![image](https://github.com/vnikolaus/portifolio_v/assets/111655667/b87f77bd-012f-42a6-b2d1-959a0d5ece34) <br>
