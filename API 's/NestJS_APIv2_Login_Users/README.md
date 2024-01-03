# API - Create User / Login

## Bibliotecas / Ferramentas:
#### **Framework**: - NestJS
- NodeJS
- Typescript
- Jest
- Mongoose - *MongoDB*
- Bcryptjs
- Jsonwebtoken (JWT)
- Dotenv

## Validações:
#### Email:
- formato: *string* - ex: fake@email.com
- min_length: 7

#### Password:
- formato: *string*
- min_length: 6

## Endpoints:

#### api/v1/user/create
**@Method**: POST <br>
**@Body**: { email: string; pwd: string } <br>

![image](https://github.com/vnikolaus/portifolio_v/assets/111655667/6c412127-21e0-49a8-ba61-2fb8cdaf96c7)

#### api/v1/login
**@Method**: POST <br>
**@Body**: { email: string; pwd: string } <br>
**@Returns**: { user_token: JWT } <br>

![image](https://github.com/vnikolaus/portifolio_v/assets/111655667/23d0aa26-fe8b-43ba-8be2-29838acc7242)
