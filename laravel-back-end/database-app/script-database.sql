
-- OBS: PRESTE ATENÇÃO NO MECANISMO DO BANCO DE DADOS, USE SEMPRE O InnoDB - MYSQL

DROP DATABASE IF EXISTS todo_list_challenge;

CREATE DATABASE todo_list_challenge
DEFAULT CHARACTER SET utf8mb4
DEFAULT COLLATE utf8mb4_general_ci;

USE todo_list_challenge;

CREATE TABLE task(
	id INT AUTO_INCREMENT NOT NULL PRIMARY KEY,
    description VARCHAR(255) NOT NULL,
    status ENUM('PENDING', 'IN_PROGRESS', 'COMPLETED') NOT NULL DEFAULT 'PENDING',
    user_id INT NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

INSERT INTO task (description, status, user_id) VALUES
('Organizar documentos pessoais na pasta do computador', 'PENDING', 1),
('Fazer backup dos arquivos importantes no Google Drive', 'IN_PROGRESS', 2),
('Estudar 1 hora de inglês com foco em conversação', 'COMPLETED', 3),
('Atualizar meu currículo e perfil no LinkedIn', 'PENDING', 1),
('Separar roupas para doação', 'IN_PROGRESS', 2),
('Agendar consulta médica de rotina', 'COMPLETED', 3),
('Fazer planejamento da semana (tarefas + metas)', 'IN_PROGRESS', 4);