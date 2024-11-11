<?php

namespace App\Http\Controllers;


use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;
use App\Models\User;

class UserController extends Controller
{
    public function getNonAdminUsers()
    {
        // Check if the user is authenticated and is an admin
        if (!Auth::check() || Auth::user()->role !== 'admin') {
            return response()->json(['error' => 'Unauthorized'], 403);
        }
    
        // Fetch non-admin users
        $nonAdminUsers = User::where('role', 'user')->get();
    
        return response()->json(['data' => $nonAdminUsers]);
    }
    }
