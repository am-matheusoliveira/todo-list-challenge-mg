
# 📌 Sistema de Gestão de Tarefas - Angular + Laravel

## Objetivo

Este projeto é uma aplicação web para **gestão de tarefas** desenvolvida com **Angular 19**, **Laravel 12**, **MySQL 8**, **Bootstrap 5.2** e **autenticação JWT**. A ideia principal é permitir que o usuário possa **cadastrar, editar, excluir, buscar e filtrar tarefas**, tudo dentro de uma interface única (SPA).

## Deploy do projeto em produção
Este projeto está hospedado no serviço nGrok da nGrok. Você pode acessá-lo e testá-lo agora mesmo clicando no link: [Deploy do Projeto no nGrok](https://pangolin-closing-multiply.ngrok-free.app/)

## 🎯 Funcionalidades da Aplicação

- Login com autenticação JWT
- Cadastro de novos usuários
- Listagem de tarefas
- Filtro por status (pendente, em progresso, concluída)
- Campo de busca por descrição
- Edição e exclusão de tarefas
- Criação de novas tarefas
- SPA com navegação dinâmica (sem recarregamento de página)
- Contador de tarefas concluídas
- Interface responsiva com Bootstrap

##

## 🚀 Tecnologias Utilizadas

- **Angular 19**
- **Laravel 12**
- **PHP 8.2**
- **MySQL 8**
- **Bootstrap 5.2**
- **JWT (timon/jwt-auth)**

## 📥 Instalação

### A aplicação é dividida em dois diretórios: `laravel-back-end` e `angular-front-end`.

### 📦 Back-end (Laravel)
1. **Clone o repositório:**
   ```sh
   git clone https://github.com/am-matheusoliveira/todo-list-challenge-mg.git
   cd laravel-back-end
   ```
2. **Instale as dependências do Laravel:**

   ```sh
   composer install
   ```
3. **Copie o arquivo de configuração `.env`**

    ```sh
   cp .env.example .env
   ```
4. **Gere a chave da aplicação**
    ```
    php artisan key:generate
    ```

5. **Gere a chave do TokenJWT**
    ```
    php artisan jwt:secret
    ```
    
6. **Configure o banco de dados no `.env`**:

    ```env
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=todo_list_challenge
    DB_USERNAME=root
    DB_PASSWORD=
    ```
7. **Execute as migrações**
    ```
    php artisan migrate
    ```
    >Ou Execute o script SQL que esta na pasta database-app<br>
    >Ele ira criar o Banco de Dados: todo_list_challenge
    
8. ***Rode o servidor***
    ```
    php artisan serve
    ```

### A API estará disponível em `http://localhost:8000`.

### 💻 Front-end (Angular)

1. ***Acesse a pasta do front***
    ```
    cd angular-front-end
    ```
2. ***Instale as dependências***
    ```
    npm install
    ```
3. ***Execute a aplicação***
    ```
    ng serve
    ```

O Angular rodará na porta `4200`:  
📍 Acesse: `http://localhost:4200`

## 🖼️ Imagens da Aplicação

### 1. Tela de Login
![img-01 - login](https://github.com/user-attachments/assets/8a6982bb-ce79-4c43-a490-4d382ccbc835)

### 2. Tela de Cadastro
![img-02 - signup](https://github.com/user-attachments/assets/4c581e1a-adc4-43c1-97db-39cc0da90855)

### 3. Página Inicial (SPA)
![img-03 - home](https://github.com/user-attachments/assets/bf000792-ec42-4f78-a4ae-43c7a613b258)

### 4. Listagem de Tarefas
![img-04 - todo-list listargemhome](https://github.com/user-attachments/assets/3d74b64c-0de8-4db3-b354-30582ad97719)

### 5. Nova Tarefa
![img-05 - todo-list nova tarefa](https://github.com/user-attachments/assets/42a7389a-72ee-4f4f-9ae8-bd10d6aeae08)

### 6. Edição de Tarefa
![img-06 - todo-list edicao de tarefa](https://github.com/user-attachments/assets/594cfcb0-6607-46ac-80ba-a7721f44978e)

### 7. Confirmação de Exclusão
![img-07 - todo-list exclusao de tarefa](https://github.com/user-attachments/assets/6c60e2f8-b8a3-4444-bd32-1d9bcafe1f54)

## Não conseguiu rodar o projeto? 
<b>Se, após a execução de todas as etapas anteriores, você ainda não conseguir rodar este projeto, não se preocupe! Você ainda pode acessá-lo e testá-lo através do deploy de produção. Acesse o link deste projeto, que está rodando no nGrok: [Deploy do Projeto no nGrok](https://pangolin-closing-multiply.ngrok-free.app/)</b>

## 📦 Estrutura Geral

```
📁 laravel-back-end
📁 angular-front-end
```

## 🔒 Segurança

Este projeto utiliza **autenticação JWT** para proteger as rotas da API. O token é armazenado localmente e adicionado nos headers de cada requisição autenticada.
Sua validade dura 2 horas e é automaticamente renovado após esse período.

##
Sinta-se à vontade para explorar o código e fazer melhorias.<br>
Se tiver alguma dúvida, entre em contato.
