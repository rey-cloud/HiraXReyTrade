<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    public function login(Request $request) {
        $request->validate([
            'email' => 'required|email|exists:users,email',
            'password' => 'required',
        ]);
    
        $user = User::where('email', $request->email)->first();
    
        if (!$user || !Hash::check($request->password, $user->password)) {
            throw ValidationException::withMessages([
                'email' => ['The provided credentials are incorrect.']
            ]);
        }
    
        $token = $user->createToken('auth_token');
    
        return response()->json([
            'user' => $user,
            'token' => $token->plainTextToken
        ]);
    }

    public function logout(Request $request) {

        $request->user()->tokens()->delete();
        return [
            'message' => 'You are logged out.'
        ];
    }
}
