<?php

namespace App\Http\Controllers;

use Exception;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Tymon\JWTAuth\Exceptions\TokenExpiredException;

class AuthController extends Controller{

    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct(){
        $this->middleware('auth:api', ['except' => ['login', 'signup', 'refresh', 'logout']]);
    }
    
    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login(){
        $credentials = request(['email', 'password']);

        if (! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Falha! E-mail ou senha não correspondem.'], 401);
        }

        return $this->respondWithToken($token);
    }
    
    /**
     * Autentica um usuário com base nas credenciais fornecidas.
     * 
     * @param \Illuminate\Http\Request $request
     * 
     * @return \Illuminate\Http\JsonResponse
     */
    public function signup(Request $request){
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed',
            'password_confirmation' => 'required|same:password',
        ]);
        
        User::create($request->except('password_confirmation'));
        
        $credentials = request(['email', 'password']);
        $token = auth()->attempt($credentials);

        return $this->respondWithToken($token);
    }
    
    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me(){
        return response()->json(auth()->user());
    }

    /**
     * Invalida o token JWT atual e finaliza a sessão do usuário.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout(){
        try{
            auth()->logout();
        }catch(TokenExpiredException $e){
            // Token expirado, não é necessário fazer logout
        }catch(Exception $e){
            return response()->json(['error' => 'Não foi possível sair da sessão.'], 400);
        }
        
        return response()->json(['message' => 'Logout realizado com sucesso.']);
    }
    
    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh(){        
        return $this->respondWithToken(auth()->refresh());
    }
    
    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token){
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
            'created_at' => now()->timestamp           
        ]);
    }
}            