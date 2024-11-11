<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Mail;



/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::get('/register', [App\Http\Controllers\UserController::class, 'register']);
Route::get('/login', [App\Http\Controllers\UserController::class, 'login']);
Route::post('/patient', [App\Http\Controllers\PatientController::class, 'patient']);


Route::get('password/reset/{token}', function ($token) {
    // You can return a view here if needed or handle the token
    return response()->json(['token' => $token]);
})->name('password.reset');


// Route::get('test-email', function () {
//     Mail::raw('This is a test email.', function ($message) {
//         $message->to('abashejaph@gmail.com')
//                 ->subject('Test Email');
//     });
//     return 'Test email sent.';
// });


// Route::get('/test-notification', function () {
//     $user = User::find('nsk'); // Ensure this user exists
//     $patient = Patient::find(39); // Ensure this patient exists

//     if ($user && $patient) {
//         $user->notify(new OrderCompleted($patient));
//         return response()->json(['message' => 'Notification sent']);
//     }

//     return response()->json(['message' => 'User or Patient not found'], 404);
// });
Route::get('/current-time', function () {
    return response()->json([
        'current_time' => now(),
        'timezone' => config('app.timezone'),
    ]);
});

// Define a route to serve files from a custom directory
Route::get('/custom-files/{filename}', function ($filename) {
    $path = storage_path('app/custom/' . $filename);

    if (file_exists($path)) {
        return response()->file($path);
    } else {
        abort(404);
    }
});

