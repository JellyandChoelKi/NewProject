<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            return response()->json(['message' => 'Login successful', 'user' => Auth::user()], 200);
        }

        return response()->json(['message' => 'Login failed'], 401);
    }

    public function checkAdmin(Request $request)
    {
        // Admin 체크 로직 추가
        if ($request->user() && $request->user()->is_admin) {
            return response()->json(['is_admin' => true], 200);
        }

        return response()->json(['is_admin' => false], 403);
    }
}
