<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Validator;
use Illuminate\Auth\Events\PasswordReset;
use Tymon\JWTAuth\Facades\JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthController extends Controller
{
    public function __construct()
    {
        $this->middleware('jwt.auth', ['except' => ['login', 'register', 'sendResetLinkEmail', 'resetPassword' ]]);
    }

    public function register(Request $request)
    {
        try {
            // Validate user input
            $validateUser = Validator::make($request->all(), [
                'name' => 'required|string|max:255',
                'email' => 'required|email|unique:users,email',
                'password' => 'required|string|min:8',
                'rank' => 'required|string|',
                'phone_number' => 'required|string|regex:/^\d+$/', // Ensures only digits
            ]);
            
            if ($validateUser->fails()) {
                return response()->json([
                    'status' => false,
                    'message' => 'Validation error',
                    'errors' => $validateUser->errors()
                ], 422);
            }


            // Create user
            $user = User::create([
                'name' => $request->name,
                'email' => $request->email,
                'password' => bcrypt($request->password),
                'rank' => $request->rank,
                'phone_number' => $request->phone_number,
            ]);

            // Attempt to create a token for the user
            if (!$token = JWTAuth::fromUser($user)) {
                return response()->json([
                    'status' => false,
                    'message' => 'Failed to create token'
                ], 500);
            }

            return $this->respondWithToken($token);

        } catch (\Throwable $th) {
            return response()->json([
                'status' => false,
                'message' => 'Server error',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    public function login(Request $request)
    {
        $credentials = $request->only('email', 'password');

        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 400);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        // Authentication passed, return user data with token
        $user = Auth::user();

        return response()->json([
            'status' => 'success',
            'message' => 'Login successful',
            'user' => $user,
            'token' => $token,
        ]);
    }

    // public function login(Request $request)
    // {
    //     try {
    //         // Validate user input
    //         $validateUser = Validator::make($request->all(), [
    //             'email' => 'required|email',
    //             'password' => 'required|string'
    //         ]);

    //         if ($validateUser->fails()) {
    //             return response()->json([
    //                 'status' => false,
    //                 'message' => 'Validation error',
    //                 'errors' => $validateUser->errors()
    //             ], 422);
    //         }

    //         // Attempt to log the user in
    //         if (!$token = JWTAuth::attempt($request->only('email', 'password'))) {
    //             return response()->json([
    //                 'status' => false,
    //                 'message' => 'Invalid credentials'
    //             ], 401);
    //         }

    //         // Successful login
    //         $user=Auth::user();
    //         return $this->respondWithToken($token);
            

    //     } catch (JWTException $e) {
    //         return response()->json([
    //             'status' => false,
    //             'message' => 'Failed to login',
    //             'error' => $e->getMessage()
    //         ], 500);
    //     }
    // }

    public function me()
    {
        try {
            if (!$user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['user_not_found'], 404);
            }
        } catch (JWTException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to retrieve user',
                'error' => $e->getMessage()
            ], 500);
        }

        return response()->json(compact('user'));
    }

    public function logout()
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());
        } catch (JWTException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to logout',
                'error' => $e->getMessage()
            ], 500);
        }

        return response()->json(['message' => 'Successfully logged out']);
    }

    public function refresh()
    {
        try {
            $token = JWTAuth::refresh(JWTAuth::getToken());
        } catch (JWTException $e) {
            return response()->json([
                'status' => false,
                'message' => 'Failed to refresh token',
                'error' => $e->getMessage()
            ], 500);
        } 

        return $this->respondWithToken($token);
    }

    protected function respondWithToken($token)
    {
        return response()->json([
            'status' => true,
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 60,
        ]);
    }

   
    public function sendResetLinkEmail(Request $request)
    {
        $request->validate(['email' => 'required|email']);

        $response = Password::sendResetLink($request->only('email'));

        return $response == Password::RESET_LINK_SENT
            ? response()->json(['message' => 'Reset link sent to your email.'])
            : response()->json(['error' => 'Unable to send reset link.'], 500);
    }

    public function resetPassword(Request $request)
    {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:6|confirmed',
        ]);

        $response = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->password = bcrypt($password);
                $user->save();
                event(new PasswordReset($user));
            }
        );

        return $response == Password::PASSWORD_RESET
            ? response()->json(['message' => 'Password has been reset.'])
            : response()->json(['error' => 'Unable to reset password.'], 500);
    }
}