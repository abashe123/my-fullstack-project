<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; 
use App\Notifications\OrderReceivedNotification;
use App\Models\Patient;
use App\Notifications\OrderCompleted;
use App\Models\User;


class PatientController extends Controller
{

    public function show($id)
    {
        $patient = Patient::find($id);

        if ($patient) {
            return response()->json($patient);
        } else {
            return response()->json(['message' => 'Patient not found'], 404);
        }
    }
    /**
     * Display a listing of the resource.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function getPatient(Request $request)
    {

        $patients = Patient::with(['user'])->where('user_id', Auth::id())->get();

        //$patients = Patient::query(); 
        //$patients = $patients->get();
        return response()->json(['data' => $patients]);
    }



    /**
     * Store a newly created patient record.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function patient(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'age' => 'required|integer|min:0',
            'gender' => 'required|string',
            'sampletype' => 'required|string',
            'clinicalhistory' => 'required|string',
            'diagnosis' => 'required|string',
            'user_id' => 'integer',
            'senderName' => 'required|string|max:255',
            'sampleTransportDate' => 'nullable|date', // Allow null if not provided
        ]);

         // Automatically set sampleTransportDate if not provided
        if (empty($validated['sampleTransportDate'])) {
            $validated['sampleTransportDate'] = now()->toISOString();
        }

        $validatedData['user_id'] = Auth::id();

        // Create a new patient record associated with the authenticated user (if needed)
        $patient = Patient::create($validatedData);

        return response()->json(['message' => 'Patient added successfully', 'patient' => $patient], 201);
    }


       
    public function submitPatient($patientId)
        {
            // Find the patient record
            $patient = Patient::findOrFail($patientId);

            // Update the patient record to mark it as submitted
            $patient->submitted = true; // Mark as submitted
            $patient->received = false; // Ensure received is false
            $patient->save();

            return response()->json(['message' => 'Patient details submitted.']);
        }

        public function getSubmittedPatients(Request $request)
        {
            if (!Auth::check() || !Auth::user()->isAdmin()) {
                return response()->json(['error' => 'Unauthorized'], 403);
            }

            $patients = Patient::with('user') // Eager load the user relationship
                ->where('submitted', 1)
                ->where('received', 0)
                ->get();

            return response()->json(['data' => $patients]);
        }

        public function getReceivedOrders(Request $request)
        {
            if (!Auth::check() || !Auth::user()->isAdmin()) {
                return response()->json(['error' => 'Unauthorized'], 403);
            }

            // Fetch patients marked as received
            $receivedPatients = Patient::where('received', 1)->get();

            // Return the received patients as JSON
            return response()->json($receivedPatients);
        }


    
    public function update(Request $request, $id)
    {
        $patient = Patient::findOrFail($id);

        // Prevent updating if the patient is already submitted
        if ($patient->submitted) {
            return response()->json(['message' => 'Patient cannot be updated as it is already submitted.'], 403);
        }

        // Validate incoming data
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'age' => 'required|integer|min:0',
            'gender' => 'required|string',
            'sampletype' => 'required|string',
            'clinicalhistory' => 'required|string',
            'diagnosis' => 'required|string',
            'user_id' => 'integer',
            'senderName' => 'required|string|max:255',
            'sampleTransportDate' => 'nullable|date', // Allow null if not provided
        ]);

         // Automatically set sampleTransportDate if not provided
         if (empty($validated['sampleTransportDate'])) {
            $validated['sampleTransportDate'] = now(); // Use current timestamp
        }

        // Update only the fields provided in the request
        $patient->update($validated);

        return response()->json(['message' => 'Patient updated successfully', 'patient' => $patient], 200);
    }

    public function destroy($id)
    {
        $patient = Patient::findOrFail($id);

        // Ensure the authenticated user is the owner of the patient record
        if ($patient->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        // Prevent deletion if the patient is already submitted
        if ($patient->submitted) {
            return response()->json(['message' => 'Patient cannot be deleted as it is already submitted.'], 403);
        }

        // Delete the patient record
        $patient->delete();

        return response()->json(['message' => 'Patient deleted successfully'], 200);
    }


    public function markAsReceived(Request $request, $id)
    {
        if (!Auth::check() || !Auth::user()->isAdmin()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Find the patient
        $patient = Patient::where('id', $id)->where('submitted', 1) ->where('received', 0) ->first();


        if (!$patient) {
            return response()->json(['error' => 'Patient not found or already received'], 404);
        }

        // Update the patient's status to received
        $patient->received = 1;
        $patient->status = 'Received'; // Optional: Update status
        $patient->save();

        // Notify the user who submitted the patient
        // $user = $patient->user;
        // $user->notify(new OrderReceivedNotification($patient)); // You need to create the notification class

        return response()->json(['success' => 'Patient marked as received and user notified']);
    }

    public function markAsCompleted(Request $request, $id)
    {
        // Find the patient record
        $patient = Patient::findOrFail($id);

        // Ensure that the file is uploaded
        if (!$patient->pdf_file_path) {
            return response()->json(['error' => 'File must be uploaded before marking as completed'], 400);
        }

        // Update the patient record to mark it as completed
        $patient->status = 'Completed';
        $patient->save();

        return response()->json(['message' => 'Patient marked as completed.']);
    }
    


    public function updatePatientStatus(Request $request, $patientId)
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Validate the request
        $request->validate([
            'status' => 'required|string|in:pending,completed,cancelled',
        ]);

        $patient = Patient::findOrFail($patientId);

        // Check if the authenticated user is the one who submitted the patient
        if (Auth::user()->id !== $patient->user_id && !Auth::user()->isAdmin()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Update the patient status
        $patient->status = $request->status;
        $patient->save();

        return response()->json(['message' => 'Patient status updated successfully']);
    }

    public function getOrderStatus(Request $request)
    {
        if (!Auth::check()) {
            return response()->json(['error' => 'Unauthorized'], 403);
        }

        // Fetch orders for the authenticated user
        $orders = Patient::where('user_id', Auth::id())
            ->where('received', 1) // Assuming you want only received orders
            ->get();

        

        return response()->json($orders);
    }
    
    public function uploadFile(Request $request)
    {
        $request->validate([
            'file' => 'required|mimes:pdf|max:2048',
            'patientId' => 'required|integer',
        ]);

        $file = $request->file('file');
        $patientId = $request->input('patientId');

        // Generate a unique file name
        $fileName = time() . '_' . $file->getClientOriginalName();
        
        // Store the file in the 'public/pdfs' directory
        $path = $file->storeAs('public/pdfs', $fileName);

        // Find the patient record
        $patient = Patient::find($patientId);
        if (!$patient) {
            return response()->json(['message' => 'Patient not found'], 404);
        }

        // Update the patient record with the file path
        $patient->pdf_file_path = $path;
        $patient->save();

        return response()->json([
            'message' => 'File uploaded successfully!',
            'filePath' => $path // Return the file path
        ]);
    }

    public function reportIssue(Request $request)
    {
        // Validate the request data
        $validatedData = $request->validate([
            'handledBy' => 'required|string',
            'receivedBy' => 'required|string',
            'issueReason' => 'nullable|string',
            'elaborateOther' => 'nullable|string',
            'actionTaken' => 'nullable|string',
            'reportedTo' => 'nullable|string',
            'reportDate' => 'nullable|date',
            'patientDetails.id' => 'required|exists:patients,id',
        ]);

        $patient = Patient::findOrFail($validatedData['patientDetails']['id']);
        $user = $patient->user; // Assuming the patient has a user relation

        // Send a notification to the user
        Notification::send($user, new IssueReportedNotification($validatedData));

        // Return the submitted data in the response
        return response()->json([
            'message' => 'Report submitted successfully',
            'reportData' => $validatedData
        ]);
    }

    public function countPatients()
    {
        $patientCount = Patient::count(); // Assuming Patient is your model
        return response()->json(['count' => $patientCount]);
    }

    public function getSamplesReceivedCount()
    {
        $samplesReceived = Sample::where('status', 'received')->count(); // Adjust as needed
        return response()->json([
            'samplesReceived' => $samplesReceived,
        ]);
    }


    // public function sampleSubmittedToday()
    // {
    //     $todayCount = Patient::whereDate('created_at', Carbon::today())->count();
    //     return response()->json(['samples_submitted_today' =>$todayCount]);
    // }

}


