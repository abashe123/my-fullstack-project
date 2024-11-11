<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Contracts\Queue\ShouldQueue;
use App\Models\User;

class OrderReceivedNotification extends Notification implements ShouldQueue
 {
//     use Queueable;

//     protected $patient;

//     public function __construct($patient)
//     {
//         $this->patient = $patient;
//     }

//     public function via($notifiable)
//     {
//         return ['database']; // store in the database
//     }

//         public function toDatabase($notifiable)
//     {
//         return [
//             'message' => "The order for patient {$this->patient->name} has been received.",
//             'patient_id' => $this->patient->id
//         ];
//     }
// }

    // public function toArray($notifiable)
    // {
    //     return [
    //         'message' => 'Patient details received',
    //         'patient' => [
    //             'id' => $this->patient->id,
    //             'name' => $this->patient->name,
    //             'age' => $this->patient->age,
    //             'gender' => $this->patient->gender,
    //             'sampletype' => $this->patient->sampletype,
    //             'clinicalhistory' => $this->patient->clinicalhistory
    //         ]
    //     ];
    // }

    // public function toArray($notifiable)
    // {
    //     return [
    //         'message' => 'Your patient details have been received by the admin.',
    //         'patient' => [
    //             'name' => $this->patient->name,
    //             'age' => $this->patient->age,
    //             'gender' => $this->patient->gender,
    //             'sampletype' => $this->patient->sampletype,
    //             'clinicalhistory' => $this->patient->clinicalhistory,
    //         ],
    //     ];
    // }
 }