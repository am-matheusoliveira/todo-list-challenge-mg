<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TaskSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('task')->insert([
            [
                'description' => 'Organizar documentos pessoais na pasta do computador',
                'status' => 'PENDING',
                'user_id' => 1,
            ],
            [
                'description' => 'Fazer backup dos arquivos importantes no Google Drive',
                'task_status' => 'IN_PROGRESS',
                'user_id' => 2,
            ],
            [
                'description' => 'Estudar 1 hora de inglês com foco em conversação',
                'task_status' => 'COMPLETED',
                'user_id' => 3,
            ],
            [
                'description' => 'Atualizar meu currículo e perfil no LinkedIn',
                'task_status' => 'PENDING',
                'user_id' => 1,
            ],
            [
                'description' => 'Separar roupas para doação',
                'task_status' => 'IN_PROGRESS',
                'user_id' => 2,
            ],
            [
                'description' => 'Agendar consulta médica de rotina',
                'task_status' => 'COMPLETED',
                'user_id' => 3,
            ],
            [
                'description' => 'Fazer planejamento da semana (tarefas + metas)',
                'task_status' => 'IN_PROGRESS',
                'user_id' => 4,
            ],
        ]);
    }
}
