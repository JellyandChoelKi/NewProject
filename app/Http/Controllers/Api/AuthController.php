<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Mail;
use App\Models\User;
use App\Models\EmailVerification;
use App\Mail\VerificationCodeMail;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        Log::info('Login request received');

        $credentials = $request->only('email', 'password');
        Log::info('Credentials:', $credentials);

        try {
            if (Auth::attempt(['email' => $credentials['email'], 'password' => $credentials['password']])) {
                Log::info('Authentication successful');

                $request->session()->regenerate();
                Log::info('Session regenerated');

                $user = Auth::user();
                Log::info('Authenticated user:', ['user' => $user]);

                // 토큰 생성 및 반환
                if($user){
                    $token = $user->createToken('authToken')->plainTextToken;
                    Log::info('Token generated: ' . $token); // 토큰 로그 추가
    
                    return response()->json([
                        'message' => 'Login successful',
                        'user' => Auth::user(),
                        'token' => $token
                    ], 200);
                }else{
                    Log::warning('Authenticated user is null');
                    return response()->json(['message' => 'Authenticated user is null'], 401);
                }
            } else {
                Log::warning('Authentication failed for user: ' . $request->email);
            }
        } catch (\Exception $e) {
            Log::error('Login error: ' . $e->getMessage());
        }

        return response()->json(['message' => 'Login failed'], 401);
    }

    public function register(Request $request)
    {
        Log::info('Register request received');

        try {
            $validatedData = $request->validate([
                'name' => 'required|string|max:255',
                'email' => 'required|string|email|max:255|unique:users',
                'password' => 'required|string|min:8|confirmed',
                'is_admin' => 'required|boolean',
            ]);

            Log::info('Validated data:', $validatedData);

            $user = User::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'password' => bcrypt($validatedData['password']),
                'is_admin' => $validatedData['is_admin'],
            ]);

            $token = $user->createToken('authToken')->plainTextToken;

            return response()->json([
                'message' => 'Registration successful',
                'user' => $user,
                'token' => $token,
            ], 201);
        } catch (\Illuminate\Validation\ValidationException $e) {
            Log::error('Validation failed: ' . $e->getMessage());
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        } catch (\Exception $e) {
            Log::error('Error creating user: ' . $e->getMessage());
            return response()->json(['message' => 'Registration failed'], 500);
        }
    }


    public function verify(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:8',
            'verification_code' => 'required|string|max:6',
            'is_admin' => 'required|boolean',
        ]);

        $verification = EmailVerification::where('email', $validatedData['email'])
            ->where('verification_code', $validatedData['verification_code'])
            ->where('expires_at', '>=', now())
            ->first();

        if ($verification) {
            $user = User::create([
                'name' => $validatedData['name'],
                'email' => $validatedData['email'],
                'password' => bcrypt($validatedData['password']),
                'is_admin' => $validatedData['is_admin'],
            ]);

            $verification->delete();

            $token = $user->createToken('authToken')->plainTextToken;

            return response()->json([
                'message' => 'Registration successful',
                'user' => $user,
                'token' => $token,
            ], 201);
        } else {
            return response()->json(['message' => 'Invalid or expired verification code.'], 422);
        }
    }

    public function checkAdmin(Request $request)
    {
        Log::info('checkAdmin request received');

        $user = $request->user();
        if ($user) {
            Log::info('User found', ['user' => $user]);
            if ($user->is_admin) {
                Log::info('User is admin');
                return response()->json(['is_admin' => true], 200);
            } else {
                Log::info('User is not admin');
                return response()->json(['is_admin' => false], 403);
            }
        } else {
            Log::warning('No user found for the request');
            return response()->json(['message' => 'Unauthorized'], 401);
        }
    }

    public function sendVerificationCode(Request $request)
    {
        $email = $request->input('email');
        $verificationCode = rand(100000, 999999); // 랜덤한 6자리 숫자 코드 생성

        $verification = EmailVerification::updateOrCreate(
            ['email' => $email],
            ['verification_code' => $verificationCode, 'expires_at' => now()->addMinutes(10)]
        );

        Mail::to($email)->send(new VerificationCodeMail($verificationCode));

        return response()->json(['message' => '인증 코드가 이메일로 전송되었습니다.'], 200);
    }

    public function verifyCode(Request $request)
    {
        $requestData = $request->all(); // 요청 데이터 전부를 로그로 출력
        Log::info('Request data: ', $requestData);
    
        $email = $request->input('email');
        $verificationCode = $request->input('verificationCode'); // 여기에서 'verificationCode'를 사용합니다.
        
        Log::info('Verifying code for email: ' . $email); // 로그 추가
        Log::info('Provided verification code: ' . $verificationCode); // 로그 추가
    
        // 확인을 위해 데이터를 로그로 출력
        if (empty($email) || empty($verificationCode)) {
            Log::warning('Email or verification code is missing');
            return response()->json(['message' => 'Email or verification code is missing.', 'success' => false], 422);
        }
    
        $verification = EmailVerification::where('email', $email)
            ->where('verification_code', $verificationCode)
            ->where('expires_at', '>=', now())
            ->first();
    
        Log::info('Verification record from DB: ', ['verification' => $verification]); // 로그 추가
    
        if ($verification) {
            $verification->delete();
            Log::info('Verification successful'); // 로그 추가
            return response()->json(['message' => '인증 성공', 'success' => true], 200);
        } else {
            Log::warning('Invalid or expired verification code'); // 로그 추가
            return response()->json(['message' => '유효하지 않거나 만료된 인증 코드입니다.', 'success' => false], 422);
        }
    }
    
    public function updateAdmin(Request $request)
    {
        $user = Auth::user();
        Log::info('User object:', ['user' => $user]);

        if ($user) {
            // 사용자 상태를 관리자(admin)로 업데이트
            $user->is_admin = true;
            Log::info('Before saving user: ', ['user' => $user]);
            $user->save();
            Log::info('Updated user to admin:', ['user' => $user]);
            return response()->json(['is_admin' => $user->is_admin], 200);
        } else {
            return response()->json(['message' => 'User not found or not authenticated'], 401);
        }
    }
}
