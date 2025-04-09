<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Task extends Model
{
    use SoftDeletes;

    protected $table = 'task';

    protected $fillable = [
        'description',
        'status',
        'user_id',
    ];

    /*
        RELACIONAMENTO COM A TABELA USER.
        UMA TAREFA PERTENCE A UM USUÁRIO.
    */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
