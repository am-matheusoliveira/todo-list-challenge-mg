<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTasksTable extends Migration
{
    public function up(): void
    {
        Schema::create('task', function (Blueprint $table) {
            $table->id('id');
            $table->string('description', 255);
            $table->enum('status', ['PENDING', 'IN_PROGRESS', 'COMPLETED'])->default('PENDING');
            $table->unsignedBigInteger('user_id');

            // RELACIONAMENTO COM A TABELA DE USUÁRIOS
            $table->foreign('user_id')->references('id')->on('users');

            $table->timestamps();  // COLUNAS: created_at e updated_at
            $table->softDeletes(); // COLUNA: deleted_at
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('task');
    }
}

