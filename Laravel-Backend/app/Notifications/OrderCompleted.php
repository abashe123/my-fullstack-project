<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class OrderCompleted extends Notification
{
    use Queueable;

    protected $patient;

    public function __construct($patient)
    {
        $this->patient = $patient;
    }

    public function via($notifiable)
    {
        return ['database']; // or other channels as needed
    }

    public function toArray($notifiable)
    {
        return [
            'message' => 'Report has been sent to you E-mail.',
            'patient_id' => $this->patient->id
        ];
    }
}
