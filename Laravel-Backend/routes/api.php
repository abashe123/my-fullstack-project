<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Mail;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PatientController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\NotificationController;
use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\UserController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Public routes (no authentication required)
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('password/email', [AuthController::class, 'sendResetLinkEmail']); // Route for sending the password reset link
Route::post('password/reset', [AuthController::class, 'resetPassword']); // Route for resetting the password

Route::get('/non-admin-users', [UserController::class, 'getNonAdminUsers']); //route for getting all users for admin



// Protected routes (require JWT authentication)
Route::middleware('jwt.auth')->group(function () {
    Route::get('/user', [AuthController::class, 'user']); // Route to fetch authenticated user details
    Route::post('/patient', [PatientController::class, 'patient']); // Route to create a new patient
    Route::get('/patient', [PatientController::class, 'getPatient']); // Route to get added patient
    Route::put('/patients/{id}', [PatientController::class, 'update']); //route for edit
    Route::delete('/patients/{id}', [PatientController::class, 'destroy']); //To delete patient
    //Route::middleware('jwt.auth')->get('/notifications', [NotificationController::class, 'index']);
    Route::get('/patient-analytics', [AnalyticsController::class, 'getPatientAnalytics']); 
    Route::post('/patients/submit/{id}', [PatientController::class, 'submitPatient']); // Route for submitting patient data
    Route::post('/patients/{patientId}/mark-as-received', [PatientController::class, 'markAsReceived'])->name('patients.markAsReceived'); //route to mark as received patients 
    Route::get('/received-orders', [PatientController::class, 'getReceivedOrders'])->name('patients.getReceivedOrders');
    Route::post('/patients/complete/{id}', [PatientController::class, 'markAsCompleted']);
    Route::post('/patients/{patientId}/update-status', [PatientController::class, 'updatePatientStatus'])->name('patients.updateStatus');
    Route::get('/order-status', [PatientController::class, 'getOrderStatus'])->name('patients.getOrderStatus');
    Route::post('/patients/upload-file', [PatientController::class, 'uploadFile']);
    Route::post('/report-issue', [PatientController::class, 'reportIssue']);
    Route::get('/patients/count', [PatientController::class, 'countPatients']);
    Route::get('/samples-received-count', [PatientController::class, 'getSamplesReceivedCount']);

    

    //Route::get('/download/{filename}', [PatientController::class, 'downloadFile']);
    //dadajfakjda


    
    });

    Route::middleware('auth:api')->get('/submitted-patients', [PatientController::class, 'getSubmittedPatients']); // Route for admin getting submitted patient data
    

    Route::group(['middleware' => ['jwt.auth']], function () {
        Route::get('me', [AuthController::class, 'me']);
        Route::post('logout', [AuthController::class, 'logout']);
        Route::post('refresh', [AuthController::class, 'refresh']);
    });

