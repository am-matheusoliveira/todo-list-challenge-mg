<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('users')->insert([
            [
                'name' => 'João Silva',
                'email' => 'joao@example.com',
                'password' => Hash::make('password123'),
            ],
            [
                'name' => 'Maria Oliveira',
                'email' => 'maria@example.com',
                'password' => Hash::make('password123'),
            ],
            [
                'name' => 'Carlos Souza',
                'email' => 'carlos@example.com',
                'password' => Hash::make('password123'),
            ],
            [
                'name' => 'Ana Pereira',
                'email' => 'ana@example.com',
                'password' => Hash::make('password123'),
            ],
        ]);
    }
}
