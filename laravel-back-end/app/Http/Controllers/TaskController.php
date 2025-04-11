<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tasks = Task::where('user_id', auth()->id())->get();
    
        return response()->json([
            'tasks' => $tasks,
            'completed' => $tasks->where('status', 'COMPLETED')->count(),
            'total' => $tasks->count()
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $task = Task::create([
            'description' => $request->description,
            'status' => $request->status,
            'user_id' => auth()->id()
        ]);
        
        return response()->json([
            'message' => 'Tarefa cadastrada com sucesso!',
            'task' => $task
        ], 201);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Task $task)
    {
        $task->update($request->all());
    
        return response()->json([
            'message' => 'Tarefa atualizada com sucesso!',
            'task' => $task
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        $task->delete();
    
        return response()->json([
            'message' => 'Tarefa excluída com sucesso!'
        ]);
    }
}
