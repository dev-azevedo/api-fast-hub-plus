# API FastHub+

## Descrição do Projeto

Sistema de Reservas de Eventos: Este repositório contém o back-end da plataforma de reservas de eventos. Ele é responsável por fornecer uma API RESTful para o front-end, com funcionalidades de cadastro de eventos, reservas e autenticação de usuários utilizando JWT. O banco de dados utilizado é o **PostgreSQL**.

## Arquitetura

### 1. API RESTful

A API é responsável por:
- Gerenciar eventos e reservas
- Autenticação de usuários com **JWT**
- Expor endpoints para permitir a comunicação com o front-end

#### Principais Endpoints

**Eventos**
- `GET /eventos`: Retorna todos os eventos disponíveis
- `GET /eventos/:id`: Retorna detalhes de um evento específico
- `POST /eventos`: Cria um novo evento
- `PUT /eventos/:id`: Atualiza um evento existente
- `DELETE /eventos/:id`: Remove um evento

**Reservas**
- `GET /reservas`: Retorna as reservas feitas pelo usuário autenticado
- `POST /reservas`: Cria uma nova reserva para um evento
- `DELETE /reservas/:id`: Cancela uma reserva

**Usuários**
- `POST /usuarios/registro`: Registra um novo usuário
- `POST /usuarios/login`: Autentica um usuário e retorna o token JWT
- `GET /usuarios/perfil`: Retorna os dados do usuário autenticado
- `PUT /usuarios/perfil`: Atualiza os dados do usuário
- `PUT /usuarios/senha`: Atualiza a senha do usuário

### 2. Banco de Dados (PostgreSQL)

#### Estrutura das tabelas

1. **Eventos**
   - `id` (PK)
   - `nome`
   - `descricao`
   - `data_evento`
   - `quantidade_ingressos`
   - `quantidade_reservada`
   - `created_at`
   - `updated_at`

2. **Reservas**
   - `id` (PK)
   - `usuario_id` (FK)
   - `evento_id` (FK)
   - `quantidade_reservada`
   - `created_at`
   - `updated_at`

3. **Usuarios**
   - `id` (PK)
   - `nome`
   - `email`
   - `senha`
   - `tipo` (ADMIN/USER)
   - `created_at`
   - `updated_at`

## Tecnologias Utilizadas

- **Node.js**: Para o desenvolvimento do back-end
- **Express.js**: Framework para criação da API RESTful
- **PostgreSQL**: Banco de dados relacional para armazenar eventos e reservas
- **JWT**: Para autenticação de usuários
- **Sequelize**: ORM para interação com o banco de dados PostgreSQL
- **Bcrypt**: Para criptografia de senhas
- **Joi**: Para validação de dados

## Como Rodar o Back-end

### 1. Configuração

1. Clone o repositório do back-end:
   ```bash
   git clone https://github.com/seu-usuario/sistema-reservas-eventos-backend.git
   cd sistema-reservas-eventos-backend
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o arquivo `.env` com as credenciais do banco de dados PostgreSQL:
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USER=seu_usuario
   DB_PASSWORD=sua_senha
   DB_NAME=sistema_reservas_eventos
   JWT_SECRET=sua_chave_secreta
   JWT_EXPIRATION=24h
   BCRYPT_ROUNDS=10
   ```

4. Rode as migrações para criar as tabelas no banco de dados:
   ```bash
   npm run migrate
   ```

5. (Opcional) Rode as seeds para criar dados iniciais:
   ```bash
   npm run seed
   ```

6. Inicie o servidor:
   ```bash
   npm start
   ```

7. O servidor estará disponível em `http://localhost:5000`

## Como Testar a API

Use ferramentas como **Postman** ou **Insomnia** para testar os endpoints da API:

1. **Autenticação**
   - Registre um novo usuário em `/usuarios/registro`
   - Faça login em `/usuarios/login` para obter o token JWT
   - Use o token no header `Authorization: Bearer <seu_token>` para acessar endpoints protegidos

2. **Usuários**
   - Teste a atualização de perfil
   - Teste a alteração de senha
   - Verifique as informações do perfil

3. **Eventos**
   - Teste os endpoints para obter, criar e listar eventos
   - Teste as atualizações e remoções (requer perfil ADMIN)

4. **Reservas**
   - Faça uma reserva para um evento
   - Liste suas reservas
   - Teste o cancelamento de reservas

## Segurança

- Todas as senhas são armazenadas com hash usando bcrypt
- Endpoints protegidos requerem autenticação via JWT
- Validação de dados em todas as requisições usando Joi
- Proteção contra ataques comuns (XSS, CSRF, etc.)
- Rate limiting para prevenir abusos na API