Claro, vou formatar as informações em um arquivo README.md para você:

```markdown
# API de Autenticação de Usuário

Bem-vindo à API de Autenticação de Usuário. Esta API permite criar novos usuários, autenticar-se, gerenciar notas e tags, atualizar informações de perfil e fazer upload de avatares. A seguir, você encontrará informações detalhadas sobre os endpoints e como usá-los.

## Visão Geral

Esta API foi desenvolvida em Node.js e tem como propósito criar novos usuários no banco de dados, autenticar usuários existentes na plataforma e fornecer funcionalidades relacionadas a notas e tags. Ela suporta os métodos HTTP GET, POST, PUT e DELETE.

## Autenticação

Para acessar os endpoints protegidos, é necessário fornecer um token de autenticação válido no cabeçalho de autorização (`Authorization: Bearer token_de_autenticacao`). Você pode obter o token fazendo login usando o endpoint `/api/sessions`.

## Endpoints Disponíveis

A seguir, estão os endpoints disponíveis nesta API:

### 1. Criar um Novo Usuário

- **Método HTTP**: POST
- **Endpoint**: `/api/users`
- **Descrição**: Cria um novo usuário no sistema.
- **Parâmetros da Solicitação**:
  - `name` (string, obrigatório): Nome do usuário.
  - `email` (string, obrigatório): Endereço de e-mail do usuário.
  - `password` (string, obrigatório): Senha do usuário.
- **Resposta de Sucesso**:
  - Código de status: 201 (Created)
- **Resposta de Erro**:
  - Pode retornar um código de erro 400 (Bad Request) se a solicitação estiver ausente de informações obrigatórias ou se o e-mail já estiver em uso.

#### Exemplo de Solicitação:
```http
POST /api/users
Authorization: Bearer token_de_autenticacao
Content-Type: application/json

{
  "name": "Nome do Usuário",
  "email": "usuario@example.com",
  "password": "senha_segura"
}
```

### 2. Atualizar Informações de Perfil do Usuário

- **Método HTTP**: PUT
- **Endpoint**: `/api/users`
- **Descrição**: Permite que um usuário autenticado atualize seu perfil, incluindo nome, e-mail e senha.
- **Parâmetros da Solicitação**:
  - `name` (string, opcional): Novo nome do usuário.
  - `email` (string, opcional): Novo endereço de e-mail do usuário.
  - `password` (string, opcional): Nova senha do usuário.
  - `old_password` (string, obrigatório se uma nova senha for fornecida): Senha antiga do usuário.
- **Cabeçalho de Autenticação**:
  - `Authorization` (string, obrigatório): Token de autenticação de usuário válido.
- **Resposta de Sucesso**:
  - Código de status: 200 (OK)
- **Resposta de Erro**:
  - Pode retornar um código de erro 401 (Unauthorized) se o token de autenticação for inválido.
  - Pode retornar um código de erro 400 (Bad Request) se a solicitação estiver ausente de informações obrigatórias ou se o e-mail fornecido já estiver em uso.
  - Pode retornar um código de erro 404 (Not Found) se o usuário não for encontrado.
  - Pode retornar um código de erro 422 (Unprocessable Entity) se a senha antiga não corresponder à senha atual ou se a nova senha for igual à senha antiga.

#### Exemplo de Solicitação:
```http
PUT /api/users
Authorization: Bearer token_de_autenticacao
Content-Type: application/json

{
  "name": "Novo Nome",
  "email": "novo_email@example.com",
  "password": "nova_senha_segura",
  "old_password": "senha_atual"
}
```

### 3. Criar uma Nova Nota

- **Método HTTP**: POST
- **Endpoint**: `/api/notes`
- **Descrição**: Cria uma nova nota no banco de dados.
- **Parâmetros da Solicitação**:
  - `title` (string, obrigatório): Título da nota.
  - `description` (string, opcional): Descrição da nota.
  - `tags` (array de strings, opcional): Lista de tags associadas à nota.
  - `links` (array de strings, opcional): Lista de links relacionados à nota.
- **Cabeçalho de Autenticação**:
  - `Authorization` (string, obrigatório): Token de autenticação de usuário válido.
- **Resposta de Sucesso**:
  - Código de status: 200 (OK)
- **Resposta de Erro**:
  - Pode retornar um código de erro 401 (Unauthorized) se o token de autenticação for inválido ou 400 (Bad Request) se a solicitação estiver ausente de informações obrigatórias.

#### Exemplo de Solicitação:
```http
POST /api/notes
Authorization: Bearer token_de_autenticacao
Content-Type: application/json

{
  "title": "Minha Nova Nota",
  "description": "Descrição da nota",
  "tags": ["tag1", "tag2"],
  "links": ["https://link1.com", "https://link2.com"]
}
```

### 4. Obter Detalhes de uma Nota

- **Método HTTP**: GET
- **Endpoint**: `/api/notes/:id`
- **Descrição**: Retorna os detalhes de uma nota específica com base no ID fornecido na URL.
- **Parâmetros da Solicitação**:
  - `id` (string, obrigatório): ID único da nota.
- **Cabeçalho de Autenticação**:
  - `Authorization` (string, obrigatório): Token de autenticação de usuário válido.
- **Resposta de Sucesso**:
  - Código de status: 200 (OK)
- **Resposta de Erro**:
  - Pode retornar um código de erro 401 (Unauthorized) se o token de autenticação for inválido ou um código de erro 404 (Not Found) se a nota
